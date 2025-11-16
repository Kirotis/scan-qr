<script lang="ts" setup>
import { useBarcodes } from '@/context';
import { computed } from 'vue';

const { barcodes } = useBarcodes();

const dateDict = computed(() => {
  return Object.groupBy(barcodes.value, (barcode) =>
    new Date(barcode.date).toDateString(),
  );
});
</script>

<template>
  <div class="wrapper">
    <dl v-if="barcodes?.length" class="list">
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
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  padding-top: 20vh;
  overflow-y: visible;
  width: 100%;
}

.list {
  height: 100%;
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
