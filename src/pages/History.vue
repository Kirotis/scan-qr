<script lang="ts" setup>
import { useBarcodes } from '../store';
import { computed } from 'vue';

const { barcodes } = useBarcodes();

const dateDict = computed(() => {
  return Object.groupBy(barcodes.value, (barcode) =>
    new Date(barcode.date).toDateString(),
  );
});
</script>

<template>
  <dl v-if="barcodes?.length" class="container">
    <div class="item" v-for="(barcodes, date) in dateDict" :key="date">
      <dt>{{ date }}:</dt>
      <dd v-for="barcode in barcodes" :key="barcode.date">
        --
        <RouterLink class="link" :to="`/barcode/${barcode.date}`">
          {{ barcode.value }}
        </RouterLink>
      </dd>
    </div>
  </dl>
  <h4 v-else>Empty</h4>
</template>

<style lang="css" scoped>
.container {
  overflow-y: auto;
  width: 100%;
}
.item {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item + .item {
  margin-top: 15px;
}

.item :global(dd) {
  margin-left: 15%;
}

.item :global(dd) + :global(dd) {
  margin-top: 5px;
}

.link {
  font-size: 1rem;
}
</style>
