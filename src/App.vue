<script setup lang="ts">
import { onMounted } from 'vue';
import { provideBarcodes } from '@/context';
import Header from '@/components/Header.vue';

const { initBarcodes } = provideBarcodes();
onMounted(initBarcodes);
</script>

<template>
  <Header class="header" />
  <RouterView class="content" />
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
}
.header {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
./barcodes
