<template>
  <disco-button v-bind="$attrs">
    <slot />
  </disco-button>
</template>

<script setup lang="ts">
/**
 * Official Vue wrapper for <disco-button>.
 * Handles attribute binding and slot distribution.
 */
defineOptions({
  name: 'DiscoButton',
  inheritAttrs: false
});
</script>
