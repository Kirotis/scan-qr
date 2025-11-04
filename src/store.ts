import { onMounted, ref, readonly } from 'vue';

export interface Barcode {
  value: string;
  date: number;
}

export const useBarcodes = () => {
  const barcodes = ref<Barcode[]>([]);
  onMounted(() => {
    try {
      const storageBarcodes = JSON.parse(
        localStorage.getItem('barcodes')!,
      ) as Barcode[];
      if (storageBarcodes?.length) {
        barcodes.value = storageBarcodes;
      }
    } catch {}
  });

  const appendBarcode = (value: string) => {
    if (barcodes.value.push({ value, date: Date.now() }) > 50) {
      barcodes.value.shift();
    }
    localStorage.setItem('barcodes', JSON.stringify(barcodes.value));
  };

  return {
    barcodes: readonly(barcodes),
    appendBarcode,
  };
};
