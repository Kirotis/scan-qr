<script lang="ts" setup>
import type { Barcode } from '../store';

const { barcodes } = defineProps<{ barcodes: readonly Barcode[] }>();
const emit = defineEmits<{ (event: 'select', barcode: string): void }>();
</script>

<template>
  <dl v-if="barcodes">
    <div
      class="item"
      v-for="barcode of barcodes"
      :key="barcode.date"
      @click="emit('select', barcode.value)"
    >
      <dt>
        <time :datatype="new Date(barcode.date).toLocaleString()">
          {{ new Date(barcode.date).toDateString() }}
        </time>
      </dt>
      <dd>{{ barcode.value }}</dd>
    </div>
  </dl>
</template>

<style lang="css" scoped>
.item + .item {
  margin-top: 5px;
}
</style>
