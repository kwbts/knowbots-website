<script setup>
import { ref, onMounted } from 'vue';
import { parseISO, format } from 'date-fns';
import { useNuxtApp } from '#imports';

const { $sanityClient, $urlFor } = useNuxtApp();

const blogs = ref([]);
const featuredBlog = ref(null);

const fetchBlogs = async () => {
  const query = `*[_type == "post"] | order(coalesce(publishedDate, publishedAt) desc) {
    _id,
    title,
    description,
    mainImage,
    "publishedDate": dateTime(coalesce(publishedDate, publishedAt)),
    slug
  }`;
  const allBlogs = await $sanityClient.fetch(query);

  if (allBlogs.length > 0) {
    featuredBlog.value = allBlogs[0];
    blogs.value = allBlogs.slice(1);
  } else {
    blogs.value = [];
  }
};

onMounted(() => {
  fetchBlogs();
});

const goToBlog = (slug) => {
  navigateTo(`/blog/${slug.current}/`);
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown date';

  try {
    const date = parseISO(dateStr);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Date parsing error:', error);
    return 'Invalid date';
  }
};

// Get the current origin/domain
const config = useRuntimeConfig()
const siteUrl = computed(() => config.public.siteUrl)

useSeoMeta({
  // Essential tags
  title: 'Insights & Innovations - The Knowbots Marketing Blog',
  description: 'Stay ahead with expert insights on SEO, AI, marketing technology, and growth strategies. Explore the Knowbots Marketing Blog for cutting-edge ideas and inspiration.',

  // Open Graph
  ogTitle: 'Insights & Innovations - The Knowbots Marketing Blog',
  ogDescription: 'Explore expert insights on SEO, AI innovation, and marketing technology. Discover strategies to drive growth with Knowbots Marketing.',
  ogType: 'website',
  ogImage: () => `${siteUrl.value}/images/blog-hero.png`, // Update with your blog hero image
  ogUrl: () => `${siteUrl.value}/blog/`,
  ogSiteName: 'Knowbots Marketing',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Insights & Innovations - The Knowbots Marketing Blog',
  twitterDescription: 'Discover expert insights, strategies, and ideas on SEO, AI, and marketing tech from Knowbots Marketing.',
  twitterImage: () => `${siteUrl.value}/images/blog-hero.png`, // Update with your blog hero image

  // Basic SEO controls
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
});
</script>

<template>
  <main class="flex-grow">
    <section
      v-if="featuredBlog"
      class="py-12 px-8 border-b border-gray-300 pt-36"
      :style="{ backgroundColor: 'rgba(244, 244, 244, 0.8)' }"
    >
      <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row">
        <!-- Image occupies 3/4 -->
        <div class="md:w-3/4">
          <NuxtLink :to="`/blog/${featuredBlog.slug.current}/`">
            <img
              v-if="featuredBlog.mainImage"
              :src="`${$urlFor(featuredBlog.mainImage).url()}/`"
              alt="Featured Blog Image"
              class="w-full h-full object-cover rounded-lg"
            />
          </NuxtLink>
        </div>
        <!-- Title, Date, and CTA occupies 1/4 -->
        <div class="md:w-1/4 md:pl-8 flex flex-col justify-center mt-4 md:mt-0">
          <h2 class="text-3xl font-semibold text-darkNavy font-heading mb-4">
            {{ featuredBlog.title }}
          </h2>
          <p class="text-sm text-darkGray font-body mb-6">
            {{ formatDate(featuredBlog.publishedDate) }}
          </p>
          <button
            @click="goToBlog(featuredBlog.slug)"
            class="bg-gray-100 text-darkNavy font-body py-2 px-4 rounded shadow hover:bg-charcoalGray hover:text-white transition-colors duration-300"
          >
            Read More
          </button>
        </div>
      </div>
    </section>

    <!-- Blog Grid Section -->
    <section class="py-12 px-8">
      <div
        class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        <div
          v-for="blog in blogs"
          :key="blog._id"
          class="bg-white border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg cursor-pointer"
        >
          <!-- Blog Image -->
          <NuxtLink :to="`/blog/${blog.slug.current}/`">
            <div class="w-full aspect-w-3 aspect-h-2 overflow-hidden rounded-t-lg">
              <img
                v-if="blog.mainImage"
                :src="$urlFor(blog.mainImage).url()"
                alt="Blog Image"
                class="w-full h-full object-cover"
              />
            </div>
          </NuxtLink>

          <!-- Blog Title and Date -->
          <div class="p-4">
            <h3 class="text-xl font-semibold text-darkNavy font-heading mb-2">
              {{ blog.title }}
            </h3>
            <p class="text-sm text-darkGray font-body">
              {{ formatDate(blog.publishedDate) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>