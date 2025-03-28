<!-- components/QuoteBlock.vue -->

<template>
    <blockquote class="border-l-4 border-gray-300 pl-4 italic my-8">
      <p>{{ value.quote }}</p>
      <footer v-if="value.attribution" class="text-sm text-gray-600 mt-2">
        — {{ value.attribution }}
      </footer>
    </blockquote>
  </template>
  
  <script setup>
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  const { value } = props;
  </script>