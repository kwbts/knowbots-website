<!-- components/dashboard/metrics/QueryAnalysis.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Query Analysis</h4>
    
    <!-- Query Selector -->
    <div class="mb-4">
      <label for="query-selector" class="block text-sm font-semibold text-darkNavy mb-2">Select Query</label>
      <div class="relative">
        <select 
          id="query-selector" 
          v-model="selectedQueryText" 
          class="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark rounded-md bg-white shadow-sm appearance-none"
        >
          <option value="" disabled selected>Select a query for analysis</option>
          <option 
            v-for="query in filteredQueries" 
            :key="query.text" 
            :value="query.text"
            class="py-2"
          >
            {{ query.text }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      
      <!-- Filter checkboxes - Positioned below dropdown -->
      <div class="flex items-center gap-6 mt-2">
        <div class="flex items-center">
          <input 
            id="brand-mentions-filter" 
            type="checkbox" 
            v-model="showBrandMentionsOnly"
            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label for="brand-mentions-filter" class="ml-2 text-sm text-gray-700">
            Show brand mentions
          </label>
        </div>
        <div class="flex items-center">
          <input 
            id="competitor-mentions-filter" 
            type="checkbox" 
            v-model="showCompetitorMentionsOnly"
            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label for="competitor-mentions-filter" class="ml-2 text-sm text-gray-700">
            Show competitor mentions
          </label>
        </div>
      </div>
    </div>
    
    <!-- Main Content Area - Three Column Layout: 1 column for metrics, 2 for response -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Left Column: Metrics (Combined in a more compact layout) -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <!-- Section header -->
        <h3 class="text-base font-semibold text-black mb-3">Metrics Summary</h3>
        
        <!-- Citation Metrics -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-darkNavy mb-2 pb-1 border-b border-gray-200">Citation Metrics</h4>
          
          <div v-if="activeQuery" class="space-y-2">
            <!-- Brand Mentions -->
            <div class="flex justify-between items-center py-1">
              <span class="text-xs text-darkGray">Brand Mentions</span>
              <div class="flex items-center">
                <span class="text-base font-semibold text-darkNavy mr-2">{{ getBrandMentionCount() }}</span>
                <svg v-if="getBrandMentionCount() > 0" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Citation Count -->
            <div class="flex justify-between items-center py-1">
              <span class="text-xs text-darkGray">Citation Count</span>
              <div class="flex items-center">
                <span class="text-base font-semibold text-darkNavy mr-2">{{ getCitationCount() }}</span>
                <svg v-if="getCitationCount() > 0" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
            </div>
            
            <!-- Avg Citation Match -->
            <div class="flex justify-between items-center py-1">
              <span class="text-xs text-darkGray">Avg Citation Match</span>
              <span class="text-base font-semibold text-darkNavy">
                {{ getQualityLabel(getAverageCitationQuality()) }}
              </span>
            </div>
            
            <!-- Competitor Mentions -->
            <div class="flex justify-between items-center py-1">
              <span class="text-xs text-darkGray">Competitor Mentions</span>
              <div class="flex items-center">
                <span class="text-base font-semibold text-darkNavy mr-2">{{ getCompetitorMentionCount() }}</span>
                <svg v-if="getCompetitorMentionCount() > 0" class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-2 text-sm text-gray-500">
            No data available
          </div>
        </div>
        
        <!-- Content Quality Metrics -->
        <div>
          <h4 class="text-sm font-medium text-darkNavy mb-2 pb-1 border-b border-gray-200">Content Quality</h4>
          
          <div v-if="activeQuery && activeQuery.associated_pages && activeQuery.associated_pages.length > 0" class="space-y-2">
            <!-- Average Word Count -->
            <div>
              <div class="flex justify-between items-center py-1">
                <span class="text-xs text-darkGray">Avg Word Count</span>
                <span class="text-base font-semibold text-darkNavy">{{ getAverageWordCount() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div class="h-1 rounded-full bg-blue-600" :style="`width: ${Math.min(getAverageWordCount() / 20, 100)}%`"></div>
              </div>
            </div>
            
            <!-- Average Content Score -->
            <div>
              <div class="flex justify-between items-center py-1">
                <span class="text-xs text-darkGray">Content Score</span>
                <span class="text-base font-semibold text-darkNavy">{{ getAverageContentScore() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div class="h-1 rounded-full bg-blue-600" :style="`width: ${(getAverageContentScore() / 10) * 100}%`"></div>
              </div>
            </div>
            
            <!-- Average Uniqueness -->
            <div>
              <div class="flex justify-between items-center py-1">
                <span class="text-xs text-darkGray">Uniqueness</span>
                <span class="text-base font-semibold text-darkNavy">{{ getAverageUniqueContentScore() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div class="h-1 rounded-full bg-blue-600" :style="`width: ${(getAverageUniqueContentScore() / 10) * 100}%`"></div>
              </div>
            </div>
            
            <!-- Average GPT Analysis -->
            <div>
              <div class="flex justify-between items-center py-1">
                <span class="text-xs text-darkGray">GPT Analysis</span>
                <span class="text-base font-semibold text-darkNavy">{{ getAverageGptAnalysisScore() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div class="h-1 rounded-full bg-blue-600" :style="`width: ${(getAverageGptAnalysisScore() / 10) * 100}%`"></div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-2 text-sm text-gray-500">
            No content metrics available
          </div>
        </div>
      </div>
      
      <!-- Right Columns: Response Preview (takes 2 columns) -->
      <div class="md:col-span-2 flex flex-col h-full">
        <!-- Response Header with Platform Toggle -->
        <div class="flex items-center justify-between mb-3">
          <h5 class="text-sm font-semibold text-darkNavy">Response Preview</h5>
          
          <!-- Platform Toggle Buttons -->
          <div class="flex">
            <button 
              v-for="platform in platforms" 
              :key="platform.value"
              @click="activePlatform = platform.value" 
              class="px-3 py-1 text-xs font-medium transition-colors"
              :class="activePlatform === platform.value ? 'bg-burntOrangeDark text-white' : 'bg-gray-100 text-darkGray hover:bg-gray-200'"
            >
              {{ platform.label }}
            </button>
          </div>
        </div>
        
        <!-- Response Content - AI Chat Message Style with increased height -->
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex-grow">
          <!-- AI Header -->
          <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {{ activePlatform === 'chatgpt' ? 'G' : 'P' }}
              </div>
              <span class="ml-3 font-medium text-darkNavy">{{ getPlatformLabel(activePlatform) }}</span>
            </div>
          </div>
          
          <!-- Message Content with increased height -->
          <div class="p-4 text-sm text-darkGray h-[500px] overflow-y-auto">
            <div v-if="activeQuery && getResponseText()">
              <!-- Formatted response -->
              <div v-html="formatMarkdown(getResponseText())"></div>
              
              <!-- Citation URLs - shown below the response -->
              <div v-if="getCitationUrls().length > 0" class="mt-6 pt-4 border-t border-gray-200">
                <h5 class="font-medium text-black mb-2">Citations:</h5>
                <ul class="space-y-1 pl-5 list-disc">
                  <li v-for="(url, index) in getCitationUrls()" :key="index" class="text-blue-600 break-all">
                    {{ url }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="text-gray-500 italic text-center py-16 flex flex-col items-center">
              <svg class="w-8 h-8 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <p>No response data available for this query</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { marked } from 'marked';

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
const activePlatform = ref('chatgpt'); // Start with ChatGPT selected
const selectedQueryText = ref(''); // Store the selected query text
const showBrandMentionsOnly = ref(false); // Filter for brand mentions
const showCompetitorMentionsOnly = ref(false); // Filter for competitor mentions

// Map to store query IDs by platform and query text
const queryMap = ref(new Map());
// Maps to track which queries have brand or competitor mentions
const brandMentionsMap = ref(new Map());
const competitorMentionsMap = ref(new Map());

// Process all queries and organize them by text and platform
const processQueryData = () => {
  if (!props.clientData?.query_data) return;
  
  // Reset the maps
  queryMap.value = new Map();
  brandMentionsMap.value = new Map();
  competitorMentionsMap.value = new Map();
  
  // Process each query
  props.clientData.query_data.forEach(query => {
    // Get query text from either direct property or from query_metrics
    const queryText = query.query_text || 
                     (query.query_metrics && query.query_metrics.query_text) || 
                     'Unnamed Query';
    
    // Determine the platform from query ID
    const platform = query.query_id.toLowerCase().includes('perplexity') ? 'perplexity' : 'chatgpt';
    
    // If this query text isn't in the map yet, add it
    if (!queryMap.value.has(queryText)) {
      queryMap.value.set(queryText, {});
    }
    
    // Store the query ID for this platform
    queryMap.value.get(queryText)[platform] = query.query_id;
    
    // Check if this query has brand mentions
    const hasBrandMention = checkQueryForBrandMention(query);
    if (hasBrandMention) {
      brandMentionsMap.value.set(queryText, true);
    }
    
    // Check if this query has competitor mentions
    const hasCompetitorMention = checkQueryForCompetitorMention(query);
    if (hasCompetitorMention) {
      competitorMentionsMap.value.set(queryText, true);
    }
  });
  
  console.log('Query map built:', queryMap.value);
  console.log('Brand mentions map built:', brandMentionsMap.value);
  console.log('Competitor mentions map built:', competitorMentionsMap.value);
};

// Helper function to check if a query has a brand mention
const checkQueryForBrandMention = (query) => {
  // Check direct property
  if (query.brand_mentioned === true || query.brand_mentioned === "checked") {
    return true;
  }
  
  // Check in query_metrics
  if (query.query_metrics && 
      (query.query_metrics.brand_mentioned === true || 
       query.query_metrics.brand_mentioned === "checked")) {
    return true;
  }
  
  // Check associated pages for brand mentions
  if (query.associated_pages && Array.isArray(query.associated_pages) && query.associated_pages.length > 0) {
    return query.associated_pages.some(page => 
      page.brand_mentioned === true || 
      page.brand_mentioned === "checked" ||
      (page.is_client_domain === true || page.is_client_domain === "checked")
    );
  }
  
  return false;
};

// Helper function to check if a query has a competitor mention
const checkQueryForCompetitorMention = (query) => {
  // Check direct property
  if (query.competitor_mentioned === true || query.competitor_mentioned === "checked") {
    return true;
  }
  
  // Check in query_metrics
  if (query.query_metrics && 
      (query.query_metrics.competitor_mentioned === true || 
       query.query_metrics.competitor_mentioned === "checked")) {
    return true;
  }
  
  // Check competitor_mentioned_name property
  if (query.competitor_mentioned_name) {
    return true;
  }
  
  // Check in query_metrics.competitor_mentioned_name
  if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
    return true;
  }
  
  // Check associated pages for competitor mentions
  if (query.associated_pages && Array.isArray(query.associated_pages) && query.associated_pages.length > 0) {
    return query.associated_pages.some(page => 
      page.competitor_mentioned === true || 
      page.competitor_mentioned === "checked" ||
      page.competitor_mentioned_name
    );
  }
  
  return false;
};

// Get all unique queries, filtered by brand and competitor mentions based on checkboxes
const filteredQueries = computed(() => {
  if (!queryMap.value.size) return [];
  
  // Create an array of unique query texts
  let queries = Array.from(queryMap.value.keys()).map(text => ({
    text,
    // Count how many platforms have this query
    platformCount: Object.keys(queryMap.value.get(text)).length,
    // Track if it has brand or competitor mentions
    hasBrandMention: brandMentionsMap.value.has(text),
    hasCompetitorMention: competitorMentionsMap.value.has(text)
  }));
  
  // Apply filters based on checkboxes
  if (showBrandMentionsOnly.value && showCompetitorMentionsOnly.value) {
    // Show only queries that have both brand and competitor mentions
    queries = queries.filter(query => query.hasBrandMention && query.hasCompetitorMention);
  } else if (showBrandMentionsOnly.value) {
    // Show only queries with brand mentions
    queries = queries.filter(query => query.hasBrandMention);
  } else if (showCompetitorMentionsOnly.value) {
    // Show only queries with competitor mentions
    queries = queries.filter(query => query.hasCompetitorMention);
  }
  
  return queries.sort((a, b) => a.text.localeCompare(b.text));
});

// Reset selected query when filters change if necessary
watch([showBrandMentionsOnly, showCompetitorMentionsOnly], () => {
  // Check if current selection still passes the filters
  const needsReset = 
    (showBrandMentionsOnly.value && !brandMentionsMap.value.has(selectedQueryText.value)) ||
    (showCompetitorMentionsOnly.value && !competitorMentionsMap.value.has(selectedQueryText.value)) ||
    (showBrandMentionsOnly.value && showCompetitorMentionsOnly.value && 
     (!brandMentionsMap.value.has(selectedQueryText.value) || 
      !competitorMentionsMap.value.has(selectedQueryText.value)));
  
  if (needsReset) {
    // Current selection does not pass the filters, so reset it
    if (filteredQueries.value.length > 0) {
      selectedQueryText.value = filteredQueries.value[0].text;
    } else {
      selectedQueryText.value = '';
    }
  }
});

// Determine the active query ID based on selected query text and active platform
const activeQueryId = computed(() => {
  if (!selectedQueryText.value || !queryMap.value.has(selectedQueryText.value)) {
    return '';
  }
  
  const platformData = queryMap.value.get(selectedQueryText.value);
  
  // Return the query ID for the active platform if available
  if (platformData[activePlatform.value]) {
    return platformData[activePlatform.value];
  }
  
  // If not available for active platform, return the first available ID
  const platforms = Object.keys(platformData);
  if (platforms.length > 0) {
    // Also update the active platform to match
    activePlatform.value = platforms[0];
    return platformData[platforms[0]];
  }
  
  return '';
});

// Get the active query
const activeQuery = computed(() => {
  if (!activeQueryId.value || !props.clientData?.query_data) {
    return null;
  }
  
  return props.clientData.query_data.find(query => query.query_id === activeQueryId.value) || null;
});

// Watch for changes in client data
watch(() => props.clientData, () => {
  processQueryData();
  
  // Set default selection if available
  if (filteredQueries.value.length > 0 && !selectedQueryText.value) {
    selectedQueryText.value = filteredQueries.value[0].text;
  }
}, { immediate: true, deep: true });

// Helper methods
const getPlatformLabel = (platformValue) => {
  const platform = platforms.find(p => p.value === platformValue);
  return platform ? platform.label : platformValue;
};

// Get citation URLs from associated pages
const getCitationUrls = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages) return [];
  
  // Extract unique citation URLs from associated pages
  const urls = activeQuery.value.associated_pages
    .filter(page => page.citation_url)
    .map(page => page.citation_url);
  
  // Remove duplicates
  return [...new Set(urls)];
};

const formatMarkdown = (text) => {
  if (!text) return '';
  try {
    return marked(text);
  } catch (error) {
    console.error("Error formatting markdown:", error);
    
    // Fallback simple markdown to HTML conversion
    return text
      .replace(/#{3} (.*?)$/gm, '<h3>$1</h3>')
      .replace(/#{2} (.*?)$/gm, '<h2>$1</h2>')
      .replace(/#{1} (.*?)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
};

const getBrandMentionCount = () => {
  if (!activeQuery.value) return 0;
  
  // Try different property paths to find brand_mentioned value
  // Direct property
  if (typeof activeQuery.value.brand_mentioned === 'boolean') {
    return activeQuery.value.brand_mentioned ? 1 : 0;
  }
  
  // In query_metrics
  if (activeQuery.value.query_metrics && typeof activeQuery.value.query_metrics.brand_mentioned === 'boolean') {
    return activeQuery.value.query_metrics.brand_mentioned ? 1 : 0;
  }
  
  return 0;
};

const getCompetitorMentionCount = () => {
  if (!activeQuery.value) return 0;
  
  let count = 0;
  
  // Check query-level competitor mentions
  if (activeQuery.value.competitor_mentioned_name) {
    // Handle as array or string
    if (Array.isArray(activeQuery.value.competitor_mentioned_name)) {
      count = activeQuery.value.competitor_mentioned_name.length;
    } else if (activeQuery.value.competitor_mentioned_name) {
      count = 1;
    }
  }
  // Check query_metrics
  else if (activeQuery.value.query_metrics && activeQuery.value.query_metrics.competitor_mentioned_name) {
    // Handle as array or string
    if (Array.isArray(activeQuery.value.query_metrics.competitor_mentioned_name)) {
      count = activeQuery.value.query_metrics.competitor_mentioned_name.length;
    } else if (activeQuery.value.query_metrics.competitor_mentioned_name) {
      count = 1;
    }
  }
  // Boolean checks
  else if (typeof activeQuery.value.competitor_mentioned === 'boolean') {
    count = activeQuery.value.competitor_mentioned ? 1 : 0;
  }
  else if (activeQuery.value.query_metrics && typeof activeQuery.value.query_metrics.competitor_mentioned === 'boolean') {
    count = activeQuery.value.query_metrics.competitor_mentioned ? 1 : 0;
  }
  
  // Check associated pages for competitor mentions
  if (activeQuery.value.associated_pages && activeQuery.value.associated_pages.length > 0) {
    // Create a Set to track unique competitor names
    const competitorNames = new Set();
    
    activeQuery.value.associated_pages.forEach(page => {
      if (page.competitor_mentioned === "checked" || page.competitor_mentioned === true) {
        // If page has competitor_mentioned_name, add each competitor to the set
        if (page.competitor_mentioned_name) {
          if (Array.isArray(page.competitor_mentioned_name)) {
            page.competitor_mentioned_name.forEach(name => {
              if (name) competitorNames.add(name);
            });
          } else {
            competitorNames.add(page.competitor_mentioned_name);
          }
        } else {
          // If no name but competitor was marked as mentioned, count as 1 unknown competitor
          competitorNames.add("unknown_competitor");
        }
      }
    });
    
    // If we found competitors in associated pages and it's more than what we counted so far
    if (competitorNames.size > count) {
      count = competitorNames.size;
    }
  }
  
  return count;
};

const getCitationCount = () => {
  if (!activeQuery.value) return 0;
  
  // Try different property paths to find citation_count value
  // Direct property
  if (typeof activeQuery.value.citation_count === 'number') {
    return activeQuery.value.citation_count;
  }
  
  // In query_metrics
  if (activeQuery.value.query_metrics && typeof activeQuery.value.query_metrics.citation_count === 'number') {
    return activeQuery.value.query_metrics.citation_count;
  }
  
  return 0;
};

const getAverageCitationQuality = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages || activeQuery.value.associated_pages.length === 0) {
    return 0;
  }
  
  const pages = activeQuery.value.associated_pages.filter(page => 
    page.citation_match_quality !== undefined && page.citation_match_quality !== null
  );
  
  if (pages.length === 0) return 0;
  
  const sum = pages.reduce((total, page) => total + (page.citation_match_quality || 0), 0);
  return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
};

// New metrics
const getAverageWordCount = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages || activeQuery.value.associated_pages.length === 0) {
    return 0;
  }
  
  const pages = activeQuery.value.associated_pages.filter(page => 
    page.word_count !== undefined && page.word_count !== null
  );
  
  if (pages.length === 0) return 0;
  
  const sum = pages.reduce((total, page) => total + (page.word_count || 0), 0);
  return Math.round(sum / pages.length); // Round to nearest integer
};

const getAverageContentScore = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages || activeQuery.value.associated_pages.length === 0) {
    return 0;
  }
  
  const pages = activeQuery.value.associated_pages.filter(page => 
    page.content_optimization_score !== undefined && page.content_optimization_score !== null
  );
  
  if (pages.length === 0) return 0;
  
  const sum = pages.reduce((total, page) => total + (page.content_optimization_score || 0), 0);
  return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
};

const getAverageUniqueContentScore = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages || activeQuery.value.associated_pages.length === 0) {
    return 0;
  }
  
  const pages = activeQuery.value.associated_pages.filter(page => 
    page.content_uniqueness !== undefined && page.content_uniqueness !== null
  );
  
  if (pages.length === 0) return 0;
  
  const sum = pages.reduce((total, page) => total + (page.content_uniqueness || 0), 0);
  return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
};

const getAverageGptAnalysisScore = () => {
  if (!activeQuery.value || !activeQuery.value.associated_pages || activeQuery.value.associated_pages.length === 0) {
    return 0;
  }
  
  const pages = activeQuery.value.associated_pages.filter(page => 
    page.gpt_analysis_score !== undefined && page.gpt_analysis_score !== null
  );
  
  if (pages.length === 0) return 0;
  
  const sum = pages.reduce((total, page) => total + (page.gpt_analysis_score || 0), 0);
  return Math.round((sum / pages.length) * 10) / 10; // Round to 1 decimal place
};

const getResponseText = () => {
  if (!activeQuery.value) return '';
  
  if (activePlatform.value === 'perplexity') {
    // For Perplexity, we can find responses in query_metrics.perplexity_response
    const response = activeQuery.value.query_metrics?.perplexity_response ||
                     activeQuery.value.perplexity_response ||
                     activeQuery.value.associated_pages?.[0]?.perplexity_response;
    
    if (response) {
      return response;
    }
  } 
  else if (activePlatform.value === 'chatgpt') {
    // For ChatGPT, based on the data structure, there's often no stored response
    // Check if there might be a response anyway
    const response = activeQuery.value.query_metrics?.chatgpt_response ||
                     activeQuery.value.chatgpt_response ||
                     activeQuery.value.associated_pages?.[0]?.chatgpt_response;
    
    if (response) {
      return response;
    } else {
      // Return a special message for ChatGPT when no response is stored
      return "No ChatGPT response text available in this dataset. The response may not have been stored during data collection.";
    }
  }
  
  return '';
};

const getQualityLabel = (score) => {
  if (!score && score !== 0) return 'N/A';
  if (score >= 8) return 'High';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Medium';
  return 'Low';
};

// Initialize component
onMounted(() => {
  console.log("QueryAnalysis mounted with client data:", props.clientData);
  processQueryData();
  
  // Set initial selection if available
  if (filteredQueries.value.length > 0) {
    selectedQueryText.value = filteredQueries.value[0].text;
  }
});
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

:deep(h1) {
  font-size: 1.5rem;
}

:deep(h2) {
  font-size: 1.25rem;
}

:deep(h3) {
  font-size: 1.125rem;
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
  margin-bottom: 1rem;
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

:deep(sup) {
  font-size: 0.75em;
  vertical-align: super;
  color: #64748b;
}
</style>