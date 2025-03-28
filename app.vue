<template>
  <div>
    <TopNavigation :isHeroSection="isHeroSection" />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrganizationSchema } from '@/composables/useOrganizationSchema';

const route = useRoute();
const isHeroSection = computed(() => route.meta.isHeroSection ?? false);

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
    }
  ]
});
</script>