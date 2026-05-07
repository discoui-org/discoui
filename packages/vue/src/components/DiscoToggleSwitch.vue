<template>
  <disco-toggle-switch 
    ref="el"
    v-bind="$attrs"
    :checked="modelValue"
    @disco-change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * Vue wrapper for <disco-toggle-switch> with v-model support.
 */
defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const el = ref<any>(null);

const handleChange = (event: any) => {
  const val = event.detail.checked;
  emit('update:modelValue', val);
  emit('change', val);
};

defineExpose({ el });
</script>
