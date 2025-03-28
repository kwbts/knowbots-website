<script setup lang="ts">
import AboutHero from '~/components/about/AboutHero.vue';
import AboutDetails from '~/components/about/AboutDetails.vue';
import ContactForm from '~/components/global/ContactForm.vue';

definePageMeta({
  isHeroSection: true,
});

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'About Us - Knowbots Marketing - Growth Lab and Consultancy',
  description: 'Discover the story of Knowbots Marketing, where passion, innovation, and expertise in SEO, AI, and digital marketing fuel results for industry leaders.',

  // Open Graph
  ogTitle: 'About Us - Knowbots Marketing',
  ogDescription: 'Learn more about Knowbots Marketing: a boutique consultancy blending technical expertise, strategic content, and AI innovation to drive growth.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/about-knowbots.png`,
  ogUrl: () => `${siteUrl.value}/`,
  ogSiteName: 'Knowbots Marketing',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Us - Knowbots Marketing',
  twitterDescription: 'Explore the story of Knowbots Marketing, a consultancy delivering cutting-edge SEO, AI, and digital growth solutions.',
  twitterImage: () => `${siteUrl.value}/images/about-knowbots.png`,

  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});

</script>

<!-- about.vue -->
  <template>
    <AboutHero />
    <AboutDetails />
    <ContactForm />
    
  </template>