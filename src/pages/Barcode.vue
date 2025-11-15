<script setup lang="ts">
import Snackbar from '@/components/Snackbar.vue';
import { useBarcodes } from '@/context';
import { urlRegExp } from '@/utils';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const { currentRoute } = useRouter();
const { barcodes } = useBarcodes();

const snackbarMessage = ref<string | null>(null);

const barcodeText = computed(() => {
  const date = Number(currentRoute.value.params.date || 0);
  return barcodes.value.find((barcode) => barcode.date === date)?.value;
});

const formatedText = computed(() => {
  return barcodeText?.value?.replace(
    urlRegExp,
    (_: unknown, value: string) =>
      `<a href=${value} target='_blank'>${value}</a>`,
  );
});

const copy = async () => {
  if (!barcodeText.value) {
    return;
  }
  await navigator.clipboard.writeText(barcodeText.value);
  snackbarMessage.value = 'Coped!!!';
};
</script>

<template>
  <div class="wrapper">
    <button @click="copy">Copy</button>
    <span v-html="formatedText"></span>
    <Snackbar v-model="snackbarMessage" />
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  font-size: 1.6rem;
  word-break: break-all;
  margin: 0 15px;
}
</style>
