<!-- components/services/metrics/TechnicalSeoMetric.vue -->
<template>
    <div class="metric-container">
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Technical SEO for LLMs</h4>
      
      <!-- GEO Health Score -->
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <div class="flex justify-between mb-4">
          <h5 class="text-sm font-medium text-darkGray">GEO Health Score</h5>
          <span class="text-sm bg-blue-100 text-blue-800 py-0.5 px-2.5 rounded-full">74%</span>
        </div>
        
        <!-- GEO Health Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div class="bg-blue-500 h-2.5 rounded-full" style="width: 74%"></div>
        </div>
        
        <div class="text-xs text-gray-500 mb-4">Your site has good SEO foundations but needs GEO-specific improvements.</div>
        
        <!-- SEO Categories -->
        <div class="space-y-4">
          <div 
            v-for="(category, index) in seoCategories" 
            :key="index"
            class="cursor-pointer"
            @click="toggleCategory(category.id)"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-medium text-darkGray flex items-center">
                <svg class="w-5 h-5 mr-1" :class="getCategoryIconColor(category.score)" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path v-if="category.score > 85" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  <path v-else-if="category.score > 60" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 01-2 0V6a1 1 0 012 0v8z" clip-rule="evenodd"></path>
                  <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                {{ category.name }}
              </span>
              <span class="text-xs font-medium" :class="getCategoryTextColor(category.score)">{{ category.score }}%</span>
            </div>
            
            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div class="h-1.5 rounded-full" :class="getCategoryProgressClass(category.score)" :style="`width: ${category.score}%`"></div>
            </div>
            
            <!-- Issues list (toggled) -->
            <div v-if="expandedCategory === category.id" class="mt-2 text-xs text-gray-600 bg-white p-2 rounded-md border border-gray-200">
              <ul class="list-disc list-inside space-y-1">
                <li v-for="(issue, i) in category.issues" :key="i">
                  {{ issue }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Technical Recommendations -->
      <div>
        <h5 class="text-sm font-medium text-darkGray mb-2">Top Technical Recommendations</h5>
        <ul class="space-y-2 text-sm text-darkGray">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Implement JSON-LD Schema for more detailed context</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Improve page load speed for better crawlability</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Add FAQPage schema for direct query matches</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Fix broken external links to maintain authority signals</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const expandedCategory = ref(null);
  
  const seoCategories = [
    {
      id: 'schema',
      name: 'Structured Data Schema',
      score: 65,
      issues: [
        'Missing HowTo schema on tutorial pages',
        'Product schema missing offer details',
        'No FAQPage schema implemented'
      ]
    },
    {
      id: 'onpage',
      name: 'On-Page SEO',
      score: 82,
      issues: [
        'Improve heading hierarchy on service pages',
        'Add more descriptive alt text on images'
      ]
    },
    {
      id: 'tech',
      name: 'Technical Health',
      score: 92,
      issues: [
        'Minor improvements to XML sitemap structure'
      ]
    },
    {
      id: 'content',
      name: 'Content Quality',
      score: 63,
      issues: [
        'Increase word count on key landing pages',
        'Add more authoritative citations',
        'Improve readability scores (currently grade 12+)'
      ]
    },
    {
      id: 'links',
      name: 'Link Structure',
      score: 78,
      issues: [
        'Increase internal linking to product pages',
        'Fix 4 broken external links'
      ]
    }
  ];
  
  const toggleCategory = (id) => {
    if (expandedCategory === id) {
      expandedCategory.value = null;
    } else {
      expandedCategory.value = id;
    }
  };
  
  const getCategoryIconColor = (score) => {
    if (score > 85) return 'text-green-500';
    if (score > 60) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const getCategoryTextColor = (score) => {
    if (score > 85) return 'text-green-600';
    if (score > 60) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getCategoryProgressClass = (score) => {
    if (score > 85) return 'bg-green-500';
    if (score > 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  </script>
  
  <style scoped>
  .metric-container {
    min-height: 300px;
  }
  </style>