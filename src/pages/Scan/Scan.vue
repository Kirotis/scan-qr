<script setup lang="ts">
import SelectDevice from './components/SelectDevice.vue';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import QrScanner from 'qr-scanner';
import { useBarcodes } from '@/store';
import { useRouter } from 'vue-router';
import { useSelectedDeviceId, useVideoDevices } from './hooks';

const { appendBarcode } = useBarcodes();
const { push } = useRouter();
const { fetchDevices, videoDevices } = useVideoDevices();

const deviceId = useSelectedDeviceId();
const videoScanRef = useTemplateRef<HTMLVideoElement>('scan');
const permissionStatus = ref<'loading' | 'off' | 'on'>('loading');
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

const startVideo = async () => {
  if (!videoScanRef.value) {
    return;
  }
  const mediaStream = await getMediaStream();

  videoScanRef.value.srcObject = mediaStream;
  videoScanRef.value.play();

  qrScanner = new QrScanner(
    videoScanRef.value,
    (result) => {
      const date = appendBarcode(result.data);
      push({ params: { date }, name: 'Barcode' });
    },
    {},
  );
  await qrScanner.start();
};

onMounted(startVideo);
onUnmounted(() => {
  videoScanRef.value?.pause();
  qrScanner?.stop();
  qrScanner?.destroy();
});

watch(deviceId, (value, prev) => {
  if (value && value !== prev) {
    startVideo();
  }
});
</script>

<template>
  <div class="container">
    <video class="video" ref="scan"></video>

    <template v-if="permissionStatus === 'on'">
      <div class="pointer" />
      <SelectDevice v-model="deviceId" :options="videoDevices" />
    </template>
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
  </div>
</template>

<style lang="css" scoped>
.container {
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
