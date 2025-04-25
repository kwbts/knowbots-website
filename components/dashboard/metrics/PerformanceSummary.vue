<!-- components/dashboard/metrics/PerformanceSummary.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-darkNavy">{{ clientName }} Performance Summary</h2>
      <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">
        {{ totalQueries }} Queries Analyzed
      </span>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Mention Rate with Horizontal Bar -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-500 mb-2">Mention Rate</div>
        <div class="text-3xl font-bold text-darkNavy mb-2">{{ formatPercentage(mentionRate) }}</div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div 
            class="h-3 rounded-full bg-burntOrangeDark" 
            :style="`width: ${Math.min(mentionRate, 100)}%`"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <!-- Number of Queries with Icon -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-500 mb-2">Number of Queries</div>
        <div class="flex items-center">
          <div class="bg-blue-100 rounded-full p-2 mr-3">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <div class="text-3xl font-bold text-darkNavy">{{ totalQueries }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ brandMentionedQueries }} with brand mentions</div>
          </div>
        </div>
      </div>
      
      <!-- Citation Rate with Horizontal Bar -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-500 mb-2">Citation Rate</div>
        <div class="text-3xl font-bold text-darkNavy mb-2">{{ formatPercentage(citationRate) }}</div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div 
            class="h-3 rounded-full bg-burntOrangeDark" 
            :style="`width: ${Math.min(citationRate, 100)}%`"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <!-- Number of Citations -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-500 mb-2">Number of Citations</div>
        <div class="flex items-center">
          <div class="bg-green-100 rounded-full p-2 mr-3">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <div class="text-3xl font-bold text-darkNavy">{{ totalCitations }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ brandUrlCitations }} to brand URLs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';

const props = defineProps({
  clientData: {
    type: Object,
    required: true
  }
});

// Get client name from the data
const clientName = computed(() => {
  // Make sure we're using the actual client name from the data
  const name = props.clientData?.client_name;
  return name || 'Client';
});

// Calculate total queries from the data
const totalQueries = computed(() => {
  return props.clientData?.query_data?.length || 0;
});

// Calculate total number of associated pages (total citations)
const totalCitations = computed(() => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      count += query.associated_pages.length;
    }
  });
  return count;
});

// Count pages with brand mentions (brand citations)
const brandUrlCitations = computed(() => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        if (page.brand_mentioned === true || page.brand_mentioned === "checked" || 
            page.is_client_domain === true || page.is_client_domain === "checked") {
          count++;
        }
      });
    }
  });
  return count;
});

// Calculate queries that have brand mentions
const brandMentionedQueries = computed(() => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  
  props.clientData.query_data.forEach(query => {
    let isBrandMentioned = false;
    
    // Check the query itself
    if (query.brand_mentioned === true || query.brand_mentioned === "checked") {
      isBrandMentioned = true;
    }
    // Check query_metrics
    else if (query.query_metrics && 
        (query.query_metrics.brand_mentioned === true || 
         query.query_metrics.brand_mentioned === "checked")) {
      isBrandMentioned = true;
    }
    // Check associated pages
    else if (query.associated_pages && Array.isArray(query.associated_pages) && query.associated_pages.length > 0) {
      // If any associated page has brand_mentioned or is_client_domain, consider the query as having a brand mention
      const anyPageHasBrandMention = query.associated_pages.some(page => 
        page.brand_mentioned === true || 
        page.brand_mentioned === "checked" ||
        page.is_client_domain === true || 
        page.is_client_domain === "checked"
      );
      
      if (anyPageHasBrandMention) {
        isBrandMentioned = true;
      }
    }
    
    if (isBrandMentioned) {
      count++;
    }
  });
  
  return count;
});

// Calculate mention rate (percentage of queries where the brand is mentioned)
const mentionRate = computed(() => {
  if (totalQueries.value === 0) return 0;
  return (brandMentionedQueries.value / totalQueries.value) * 100;
});

// Calculate citation rate (percentage of brand URLs among all citations)
const citationRate = computed(() => {
  if (totalCitations.value === 0) return 0;
  return (brandUrlCitations.value / totalCitations.value) * 100;
});

// Format percentage for display
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Log data when component mounts or data changes
onMounted(() => {
  console.log("PerformanceSummary mounted with client:", clientName.value);
  console.log("PerformanceSummary data metrics:", {
    clientName: clientName.value,
    totalQueries: totalQueries.value,
    brandMentionedQueries: brandMentionedQueries.value,
    mentionRate: mentionRate.value,
    totalCitations: totalCitations.value,
    brandUrlCitations: brandUrlCitations.value,
    citationRate: citationRate.value
  });
});

watch(() => props.clientData, (newData) => {
  console.log("PerformanceSummary data updated for client:", clientName.value);
  console.log("Updated metrics:", {
    clientName: clientName.value,
    totalQueries: totalQueries.value,
    brandMentionedQueries: brandMentionedQueries.value,
    mentionRate: mentionRate.value,
    totalCitations: totalCitations.value,
    brandUrlCitations: brandUrlCitations.value,
    citationRate: citationRate.value
  });
}, { deep: true });
</script>

<style scoped>
/* Custom styles if needed */
</style>