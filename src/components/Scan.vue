<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue';
import QrScanner from 'qr-scanner';

const emit = defineEmits<{ (e: 'scan', value: string): void }>();

const videoScanRef = useTemplateRef<HTMLVideoElement>('scan');
const permissionStatus = ref<'loading' | 'off' | 'on'>('loading');
let qrScanner: QrScanner | undefined;

const queryPermission = async () => {
  permissionStatus.value = 'loading';
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
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
  if (videoScanRef.value) {
    const mediaStream = await queryPermission();

    videoScanRef.value.srcObject = mediaStream;
    videoScanRef.value.play();

    qrScanner = new QrScanner(
      videoScanRef.value,
      (result) => emit('scan', result.data),
      {},
    );
    await qrScanner.start();
  }
};

watchEffect(async () => {
  await startVideo();
  return () => {
    videoScanRef.value?.pause();
    qrScanner?.stop();
    qrScanner?.destroy();
  };
});
</script>

<template>
  <div class="container">
    <video class="video" ref="scan"></video>

    <div v-if="permissionStatus === 'on'" class="pointer" />
    <div v-else-if="permissionStatus === 'loading'">
      <div class="loading">WAIT...</div>
    </div>
    <div v-else>
      ERROR
      <br />
      <button @click="startVideo">Try again</button>
    </div>
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
