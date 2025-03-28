<script setup lang="ts">
import ContactHero from '~/components/contact/ContactHero.vue';
definePageMeta({
  isHeroSection: true,
});

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'Contact Us - Knowbots',
  description: 'Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let’s build something great together.',
  
  // Open Graph
  ogTitle: 'Contact Us - Knowbots',
  ogDescription: 'Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let’s build something great together.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/contact-form-hero.jpg`, // Replace with the correct image path if needed
  ogUrl: () => `${siteUrl.value}/`,
  ogSiteName: 'Knowbots',
  
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contact Us - Knowbots',
  twitterDescription: 'Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let’s build something great together.',
  twitterImage: () => `${siteUrl.value}/images/contact-form-hero.jpg`, // Replace with the correct image path
  
  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});

</script>

<!-- services.vue -->
  <template>
    <ContactHero />

  </template>