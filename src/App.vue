<script setup lang="ts">
import { onMounted } from 'vue';
import { provideBarcodes } from './store';
import Header from './widgets/Header.vue';

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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
