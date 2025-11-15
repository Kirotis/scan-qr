<script setup lang="ts">
import { watchEffect } from 'vue';

const message = defineModel<string | null>();

watchEffect((onCleanup) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  if (message.value) {
    timer = setTimeout(() => (message.value = null), 500);
  }

  onCleanup(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });
});
</script>

<template>
  <div v-if="message" class="snackbar" @click.stop="message = null">
    {{ message }}
  </div>
</template>

<style lang="css" scoped>
.snackbar {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  width: var(--content-width);
  height: var(--content-height);

  background-color: var(--primary-color);
  color: var(--default-color);

  z-index: 10;

  font-size: 4rem;
}
</style>
