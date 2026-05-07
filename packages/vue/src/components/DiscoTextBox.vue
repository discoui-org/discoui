<template>
  <disco-text-box 
    ref="el"
    v-bind="$attrs"
    :value="modelValue"
    @input="handleInput"
    @disco-change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * Vue wrapper for <disco-text-box> with v-model support.
 */
defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const el = ref<any>(null);

const handleInput = (event: any) => {
  const val = event.target.value;
  emit('update:modelValue', val);
};

const handleChange = (event: any) => {
  const val = event.detail.value;
  emit('update:modelValue', val);
  emit('change', val);
};

defineExpose({ el });
</script>
