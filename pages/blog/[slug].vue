<!-- knowbots pages/blog/[slug].vue -->

<script setup>
import { parseISO, format } from 'date-fns';
import { useRoute, useAsyncData, useNuxtApp } from '#imports';
import { useBlogSchema } from '@/composables/useBlogSchema';

// Access the provided sanityClient and urlFor
const { $sanityClient, $urlFor } = useNuxtApp();

// Get the current route and slug
const route = useRoute();
const slug = route.params.slug || '';

// Fetch blog post data using useAsyncData (no client-side refreshing)
const {
  data: blogPost,
  pending: isLoading,
  error
} = await useAsyncData(`blog-post-${slug}`, () =>
  $sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "publishedDate": dateTime(coalesce(publishedDate, publishedAt)),
      lastModified,
      mainImage{
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt,
        imageType
      },
      "author": author->{
        name,
        jobTitle,
        "slug": slug,
        bio,
        image{
          asset->{
            _id,
            url
          }
        },
        socialProfiles[]{
          platform,
          url
        }
      },
      categories[]->{
        title
      },
      content[] {
        ...,
        // For images in content blocks, fetch dimensions
        _type == "media" => {
          ...,
          image {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            },
            alt,
            imageType
          }
        }
      },
      seoTitle,
      seoDescription,
      description
    }`,
    { slug }
  ),
  { 
    fresh: true,
    server: true  // Only fetch on server, no client-side refreshing
  }
);

// Fetch recent posts excluding the current one
const {
  data: recentPosts,
  pending: recentPostsLoading,
  error: recentPostsError
} = await useAsyncData(`recent-posts-exclude-${slug}`, () =>
  $sanityClient.fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      "publishedDate": dateTime(coalesce(publishedDate, publishedAt)),
      mainImage{
        asset->{
          _id,
          url
        },
        alt,
        imageType
      }
    }`,
    { slug }
  ),
  {
    fresh: true,
    server: true  // Only fetch on server
  }
);

// Format date with fallback
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

// Helper function to determine image display class based on image type or dimensions
const getImageDisplayClass = (image) => {
  if (!image) return 'image-full-width';
  
  // If imageType is explicitly set, use that
  if (image.imageType) {
    switch (image.imageType) {
      case 'hero': return 'image-hero';
      case 'banner': return 'image-banner';
      case 'screenshot': return 'image-screenshot';
      case 'midjourney': return 'image-midjourney';
      case 'inline': return 'image-inline';
      default: return 'image-default';
    }
  }
  
  // Otherwise try to determine based on dimensions
  const dimensions = image.asset?.metadata?.dimensions;
  if (dimensions) {
    const aspectRatio = dimensions.width / dimensions.height;
    
    // Identify common aspect ratios
    if (aspectRatio >= 1.7 && aspectRatio <= 1.8) {
      return 'image-hero'; // 16:9 ratio
    } else if (aspectRatio >= 2.2 && aspectRatio <= 2.3) {
      return 'image-midjourney'; // 9:4 ratio
    } else if (aspectRatio < 1.5 && dimensions.width < 800) {
      return 'image-screenshot'; // Narrower, smaller images
    }
  }
  
  // Default behavior
  return 'image-default';
};

// Helper to get correct image size parameters based on image type
const getImageParameters = (image, isMainImage = false) => {
  const imageClass = getImageDisplayClass(image);
  let width, height, fit;
  
  switch (imageClass) {
    case 'image-hero':
      width = 1200;
      height = 675; // 16:9 ratio
      fit = 'max';
      break;
    case 'image-midjourney':
      width = 1200;
      height = 540; // 9:4 ratio
      fit = 'max';
      break;
    case 'image-screenshot':
      width = 800;
      height = undefined;
      fit = 'max';
      break;
    case 'image-inline':
      width = 600;
      height = undefined;
      fit = 'max';
      break;
    default:
      width = isMainImage ? 1200 : 800;
      height = undefined;
      fit = 'max';
  }
  
  const urlForBuilder = $urlFor(image.asset);
  if (width) urlForBuilder.width(width);
  if (height) urlForBuilder.height(height);
  if (fit) urlForBuilder.fit(fit);
  
  return {
    url: urlForBuilder.url(),
    class: imageClass
  };
};

// Map block types to components
import HeaderBlock from '@/components/blog/HeaderBlock.vue';
import ParagraphBlock from '@/components/blog/ParagraphBlock.vue';
import MediaBlock from '@/components/blog/MediaBlock.vue';
import QuoteBlock from '@/components/blog/QuoteBlock.vue';
import TableBlock from '@/components/blog/TableBlock.vue';
import SpacerBlock from '@/components/blog/SpacerBlock.vue';

// Helper function to get the component for a block
const blockComponents = {
  header: HeaderBlock,
  paragraph: ParagraphBlock,
  media: MediaBlock,
  quote: QuoteBlock,
  table: TableBlock,
  spacer: SpacerBlock,
};

const getBlockComponent = (blockType) => {
  return blockComponents[blockType] || null;
};

// Set up SEO meta tags
useSeoMeta({
  title: () => blogPost.value?.seoTitle || `${blogPost.value?.title} - Knowbots`,
  description: () => blogPost.value?.seoDescription || blogPost.value?.description,
  
  // Open Graph
  ogTitle: () => blogPost.value?.seoTitle || blogPost.value?.title,
  ogDescription: () => blogPost.value?.seoDescription || blogPost.value?.description,
  ogImage: () => blogPost.value?.ogImage?.asset?.url || blogPost.value?.mainImage?.asset?.url,
  ogType: 'article',
  
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: () => blogPost.value?.seoTitle || blogPost.value?.title,
  twitterDescription: () => blogPost.value?.seoDescription || blogPost.value?.description,
  twitterImage: () => blogPost.value?.ogImage?.asset?.url || blogPost.value?.mainImage?.asset?.url,
  
  // Article specific
  articlePublishedTime: () => blogPost.value?.publishedDate,
  articleModifiedTime: () => blogPost.value?.lastModified,
  articleAuthor: () => blogPost.value?.author?.name,
})

// Use the blog schema composable
const { createBlogPostSchema } = useBlogSchema();

// Create a computed property for the schema.org JSON-LD data
const blogSchema = computed(() => {
  if (!blogPost.value) return null;
  
  // Define company/website social profiles
  const companyInfo = {
    socialProfiles: [
      // Company social profiles
      { platform: 'LinkedIn Company', url: 'https://www.linkedin.com/company/knowbots-marketing/' }, // Your company LinkedIn
      { platform: 'Website', url: 'https://www.knowbots.ca' },
      // Add more company social profiles as needed
    ],
    authorProfiles: [
      // Personal author profiles (when you're the author)
      { platform: 'LinkedIn Personal', url: 'https://www.linkedin.com/in/jontaylor85/' }, // Your personal LinkedIn
      // Add more personal profiles as needed
      // { platform: 'Twitter', url: 'https://twitter.com/yourusername' },
      // { platform: 'GitHub', url: 'https://github.com/yourusername' },
    ]
  };
  
  // Create schema using the composable
  return createBlogPostSchema(blogPost.value, {
    urlFor: $urlFor,
    defaultImagePath: '/images/knowbots-default.jpg',
    defaultAuthor: 'Knowbots',
    companyInfo: companyInfo
  });
});

// Use Nuxt's useHead to add the schema to the page
useHead({
  script: computed(() => {
    if (!blogSchema.value) return [];
    
    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(blogSchema.value)
      }
    ];
  })
});
</script>

<template>
  <main class="flex-grow">
    <!-- Existing Blog Content -->
    <section class="bg-offWhiteBackground py-16 px-8 pt-24">
      <div class="max-w-screen-lg mx-auto px-20 blog-content">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center">
          <p class="text-lg text-gray-500">Loading...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-red-500">{{ error.message }}</p>
        </div>

        <!-- Content -->
        <div v-else-if="blogPost">
          <!-- Blog Image -->
          <div v-if="blogPost.mainImage" class="mb-4">
            <div :class="getImageDisplayClass(blogPost.mainImage)">
              <img
                :src="getImageParameters(blogPost.mainImage, true).url"
                :alt="blogPost.mainImage.alt || 'Blog Image'"
                class="image-responsive"
              />
            </div>
          </div>

          <!-- Author and Published Date -->
          <div class="flex flex-col sm:flex-row sm:space-x-16">
            <!-- Written by Author -->
            <div class="mb-4 sm:mb-0 tight-spacing">
              <p class="text-sm text-darkGray font-body font-bold mb-1">Written by</p>
              <p class="text-sm text-darkGray font-body">
                {{ blogPost.author?.name || 'Unknown Author' }}
              </p>
            </div>

            <!-- Published on Date -->
            <div class="tight-spacing">
              <p class="text-sm text-darkGray font-body font-bold mb-1">Published on</p>
              <p class="text-sm text-darkGray font-body">
                {{ formatDate(blogPost.publishedDate) }}
              </p>
            </div>
          </div>
          <hr class="custom-hr" />

          <!-- Blog Title -->
          <h1>
            {{ blogPost.title }}
          </h1>

          <!-- Modular Content -->
          <div v-if="blogPost.content && blogPost.content.length">
            <component
              v-for="(block, index) in blogPost.content"
              :is="getBlockComponent(block._type) || 'div'"
              :key="block._key || index"
              :value="block"
              :getImageDisplayClass="getImageDisplayClass"
              :getImageParameters="getImageParameters"
            >
              <!-- Fallback for unsupported block types -->
              <template v-if="!getBlockComponent(block._type)">
                <p class="text-red-500">Unsupported block type: {{ block._type }}</p>
              </template>
            </component>
          </div>
        </div>

        <!-- No Post Found -->
        <div v-else class="text-center">
          <p class="text-lg text-gray-500">No blog post found.</p>
        </div>
      </div>
    </section>

    <!-- Read More Section -->
    <section class="bg-brownBackground py-8 px-8 border-b-2 border-gray-150">
      <div class="max-w-screen-lg mx-auto read-more-section px-12 text-center pb-8">
        <h2 class="text-2xl font-bold mb-6 text-darkNavy">Read More</h2>

        <!-- Loading State -->
        <div v-if="recentPostsLoading" class="text-center">
          <p class="text-lg text-gray-500">Loading recent posts...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="recentPostsError" class="text-center">
          <p class="text-lg text-red-500">{{ recentPostsError.message }}</p>
        </div>

        <!-- Recent Posts Grid -->
        <div v-else-if="recentPosts && recentPosts.length">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              v-for="post in recentPosts"
              :key="post._id"
              class="post-card hover:shadow-2xl hover:shadow-black border-solid border border-gray-300 transition duration-200 ease-in-out"
            >
              <!-- Post Image -->
              <NuxtLink :to="`/blog/${post.slug.current}/`">
                <img
                  :src="$urlFor(post.mainImage.asset).width(600).height(400).fit('crop').url()"
                  :alt="post.mainImage.alt || post.title"
                  class="w-full h-48 object-cover rounded-t-lg"
                />
              </NuxtLink>

              <!-- Post Details -->
              <div class="p-4">
                <NuxtLink :to="`/blog/${post.slug.current}/`">
                  <h3 class="text-xl font-semibold text-darkNavy mb-2 hover:text-burntOrange transition-colors duration-200">
                    {{ post.title }}
                  </h3>
                </NuxtLink>
                <p class="text-sm text-darkGray">
                  {{ formatDate(post.publishedDate) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- No Recent Posts Found -->
        <div v-else class="text-center">
          <p class="text-lg text-gray-500">No recent posts available.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Heading Styles within blog-content */
.blog-content :deep(h1) {
  @apply text-5xl text-darkNavy mb-6 font-body;
}

.blog-content :deep(h2) {
  @apply text-4xl text-darkNavy mb-5 font-body;
}

.blog-content :deep(h3) {
  @apply text-3xl text-darkNavy mb-4 font-body;
}

.blog-content :deep(h4) {
  @apply text-2xl font-medium text-darkNavy mb-3 font-body;
}

.blog-content :deep(h5) {
  @apply text-xl font-medium text-darkNavy mb-2 font-body;
}

.blog-content :deep(h6) {
  @apply text-lg font-medium text-darkNavy mb-2 font-body;
}

/* Paragraph Styles within blog-content */
.blog-content :deep(p) {
  @apply text-xl text-darkGray font-bodyAlt mb-4 leading-9;
}

/* Unordered List Styles within blog-content */
.blog-content :deep(ul) {
  @apply list-disc pl-5 text-lg text-darkGray font-body mb-4;
}

/* Ordered List Styles within blog-content */
.blog-content :deep(ol) {
  @apply list-decimal pl-5 text-lg text-darkGray font-body mb-4;
}

/* List Item Styles within blog-content */
.blog-content :deep(li) {
  @apply mb-2;
}

/* Optional: Nested Lists Indentation */
.blog-content :deep(ul ul),
.blog-content :deep(ol ol),
.blog-content :deep(ul ol),
.blog-content :deep(ol ul) {
  @apply pl-4;
}

/* Table Styles within blog-content */
.blog-content :deep(table) {
  @apply w-full border-collapse mb-4;
}

.blog-content :deep(th),
.blog-content :deep(td) {
  @apply border border-gray-300 px-4 py-2;
}

/* Highlight table row on hover */
.blog-content :deep(tr:hover) {
  @apply bg-gray-100;
}

/* Quote Styles within blog-content */
.blog-content :deep(blockquote) {
  @apply pl-5 border-l-4 border-burntOrange italic my-4 ml-8;
}

/* Paragraph inside blockquote */
.blog-content :deep(blockquote p) {
  @apply text-xl text-warmBrown;
}

.tight-spacing > p {
  margin-bottom: 0rem; /* Adjust as needed */
}

.custom-hr {
  border: 0; /* Remove default border */
  height: 1px; /* Set the thickness */
  background-color: #53352F; 
  margin: 1.5rem 0 2rem 0; /* Add vertical spacing */
}

/* Base responsive image styles */
.image-responsive {
  border-radius: 0.5rem;
  width: 100%;
  height: auto;
}

/* Different image container types */
.image-hero {
  width: 100%;
  margin: 0 auto 2rem;
}

.image-banner, .image-midjourney {
  width: 100%;
  margin: 1.5rem auto;
}

.image-screenshot {
  max-width: 800px;
  margin: 1.5rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.image-inline {
  max-width: 600px;
  margin: 1rem auto;
  display: block;
}

.image-default {
  width: 100%;
  margin: 1.5rem auto;
}

/* Center smaller images */
.image-screenshot, .image-inline {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.read-more-section h2 {
  @apply text-3xl font-bold mb-6 text-darkNavy font-body;
}

.post-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200;
}

.post-card img {
  @apply w-full h-48 object-cover rounded-t-lg;
}

.post-card h3 {
  @apply text-xl font-semibold text-darkNavy mb-2 hover:text-burntOrange transition-colors duration-200;
}

.post-card p {
  @apply text-sm text-darkGray;
}

.blog-content :deep(a) {
  color: #1a0dab; /* Classic blue link color */
  text-decoration: underline;
  font-weight: 500; /* Slightly bolder for better visibility */
  transition: color 0.2s ease-in-out; /* Smooth transition for hover effect */
}

.blog-content :deep(a:hover),
.blog-content :deep(a:focus) {
  color: #c61a09; /* Red shade for hover or focus state */
  text-decoration: underline;
}

/* Media queries for responsive display */
@media (max-width: 768px) {
  .image-screenshot, .image-inline {
    max-width: 100%;
  }
}
.blog-content :deep(img) {
  border-radius: 0.5rem;
  object-fit: cover;
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Center all captions */
.blog-content :deep(p:has(+ img)),
.blog-content :deep(p:has(img ~ *)),
.blog-content :deep(figcaption),
.blog-content :deep(.caption-text),
.blog-content :deep(.image-caption) {
  text-align: center;
  width: 100%;
  font-style: italic;
  color: #4A4A4A;
  font-size: 0.875rem;
}

/* Different image container types */
.image-hero,
.image-banner,
.image-midjourney,
.image-screenshot,
.image-inline,
.image-default {
  width: 100%;
  text-align: center;
  margin: 1.5rem auto;
}

/* More specific container styles */
.image-screenshot {
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.image-inline {
  max-width: 600px;
}
</style>