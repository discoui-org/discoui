import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable to interact with the DiscoFrame.
 * Provides navigation methods and frame state.
 */
export function useDiscoFrame(frameId = 'componentsFrame') {
  const frame = ref<any>(null);

  onMounted(() => {
    frame.value = document.getElementById(frameId);
  });

  const navigate = (targetPageId: string) => {
    if (frame.value) {
      frame.value.navigate(targetPageId);
    }
  };

  const goBack = () => {
    if (frame.value) {
      frame.value.goBack();
    }
  };

  return {
    frame,
    navigate,
    goBack
  };
}
