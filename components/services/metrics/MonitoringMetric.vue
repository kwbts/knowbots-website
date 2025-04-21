<!-- components/services/metrics/MonitoringMetric.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Citation Monitoring</h4>
    
    <!-- Time Period Selector -->
    <div class="mb-4 p-2 bg-gray-100 rounded-lg">
      <div class="flex space-x-2">
        <button 
          v-for="(period, index) in periods" 
          :key="index"
          @click="activePeriod = period.value" 
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          :class="activePeriod === period.value ? 'bg-burntOrangeDark text-white' : 'bg-white text-darkGray hover:bg-gray-50'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
    
    <!-- Summary Stats -->
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div class="text-xs text-gray-500 mb-1">Total Citations</div>
        <div class="text-xl font-bold text-burntOrangeDark">{{ getTotalCitations() }}</div>
      </div>
      <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div class="text-xs text-gray-500 mb-1">Active Queries</div>
        <div class="text-xl font-bold text-darkNavy">{{ getCurrentQueries().length }}</div>
      </div>
      <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div class="text-xs text-gray-500 mb-1">Growth Rate</div>
        <div class="text-xl font-bold text-green-600">+{{ getGrowthRate() }}%</div>
      </div>
    </div>
    
    <!-- Monitored Queries -->
    <div>
      <div class="flex justify-between items-center mb-3">
        <h5 class="text-sm font-semibold text-darkNavy">Monitored Queries</h5>
        <div class="flex items-center space-x-2">
          <span class="flex items-center text-xs text-gray-500">
            <span class="inline-block w-3 h-3 rounded-full bg-burntOrangeDark mr-1"></span>
            Your Brand
          </span>
          <span class="flex items-center text-xs text-gray-500">
            <span class="inline-block w-3 h-3 rounded-full bg-gray-300 mr-1"></span>
            Competitor
          </span>
        </div>
      </div>
      
      <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
        <div 
          v-for="(query, index) in getCurrentQueries()" 
          :key="index"
          class="bg-white p-3 rounded-lg border border-gray-200"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="text-sm font-medium text-darkNavy">{{ query.text }}</div>
            <div class="flex space-x-2">
              <span :class="`text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(query.status)}`">
                {{ getStatusText(query.status) }}
              </span>
            </div>
          </div>
          
          <div class="flex justify-between text-xs text-gray-500 mb-3">
            <span>Last check: {{ query.lastCheck }}</span>
            <span>Citations: {{ query.citations }}</span>
          </div>
          
          <!-- Mentions Indicators -->
          <div class="flex space-x-2">
            <div 
              class="flex-1 px-3 py-2 rounded-md text-xs font-medium"
              :class="query.brandMentioned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'"
            >
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M5 13l4 4L19 7"
                    v-if="query.brandMentioned"
                  />
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12"
                    v-else
                  />
                </svg>
                Brand Mentioned
              </div>
            </div>
            
            <div 
              class="flex-1 px-3 py-2 rounded-md text-xs font-medium"
              :class="!query.competitorMentioned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            >
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M5 13l4 4L19 7"
                    v-if="!query.competitorMentioned"
                  />
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12"
                    v-else
                  />
                </svg>
                {{ query.competitorMentioned ? 'Competitor Mentioned' : 'No Competitor Mention' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activePeriod = ref('month');

const periods = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Quarter', value: 'quarter' }
];

// Simulated data for different time periods
const weeklyQueries = [
  { 
    text: 'Best marketing analytics tools', 
    lastCheck: '2 hours ago', 
    citations: 4, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Content marketing ROI improvement', 
    lastCheck: '1 day ago', 
    citations: 2, 
    status: 'neutral',
    brandMentioned: true,
    competitorMentioned: true
  },
  { 
    text: 'ChatGPT marketing techniques', 
    lastCheck: '3 hours ago', 
    citations: 5, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  }
];

const monthlyQueries = [
  { 
    text: 'Best marketing analytics tools', 
    lastCheck: '2 hours ago', 
    citations: 4, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Content marketing ROI improvement', 
    lastCheck: '1 day ago', 
    citations: 2, 
    status: 'neutral',
    brandMentioned: true,
    competitorMentioned: true
  },
  { 
    text: 'ChatGPT marketing techniques', 
    lastCheck: '3 hours ago', 
    citations: 5, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Marketing automation software', 
    lastCheck: '1 day ago', 
    citations: 0, 
    status: 'negative',
    brandMentioned: false,
    competitorMentioned: true
  },
  { 
    text: 'SEO vs GEO strategy', 
    lastCheck: '5 hours ago', 
    citations: 3, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  }
];

const quarterlyQueries = [
  { 
    text: 'Best marketing analytics tools', 
    lastCheck: '2 hours ago', 
    citations: 4, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Content marketing ROI improvement', 
    lastCheck: '1 day ago', 
    citations: 2, 
    status: 'neutral',
    brandMentioned: true,
    competitorMentioned: true
  },
  { 
    text: 'ChatGPT marketing techniques', 
    lastCheck: '3 hours ago', 
    citations: 5, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Marketing automation software', 
    lastCheck: '1 day ago', 
    citations: 0, 
    status: 'negative',
    brandMentioned: false,
    competitorMentioned: true
  },
  { 
    text: 'SEO vs GEO strategy', 
    lastCheck: '5 hours ago', 
    citations: 3, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'AI content generation pipeline', 
    lastCheck: '12 hours ago', 
    citations: 6, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  },
  { 
    text: 'Future of martech landscape', 
    lastCheck: '2 days ago', 
    citations: 4, 
    status: 'positive',
    brandMentioned: true,
    competitorMentioned: false
  }
];

const getCurrentQueries = () => {
  switch (activePeriod.value) {
    case 'week':
      return weeklyQueries;
    case 'month':
      return monthlyQueries;
    case 'quarter':
      return quarterlyQueries;
    default:
      return monthlyQueries;
  }
};

const getTotalCitations = () => {
  return getCurrentQueries().reduce((total, query) => total + query.citations, 0);
};

const getGrowthRate = () => {
  switch (activePeriod.value) {
    case 'week':
      return 12;
    case 'month':
      return 24;
    case 'quarter':
      return 38;
    default:
      return 24;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'positive':
      return 'Trending';
    case 'negative':
      return 'Declining';
    default:
      return 'Stable';
  }
};
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>