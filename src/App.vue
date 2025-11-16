<script setup lang="ts">
import { onMounted } from 'vue';
import { provideBarcodes } from '@/context';
import Header from '@/components/Header.vue';

const { initBarcodes } = provideBarcodes();
onMounted(initBarcodes);
</script>

<template>
  <Header />
  <RouterView />
</template>
