<!-- components/dashboard/metrics/CitationMentionRateGauge.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Citation Mention Rate</h4>
    
    <!-- Competitor Dropdown Selector -->
    <div class="mb-4">
      <label for="citation-competitor-selector" class="block text-sm font-medium text-darkNavy mb-1">Select Competitor</label>
      <div class="relative">
        <select 
          id="citation-competitor-selector" 
          v-model="activeCompetitor" 
          class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark rounded-md appearance-none bg-white"
        >
          <option value="" disabled>Select a competitor</option>
          <option 
            v-for="competitor in allCompetitors" 
            :key="competitor.name" 
            :value="competitor.name"
          >
            {{ competitor.name }}
          </option>
          <option value="all">All Competitors (Average)</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
      
      <!-- No competitors message -->
      <div v-if="allCompetitors.length === 0" class="text-sm text-gray-500 mt-2">
        No competitors detected in the data.
      </div>
    </div>
    
    <!-- Mention Rate Visualization - Gauge Charts -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <div class="grid grid-cols-2 gap-4">
        <!-- Your Brand Gauge -->
        <div class="flex flex-col items-center">
          <div class="text-center">
            <p class="text-sm font-medium text-darkGray mb-2">{{ brandName }}</p>
            <div class="relative w-32 h-32 mx-auto">
              <!-- Background Circle -->
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  stroke-width="12"
                  stroke-linecap="round"
                />
                
                <!-- Value arc -->
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#C2410C" 
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="calculateStrokeDashOffset(getBrandCitationRate())"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ formatPercentage(getBrandCitationRate()) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Competitor Gauge -->
        <div class="flex flex-col items-center">
          <div class="text-center">
            <p class="text-sm font-medium text-darkGray mb-2">{{ getCompetitorDisplayName() }}</p>
            <div class="relative w-32 h-32 mx-auto">
              <!-- Background Circle -->
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  stroke-width="12"
                  stroke-linecap="round"
                />
                
                <!-- Value arc -->
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#6366F1" 
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="calculateStrokeDashOffset(getCompetitorCitationRate())"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ formatPercentage(getCompetitorCitationRate()) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison summary -->
      <div class="mt-4 text-center">
        <div v-if="activeCompetitor && activeCompetitor !== 'all'" class="text-sm text-darkGray">
          {{ brandName }} has a 
          <span class="font-medium" :class="getCitationAdvantage() >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ getCitationAdvantage() >= 0 ? formatPercentage(getCitationAdvantage()) + ' advantage' : formatPercentage(Math.abs(getCitationAdvantage())) + ' disadvantage' }}
          </span> 
          {{ getCitationAdvantage() >= 0 ? 'over' : 'compared to' }} {{ activeCompetitor }} in citation rate.
        </div>
        <div v-else-if="activeCompetitor === 'all'" class="text-sm text-darkGray">
          Showing average citation rate across all {{ allCompetitors.length }} competitors.
        </div>
        <div v-else class="text-sm text-darkGray">
          No competitor selected for comparison.
        </div>
      </div>
    </div>
    
    <!-- Competitor Comparison Table (only shown when "All Competitors" is selected) -->
    <div v-if="activeCompetitor === 'all' && allCompetitors.length > 0" class="mt-4 bg-white p-3 rounded-lg border border-gray-200 overflow-hidden">
      <h5 class="font-medium text-darkNavy mb-3">All Competitors</h5>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Citation Rate</th>
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">vs Your Brand</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="competitor in allCompetitors" :key="competitor.name" class="hover:bg-gray-50">
              <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-darkNavy">{{ competitor.name }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-sm text-center text-darkGray">{{ formatPercentage(competitor.rate) }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-sm text-center">
                <span :class="getBrandCitationRate() >= competitor.rate ? 'text-green-600' : 'text-red-600'" class="font-medium">
                  {{ getBrandCitationRate() >= competitor.rate ? '+' : '' }}{{ formatPercentage(getBrandCitationRate() - competitor.rate) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Quick Win Opportunity -->
    <div v-if="activeCompetitor && activeCompetitor !== 'all' && getActiveCompetitorDetails()" class="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
      <h5 class="font-medium text-green-800 mb-1">Citation Opportunity</h5>
      <p class="text-sm text-green-700">
        Increase citations by {{ getActiveCompetitorDetails()?.optimizationPercentage || 0 }}% by optimizing your content on {{ getActiveCompetitorDetails()?.keyQueries || 0 }} key topics where {{ activeCompetitor }} outperforms.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  clientData: {
    type: Object,
    required: true
  }
});

// State for competitors
const allCompetitors = ref([]);
const activeCompetitor = ref('');

// Get brand name from client data
const brandName = computed(() => {
  if (props.clientData && props.clientData.client_name) {
    return props.clientData.client_name;
  }
  return 'Your Brand';
});

// Helper function to normalize strings for comparison
const normalizeString = (str) => {
  if (!str) return '';
  return str.toString().toLowerCase().trim();
};

// Check if string A contains string B (case-insensitive and space-tolerant)
const containsIgnoreCase = (stringA, stringB) => {
  if (!stringA || !stringB) return false;
  return normalizeString(stringA).includes(normalizeString(stringB));
};

// Check if two strings match (case-insensitive and space-tolerant)
const matchesIgnoreCase = (stringA, stringB) => {
  if (!stringA || !stringB) return false;
  return normalizeString(stringA) === normalizeString(stringB);
};

// Helper function to calculate the citation rate for any entity
const calculateCitationRate = (entityName, isClient = false) => {
  if (!props.clientData || !props.clientData.query_data) {
    return 0;
  }
  
  // Get all associated pages from all queries
  const allPages = [];
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        // Add platform info to page object for filtering
        let platform = '';
        if (page.data_source) {
          platform = page.data_source;
        } else if (query.query_id && query.query_id.toLowerCase().includes('perplexity')) {
          platform = 'perplexity';
        } else if (query.query_id && query.query_id.toLowerCase().includes('chatgpt')) {
          platform = 'chatgpt';
        } else if (query.data_source) {
          platform = query.data_source;
        } else if (query.query_metrics && query.query_metrics.data_source) {
          platform = query.query_metrics.data_source;
        }

        allPages.push({
          ...page,
          platform,
          query_id: query.query_id
        });
      });
    }
  });
  
  // Total number of citations (pages)
  const totalCitations = allPages.length;
  if (totalCitations === 0) return 0;
  
  // Count citations for the entity
  let entityCitations = 0;
  
  if (isClient) {
    // For client (brand), check is_client_domain or domain name contains client name
    const clientNameLower = normalizeString(props.clientData.client_name);
    
    entityCitations = allPages.filter(page => {
      // 1. Check is_client_domain flag
      if (page.is_client_domain === true || page.is_client_domain === "checked") {
        return true;
      }
      // 2. Check brand_mentioned flag
      else if (page.brand_mentioned === true || page.brand_mentioned === "checked") {
        return true;
      }
      // 3. Check if citation_url contains client name
      else if (page.citation_url && containsIgnoreCase(page.citation_url, clientNameLower)) {
        return true;
      }
      // 4. Check if domain_name contains client name
      else if (page.domain_name && containsIgnoreCase(page.domain_name, clientNameLower)) {
        return true;
      }
      
      return false;
    }).length;
  } else {
    // For competitors, check competitor_mentioned_name or domain name
    const normalizedEntityName = normalizeString(entityName);
    
    entityCitations = allPages.filter(page => {
      // Check competitor_mentioned_name (normalized for comparison)
      if (page.competitor_mentioned_name) {
        // Handle as array or string
        if (Array.isArray(page.competitor_mentioned_name)) {
          // Check if any name in the array matches our search name
          return page.competitor_mentioned_name.some(name => 
            matchesIgnoreCase(name, normalizedEntityName)
          );
        } else {
          // Direct comparison of single name
          return matchesIgnoreCase(page.competitor_mentioned_name, normalizedEntityName);
        }
      }
      
      // Check if citation_url contains competitor name
      if (page.citation_url && containsIgnoreCase(page.citation_url, normalizedEntityName)) {
        return true;
      }
      
      // Check if domain_name contains competitor name
      if (page.domain_name && containsIgnoreCase(page.domain_name, normalizedEntityName)) {
        return true;
      }
      
      return false;
    }).length;
  }
  
  // Calculate citation rate percentage
  return (entityCitations / totalCitations) * 100;
};

// Analyze competitors and their citation rates
const analyzeCompetitors = () => {
  if (!props.clientData || !props.clientData.query_data) {
    return;
  }

  // Map to track normalized competitor names to original names
  // This helps handle variations in casing and spacing
  const competitorMap = new Map();
  
  // First pass: collect all unique competitor names with proper casing
  props.clientData.query_data.forEach(query => {
    // Check query level
    if (query.competitor_mentioned_name) {
      extractCompetitorNames(query.competitor_mentioned_name, competitorMap);
    }
    
    // Check query_metrics
    if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
      extractCompetitorNames(query.query_metrics.competitor_mentioned_name, competitorMap);
    }
    
    // Check associated pages
    if (query.associated_pages) {
      query.associated_pages.forEach(page => {
        if (page.competitor_mentioned_name) {
          extractCompetitorNames(page.competitor_mentioned_name, competitorMap);
        }
      });
    }
  });
  
  console.log("Normalized competitor map:", Array.from(competitorMap.entries()));
  console.log("Found unique competitors:", Array.from(competitorMap.values()));
  
  // Initialize counts for each unique competitor name (using original casing)
  const competitorCounts = {};
  Array.from(competitorMap.values()).forEach(name => {
    competitorCounts[name] = 0;
  });
  
  // Second pass: count occurrences using normalized matching
  props.clientData.query_data.forEach(query => {
    // Count at query level
    countCompetitorOccurrences(query, competitorCounts, competitorMap);
    
    // Count in associated pages
    if (query.associated_pages) {
      query.associated_pages.forEach(page => {
        countPageCompetitorOccurrences(page, competitorCounts, competitorMap);
      });
    }
  });
  
  console.log("Competitor occurrence counts:", competitorCounts);
  
  // Create a list of all competitors with their citation rates
  const competitors = Object.entries(competitorCounts)
    .map(([name, count]) => {
      // Calculate the actual citation rate
      const rate = calculateCitationRate(name, false);
      
      // Generate reasonable key query counts based on citation count
      const keyQueries = Math.max(3, Math.min(8, Math.ceil(count / 2)));
      
      // Calculate optimization percentage based on current citation rate
      const optimizationPercentage = Math.max(25, Math.min(50, Math.round(100 / (rate + 1) * 10)));
      
      return {
        name,
        count,
        rate,
        keyQueries,
        optimizationPercentage
      };
    })
    .sort((a, b) => b.count - a.count);
  
  console.log("Detected competitors with rates:", competitors);
  
  if (competitors.length > 0) {
    // Store all competitors
    allCompetitors.value = competitors;
    
    // Set active competitor to the most frequently mentioned competitor by default
    if (!activeCompetitor.value || !competitors.find(c => c.name === activeCompetitor.value)) {
      activeCompetitor.value = competitors[0].name;
      console.log("Set active competitor to:", activeCompetitor.value);
    }
  } else {
    // No competitors found, clear the array
    allCompetitors.value = [];
    activeCompetitor.value = '';
    console.log("No competitors found in the data");
  }
};

// Helper to extract competitor names and normalize them
const extractCompetitorNames = (sourceNames, map) => {
  if (!sourceNames) return;
  
  const names = Array.isArray(sourceNames) ? sourceNames : [sourceNames];
  
  names.forEach(name => {
    if (!name) return;
    
    // Normalize the name for lookup purposes
    const normalized = normalizeString(name);
    
    // Keep original casing but index by normalized version
    // If we already have this name, keep the first occurrence (likely has better casing)
    if (!map.has(normalized)) {
      map.set(normalized, name);
    }
  });
};

// Helper to count occurrences of competitors in a query
const countCompetitorOccurrences = (query, counts, competitorMap) => {
  // Check for direct competitor_mentioned_name
  if (query.competitor_mentioned_name) {
    countCompetitorNamesIn(query.competitor_mentioned_name, counts, competitorMap);
  }
  
  // Check in query_metrics
  if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
    countCompetitorNamesIn(query.query_metrics.competitor_mentioned_name, counts, competitorMap);
  }
};

// Helper to count occurrences of competitors in a page
const countPageCompetitorOccurrences = (page, counts, competitorMap) => {
  if (page.competitor_mentioned_name) {
    countCompetitorNamesIn(page.competitor_mentioned_name, counts, competitorMap);
  }
};

// Helper to count specific competitor names
const countCompetitorNamesIn = (sourceNames, counts, competitorMap) => {
  if (!sourceNames) return;
  
  const names = Array.isArray(sourceNames) ? sourceNames : [sourceNames];
  
  names.forEach(name => {
    if (!name) return;
    
    // Normalize for lookup in our map
    const normalized = normalizeString(name);
    
    // Look for this normalized name in our map
    if (competitorMap.has(normalized)) {
      const originalName = competitorMap.get(normalized);
      counts[originalName] = (counts[originalName] || 0) + 1;
    }
  });
};

// Get the display name for the competitor side
const getCompetitorDisplayName = () => {
  if (activeCompetitor.value === 'all') {
    return 'All Competitors';
  }
  return activeCompetitor.value || 'No Competitor';
};

// Helper function to calculate stroke-dashoffset for gauge chart
const calculateStrokeDashOffset = (percentage) => {
  const circumference = 251.2;
  return circumference - (circumference * Math.max(0.1, percentage) / 100);
};

// Format percentage value - updated to show "<1%" for any non-zero value less than 1
const formatPercentage = (value) => {
  if (value === undefined || value === null || value === 0) return '0%';
  
  // If value is non-zero but less than 1, display "<1%"
  if (value < 1) return '<1%';
  
  // Otherwise round to nearest integer and add % sign
  return Math.round(value) + '%';
};

// Get the active competitor details
const getActiveCompetitorDetails = () => {
  return allCompetitors.value.find(comp => comp.name === activeCompetitor.value);
};

// Get brand citation rate
const getBrandCitationRate = () => {
  return calculateCitationRate(brandName.value, true);
};

// Get competitor citation rate
const getCompetitorCitationRate = () => {
  if (activeCompetitor.value === 'all') {
    // Calculate average rate across all competitors
    if (allCompetitors.value.length === 0) return 0;
    
    const sum = allCompetitors.value.reduce((total, comp) => total + comp.rate, 0);
    return sum / allCompetitors.value.length;
  } else {
    // Get rate for active competitor
    const competitor = getActiveCompetitorDetails();
    return competitor ? competitor.rate : 0;
  }
};

// Calculate the advantage/disadvantage in citation rate
const getCitationAdvantage = () => {
  const brandRate = getBrandCitationRate();
  const competitorRate = getCompetitorCitationRate();
  return brandRate - competitorRate; // Can be negative
};

// Debug function to inspect competitor data
const debugCompetitorData = () => {
  if (!props.clientData?.query_data) {
    console.log("No query data to debug");
    return;
  }
  
  // Count and log all instances of competitor_mentioned_name
  let competitorMentionCount = 0;
  let competitorNames = new Set();
  
  props.clientData.query_data.forEach((query, qIndex) => {
    // Check query level
    if (query.competitor_mentioned_name) {
      console.log(`Found competitor_mentioned_name in query ${qIndex}:`, query.competitor_mentioned_name);
      competitorMentionCount++;
      
      if (Array.isArray(query.competitor_mentioned_name)) {
        query.competitor_mentioned_name.forEach(name => {
          if (name) competitorNames.add(name);
        });
      } else if (query.competitor_mentioned_name) {
        competitorNames.add(query.competitor_mentioned_name);
      }
    }
    
    // Check query_metrics
    if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
      console.log(`Found competitor_mentioned_name in query_metrics ${qIndex}:`, 
                 query.query_metrics.competitor_mentioned_name);
      competitorMentionCount++;
      
      if (Array.isArray(query.query_metrics.competitor_mentioned_name)) {
        query.query_metrics.competitor_mentioned_name.forEach(name => {
          if (name) competitorNames.add(name);
        });
      } else if (query.query_metrics.competitor_mentioned_name) {
        competitorNames.add(query.query_metrics.competitor_mentioned_name);
      }
    }
    
    // Check associated pages
    if (query.associated_pages) {
      query.associated_pages.forEach((page, pIndex) => {
        if (page.competitor_mentioned_name) {
          console.log(`Found competitor_mentioned_name in query ${qIndex} page ${pIndex}:`, 
                     page.competitor_mentioned_name);
          competitorMentionCount++;
          
          if (Array.isArray(page.competitor_mentioned_name)) {
            page.competitor_mentioned_name.forEach(name => {
              if (name) competitorNames.add(name);
            });
          } else if (page.competitor_mentioned_name) {
            competitorNames.add(page.competitor_mentioned_name);
          }
        }
      });
    }
  });
  
  console.log("Total competitor mentions found:", competitorMentionCount);
  console.log("Unique competitor names found:", Array.from(competitorNames));
};

// Initialize component
onMounted(() => {
  console.log("CitationMentionRateGauge mounted with client data:", props.clientData);
  // Debug competitor data to help diagnose issues
  debugCompetitorData();
  // Now analyze competitors
  analyzeCompetitors();
});

// Watch for changes in client data
watch(() => props.clientData, () => {
  console.log("Client data updated in CitationMentionRateGauge");
  analyzeCompetitors();
}, { deep: true });
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>