<!-- components/labs/reports/TotalPagesMetric.vue -->
<template>
    <div class="metric-container bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Number of Pages Analyzed</h3>
      
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
      
      <!-- Animated Counter -->
      <div class="flex items-center space-x-6">
        <div class="relative" style="min-width: 130px;">
          <div class="text-5xl font-bold text-transparent bg-clip-text" :class="getPlatformGradientClass()">
            <animated-number :value="getTotalPageCount()" :duration="1000" />
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Pages analyzed</div>
        </div>
        
        <!-- Small Page Analysis Graphic -->
        <div class="hidden md:block">
          <svg class="w-24 h-24 text-gray-400 dark:text-gray-600" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="15" y="20" width="70" height="60" rx="3" stroke-width="1.5" />
              <line x1="15" y1="35" x2="85" y2="35" stroke-width="1.5" />
              <line x1="25" y1="45" x2="75" y2="45" stroke-width="1" stroke-dasharray="2" />
              <line x1="25" y1="55" x2="75" y2="55" stroke-width="1" stroke-dasharray="2" />
              <line x1="25" y1="65" x2="65" y2="65" stroke-width="1" stroke-dasharray="2" />
              
              <!-- Highlighted Element -->
              <rect x="25" y="27" width="10" height="3" :stroke="getPlatformHighlightColor()" fill="none" stroke-width="1.5" />
              <rect x="45" y="27" width="25" height="3" :stroke="getPlatformHighlightColor()" fill="none" stroke-width="1.5" />
            </g>
          </svg>
        </div>
      </div>
      
      <!-- Content Type Distribution -->
      <div class="mt-6">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Content Type Distribution</div>
        <div class="flex items-center mb-2">
          <div class="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="flex">
              <div 
                class="h-4 bg-blue-600" 
                :style="`width: ${getContentTypePercentage('Blog', activePlatform)}%`"
              ></div>
              <div 
                class="h-4 bg-green-600" 
                :style="`width: ${getContentTypePercentage('Product', activePlatform)}%`"
              ></div>
              <div 
                class="h-4 bg-purple-600" 
                :style="`width: ${getContentTypePercentage('Documentation', activePlatform)}%`"
              ></div>
              <div 
                class="h-4 bg-burntOrangeDark" 
                :style="`width: ${getContentTypePercentage('Other', activePlatform)}%`"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 justify-between">
          <div class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-blue-600 mr-1"></span>
            Blog ({{ formatPercentage(getContentTypePercentage('Blog', activePlatform)) }})
          </div>
          <div class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-green-600 mr-1"></span>
            Product ({{ formatPercentage(getContentTypePercentage('Product', activePlatform)) }})
          </div>
          <div class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-purple-600 mr-1"></span>
            Docs ({{ formatPercentage(getContentTypePercentage('Documentation', activePlatform)) }})
          </div>
          <div class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-burntOrangeDark mr-1"></span>
            Other ({{ formatPercentage(getContentTypePercentage('Other', activePlatform)) }})
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  import AnimatedNumber from './utils/AnimatedNumber.vue';
  
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
  
  // Content type distribution presets by platform
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
  
  // Helper method to get platform-specific gradient text classes
  const getPlatformGradientClass = () => {
    return 'bg-gradient-to-r from-burntOrangeDark to-jasperOrange';
  };
  
  // Helper method to get platform-specific highlight color
  const getPlatformHighlightColor = () => {
    return '#C2410C'; // burntOrangeDark
  };
  
  // Format percentage value
  const formatPercentage = (value) => {
    if (value === undefined || value === null) return '0%';
    return Math.round(value) + '%';
  };
  
  // Get total page count (considering platform filter)
  const getTotalPageCount = () => {
    if (!props.reportData) {
      return 0;
    }
    
    // Use the total pages count from the report data
    if (props.reportData.total_pages) {
      if (activePlatform.value === 'all') {
        return props.reportData.total_pages;
      } else if (activePlatform.value === 'chatgpt') {
        // Return an estimate (45% of total) for the demo
        return Math.round(props.reportData.total_pages * 0.45);
      } else if (activePlatform.value === 'perplexity') {
        // Return an estimate (55% of total) for the demo
        return Math.round(props.reportData.total_pages * 0.55);
      }
    }
    
    return 0;
  };
  
  // Get percentage for a specific content type based on platform
  const getContentTypePercentage = (type, platform) => {
    const distribution = contentTypeDistribution[platform] || contentTypeDistribution.all;
    return distribution[type] || 0;
  };
  </script>
    
  <style scoped>
  .metric-container {
    min-height: 200px;
  }
  </style>