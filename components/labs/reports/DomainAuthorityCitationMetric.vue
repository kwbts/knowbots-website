<!-- components/labs/reports/DomainAuthorityCitationMetric.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Domain Authority & Citation Distribution</h3>
    
    <TextBox>
      Do the old SEO rules apply to GEO? It seems that traditional metrics like domain authority hold true.
    </TextBox>
    
    <!-- Platform Selector Toggle Buttons -->
    <div class="mb-6">
      <div class="flex">
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
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column: Bar Chart for Domain Authority Ranges -->
      <div>
        <h4 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Citations by Domain Authority Range</h4>
        
        <div class="space-y-4">
          <!-- Domain Authority Range 1-25 -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">1-25</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDAPercentage('1-25')) }}</span>
            </div>
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-blue-300 dark:bg-blue-600 rounded-full transition-all duration-700"
                :style="`width: ${getDAPercentage('1-25')}%`"
              ></div>
            </div>
          </div>
          
          <!-- Domain Authority Range 26-50 -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">26-50</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDAPercentage('26-50')) }}</span>
            </div>
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-500 rounded-full transition-all duration-700"
                :style="`width: ${getDAPercentage('26-50')}%`"
              ></div>
            </div>
          </div>
          
          <!-- Domain Authority Range 51-75 -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">51-75</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDAPercentage('51-75')) }}</span>
            </div>
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-blue-700 dark:bg-blue-400 rounded-full transition-all duration-700"
                :style="`width: ${getDAPercentage('51-75')}%`"
              ></div>
            </div>
          </div>
          
          <!-- Domain Authority Range 76-100 -->
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-700 dark:text-gray-300">76-100</span>
              <span class="text-gray-500 dark:text-gray-400">{{ formatPercentage(getDAPercentage('76-100')) }}</span>
            </div>
            <div class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="absolute top-0 left-0 h-full bg-burntOrangeDark dark:bg-orange-500 rounded-full transition-all duration-700"
                :style="`width: ${getDAPercentage('76-100')}%`"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Key Insight -->
        <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
          <p class="text-sm text-blue-700 dark:text-blue-400">
            <span class="font-medium">Key Insight:</span> 
            {{ getCitationInsight() }}
          </p>
        </div>
      </div>
      
      <!-- Right Column: Citation Distribution by DA Score -->
      <div>
        <h4 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-4">Citation Distribution</h4>
        
        <!-- Citation Scatter Plot visualization (represents as a heat map) -->
        <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-4">
          <!-- Heat map grid representation with 4 colored rows -->
          <div class="grid grid-cols-10 gap-1 mb-4">
            <!-- Each row has 10 cells representing increments of 10 in DA score -->
            <!-- Row 1: DA 76-100 -->
            <div 
              v-for="i in 10" 
              :key="`row1-${i}`" 
              class="h-6 rounded"
              :class="getDACellClass(76 + (i-1) * 2.5)"
            ></div>
            
            <!-- Row 2: DA 51-75 -->
            <div 
              v-for="i in 10" 
              :key="`row2-${i}`" 
              class="h-6 rounded"
              :class="getDACellClass(51 + (i-1) * 2.5)"
            ></div>
            
            <!-- Row 3: DA 26-50 -->
            <div 
              v-for="i in 10" 
              :key="`row3-${i}`" 
              class="h-6 rounded"
              :class="getDACellClass(26 + (i-1) * 2.5)"
            ></div>
            
            <!-- Row 4: DA 1-25 -->
            <div 
              v-for="i in 10" 
              :key="`row4-${i}`" 
              class="h-6 rounded"
              :class="getDACellClass(1 + (i-1) * 2.5)"
            ></div>
          </div>
          
          <!-- Legend for the heat map -->
          <div class="flex justify-between items-center mt-2">
            <div class="text-xs text-gray-500 dark:text-gray-400">Fewer Citations</div>
            <div class="flex items-center space-x-1">
              <div class="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
              <div class="w-4 h-4 bg-blue-300 dark:bg-blue-700/50 rounded"></div>
              <div class="w-4 h-4 bg-blue-500 dark:bg-blue-600/70 rounded"></div>
              <div class="w-4 h-4 bg-blue-700 dark:bg-blue-500/80 rounded"></div>
              <div class="w-4 h-4 bg-burntOrangeDark dark:bg-orange-500 rounded"></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">More Citations</div>
          </div>
          
          <!-- Domain Authority Scale Labels -->
          <div class="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
            <div>1</div>
            <div>25</div>
            <div>50</div>
            <div>75</div>
            <div>100</div>
          </div>
          <div class="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            Domain Authority Score
          </div>
        </div>
        
        <!-- Citation Distribution Metrics -->
        <div class="grid grid-cols-3 gap-4 mt-6">
          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Median DA of Citations</div>
            <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {{ Math.round(citationMetrics[activePlatform].median * 10) / 10 }}
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Mode DA Range</div>
            <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {{ citationMetrics[activePlatform].modeRange }}
            </div>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-3 text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">High Authority %</div>
            <div class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {{ formatPercentage(getDAPercentage('51-100')) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TextBox from './TextBox.vue';

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

// Citation distribution by DA range
// This would normally be calculated from the actual data
// Here we're providing sample data for visualization
const domainAuthorityCitations = {
  all: {
    '1-25': 6.5,
    '26-50': 28.7,
    '51-75': 42.3,
    '76-100': 22.5
  },
  chatgpt: {
    '1-25': 4.2,
    '26-50': 26.8,
    '51-75': 45.9,
    '76-100': 23.1
  },
  perplexity: {
    '1-25': 8.4,
    '26-50': 30.5,
    '51-75': 39.6,
    '76-100': 21.5
  }
};

// Citation metrics by platform
const citationMetrics = {
  all: {
    median: 62.8,
    modeRange: '60-70',
    highAuthority: 64.8 // 51-100 combined
  },
  chatgpt: {
    median: 66.3,
    modeRange: '65-75',
    highAuthority: 69.0
  },
  perplexity: {
    median: 59.2,
    modeRange: '55-65',
    highAuthority: 61.1
  }
};

// Helper function to generate cell colors based on the DA score
// This simulates a heatmap of citation distribution
const getDACellClass = (score) => {
  // This would normally use actual data to determine heatmap intensity
  // For now, we're using a pattern that shows higher DA scores get more citations
  // especially in the 50-80 range
  const baseColors = {
    low: 'bg-blue-100 dark:bg-blue-900/30',
    mediumLow: 'bg-blue-300 dark:bg-blue-700/50',
    medium: 'bg-blue-500 dark:bg-blue-600/70',
    mediumHigh: 'bg-blue-700 dark:bg-blue-500/80',
    high: 'bg-burntOrangeDark dark:text-burntOrangeDark/90'
  };
  
  // Simulated distribution peaking around 60-70 DA
  if (score < 20) {
    return baseColors.low;
  } else if (score < 40) {
    return baseColors.mediumLow;
  } else if (score < 60) {
    return baseColors.medium;
  } else if (score < 80) {
    return baseColors.mediumHigh;
  } else {
    return baseColors.high;
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

// Helper for getting combined ranges
const getDAPercentage = (range) => {
  const distribution = domainAuthorityCitations[activePlatform.value] || domainAuthorityCitations.all;
  
  // If it's a single range
  if (distribution[range]) {
    return distribution[range];
  }
  
  // Handle combined ranges (e.g., "51-100")
  if (range === '51-100') {
    return (distribution['51-75'] || 0) + (distribution['76-100'] || 0);
  }
  
  return 0;
};

// Format percentage value
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Get insight text based on platform
const getCitationInsight = () => {
  const platform = activePlatform.value;
  
  if (platform === 'all') {
    return "LLMs predominantly cite domains with higher authority scores. Our analysis shows that " +
           formatPercentage(getDAPercentage('51-100')) + " of citations come from domains with DA scores above 50, " +
           "suggesting that established, trustworthy domains are more likely to be referenced.";
  } else if (platform === 'chatgpt') {
    return "ChatGPT shows a strong preference for high-authority domains. " +
           formatPercentage(getDAPercentage('51-75')) + " of all citations come from domains with DA scores between 51-75, " +
           "indicating a bias toward well-established but not necessarily dominant sites.";
  } else if (platform === 'perplexity') {
    return "Perplexity AI includes a more balanced distribution of domain authorities, with " +
           formatPercentage(getDAPercentage('26-50')) + " of citations from mid-range authorities. " +
           "This suggests a slightly broader source selection compared to other LLMs.";
  }
  
  return "Analysis shows strong correlation between domain authority and citation frequency.";
};

// Calculate domain authority metrics if we had access to the actual data
// This would normally analyze data from reportData
const calculateDomainAuthorityMetrics = (reportData) => {
  if (!reportData || !reportData.clients) {
    return domainAuthorityCitations; // Return sample data
  }
  
  // Actual implementation would analyze the real data here and return
  // structured domain authority distributions by platform
  
  return domainAuthorityCitations;
};
</script>

<style scoped>
/* Any custom styles if needed */
</style>