<template>
  <disco-frame ref="el" :initial-page="initialPage">
    <slot />
  </disco-frame>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialPage?: string;
}>();

const el = ref<any>(null);

watch(() => props.initialPage, (next) => {
  if (el.value && next && el.value.isConnected) {
    const page = el.value.querySelector(`#${next}`) || el.value.querySelector(next);
    if (page) el.value.navigate(page);
  }
});

defineExpose({ el });
</script>
