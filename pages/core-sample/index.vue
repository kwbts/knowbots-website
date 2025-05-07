<!-- pages/core-sample/index.vue -->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="pt-24 pb-16 px-4">
      <div class="max-w-[1140px] mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            GEO Core Sample Reports
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive analysis of how large language models cite and reference content across the web.
          </p>
        </div>

        <!-- Reports Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- May 2025 Report Card -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <div class="relative aspect-video bg-gray-100 dark:bg-gray-700">
              <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-burntOrangeDark to-jasperOrange text-white font-bold text-2xl">
                May 2025
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                May 2025 Core Sample
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Our inaugural core sample analyzing LLM citation patterns across 651 queries and 3,165 cited pages.
              </p>
              <div class="flex space-x-2 mb-6">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">ChatGPT</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Perplexity</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Citations</span>
              </div>
              <NuxtLink 
                to="/core-sample/may-2025/" 
                class="block w-full py-3 px-4 text-center bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md transition-colors duration-200"
              >
                View Report
              </NuxtLink>
            </div>
          </div>
          
          <!-- April 2025 Report Card (Coming Soon) -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 opacity-70">
            <div class="relative aspect-video bg-gray-100 dark:bg-gray-700">
              <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500 text-white font-bold text-2xl">
                April 2025
              </div>
              <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span class="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">Archive</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                April 2025 Core Sample
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Historical data from our preliminary analysis focusing on early GEO patterns.
              </p>
              <div class="flex space-x-2 mb-6">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">ChatGPT</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Citations</span>
              </div>
              <NuxtLink 
                to="/core-sample/april-2025/" 
                class="block w-full py-3 px-4 text-center bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-pointer"
              >
                View Archive
              </NuxtLink>
            </div>
          </div>
          
          <!-- June 2025 Report Card (Coming Soon) -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 opacity-70">
            <div class="relative aspect-video bg-gray-100 dark:bg-gray-700">
              <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500 text-white font-bold text-2xl">
                June 2025
              </div>
              <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span class="px-3 py-1 bg-green-800 text-white text-sm rounded-full">Coming Soon</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                June 2025 Core Sample
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Our upcoming analysis will feature expanded coverage including Claude and additional citation metrics.
              </p>
              <div class="flex space-x-2 mb-6">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">ChatGPT</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Perplexity</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Claude</span>
              </div>
              <button 
                disabled
                class="block w-full py-3 px-4 text-center bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-not-allowed"
              >
                Coming June 15
              </button>
            </div>
          </div>
        </div>
        
        <!-- Subscription Banner -->
        <div class="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Stay Updated</h2>
              <p class="text-gray-600 dark:text-gray-300">
                Subscribe to receive notifications when new core sample reports are published.
              </p>
            </div>
            <div class="w-full md:w-auto">
              <NuxtLink 
                to="/contact"
                class="block w-full md:w-auto py-3 px-6 text-center bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md transition-colors duration-200"
              >
                Subscribe for Updates
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Methodology Section -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Methodology</h2>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div class="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Our GEO Core Sample reports analyze how large language models cite and reference web content. We examine domain metrics, technical factors, content quality, and more to identify patterns that can help optimize content for AI visibility.
              </p>
              <p>
                Each report follows a consistent methodology:
              </p>
              <ol class="list-decimal ml-6 space-y-2">
                <li>Generating diverse queries across multiple sectors and intent types</li>
                <li>Collecting responses from multiple LLM platforms</li>
                <li>Extracting and analyzing citation URLs</li>
                <li>Evaluating page content, technical characteristics, and domain metrics</li>
                <li>Identifying patterns and optimization opportunities</li>
              </ol>
              <p class="mt-4">
                While our methodology is rigorous, this field is rapidly evolving. We encourage you to use these reports as starting points for your own testing and optimization efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-500 py-6">
      <div class="max-w-[1140px] mx-auto px-4 text-center">
        <p>© {{ new Date().getFullYear() }} Knowbots Marketing | GEO Analysis Reports</p>
        <p class="mt-2">These reports analyze LLM citation behavior for educational purposes.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default', // Use the default layout with navigation
});

// Add SEO metadata
useSeoMeta({
  title: 'GEO Core Sample Reports | LLM Citation Analysis | Knowbots',
  description: 'Explore our library of Generative Engine Optimization (GEO) core sample reports analyzing how LLMs like ChatGPT, Perplexity, and Claude cite web content.',
  ogTitle: 'GEO Core Sample Reports | LLM Citation Analysis',
  ogDescription: 'Monthly analysis of LLM citation patterns to help optimize content for AI visibility and discovery.',
  ogType: 'website',
});
</script>