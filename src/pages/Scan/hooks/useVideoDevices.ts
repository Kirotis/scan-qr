import { ref, onMounted, readonly, type Ref } from 'vue';

export const useVideoDevices = () => {
  const videoDevices = ref<null | MediaDeviceInfo[]>(null);
  const isLoading = ref(false);

  const fetchDevices = async () => {
    try {
      isLoading.value = true;
      const devices = await navigator.mediaDevices.enumerateDevices();
      videoDevices.value = devices.filter(
        (device) => device.kind === 'videoinput',
      );
      console.log(videoDevices.value)
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchDevices);

  return {
    videoDevices: readonly(videoDevices) as Ref<MediaDeviceInfo[] | null>,
    isLoading: readonly(isLoading),
    fetchDevices,
  };
};
