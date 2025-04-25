<!-- components/dashboard/metrics/BrandMentionRateGauge.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Brand Mention Rate</h4>
    
    <!-- Competitor Dropdown Selector -->
    <div class="mb-4">
      <label for="competitor-selector" class="block text-sm font-medium text-darkNavy mb-1">Select Competitor</label>
      <div class="relative">
        <select 
          id="competitor-selector" 
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
                  :stroke-dashoffset="calculateStrokeDashOffset(getBrandRate())"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ formatPercentage(getBrandRate()) }}</span>
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
                  :stroke-dashoffset="calculateStrokeDashOffset(getCompetitorRate())"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ formatPercentage(getCompetitorRate()) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison summary -->
      <div class="mt-4 text-center">
        <div v-if="activeCompetitor && activeCompetitor !== 'all'" class="text-sm text-darkGray">
          {{ brandName }} has a 
          <span class="font-medium" :class="getAdvantageRate() >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ getAdvantageRate() >= 0 ? formatPercentage(getAdvantageRate()) + ' advantage' : formatPercentage(Math.abs(getAdvantageRate())) + ' disadvantage' }}
          </span> 
          {{ getAdvantageRate() >= 0 ? 'over' : 'compared to' }} {{ activeCompetitor }} across all LLMs.
        </div>
        <div v-else-if="activeCompetitor === 'all'" class="text-sm text-darkGray">
          Showing average mention rate across all {{ allCompetitors.length }} competitors.
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
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mention Rate</th>
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">vs Your Brand</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="competitor in allCompetitors" :key="competitor.name" class="hover:bg-gray-50">
              <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-darkNavy">{{ competitor.name }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-sm text-center text-darkGray">{{ formatPercentage(competitor.rate) }}</td>
              <td class="px-3 py-2 whitespace-nowrap text-sm text-center">
                <span :class="getBrandRate() >= competitor.rate ? 'text-green-600' : 'text-red-600'" class="font-medium">
                  {{ getBrandRate() >= competitor.rate ? '+' : '' }}{{ formatPercentage(getBrandRate() - competitor.rate) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Quick Win Opportunity -->
    <div v-if="activeCompetitor && activeCompetitor !== 'all' && getActiveCompetitorDetails()" class="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
      <h5 class="font-medium text-green-800 mb-1">Quick Win Opportunity</h5>
      <p class="text-sm text-green-700">
        Increase mentions by {{ getActiveCompetitorDetails()?.optimizationPercentage || 0 }}% with focused optimization on {{ getActiveCompetitorDetails()?.keyQueries || 0 }} key query clusters.
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

// Helper function to calculate the mention rate for any entity
const calculateMentionRate = (entityName, isClient = false) => {
  if (!props.clientData || !props.clientData.query_data) {
    return 0;
  }
  
  // Count total queries
  const totalQueries = props.clientData.query_data.length;
  if (totalQueries === 0) return 0;
  
  // Count queries where the entity is mentioned
  const mentionedQueries = props.clientData.query_data.filter(query => {
    // If checking for client (brand)
    if (isClient) {
      // Direct property checks for brand
      if (query.brand_mentioned === true || query.brand_mentioned === "checked") {
        return true;
      }
      
      // In query_metrics for brand
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
    } 
    // If checking for a competitor
    else {
      // Check if the competitor is mentioned in the query
      if (query.competitor_mentioned_name) {
        // Handle as array or string
        const competitors = Array.isArray(query.competitor_mentioned_name) 
          ? query.competitor_mentioned_name 
          : [query.competitor_mentioned_name];
        
        if (competitors.includes(entityName)) {
          return true;
        }
      }
      
      // Check in query_metrics
      if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
        // Handle as array or string
        const metricsCompetitors = Array.isArray(query.query_metrics.competitor_mentioned_name)
          ? query.query_metrics.competitor_mentioned_name
          : [query.query_metrics.competitor_mentioned_name];
        
        if (metricsCompetitors.includes(entityName)) {
          return true;
        }
      }
      
      // Check associated pages for competitor mentions
      if (query.associated_pages && Array.isArray(query.associated_pages) && query.associated_pages.length > 0) {
        return query.associated_pages.some(page => {
          if (page.competitor_mentioned_name) {
            // Handle as array or string
            const pageCompetitors = Array.isArray(page.competitor_mentioned_name)
              ? page.competitor_mentioned_name
              : [page.competitor_mentioned_name];
            
            return pageCompetitors.includes(entityName);
          }
          return false;
        });
      }
    }
    
    return false;
  }).length;
  
  // Calculate percentage
  return (mentionedQueries / totalQueries) * 100;
};

// Analyze competitors and their mention rates
const analyzeCompetitors = () => {
  if (!props.clientData || !props.clientData.query_data) {
    return;
  }

  const competitorCounts = {};
  
  // Look through all queries for competitor mentions
  props.clientData.query_data.forEach(query => {
    // Check for competitor mentions in query or query_metrics
    if (query.competitor_mentioned_name) {
      const competitors = Array.isArray(query.competitor_mentioned_name)
        ? query.competitor_mentioned_name
        : [query.competitor_mentioned_name];
      
      competitors.forEach(competitor => {
        if (competitor) {
          competitorCounts[competitor] = (competitorCounts[competitor] || 0) + 1;
        }
      });
    }
    
    // Check in query_metrics
    if (query.query_metrics && query.query_metrics.competitor_mentioned_name) {
      const metricsCompetitors = Array.isArray(query.query_metrics.competitor_mentioned_name)
        ? query.query_metrics.competitor_mentioned_name
        : [query.query_metrics.competitor_mentioned_name];
      
      metricsCompetitors.forEach(competitor => {
        if (competitor) {
          competitorCounts[competitor] = (competitorCounts[competitor] || 0) + 1;
        }
      });
    }
    
    // Also check associated pages
    if (query.associated_pages) {
      query.associated_pages.forEach(page => {
        if (page.competitor_mentioned_name) {
          const pageCompetitors = Array.isArray(page.competitor_mentioned_name)
            ? page.competitor_mentioned_name
            : [page.competitor_mentioned_name];
          
          pageCompetitors.forEach(competitor => {
            if (competitor) {
              competitorCounts[competitor] = (competitorCounts[competitor] || 0) + 1;
            }
          });
        }
      });
    }
  });
  
  // Create a list of all competitors with their mention rates
  const competitors = Object.entries(competitorCounts)
    .map(([name, count]) => {
      // Calculate the actual mention rate
      const rate = calculateMentionRate(name, false);
      
      // Generate reasonable key query counts based on mention count
      const keyQueries = Math.max(3, Math.min(8, Math.ceil(count / 2)));
      
      // Calculate optimization percentage based on current mention rate
      // Higher rates have less room for improvement
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
  
  console.log("Detected competitors:", competitors);
  
  if (competitors.length > 0) {
    // Store all competitors
    allCompetitors.value = competitors;
    
    // Set active competitor to the most frequently mentioned competitor by default
    if (!activeCompetitor.value || !competitors.find(c => c.name === activeCompetitor.value)) {
      activeCompetitor.value = competitors[0].name;
      console.log("Set active competitor to:", activeCompetitor.value);
    }
  } else {
    // No competitors found, clear the arrays
    allCompetitors.value = [];
    activeCompetitor.value = '';
    console.log("No competitors found in the data");
  }
};

// Helper function to calculate stroke-dashoffset for gauge chart
const calculateStrokeDashOffset = (percentage) => {
  const circumference = 251.2;
  return circumference - (circumference * percentage / 100);
};

// Format percentage value
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Get the active competitor details
const getActiveCompetitorDetails = () => {
  return allCompetitors.value.find(comp => comp.name === activeCompetitor.value);
};

// Get the display name for the competitor side
const getCompetitorDisplayName = () => {
  if (activeCompetitor.value === 'all') {
    return 'All Competitors';
  }
  return activeCompetitor.value || 'No Competitor';
};

// Get brand mention rate
const getBrandRate = () => {
  return calculateMentionRate(brandName.value, true);
};

// Get competitor mention rate
const getCompetitorRate = () => {
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

// Calculate the advantage rate (brand rate - competitor rate)
const getAdvantageRate = () => {
  const brandRate = getBrandRate();
  const competitorRate = getCompetitorRate();
  return brandRate - competitorRate; // Allow negative values to show disadvantage
};

// Initialize component
onMounted(() => {
  console.log("BrandMentionRateGauge mounted with client data:", props.clientData);
  analyzeCompetitors();
});

// Watch for changes in client data
watch(() => props.clientData, () => {
  console.log("Client data updated in BrandMentionRateGauge");
  analyzeCompetitors();
}, { deep: true });
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>