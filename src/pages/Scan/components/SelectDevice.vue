<script setup lang="ts">
const model = defineModel<string | null>();
const { options } = defineProps<{
  options: MediaDeviceInfo[] | null;
}>();
</script>

<template>
  <select v-if="options?.length" v-model="model">
    <option
      v-for="option in options"
      :key="option.deviceId"
      :value="option.deviceId"
    >
      {{ option.label }}
    </option>
  </select>
  <h4 v-else>Empty devices</h4>
</template>

<style lang="css" scoped></style>
