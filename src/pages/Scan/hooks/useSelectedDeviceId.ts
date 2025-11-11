import { ref, onMounted, watch } from 'vue';

const DEVICE_ID_KEY = 'deviceId';

export const useSelectedDeviceId = () => {
  const deviceId = ref<null | string>(null);
  onMounted(() => {
    deviceId.value = localStorage.getItem(DEVICE_ID_KEY);
  });
  watch(deviceId, (value) => {
    if (value) {
      localStorage.setItem(DEVICE_ID_KEY, value);
    } else {
      localStorage.removeItem(DEVICE_ID_KEY);
    }
  });
  return deviceId;
};
