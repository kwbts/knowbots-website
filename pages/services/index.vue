<script setup lang="ts">
import ServicesHero from '@/components/services/ServicesHero.vue';
import ServicesOverview from '@/components/services/ServicesCards.vue';
import ContactForm from '@/components/global/ContactForm.vue';
definePageMeta({
  isHeroSection: true,
});

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'Digital Marketing Services - Knowbots Marketing',
  description: 'Discover Knowbots Marketing’s full suite of digital marketing services. We blend tech and creativity to drive SEO, analytics, AI, and web innovation for growth.',

  // Open Graph
  ogTitle: 'Digital Marketing Services - Knowbots Marketing',
  ogDescription: 'Explore how Knowbots Marketing combines technical expertise and creative strategies to deliver SEO, AI, and digital growth solutions for businesses.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/serviceshero.png`,
  ogUrl: () => `${siteUrl.value}/`,
  ogSiteName: 'Knowbots Marketing',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Digital Marketing Services - Knowbots Marketing',
  twitterDescription: 'Blending tech and creativity, Knowbots Marketing offers SEO, AI, and web analytics services to accelerate your growth.',
  twitterImage: () => `${siteUrl.value}/images/serviceshero.png`,

  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});
</script>

<!-- services.vue -->
  <template>
    <ServicesHero />
    <Customers />
    <ServicesCards />
    <ContactForm />

  </template>