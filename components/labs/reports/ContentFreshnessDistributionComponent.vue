<!-- components/labs/reports/ContentFreshnessDistributionComponent.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
    <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Content Freshness Distribution</h3>
    
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
    
    <!-- Bar Chart for Content Freshness -->
    <div class="mb-6">
      <div class="space-y-4">
        <!-- Most Recent: 0-30 days -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">0-30 days</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('0-30')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('0-30')}%`"
            ></div>
          </div>
        </div>
        
        <!-- 1-3 months -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">1-3 months</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('1-3')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('1-3')}%`"
            ></div>
          </div>
        </div>
        
        <!-- 3-6 months -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">3-6 months</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('3-6')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('3-6')}%`"
            ></div>
          </div>
        </div>
        
        <!-- 6-12 months -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">6-12 months</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('6-12')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('6-12')}%`"
            ></div>
          </div>
        </div>
        
        <!-- 1+ years -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">1+ years</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('1+')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-purple-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('1+')}%`"
            ></div>
          </div>
        </div>
        
        <!-- Unknown Date -->
        <div class="space-y-1">
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">Unknown Date</span>
            <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getFreshnessPercentage('unknown')) }}</span>
          </div>
          <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 left-0 h-full bg-gray-500 rounded-full transition-all duration-700"
              :style="`width: ${getFreshnessPercentage('unknown')}%`"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Metrics Grid -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">Content Age Median</div>
        <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {{ getMedianAge() }}
        </div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">Recent Content %</div>
        <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {{ formatPercentage(getRecentContentPercentage()) }}
        </div>
      </div>
    </div>
    
    <!-- Key Insight -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
      <p class="text-sm text-blue-700 dark:text-blue-400">
        <span class="font-medium">Key Insight:</span> 
        {{ getFreshnessInsight() }}
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

// Content freshness distribution by platform (default values)
const contentFreshnessDistribution = {
  all: {
    '0-30': 18.2,   // 0-30 days
    '1-3': 22.6,    // 1-3 months
    '3-6': 16.9,    // 3-6 months
    '6-12': 12.4,   // 6-12 months
    '1+': 9.8,      // 1+ years
    'unknown': 20.1 // Unknown/blank dates
  },
  chatgpt: {
    '0-30': 21.5,
    '1-3': 24.7,
    '3-6': 14.2,
    '6-12': 10.8,
    '1+': 8.3,
    'unknown': 20.5
  },
  perplexity: {
    '0-30': 15.3,
    '1-3': 20.9,
    '3-6': 19.2,
    '6-12': 13.8,
    '1+': 11.1,
    'unknown': 19.7
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

// Get percentage for each freshness category based on the active platform
const getFreshnessPercentage = (category) => {
  const distribution = contentFreshnessDistribution[activePlatform.value] || contentFreshnessDistribution.all;
  return distribution[category] || 0;
};

// Get median age bracket for content
const getMedianAge = () => {
  const platform = activePlatform.value;
  // This is a simplified approach - in a real implementation
  // you would calculate the true median from raw data
  const medianMap = {
    'all': '2.8 months',
    'chatgpt': '2.3 months',
    'perplexity': '3.2 months'
  };
  
  return medianMap[platform] || medianMap.all;
};

// Calculate percentage of recent content (< 3 months)
const getRecentContentPercentage = () => {
  const distribution = contentFreshnessDistribution[activePlatform.value] || contentFreshnessDistribution.all;
  return (distribution['0-30'] || 0) + (distribution['1-3'] || 0);
};

// Get insight text based on platform
const getFreshnessInsight = () => {
  const platform = activePlatform.value;
  const recentContent = getRecentContentPercentage();
  const unknownData = getFreshnessPercentage('unknown');
  
  if (platform === 'all') {
    return `${formatPercentage(recentContent)} of all cited content is less than 3 months old, suggesting LLMs favor recent content. Note that ${formatPercentage(unknownData)} of citations have no clear publish date, which may affect content freshness analysis.`;
  } else if (platform === 'chatgpt') {
    return `ChatGPT shows a stronger preference for recent content (${formatPercentage(recentContent)}), with ${formatPercentage(getFreshnessPercentage('0-30'))} of citations from content less than 30 days old—higher than industry average.`;
  } else if (platform === 'perplexity') {
    return `Perplexity cites a more balanced age distribution with stronger representation of 3-6 month old content (${formatPercentage(getFreshnessPercentage('3-6'))}), suggesting potentially more emphasis on established rather than trending content.`;
  }
  
  return "Content freshness analysis shows a significant preference for recently updated content across all platforms.";
};
</script>

<style scoped>
/* Any custom styles if needed */
</style>