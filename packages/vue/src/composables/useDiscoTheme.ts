import { ref, onMounted, watch } from 'vue';

/**
 * Composable to manage DiscoUI theme and accent color.
 * Syncs with the <html> tag attributes.
 */
export function useDiscoTheme() {
  const theme = ref(document.documentElement.getAttribute('disco-theme') || 'auto');
  const accent = ref(document.documentElement.getAttribute('disco-accent') || '');

  onMounted(() => {
    // Initial sync
    document.documentElement.setAttribute('disco-theme', theme.value);
    if (accent.value) {
      document.documentElement.setAttribute('disco-accent', accent.value);
    }
  });

  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('disco-theme', newTheme);
  });

  watch(accent, (newAccent) => {
    if (newAccent) {
      document.documentElement.setAttribute('disco-accent', newAccent);
    }
  });

  return {
    theme,
    accent
  };
}
