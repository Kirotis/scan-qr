<script setup lang="ts">
import { useRouter } from 'vue-router';

const { back, currentRoute } = useRouter();
</script>

<template>
  <header class="container">
    <h3>Scan QR</h3>
    <button v-if="currentRoute.name !== 'Main'" @click="back">Back</button>
  </header>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.container h3 {
  font-family: var(--header-font);
  font-size: 3.6rem;
  font-weight: 700;
}
</style>
