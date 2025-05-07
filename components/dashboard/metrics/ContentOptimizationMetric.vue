<!-- components/dashboard/metrics/ContentOptimizationMetric.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Content Optimization Analysis</h4>
    
    <!-- Query Selector with improved styling -->
    <div class="mb-4">
      <label for="query-selector" class="block text-sm font-semibold text-darkNavy mb-2">Select Query</label>
      <div class="relative">
        <select 
          id="query-selector" 
          v-model="selectedQueryText" 
          class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark rounded-md bg-white shadow-sm appearance-none"
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
    
    <!-- Platform & Page Selector Bar -->
    <div class="flex items-center justify-between mb-4">
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
      
      <!-- Page Selector (if applicable) -->
      <div v-if="hasAssociatedPages" class="flex-1 ml-4">
        <select 
          v-model="activePageId" 
          class="block w-full pl-3 pr-10 py-1 text-xs border border-gray-300 focus:outline-none rounded-md bg-white shadow-sm appearance-none"
        >
          <option 
            v-for="(page, index) in associatedPages" 
            :key="getPageId(page)" 
            :value="getPageId(page)"
          >
            {{ getPageDisplayText(page, index) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tabs for different metric sections -->
    <div class="mb-4">
      <div class="flex border-b">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id" 
          class="py-2 px-4 text-sm font-medium -mb-px border-b-2 focus:outline-none"
          :class="activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Content based on active tab -->
    <div v-if="activePage">
      <!-- Content Quality Tab -->
      <div v-show="activeTab === 'quality'" class="space-y-4">
        <!-- Content Quality Metrics -->
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="grid grid-cols-2 gap-4">
            <!-- Content Optimization Score -->
            <div class="col-span-2 md:col-span-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-darkGray">Content Optimization</span>
                <span class="text-sm font-medium" :class="getScoreColor(getContentOptimizationScore())">
                  {{ getContentOptimizationScore() }}/10
                </span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full" 
                    :style="`width: ${getContentOptimizationScore() * 10}%`"
                    :class="getScoreBarColor(getContentOptimizationScore())"></div>
              </div>
            </div>
            
            <!-- Content Uniqueness -->
            <div class="col-span-2 md:col-span-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-darkGray">Content Uniqueness</span>
                <span class="text-sm font-medium" :class="getScoreColor(getContentUniquenessScore())">
                  {{ getContentUniquenessScore() }}/10
                </span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full" 
                    :style="`width: ${getContentUniquenessScore() * 10}%`"
                    :class="getScoreBarColor(getContentUniquenessScore())"></div>
              </div>
            </div>
            
            <!-- Content Depth Score -->
            <div class="col-span-2 md:col-span-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-darkGray">Content Depth</span>
                <span class="text-sm font-medium" :class="getScoreColor(getContentDepthScore())">
                  {{ getContentDepthScore() }}/10
                </span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full" 
                    :style="`width: ${getContentDepthScore() * 10}%`"
                    :class="getScoreBarColor(getContentDepthScore())"></div>
              </div>
            </div>
            
            <!-- Readability Score -->
            <div class="col-span-2 md:col-span-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-darkGray">Readability</span>
                <span class="text-sm font-medium" :class="getScoreColor(getReadabilityScore())">
                  {{ getReadabilityScore() }}/10
                </span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full" 
                    :style="`width: ${getReadabilityScore() * 10}%`"
                    :class="getScoreBarColor(getReadabilityScore())"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- AI Analysis Notes -->
        <div v-if="getAnalysisNotes()" class="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h5 class="text-sm font-semibold text-blue-800 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            AI Content Analysis
          </h5>
          <p class="text-sm text-blue-700">{{ getAnalysisNotes() }}</p>
        </div>
      </div>
      
      <!-- Structure Tab -->
      <div v-show="activeTab === 'structure'" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Word Count -->
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500">Words</div>
                <div class="text-sm font-bold text-darkNavy">{{ getWordCount() }}</div>
              </div>
            </div>
            
            <!-- Image Count -->
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <div class="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500">Images</div>
                <div class="text-sm font-bold text-darkNavy">{{ getImageCount() }}</div>
              </div>
            </div>
            
            <!-- Lists -->
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <div class="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500">Lists</div>
                <div class="text-sm font-bold text-darkNavy">{{ getTotalListCount() }}</div>
              </div>
            </div>
            
            <!-- Tables -->
            <div class="p-3 bg-gray-50 rounded-lg flex items-center">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500">Tables</div>
                <div class="text-sm font-bold text-darkNavy">{{ getTableCount() }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- List Details -->
        <div class="bg-white p-4 rounded-lg shadow-sm" v-if="getTotalListCount() > 0">
          <h6 class="text-xs font-semibold mb-2 text-darkNavy">List Breakdown</h6>
          <div class="flex space-x-4">
            <div class="flex-1 bg-gray-50 p-2 rounded text-center">
              <div class="text-xs text-gray-500">Ordered Lists</div>
              <div class="text-sm font-semibold">{{ getOrderedListCount() }}</div>
            </div>
            <div class="flex-1 bg-gray-50 p-2 rounded text-center">
              <div class="text-xs text-gray-500">Unordered Lists</div>
              <div class="text-sm font-semibold">{{ getUnorderedListCount() }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Technical Tab -->
      <div v-show="activeTab === 'technical'" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="grid grid-cols-2 gap-4">
            <!-- HTML Structure Score -->
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">HTML Structure</div>
              <div class="text-xl font-bold text-darkNavy">{{ getHTMLStructureScore() }}/10</div>
            </div>
            
            <!-- Accessibility Score -->
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">Accessibility</div>
              <div class="text-xl font-bold text-darkNavy">{{ getAccessibilityScore() }}/10</div>
            </div>
            
            <!-- Page Speed Score -->
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">Page Speed</div>
              <div class="text-xl font-bold text-darkNavy">{{ getPageSpeedScore() }}/100</div>
            </div>
            
            <!-- SEO Features -->
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">SEO Features</div>
              <div class="flex space-x-1 mt-1">
                <span class="px-2 py-1 text-xs rounded-full" 
                    :class="hasSchemaMarkup() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'">
                  Schema
                </span>
                <span class="px-2 py-1 text-xs rounded-full" 
                    :class="hasSemanticHTML() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'">
                  Semantic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Response Tab -->
      <div v-show="activeTab === 'response'" class="space-y-4">
        <div v-if="activeQuery" class="bg-white p-4 rounded-lg border border-gray-200 text-sm max-h-64 overflow-y-auto">
          <div class="text-darkGray">
            <div class="font-medium mb-2">{{ activeQuery.query_text }}</div>
            <div v-if="getResponseText()" v-html="formatMarkdown(getResponseText())"></div>
            <div v-else class="text-gray-500 italic text-center py-4">No response data available for this platform</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- No Content Metrics Message (shown when no pages are available) -->
    <div v-if="!activePage" class="text-center py-8 bg-white rounded-lg shadow-sm">
      <div class="inline-block mb-4 rounded-full bg-gray-100 p-3">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h5 class="text-lg font-semibold text-darkNavy mb-2">No Content Metrics Available</h5>
      <p class="text-sm text-gray-500">Select a query with associated pages to view content metrics</p>
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

// Tab management
const tabs = [
  { id: 'quality', label: 'Content Quality' },
  { id: 'structure', label: 'Structure' },
  { id: 'technical', label: 'Technical' },
  { id: 'response', label: 'Response' }
];
const activeTab = ref('quality');

// Platform options
const platforms = [
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'perplexity', label: 'Perplexity' }
];

// State
const activePlatform = ref('chatgpt'); // Start with ChatGPT selected
const selectedQueryText = ref(''); // Store the selected query text
const activePageId = ref('');
const showResponse = ref(false);
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

// Get all unique queries, filtered by mentions if filters are enabled
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

// Get validated associated pages 
const associatedPages = computed(() => {
  if (!activeQuery.value || !activeQuery.value.associated_pages) {
    return [];
  }
  return activeQuery.value.associated_pages;
});

// Check if there are any associated pages
const hasAssociatedPages = computed(() => {
  return associatedPages.value.length > 0;
});

// Get the active page
const activePage = computed(() => {
  if (!activeQuery.value || !activePageId.value || !hasAssociatedPages.value) return null;
  
  return associatedPages.value.find(page => getPageId(page) === activePageId.value) || null;
});

// Watch for changes in client data
watch(() => props.clientData, () => {
  processQueryData();
  
  // Set default selection if available
  if (filteredQueries.value.length > 0 && !selectedQueryText.value) {
    selectedQueryText.value = filteredQueries.value[0].text;
  }
}, { immediate: true, deep: true });

// Set initial page ID when query changes
watch(activeQuery, (newQuery) => {
  if (newQuery && newQuery.associated_pages && newQuery.associated_pages.length > 0) {
    activePageId.value = getPageId(newQuery.associated_pages[0]);
  } else {
    activePageId.value = '';
  }
});

// Watch for platform changes to reset query if needed for the new platform
watch(activePlatform, () => {
  if (selectedQueryText.value && queryMap.value.has(selectedQueryText.value)) {
    const platformData = queryMap.value.get(selectedQueryText.value);
    if (!platformData[activePlatform.value]) {
      // Current selection doesn't have data for the new platform,
      // find a query that does have data for this platform
      const queriesForPlatform = filteredQueries.value.filter(query => 
        queryMap.value.has(query.text) && 
        queryMap.value.get(query.text)[activePlatform.value]
      );
      
      if (queriesForPlatform.length > 0) {
        selectedQueryText.value = queriesForPlatform[0].text;
      }
    }
  }
});

// Helper function to format markdown to HTML
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

// Helper function to get query response
const getResponseText = () => {
  if (!activeQuery.value) return '';
  
  if (activePlatform.value === 'perplexity') {
    // Check both direct property and query_metrics
    return activeQuery.value.perplexity_response || 
           activeQuery.value.query_metrics?.perplexity_response || '';
  } 
  else if (activePlatform.value === 'chatgpt') {
    // Check both direct property and query_metrics
    return activeQuery.value.chatgpt_response || 
           activeQuery.value.query_metrics?.chatgpt_response || '';
  }
  
  return '';
};

// Helper function to get a unique ID for a page
const getPageId = (page) => {
  if (!page) return 'unknown';
  
  // Try to use page_analysis_id first, fall back to query_id + index
  return page.page_analysis_id || `${page.query_id || 'unknown'}-page`;
};

// Helper function to get display text for a page
const getPageDisplayText = (page, index) => {
  if (!page) return 'Unknown Page';
  
  // Use citation_url if available, otherwise fallback to Page X
  if (page.citation_url) {
    return truncateText(page.citation_url, 60);
  }
  
  return `Page ${index + 1}`;
};

// Helper function for truncating text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Content metrics helper functions
const getContentOptimizationScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.content_optimization_score || null;
};

const getContentUniquenessScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.content_uniqueness || null;
};

const getContentDepthScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.content_depth_score || null;
};

const getReadabilityScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.readability_score || null;
};

const getWordCount = () => {
  if (!activePage.value) return 0;
  return activePage.value.word_count || null;
};

const getImageCount = () => {
  if (!activePage.value) return 0;
  return activePage.value.image_count || null;
};

const getUnorderedListCount = () => {
  if (!activePage.value) return 0;
  return activePage.value.has_unordered_list_count || null;
};

const getOrderedListCount = () => {
  if (!activePage.value) return 0;
  return activePage.value.has_ordered_list_count || null;
};

const getTotalListCount = () => {
  return getUnorderedListCount() + getOrderedListCount();
};

const getTableCount = () => {
  if (!activePage.value) return 0;
  return activePage.value.has_table_count || null;
};

const getHTMLStructureScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.html_structure_score || null;
};

const getAccessibilityScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.accessibility_score || null;
};

const getPageSpeedScore = () => {
  if (!activePage.value) return 0;
  return activePage.value.page_speed_score || null;
};

// Get the analysis notes from the active page
const getAnalysisNotes = () => {
  if (!activePage.value) return '';
  return activePage.value.analysis_notes || '';
};

const hasSchemaMarkup = () => {
  if (!activePage.value) return false;
  return activePage.value.schema_markup_present === true || 
         activePage.value.schema_markup_present === "checked";
};

const hasSemanticHTML = () => {
  if (!activePage.value) return false;
  return activePage.value.semantic_html_usage === true || 
         activePage.value.semantic_html_usage === "checked";
};

// Helper functions for styling
const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-blue-600';
  if (score >= 4) return 'text-yellow-600';
  return 'text-red-600';
};

const getScoreBarColor = (score) => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-blue-500';
  if (score >= 4) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Initialize component
onMounted(() => {
  console.log("ContentOptimizationMetric mounted with client data:", props.clientData);
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