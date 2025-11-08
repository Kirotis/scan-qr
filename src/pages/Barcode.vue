<script setup lang="ts">
import { useBarcodes } from '@/store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const { currentRoute } = useRouter();
const { barcodes } = useBarcodes();

const formatedText = computed(() => {
  const date = Number(currentRoute.value.params.date || 0);
  const barcode = barcodes.value.find((barcode) => barcode.date === date);

  return barcode?.value?.replace(
    urlRegExp,
    (_, value) => `<a href=${value} target='_blank'>${value}</a>`,
  );
});
</script>

<template>
  <div class="container">
    <button>Copy</button>
    <span v-html="formatedText"></span>
  </div>
</template>

<style lang="css" scoped>
.container {
  font-size: 1.6rem;
  word-break: break-all;
  margin: 0 15px;
}
</style>
