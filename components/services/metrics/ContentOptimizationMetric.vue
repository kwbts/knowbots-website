<!-- components/services/metrics/ContentOptimizationMetric.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Content Optimization</h4>
    
    <!-- Content Type Selector -->
    <div class="mb-4 flex space-x-2">
      <button 
        @click="activeContentType = 'blog'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activeContentType === 'blog' ? 'bg-burntOrangeDark text-white' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        Blog Content
      </button>
      <button 
        @click="activeContentType = 'product'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activeContentType === 'product' ? 'bg-burntOrangeDark text-white' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        Product Pages
      </button>
    </div>
    
    <!-- Content Optimization Metrics -->
    <div class="bg-gray-50 p-4 rounded-lg mb-4">
      <!-- Metrics Header -->
      <div class="flex justify-between mb-3">
        <span class="text-sm font-medium text-darkGray">Optimization Metrics</span>
        <span class="text-sm font-medium text-darkGray">{{ activeContentType === 'blog' ? 'Blog Content' : 'Product Pages' }}</span>
      </div>
      
      <!-- Blog Content Metrics -->
      <div v-if="activeContentType === 'blog'">
        <div class="space-y-4">
          <!-- Citation Potential Score -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Citation Potential Score</span>
              <span class="text-sm font-medium text-green-600">74/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-green-500 rounded-full" style="width: 74%"></div>
            </div>
          </div>
          
          <!-- Content Structure Score -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Content Structure Score</span>
              <span class="text-sm font-medium text-yellow-500">68/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-yellow-500 rounded-full" style="width: 68%"></div>
            </div>
          </div>
          
          <!-- Entity Recognition -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Entity Recognition</span>
              <span class="text-sm font-medium text-green-600">82/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-green-500 rounded-full" style="width: 82%"></div>
            </div>
          </div>
          
          <!-- Citation-Ready Statements -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Citation-Ready Statements</span>
              <span class="text-sm font-medium text-red-500">52/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-red-500 rounded-full" style="width: 52%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Pages Metrics -->
      <div v-else>
        <div class="space-y-4">
          <!-- Citation Potential Score -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Citation Potential Score</span>
              <span class="text-sm font-medium text-yellow-500">61/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-yellow-500 rounded-full" style="width: 61%"></div>
            </div>
          </div>
          
          <!-- Unique Value Proposition -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Unique Value Proposition</span>
              <span class="text-sm font-medium text-red-500">48/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-red-500 rounded-full" style="width: 48%"></div>
            </div>
          </div>
          
          <!-- Technical Detail Clarity -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Technical Detail Clarity</span>
              <span class="text-sm font-medium text-green-600">77/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-green-500 rounded-full" style="width: 77%"></div>
            </div>
          </div>
          
          <!-- Comparative Analysis -->
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-darkGray">Comparative Analysis</span>
              <span class="text-sm font-medium text-yellow-500">58/100</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-yellow-500 rounded-full" style="width: 58%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Optimization Recommendations -->
    <div>
      <h5 class="text-sm font-medium text-darkGray mb-2">Top Improvement Opportunities</h5>
      <div class="bg-white p-3 rounded-lg border border-gray-200 text-sm">
        <ul class="space-y-2">
          <li v-if="activeContentType === 'blog'" class="flex items-start">
            <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-2">
              <span class="text-red-600 text-xs">!</span>
            </div>
            <p class="text-darkGray">
              <span class="font-medium">Add more citation-ready statements</span> - Include 3-5 clear, data-driven statements that can be easily cited by AI systems.
            </p>
          </li>
          <li v-if="activeContentType === 'blog'" class="flex items-start">
            <div class="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-2">
              <span class="text-yellow-600 text-xs">!</span>
            </div>
            <p class="text-darkGray">
              <span class="font-medium">Improve content structure</span> - Add more descriptive H2 and H3 headings that match common search queries.
            </p>
          </li>
          <li v-if="activeContentType === 'product'" class="flex items-start">
            <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-2">
              <span class="text-red-600 text-xs">!</span>
            </div>
            <p class="text-darkGray">
              <span class="font-medium">Strengthen unique value propositions</span> - Make product differentiation more explicit with direct comparisons and unique benefits.
            </p>
          </li>
          <li v-if="activeContentType === 'product'" class="flex items-start">
            <div class="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-2">
              <span class="text-yellow-600 text-xs">!</span>
            </div>
            <p class="text-darkGray">
              <span class="font-medium">Enhance comparative analysis</span> - Add more direct, but factual comparisons with competitor products or industry standards.
            </p>
          </li>
          <li class="flex items-start">
            <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-2">
              <span class="text-green-600 text-xs">✓</span>
            </div>
            <p class="text-darkGray">
              <span class="font-medium">Great {{ activeContentType === 'blog' ? 'entity recognition' : 'technical detail clarity' }}</span> - Continue mentioning specific products, technologies, and key terms to maintain good performance in this area.
            </p>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Expected Impact -->
    <div class="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
      <h5 class="font-medium text-blue-800 mb-1">Expected Impact</h5>
      <p class="text-sm text-blue-700">
        {{ activeContentType === 'blog' ? 
          'Implementing these recommendations could increase your blog citation rate by 45-60% within 60 days.' : 
          'Optimizing product pages could increase product mentions in recommendation queries by 35-50% within 90 days.'
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeContentType = ref('blog');
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>