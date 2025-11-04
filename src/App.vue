<script setup lang="ts">
import { ref } from 'vue';
import { useBarcodes } from './store';
import Scan from './components/Scan.vue';
import BarcodeList from './components/BarcodeList.vue';
import FocusedBarcode from './components/FocusedBarcode.vue';

const { appendBarcode, barcodes } = useBarcodes();
const scan = ref(false);
const focusedBarcode = ref<string | null>(null);
</script>

<template>
  <div class="content">
    <h1>Scan QR</h1>
    <template v-if="scan">
      <button class="btn" @click="scan = false">Cancel</button>
      <Scan
        @scan="
          (barcode) => {
            appendBarcode(barcode);
            scan = false;
            focusedBarcode = barcode;
          }
        "
      />
    </template>
    <template v-else>
      <button class="btn" @click="scan = true">Start</button>
      <FocusedBarcode v-if="focusedBarcode" :text="focusedBarcode" />
      <BarcodeList
        :barcodes="barcodes"
        @select="(barcode) => (focusedBarcode = barcode)"
      />
    </template>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.content h1 {
  font-family: var(--header-font);
  font-size: 3.6rem;
  font-weight: 700;
}

.btn {
  font-size: 2.1rem;
  font-weight: 600;
  border: 2px solid var(--primary-color);
  width: 200px;
}
</style>
