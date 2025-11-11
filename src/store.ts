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

const BARCODES_KEY = 'barcodes';
const ctxKey = Symbol(BARCODES_KEY);

export const provideBarcodes = () => {
  const barcodes = ref<Barcode[]>([]);

  const initBarcodes = () => {
    try {
      const storageBarcodes = JSON.parse(
        localStorage.getItem(BARCODES_KEY)!,
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
    localStorage.setItem(BARCODES_KEY, JSON.stringify(barcodes.value));
    return date
  };

  const store: BarcodeCTX = {
    barcodes: readonly(barcodes),
    appendBarcode,
    initBarcodes,
  };

  provide(ctxKey, store);

  return store;
};

export const useBarcodes = () => {
  const ctx = inject<BarcodeCTX>(ctxKey);
  if (!ctx) {
    throw new Error('Barcodes not providet');
  }
  return ctx;
};
