import { ref, readonly, provide, inject, type Ref } from 'vue';

export interface Barcode {
  value: string;
  date: number;
}

interface BarcodeCTX {
  barcodes: Readonly<Ref<readonly Barcode[]>>;
  appendBarcode: (value: string) => number;
  initBarcodes: VoidFunction
}

const key = Symbol('barcodes');

export const provideBarcodes = () => {
  const barcodes = ref<Barcode[]>([]);

  const initBarcodes = () => {
    try {
      const storageBarcodes = JSON.parse(
        localStorage.getItem('barcodes')!,
      ) as Barcode[];
      if (storageBarcodes?.length) {
        barcodes.value = storageBarcodes;
      }
    } catch {}
  };

  const appendBarcode = (value: string) => {
    const date = Date.now();
    if (barcodes.value.push({ value, date }) > 50) {
      barcodes.value.shift();
    }
    localStorage.setItem('barcodes', JSON.stringify(barcodes.value));
    return date
  };

  const store: BarcodeCTX = {
    barcodes: readonly(barcodes),
    appendBarcode,
    initBarcodes,
  };

  provide(key, store);

  return store;
};

export const useBarcodes = () => {
  const ctx = inject<BarcodeCTX>(key);
  if (!ctx) {
    throw new Error('Barcodes not providet');
  }
  return ctx;
};
