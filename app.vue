<template>
  <div>
    <NuxtLayout :name="isCustomLayoutPage ? 'custom' : 'default'">
      <template #default>
        <TopNavigation v-if="!isCustomLayoutPage"/>
        <NuxtPage />
        <Footer v-if="!isCustomLayoutPage" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganizationSchema } from '@/composables/useOrganizationSchema';

const route = useRoute();
const isHeroSection = computed(() => route.meta.isHeroSection ?? false);

// Check if current page should use a custom layout (without global navigation)
const isCustomLayoutPage = computed(() => {
  // Check if the route path starts with any of these prefixes
  const customLayoutPaths = [
    '/citebots',      // All CiteBots pages
    '/dashboard',     // Dashboard pages
    '/core-sample',   // Core sample report pages
    '/report'         // Other report pages
  ];
  
  return customLayoutPaths.some(path => route.path.startsWith(path));
});

// Get the organization schema generator
const { createOrganizationSchema } = useOrganizationSchema();

// Create the organization schema
const organizationSchema = createOrganizationSchema({
  organizationType: 'ProfessionalService',
  name: 'Knowbots',
  description: 'AI and digital marketing solutions for businesses',
  foundingDate: '2018', // Update this to your actual founding year
  logoPath: '/logo.png',
  socialProfiles: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/knowbots-marketing/' },
    { platform: 'Website', url: 'https://www.knowbots.ca' },
    // Add any other social profiles you have
  ],
  address: {
    addressLocality: 'Waterloo', // Your city
    addressRegion: 'ON', // Your province
    addressCountry: 'CA'
  },
});

// Add the schema to the page
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema)
    },
    { 
      src: '/scripts/dark-mode.js', 
      type: 'text/javascript',
      // Make sure it loads and executes before rendering the page
      body: false, 
      head: true 
    }
  ]
});
</script>