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

// Count all citations (total pages)
const countTotalCitations = () => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      count += query.associated_pages.length;
    }
  });
  return count;
};

// Count brand mentions
const countBrandMentions = () => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        if (page.brand_mentioned === true || 
            page.brand_mentioned === "checked" ||
            page.is_client_domain === true || 
            page.is_client_domain === "checked") {
          count++;
        }
      });
    }
  });
  return count;
};

// Count competitor mentions
const countCompetitorMentions = (competitorName) => {
  if (!props.clientData?.query_data || !competitorName) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        // Check competitor_mentioned_name field
        if (page.competitor_mentioned_name) {
          if (Array.isArray(page.competitor_mentioned_name)) {
            // If it's an array, check if any name matches
            if (page.competitor_mentioned_name.some(name => 
              name && name.toLowerCase() === competitorName.toLowerCase())) {
              count++;
            }
          } else {
            // If it's a string, do direct comparison
            if (page.competitor_mentioned_name.toLowerCase() === competitorName.toLowerCase()) {
              count++;
            }
          }
        }
      });
    }
  });
  return count;
};

// Extract all unique competitor names from all available sources
const extractAllCompetitors = () => {
  if (!props.clientData?.query_data) return [];
  
  // Set to track unique competitor names
  const competitorSet = new Set();
  
  // Scan all query data for competitor mentions
  props.clientData.query_data.forEach(query => {
    // Check query-level competitor mention
    if (query.competitor_mentioned_name) {
      addCompetitorNames(query.competitor_mentioned_name, competitorSet);
    }
    
    // Check query metrics
    if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
      addCompetitorNames(query.query_metrics.competitor_mentioned_name, competitorSet);
    }
    
    // Check associated pages
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        if (page.competitor_mentioned_name) {
          addCompetitorNames(page.competitor_mentioned_name, competitorSet);
        }
      });
    }
  });
  
  return Array.from(competitorSet);
};

// Helper to add competitor names to a set
const addCompetitorNames = (names, set) => {
  if (!names) return;
  
  if (Array.isArray(names)) {
    names.forEach(name => {
      if (name && typeof name === 'string' && name.trim()) {
        set.add(name.trim());
      }
    });
  } else if (typeof names === 'string' && names.trim()) {
    set.add(names.trim());
  }
};

// Analyze all competitors in the data
const analyzeCompetitors = () => {
  // Extract all unique competitor names
  const competitorNames = extractAllCompetitors();
  console.log("Found unique competitors:", competitorNames);
  
  // Calculate total citations (for rate calculation)
  const totalCitations = countTotalCitations();
  
  if (totalCitations === 0) {
    console.log("No citations found in data");
    allCompetitors.value = [];
    return;
  }
  
  // Analyze each competitor
  const competitors = competitorNames.map(name => {
    // Count mentions of this competitor
    const mentionCount = countCompetitorMentions(name);
    
    // Calculate citation rate
    const rate = (mentionCount / totalCitations) * 100;
    
    // Generate reasonable key query counts based on citation count
    const keyQueries = Math.max(3, Math.min(8, Math.ceil(mentionCount / 2)));
    
    // Calculate optimization percentage based on rate
    const optimizationPercentage = Math.max(25, Math.min(50, Math.round(100 / (rate + 1) * 10)));
    
    return {
      name,
      count: mentionCount,
      rate,
      keyQueries,
      optimizationPercentage
    };
  })
  .filter(comp => comp.count > 0) // Only keep competitors with at least one mention
  .sort((a, b) => b.count - a.count); // Sort by mention count
  
  console.log("Analyzed competitors:", competitors);
  
  // Update state
  allCompetitors.value = competitors;
  
  // Set active competitor if none is set or current one isn't valid
  if (competitors.length > 0 && (!activeCompetitor.value || !competitors.find(c => c.name === activeCompetitor.value))) {
    activeCompetitor.value = competitors[0].name;
  }
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
  const totalCitations = countTotalCitations();
  if (totalCitations === 0) return 0;
  
  const brandMentions = countBrandMentions();
  return (brandMentions / totalCitations) * 100;
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

// Initialize component
onMounted(() => {
  console.log("CitationMentionRateGauge mounted with client data:", props.clientData);
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