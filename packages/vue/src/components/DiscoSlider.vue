<template>
  <disco-slider 
    ref="el"
    v-bind="$attrs"
    :value="modelValue"
    @disco-change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * Vue wrapper for <disco-slider> with v-model support.
 */
defineProps<{
  modelValue?: number | string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();

const el = ref<any>(null);

const handleChange = (event: any) => {
  const val = event.detail.value;
  emit('update:modelValue', val);
  emit('change', val);
};

defineExpose({ el });
</script>
