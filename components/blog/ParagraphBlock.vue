<!-- components/ParagraphBlock.vue -->

<template>
    <PortableText :value="value.content" :components="myPortableTextComponents" />
  </template>
  
  <script setup>
  import { PortableText } from '@portabletext/vue';
  
  const props = defineProps({
    value: {
      type: Object,
      required: true,
    },
  });
  
  const { value } = props;
  
  // Define any custom PortableText components if needed
  const myPortableTextComponents = {
    // Define your custom components or leave empty for default rendering
  };
  </script>