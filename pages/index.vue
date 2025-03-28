<script setup lang="ts">
import Customers from '@/components/global/Customers.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeValueProps from '@/components/home/HomeValueProps.vue';
import HomeServices from '@/components/home/HomeServices.vue';
import ContactForm from '@/components/global/ContactForm.vue';

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'Knowbots Marketing - Growth Lab and Consultancy',
  description: 'Explore the future of digital marketing with Knowbots Marketing. From SEO to AI, we accelerate growth with innovative strategies and technical expertise.',

  // Open Graph
  ogTitle: 'Knowbots Marketing - Growth Lab and Consultancy',
  ogDescription: 'Knowbots Marketing combines SEO, AI innovation, and tech-driven strategies to accelerate growth for industry leaders.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/homepage-hero.png`,
  ogUrl: () => `${siteUrl.value}/`,
  ogSiteName: 'Knowbots Marketing',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Knowbots Marketing - Growth Lab and Consultancy',
  twitterDescription: 'Explore the future of digital marketing with Knowbots Marketing. From SEO to AI, we deliver cutting-edge solutions for growth.',
  twitterImage: () => `${siteUrl.value}/images/homepage-hero.png`,

  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});

definePageMeta({
  isHeroSection: true,
});

</script>

<!-- index.vue -->
  <template>
    <HomeHero />
    <Customers />
    <HomeValueProps />
    <HomeServices />
    <ContactForm />

  </template>