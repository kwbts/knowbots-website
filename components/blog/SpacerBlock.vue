<template>
    <div :class="spacerClass"></div>
  </template>
  
  <script setup>
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  const spacerClass = {
    small: 'h-4',
    medium: 'h-8',
    large: 'h-12',
  }[props.value.size] || 'h-8';
  </script>