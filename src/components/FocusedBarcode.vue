<script setup lang="ts">
import { computed } from 'vue';
const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const { text } = defineProps<{ text: string }>();
const formatedText = computed(() =>
  text.replace(
    urlRegExp,
    (_, value) => `<a href=${value} target='_blank'>${value}</a>`,
  ),
);
</script>

<template>
  <div class="container" v-html="formatedText"></div>
</template>

<style lang="css" scoped>
.container :deep(a) {
  color: var(--primary-color);
}
</style>
