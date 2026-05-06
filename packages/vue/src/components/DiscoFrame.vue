<template>
  <disco-frame ref="el">
    <slot />
  </disco-frame>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const el = ref<any>(null);

defineExpose({ el });
</script>
