<!-- components/dashboard/metrics/CitationAnalysisMetric.vue -->
<template>
    <div class="metric-container">
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Brand Citation Analysis</h4>
      
      <!-- Platform Selector -->
      <div class="mb-4 flex space-x-2 p-2 bg-gray-100 rounded-lg">
        <button 
          v-for="platform in platforms" 
          :key="platform.value"
          @click="activePlatform = platform.value" 
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          :class="activePlatform === platform.value ? 'bg-burntOrangeDark text-white' : 'bg-white text-darkGray hover:bg-gray-50'"
        >
          {{ platform.label }}
        </button>
      </div>
      
      <!-- Query Selector -->
      <div class="mb-4">
        <label for="query-selector" class="block text-sm font-semibold text-darkNavy mb-2">Select Query Topic</label>
        <div class="relative bg-gray-100 p-2 rounded-lg">
          <select 
            id="query-selector" 
            v-model="activeQueryId" 
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark sm:text-sm rounded-md bg-white shadow-sm"
          >
            <option 
              v-for="query in filteredQueries" 
              :key="query.query_id" 
              :value="query.query_id"
            >
              {{ truncateText(query.query_metrics.query_text, 60) }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Citation Metrics -->
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <!-- Metrics Header -->
        <div class="flex justify-between mb-3">
          <span class="text-sm font-medium text-darkNavy">Your Citation Metrics</span>
          <span class="text-sm font-medium bg-burntOrangeDark text-white px-2 py-1 rounded-full">
            {{ getPlatformLabel(activePlatform) }}
          </span>
        </div>
        
        <!-- Metrics Grid -->
        <div v-if="activeQuery" class="grid grid-cols-2 gap-4">
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Brand Mentions</div>
            <div class="text-xl font-bold text-burntOrangeDark">{{ getBrandMentionCount() }}</div>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Citation Count</div>
            <div class="text-xl font-bold text-burntOrangeDark">{{ getCitationCount() }}</div>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Citation Quality</div>
            <div class="text-xl font-bold" :class="getCitationMatchColor(getAverageCitationQuality())">
              {{ getAverageCitationQuality() ? getQualityLabel(getAverageCitationQuality()) : 'N/A' }}
            </div>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Content Optimization</div>
            <div class="text-xl font-bold text-burntOrangeDark">{{ getAverageOptimizationScore() || 'N/A' }}</div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-darkGray">
          No data available for this query
        </div>
      </div>
      
      <!-- Response Preview -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h5 class="text-sm font-semibold text-darkNavy">Response Preview</h5>
          <button 
            @click="showResponse = !showResponse" 
            class="px-3 py-1 text-sm bg-gray-100 text-burntOrangeDark hover:bg-gray-200 font-medium flex items-center rounded-md shadow-sm"
          >
            {{ showResponse ? 'Hide Response' : 'Show Response' }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="showResponse" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <!-- Response Content -->
        <div v-if="showResponse && activeQuery" class="bg-white p-4 rounded-lg border border-gray-200 text-sm max-h-64 overflow-y-auto">
          <p class="text-darkGray">
            <span class="font-medium block mb-2">{{ activeQuery.query_metrics.query_text }}</span>
            <div v-if="activeQuery.query_metrics.perplexity_response && activePlatform === 'perplexity'" v-html="formatMarkdown(activeQuery.query_metrics.perplexity_response)"></div>
            <div v-else class="text-gray-500 italic text-center py-4">No response data available for this platform</div>
          </p>
        </div>
        <div v-else-if="showResponse" class="bg-white p-4 rounded-lg border border-gray-200 text-sm text-center text-gray-500">
          No response data available
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    clientData: {
      type: Object,
      required: true
    }
  });
  
  // Platform options
  const platforms = [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'perplexity', label: 'Perplexity' }
  ];
  
  // State
  const activePlatform = ref('perplexity');
  const activeQueryId = ref('');
  const showResponse = ref(false);
  
  // Computed property to filter queries by platform
  const filteredQueries = computed(() => {
    if (!props.clientData || !props.clientData.query_data) return [];
    return props.clientData.query_data.filter(query => 
      query.query_metrics.data_source === activePlatform.value
    );
  });
  
  // Get the active query
  const activeQuery = computed(() => {
    if (!activeQueryId.value || !filteredQueries.value.length) return null;
    return filteredQueries.value.find(query => query.query_id === activeQueryId.value) || null;
  });
  
  // Set initial query ID when available
  watch(filteredQueries, (newQueries) => {
    if (newQueries.length > 0 && (!activeQueryId.value || !newQueries.find(q => q.query_id === activeQueryId.value))) {
      activeQueryId.value = newQueries[0].query_id;
    }
  }, { immediate: true });
  
  // Watch for platform changes to reset query selection
  watch(activePlatform, () => {
    if (filteredQueries.value.length > 0) {
      activeQueryId.value = filteredQueries.value[0].query_id;
    } else {
      activeQueryId.value = '';
    }
  });
  
  // Helper methods
  const getPlatformLabel = (platformValue) => {
    const platform = platforms.find(p => p.value === platformValue);
    return platform ? platform.label : platformValue;
  };
  
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  const formatMarkdown = (text) => {
    if (!text) return '';
    // Simple markdown to HTML conversion without using marked
    return text
      .replace(/#{3} (.*?)$/gm, '<h3>$1</h3>')
      .replace(/#{2} (.*?)$/gm, '<h2>$1</h2>')
      .replace(/#{1} (.*?)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };
  
  const getBrandMentionCount = () => {
    if (!activeQuery) return 0;
    return activeQuery.query_metrics.brand_mentioned ? 1 : 0;
  };
  
  const getCitationCount = () => {
    if (!activeQuery) return 0;
    return activeQuery.query_metrics.citation_count || 0;
  };
  
  const getAverageCitationQuality = () => {
    if (!activeQuery || !activeQuery.associated_pages) return 0;
    
    const pages = activeQuery.associated_pages.filter(page => page.citation_match_quality);
    if (pages.length === 0) return 0;
    
    const sum = pages.reduce((total, page) => total + page.citation_match_quality, 0);
    return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
  };
  
  const getAverageOptimizationScore = () => {
    if (!activeQuery || !activeQuery.associated_pages) return 0;
    
    const pages = activeQuery.associated_pages.filter(page => page.content_optimization_score);
    if (pages.length === 0) return 0;
    
    const sum = pages.reduce((total, page) => total + page.content_optimization_score, 0);
    return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
  };
  
  const getQualityLabel = (score) => {
    if (score >= 8) return 'High';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Medium';
    return 'Low';
  };
  
  const getCitationMatchColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };
  </script>
  
  <style scoped>
  .metric-container {
    min-height: 300px;
  }
  
  :deep(a) {
    color: #1a0dab;
    text-decoration: underline;
  }
  
  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  :deep(ul), :deep(ol) {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  :deep(li) {
    margin-bottom: 0.25rem;
  }
  
  :deep(p) {
    margin-bottom: 0.75rem;
  }
  
  :deep(blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
  }
  
  :deep(code) {
    background-color: #f7fafc;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }
  
  :deep(pre) {
    background-color: #f7fafc;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  
  :deep(pre code) {
    background-color: transparent;
    padding: 0;
  }
  </style>