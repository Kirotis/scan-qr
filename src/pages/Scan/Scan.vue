<script setup lang="ts">
import Snackbar from '@/components/Snackbar.vue';
import { useBarcodes } from '@/context';
import { throttle } from '@/utils';
import QrScanner from 'qr-scanner';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import SelectDevice from './components/SelectDevice.vue';
import { useSelectedDeviceId, useVideoDevices } from './hooks';

const { appendBarcode } = useBarcodes();
const router = useRouter();
const { fetchDevices, videoDevices } = useVideoDevices();
const deviceId = useSelectedDeviceId();

const videoScanRef = useTemplateRef<HTMLVideoElement>('scan');
const permissionStatus = ref<'loading' | 'off' | 'on'>('loading');
const snackbarMessage = ref<string | null>(null);
let qrScanner: QrScanner | undefined;

const getMediaStream = async () => {
  permissionStatus.value = 'loading';
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: 600,
        height: 600,
        deviceId: deviceId.value || undefined,
      },
    });

    if (!mediaStream.active) {
      throw new Error('mediaStream is none active');
    }
    permissionStatus.value = 'on';
    return mediaStream;
  } catch (err) {
    permissionStatus.value = 'off';
    throw err;
  }
};

const handleQrResult = throttle(async (result: { data: string }) => {
  const date = appendBarcode(result.data);
  snackbarMessage.value = 'Scaned!!';
  await new Promise((res) =>
    watch(snackbarMessage, (value) => value === null && res(true), {
      once: true,
    }),
  );
  router.push({ params: { date }, name: 'Barcode' });
}, 400);

const startVideo = async () => {
  if (!videoScanRef.value) {
    return;
  }
  const mediaStream = await getMediaStream();

  if (!deviceId.value) {
    deviceId.value = mediaStream.getVideoTracks().at(0)?.id ?? null;
  }

  videoScanRef.value.srcObject = mediaStream;
  videoScanRef.value.play();

  qrScanner = new QrScanner(videoScanRef.value, handleQrResult, {});
  await qrScanner.start();
};

onMounted(startVideo);
onUnmounted(() => {
  videoScanRef.value?.pause();
  qrScanner?.stop();
  qrScanner?.destroy();
});
</script>

<template>
  <div class="wrapper">
    <video class="video" ref="scan"></video>

    <div class="pointer" v-if="permissionStatus === 'on'" />
    <div v-else-if="permissionStatus === 'loading'" class="loading">
      WAIT...
    </div>
    <button
      v-else
      @click="
        () => {
          startVideo();
          fetchDevices();
        }
      "
    >
      ERROR! Try again
    </button>
    <SelectDevice
      v-if="videoDevices?.length"
      v-model="deviceId"
      :options="videoDevices"
      @change="startVideo"
    />
    <Snackbar v-model="snackbarMessage" />
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  --video-size: 400px;

  position: relative;
}
.video {
  width: var(--video-size);
  height: var(--video-size);
}
.loading {
  animation: eplileptic 100ms none 0s infinite;
}
.pointer {
  --pointer-size: calc(var(--video-size) / 3);

  position: absolute;
  opacity: 0.6;
  border: 1px solid var(--primary-color);

  top: calc(100% / 2 - var(--pointer-size) / 2 - 1px);
  left: calc(100% / 2 - var(--pointer-size) / 2 - 1px);

  width: var(--pointer-size);
  height: var(--pointer-size);
}
</style>
