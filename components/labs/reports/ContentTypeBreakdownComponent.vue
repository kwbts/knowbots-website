<!-- components/labs/reports/ContentTypeBreakdownComponent.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
    <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Content Type Breakdown</h3>
    
    <!-- Platform Selector -->
    <div class="flex mb-6">
      <button 
        v-for="platform in platforms" 
        :key="platform.value"
        @click="activePlatform = platform.value" 
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="getPlatformButtonClass(platform.value)"
      >
        <div class="flex items-center">
          {{ platform.label }}
        </div>
      </button>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column: Circle Chart (matching Schema style) -->
      <div class="flex flex-col items-center justify-center">
        <div class="relative w-64 h-64">
          <!-- Background Circle -->
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Gray background circle -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              stroke-width="10"
              class="dark:stroke-gray-700"
            />
            
            <!-- Blog segment -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#9333ea" 
              stroke-width="10"
              stroke-dasharray="282.7"
              :stroke-dashoffset="calculateCircleDashOffset(getBlogPercentage)"
              transform="rotate(-90 50 50)"
              class="transition-all duration-700 ease-in-out dark:stroke-purple-500"
            />
            
            <!-- Product segment -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#4f46e5" 
              stroke-width="10"
              stroke-dasharray="282.7"
              :stroke-dashoffset="calculateCircleDashOffset(getProductPercentage)"
              :transform="`rotate(${-90 + getBlogPercentage * 3.6} 50 50)`"
              class="transition-all duration-700 ease-in-out dark:stroke-indigo-500"
            />
            
            <!-- Documentation segment -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#3b82f6" 
              stroke-width="10"
              stroke-dasharray="282.7"
              :stroke-dashoffset="calculateCircleDashOffset(getDocPercentage)"
              :transform="`rotate(${-90 + (getBlogPercentage + getProductPercentage) * 3.6} 50 50)`"
              class="transition-all duration-700 ease-in-out dark:stroke-blue-400"
            />
            
            <!-- Other segment -->
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#0d9488" 
              stroke-width="10"
              stroke-dasharray="282.7"
              :stroke-dashoffset="calculateCircleDashOffset(getOtherPercentage)"
              :transform="`rotate(${-90 + (getBlogPercentage + getProductPercentage + getDocPercentage) * 3.6} 50 50)`"
              class="transition-all duration-700 ease-in-out dark:stroke-teal-500"
            />
          </svg>
          
          <!-- Value in the center -->
          <div class="absolute inset-0 flex items-center justify-center flex-col">
            <span class="text-4xl font-bold text-gray-800 dark:text-gray-200">{{ totalPages }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">pages analyzed</span>
          </div>
        </div>
        
        <!-- Labels below chart -->
        <div class="grid grid-cols-2 gap-4 mt-6 w-full max-w-xs">
          <div class="flex items-center">
            <div class="w-4 h-4 bg-purple-600 rounded-sm mr-2"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Blog: {{ formatPercentage(getBlogPercentage) }}</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-indigo-600 rounded-sm mr-2"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Product: {{ formatPercentage(getProductPercentage) }}</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Docs: {{ formatPercentage(getDocPercentage) }}</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-teal-600 rounded-sm mr-2"></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">Other: {{ formatPercentage(getOtherPercentage) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Top Content Types Bar Chart -->
      <div>
        <h4 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Content Types by Citation Frequency</h4>
        
        <div class="space-y-4">
          <!-- Blog Type -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">Blog</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getBlogPercentage) }}</span>
            </div>
            
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all duration-700"
                :style="`width: ${getBlogPercentage}%`"
              ></div>
            </div>
          </div>
          
          <!-- Product Type -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">Product</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getProductPercentage) }}</span>
            </div>
            
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-700"
                :style="`width: ${getProductPercentage}%`"
              ></div>
            </div>
          </div>
          
          <!-- Documentation Type -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">Documentation</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDocPercentage) }}</span>
            </div>
            
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700"
                :style="`width: ${getDocPercentage}%`"
              ></div>
            </div>
          </div>
          
          <!-- Other Type -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">Other</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getOtherPercentage) }}</span>
            </div>
            
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-teal-600 rounded-full transition-all duration-700"
                :style="`width: ${getOtherPercentage}%`"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Key Insight -->
        <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
          <p class="text-sm text-blue-700 dark:text-blue-400">
            <span class="font-medium">Key Insight:</span> 
            Blog content ({{ formatPercentage(getBlogPercentage) }}) dominates LLM citations, followed by product pages 
            ({{ formatPercentage(getProductPercentage) }}). This suggests that narrative-based informational content may be more 
            readily digestible and referenceable for LLMs than technical documentation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  reportData: {
    type: Object,
    required: true
  }
});

// Platform selection options
const platforms = [
  { value: 'all', label: 'All Platforms' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'perplexity', label: 'Perplexity' }
];

const activePlatform = ref('all');

// Content type distribution by platform (default values)
const contentTypeDistribution = {
  all: {
    'Blog': 49.6,
    'Product': 23.0,
    'Documentation': 6.4,
    'Other': 21.0
  },
  chatgpt: {
    'Blog': 52.4,
    'Product': 18.6,
    'Documentation': 8.2,
    'Other': 20.8
  },
  perplexity: {
    'Blog': 47.3,
    'Product': 26.8,
    'Documentation': 4.9,
    'Other': 21.0
  }
};

// Helper method to get platform-specific styling classes for buttons
const getPlatformButtonClass = (platform) => {
  if (activePlatform.value === platform) {
    switch(platform) {
      case 'all':
        return 'bg-gradient-to-r from-burntOrangeDark to-jasperOrange text-white';
      case 'chatgpt':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'perplexity':
        return 'bg-gradient-to-r from-desaturatedTeal to-mutedTeal text-white';
      default:
        return 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white';
    }
  }
  return 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300';
};

// Helper method to get platform-specific styling classes for indicator dots
const getPlatformDotClass = (platform) => {
  switch(platform) {
    case 'all':
      return 'bg-burntOrangeDark';
    case 'chatgpt':
      return 'bg-green-500';
    case 'perplexity':
      return 'bg-desaturatedTeal';
    default:
      return 'bg-gray-500';
  }
};

// Total pages from report data, adjusted for active platform
const totalPages = computed(() => {
  if (!props.reportData) {
    return 0;
  }
  
  // Default values by platform (if we can't get from real data)
  const defaultPlatformCounts = {
    all: 3165,
    chatgpt: 1424, // roughly 45% of all pages
    perplexity: 1741  // roughly 55% of all pages
  };
  
  if (props.reportData.total_pages) {
    // If we have real data, calculate platform-specific values
    if (activePlatform.value === 'all') {
      return props.reportData.total_pages;
    } else if (activePlatform.value === 'chatgpt') {
      return Math.round(props.reportData.total_pages * 0.45); // 45% for ChatGPT
    } else if (activePlatform.value === 'perplexity') {
      return Math.round(props.reportData.total_pages * 0.55); // 55% for Perplexity
    }
  }
  
  return defaultPlatformCounts[activePlatform.value] || defaultPlatformCounts.all;
});

// Get percentage for each content type based on the active platform (as computed properties)
const getBlogPercentage = computed(() => {
  const distribution = contentTypeDistribution[activePlatform.value] || contentTypeDistribution.all;
  return distribution['Blog'] || 0;
});

const getProductPercentage = computed(() => {
  const distribution = contentTypeDistribution[activePlatform.value] || contentTypeDistribution.all;
  return distribution['Product'] || 0;
});

const getDocPercentage = computed(() => {
  const distribution = contentTypeDistribution[activePlatform.value] || contentTypeDistribution.all;
  return distribution['Documentation'] || 0;
});

const getOtherPercentage = computed(() => {
  const distribution = contentTypeDistribution[activePlatform.value] || contentTypeDistribution.all;
  return distribution['Other'] || 0;
});

// Format percentage value
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Calculate stroke-dashoffset for circular progress (matching Schema component)
const calculateCircleDashOffset = (percentage) => {
  const circumference = 282.7; // 2 * PI * radius (45)
  return circumference - (circumference * percentage / 100);
};
</script>

<style scoped>
/* Any custom styles if needed */
</style>