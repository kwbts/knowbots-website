<template>
  <div>
    <!-- Empty component - only used for head management -->
  </div>
</template>

<script setup>
// Set no-index meta tags for the entire citebots section
useHead({
  title: 'Client Dashboard - Knowbots',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'googlebot', content: 'noindex, nofollow' },
    { property: 'og:robots', content: 'noindex, nofollow' }
  ]
})
</script>