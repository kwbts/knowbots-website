<!-- components/HeaderBlock.vue -->

<template>
    <component :is="headerTag" class="mb-6">
      {{ value.text }}
    </component>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  const headerTag = computed(() => {
    const level = parseInt(props.value.level, 10); // Ensure level is an integer
    if (level >= 1 && level <= 6) {
      return `h${level}`;
    }
    console.warn(`Invalid header level: ${props.value.level}. Defaulting to 'h2'.`);
    return 'h2';
  });
  </script>
  
  <style scoped>
  /* You can keep existing styles or add more if needed */
  </style>