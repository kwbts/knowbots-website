<!-- components/MediaBlock.vue -->
<template>
    <figure class="mb-8">
      <img :src="imageUrl" :alt="value.alt || 'Media Image'" />
      <figcaption v-if="value.caption" class="text-sm text-gray-600 mt-2">
        {{ value.caption }}
      </figcaption>
    </figure>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  // Access the provided urlFor function
  const { $urlFor } = useNuxtApp();
  
  // Compute the image URL
  const imageUrl = computed(() =>
    props.value.image ? $urlFor(props.value.image).width(800).url() : ''
  );
  </script>