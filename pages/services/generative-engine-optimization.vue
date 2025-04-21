<script setup lang="ts">
import GeoHero from '~/components/services/GeoHero.vue';
import GeoPricing from '~/components/services/GeoPricing.vue';
import GeoFramework from '~/components/services/GeoFramework.vue';
import ContactForm from '~/components/global/ContactForm.vue';

definePageMeta({
  isHeroSection: true,
});

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'Generative Engine Optimization - Knowbots Marketing',
  description: 'Enhance your AI-driven content strategy with our Generative Engine Optimization (GEO) services. Optimize your content for both search engines and AI systems.',

  // Open Graph
  ogTitle: 'Generative Engine Optimization - Knowbots Marketing',
  ogDescription: 'Master the future of search with Generative Engine Optimization. We help you create content that performs well in both traditional search engines and AI-driven systems.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/geo-hero.png`,
  ogUrl: () => `${siteUrl.value}/services/generative-engine-optimization/`,
  ogSiteName: 'Knowbots Marketing',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Generative Engine Optimization - Knowbots Marketing',
  twitterDescription: 'Optimize your content for both traditional search and AI-powered search experiences with our GEO services.',
  twitterImage: () => `${siteUrl.value}/images/geo-hero.png`,

  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});
</script>

<template>
  <GeoHero />
  <GeoFramework />
  <GeoPricing />
  <GeoContactForm />
</template>