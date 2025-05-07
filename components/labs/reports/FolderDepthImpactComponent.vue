<!-- components/labs/reports/FolderDepthImpactComponent.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
    <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Folder Depth Impact</h3>
    
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
    
    <!-- Bar Chart for Folder Depth -->
    <div class="mb-6">
      <div class="space-y-4">
        <!-- Depth 1 (Root) -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Root (/)</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDepthPercentage(0)) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-700"
              :style="`width: ${getDepthPercentage(0)}%`"
            ></div>
          </div>
        </div>
        
        <!-- Depth 2 -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Depth 1 (e.g., /products)</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDepthPercentage(1)) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700"
              :style="`width: ${getDepthPercentage(1)}%`"
            ></div>
          </div>
        </div>
        
        <!-- Depth 3 -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Depth 2 (e.g., /products/category)</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDepthPercentage(2)) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-blue-400 rounded-full transition-all duration-700"
              :style="`width: ${getDepthPercentage(2)}%`"
            ></div>
          </div>
        </div>
        
        <!-- Depth 4 -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Depth 3 (e.g., /products/category/item)</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDepthPercentage(3)) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-indigo-400 rounded-full transition-all duration-700"
              :style="`width: ${getDepthPercentage(3)}%`"
            ></div>
          </div>
        </div>
        
        <!-- Depth 5+ -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Depth 4+ (Deeper paths)</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDepthPercentage(4)) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-purple-400 rounded-full transition-all duration-700"
              :style="`width: ${getDepthPercentage(4)}%`"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Metrics Grid -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">Most Cited Depth</div>
        <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {{ getMostCitedDepth() }}
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">Average URL Depth</div>
        <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {{ getAverageDepth() }}
        </div>
      </div>
    </div>
    
    <!-- Key Insight -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
      <p class="text-sm text-blue-700 dark:text-blue-400">
        <span class="font-medium">Key Insight:</span> 
        {{ getDepthInsight() }}
      </p>
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

// Folder depth distribution by platform (default values)
const folderDepthDistribution = {
  all: {
    0: 12.8, // Root level
    1: 35.6, // First segment
    2: 28.4, // Second segment
    3: 17.2, // Third segment
    4: 6.0   // Fourth+ segments
  },
  chatgpt: {
    0: 14.2,
    1: 38.5,
    2: 26.1,
    3: 15.7,
    4: 5.5
  },
  perplexity: {
    0: 11.6,
    1: 33.2,
    2: 30.5,
    3: 18.4,
    4: 6.3
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

// Format percentage value
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Get percentage for each folder depth based on the active platform
const getDepthPercentage = (depth) => {
  const distribution = folderDepthDistribution[activePlatform.value] || folderDepthDistribution.all;
  return distribution[depth] || 0;
};

// Helper to get the depth level with most citations
const getMostCitedDepth = () => {
  const distribution = folderDepthDistribution[activePlatform.value] || folderDepthDistribution.all;
  let maxDepth = 0;
  let maxValue = 0;
  
  for (const [depth, value] of Object.entries(distribution)) {
    if (value > maxValue) {
      maxValue = value;
      maxDepth = Number(depth);
    }
  }
  
  // Convert depth to readable format
  if (maxDepth === 0) return 'Root (/)';
  return `Depth ${maxDepth}`;
};

// Calculate the average depth (weighted average)
const getAverageDepth = () => {
  const distribution = folderDepthDistribution[activePlatform.value] || folderDepthDistribution.all;
  let total = 0;
  let weightedSum = 0;
  
  for (const [depth, value] of Object.entries(distribution)) {
    total += value;
    weightedSum += Number(depth) * value;
  }
  
  if (total === 0) return '0';
  return (Math.round((weightedSum / total) * 10) / 10).toFixed(1);
};

// Get insight text based on platform
const getDepthInsight = () => {
  const platform = activePlatform.value;
  const mostCited = getMostCitedDepth();
  const avgDepth = getAverageDepth();
  
  if (platform === 'all') {
    return `URLs with ${mostCited} are most frequently cited (${formatPercentage(getDepthPercentage(1))}), with an average depth of ${avgDepth}. This suggests that first-level content is most accessible to LLMs, while still providing sufficient topic context compared to root pages.`;
  } else if (platform === 'chatgpt') {
    return `ChatGPT seems to favor ${mostCited} URLs (${formatPercentage(getDepthPercentage(1))}), slightly more than other platforms. This may indicate a preference for broader category-level content rather than highly specific deep pages.`;
  } else if (platform === 'perplexity') {
    return `Perplexity shows a more balanced distribution across depths, with stronger representation of depth 2 content (${formatPercentage(getDepthPercentage(2))}) compared to other platforms, suggesting it may access more specific content.`;
  }
  
  return "URL depth analysis shows that first and second-level paths receive the most citations across platforms.";
};
</script>

<style scoped>
/* Any custom styles if needed */
</style>