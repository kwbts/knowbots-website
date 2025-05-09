<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4 flex items-center justify-between">
          <!-- Left: Logo/Title -->
          <div class="flex items-center space-x-3">
            <div class="rounded-md bg-burntOrangeDark p-2">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-darkNavy">{{ selectedClient.name }} Core Sample Report</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Dashboard</p>
            </div>
          </div>
          
          <!-- Right: Client Selector -->
          <div class="flex items-center space-x-4">
            <select v-model="selectedClientId" class="form-select rounded-md border-gray-300 shadow-sm">
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Performance Summary -->
      <div class="mb-6">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-darkNavy">{{ selectedClient.name }} Performance Summary</h2>
            <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">
              {{ clientData.query_data.length }} Queries Analyzed
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Mention Rate with Horizontal Bar -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-2">Mention Rate</div>
              <div class="text-3xl font-bold text-darkNavy mb-2">{{ formatPercentage(clientData.client_summary.brand_mention_rate * 100) }}</div>
              <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div 
                  class="h-3 rounded-full bg-burntOrangeDark" 
                  :style="`width: ${Math.min(clientData.client_summary.brand_mention_rate * 100, 100)}%`"
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
                  <div class="text-3xl font-bold text-darkNavy">{{ clientData.query_data.length }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ Math.round(clientData.query_data.length * 0.7) }} with brand mentions</div>
                </div>
              </div>
            </div>
            
            <!-- Citation Rate with Horizontal Bar -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="text-sm text-gray-500 mb-2">Citation Rate</div>
              <div class="text-3xl font-bold text-darkNavy mb-2">{{ formatPercentage(65) }}</div>
              <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div 
                  class="h-3 rounded-full bg-burntOrangeDark" 
                  :style="`width: 65%`"
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
                  <div class="text-3xl font-bold text-darkNavy">{{ getTotalCitations() }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ Math.round(getTotalCitations() * 0.4) }} to brand URLs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- First Row: Brand Citation Gauge and Competitor Comparison -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Brand Citation Gauge -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-darkNavy mb-4">Brand Mention Rate</h3>
          <div class="flex justify-center">
            <div class="w-48 h-48 relative">
              <!-- Gauge background -->
              <svg class="w-full h-full" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" stroke-width="12" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#f97316" stroke-width="12" 
                  stroke-dasharray="339.292" 
                  :stroke-dashoffset="339.292 * (1 - clientData.client_summary.brand_mention_rate)" 
                  transform="rotate(-90 60 60)" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center flex-col">
                <div class="text-4xl font-bold text-darkNavy">
                  {{ formatPercentage(clientData.client_summary.brand_mention_rate * 100) }}
                </div>
                <div class="text-sm text-gray-500">Brand Mention Rate</div>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center text-sm text-gray-600">
            Percentage of queries where your brand is mentioned
          </div>
        </div>
        
        <!-- Competitor Comparison -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-darkNavy mb-4">Citation Mention Rate</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{ selectedClient.name }}</span>
                <span class="text-sm font-medium text-gray-700">{{ formatPercentage(clientData.client_summary.brand_mention_rate * 100) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-burntOrangeDark h-2.5 rounded-full" :style="`width: ${clientData.client_summary.brand_mention_rate * 100}%`"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">Industry Average</span>
                <span class="text-sm font-medium text-gray-700">58%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 58%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">Top Competitor</span>
                <span class="text-sm font-medium text-gray-700">74%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-purple-600 h-2.5 rounded-full" style="width: 74%"></div>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center text-sm text-gray-600">
            How your brand mention rate compares to others
          </div>
        </div>
      </div>
      
      <!-- Query Table -->
      <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 class="text-lg font-semibold text-darkNavy mb-4">Top Queries</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Query
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funnel Stage
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citations
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand Mentioned
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(query, index) in clientData.query_data.slice(0, 10)" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ query.query_text }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="px-2 py-1 rounded-full text-xs font-medium" 
                        :class="getFunnelColor(query.funnel_stage)">
                    {{ query.funnel_stage }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ query.associated_pages ? query.associated_pages.length : 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span v-if="query.brand_mentioned" class="text-green-600">
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span v-else class="text-red-600">
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Platform Analysis -->
      <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 class="text-lg font-semibold text-darkNavy mb-4">Platform Citation Performance</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-xl font-semibold text-center">Google</div>
            <div class="text-4xl font-bold text-center text-darkNavy my-3">68%</div>
            <div class="text-sm text-gray-600 text-center">Citation Rate</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-xl font-semibold text-center">Bing</div>
            <div class="text-4xl font-bold text-center text-darkNavy my-3">52%</div>
            <div class="text-sm text-gray-600 text-center">Citation Rate</div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="text-xl font-semibold text-center">Claude</div>
            <div class="text-4xl font-bold text-center text-darkNavy my-3">{{ formatPercentage(clientData.client_summary.brand_mention_rate * 100) }}</div>
            <div class="text-sm text-gray-600 text-center">Citation Rate</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// List of clients
const clients = [
  { id: 'knak', name: 'Knak' },
  { id: 'bridgit', name: 'Bridgit' },
  { id: 'fidus', name: 'Fidus' },
  { id: 'metarouter', name: 'MetaRouter' },
  { id: 'klipfolio', name: 'Klipfolio' },
  { id: 'humans-of-martech', name: 'Humans of Martech' },
  { id: 'treasure-data', name: 'Treasure Data' },
  { id: 'cart', name: 'Cart.com' },
  { id: 'emmie-co', name: 'Emmie Co' },
];

// Selected client
const selectedClientId = ref('bridgit');
const selectedClient = computed(() => {
  return clients.find(c => c.id === selectedClientId.value) || clients[0];
});

// Hard-coded default data with consistent values for the most important fields
const defaultData = {
  client_name: "Bridgit",
  query_data: [
    {
      query_id: "query-1",
      query_text: "construction workforce planning software",
      funnel_stage: "BOFU",
      citation_count: 8,
      brand_mentioned: true,
      associated_pages: Array(8).fill().map((_, i) => ({
        page_analysis_id: `page-${i}`,
        citation_url: `https://example.com/page-${i}`,
        brand_mentioned: i < 5,
        domain_authority: 35 + i
      }))
    },
    {
      query_id: "query-2",
      query_text: "construction resource management",
      funnel_stage: "MOFU",
      citation_count: 6,
      brand_mentioned: true,
      associated_pages: Array(6).fill().map((_, i) => ({
        page_analysis_id: `page-${i+10}`,
        citation_url: `https://example.com/page-${i+10}`,
        brand_mentioned: i < 3,
        domain_authority: 30 + i
      }))
    },
    {
      query_id: "query-3",
      query_text: "best construction workforce software",
      funnel_stage: "BOFU",
      citation_count: 9,
      brand_mentioned: true,
      associated_pages: Array(9).fill().map((_, i) => ({
        page_analysis_id: `page-${i+20}`,
        citation_url: `https://example.com/page-${i+20}`,
        brand_mentioned: i < 6,
        domain_authority: 40 + i
      }))
    },
    {
      query_id: "query-4",
      query_text: "construction project scheduling",
      funnel_stage: "TOFU",
      citation_count: 5,
      brand_mentioned: false,
      associated_pages: Array(5).fill().map((_, i) => ({
        page_analysis_id: `page-${i+30}`,
        citation_url: `https://example.com/page-${i+30}`,
        brand_mentioned: i < 1,
        domain_authority: 25 + i
      }))
    },
    {
      query_id: "query-5",
      query_text: "construction labor management software",
      funnel_stage: "MOFU",
      citation_count: 7,
      brand_mentioned: true,
      associated_pages: Array(7).fill().map((_, i) => ({
        page_analysis_id: `page-${i+40}`,
        citation_url: `https://example.com/page-${i+40}`,
        brand_mentioned: i < 4,
        domain_authority: 38 + i
      }))
    },
    {
      query_id: "query-6",
      query_text: "construction labor planning",
      funnel_stage: "TOFU",
      citation_count: 4,
      brand_mentioned: false,
      associated_pages: Array(4).fill().map((_, i) => ({
        page_analysis_id: `page-${i+50}`,
        citation_url: `https://example.com/page-${i+50}`,
        brand_mentioned: i < 1,
        domain_authority: 28 + i
      }))
    },
    {
      query_id: "query-7",
      query_text: "Bridgit Bench review",
      funnel_stage: "BOFU",
      citation_count: 10,
      brand_mentioned: true,
      associated_pages: Array(10).fill().map((_, i) => ({
        page_analysis_id: `page-${i+60}`,
        citation_url: `https://example.com/page-${i+60}`,
        brand_mentioned: i < 8,
        domain_authority: 45 + i
      }))
    },
    {
      query_id: "query-8",
      query_text: "construction workforce allocation",
      funnel_stage: "MOFU",
      citation_count: 6,
      brand_mentioned: true,
      associated_pages: Array(6).fill().map((_, i) => ({
        page_analysis_id: `page-${i+70}`,
        citation_url: `https://example.com/page-${i+70}`,
        brand_mentioned: i < 4,
        domain_authority: 32 + i
      }))
    },
    {
      query_id: "query-9",
      query_text: "construction capacity planning",
      funnel_stage: "TOFU",
      citation_count: 5,
      brand_mentioned: false,
      associated_pages: Array(5).fill().map((_, i) => ({
        page_analysis_id: `page-${i+80}`,
        citation_url: `https://example.com/page-${i+80}`,
        brand_mentioned: i < 2,
        domain_authority: 26 + i
      }))
    },
    {
      query_id: "query-10",
      query_text: "Bridgit vs PlanGrid",
      funnel_stage: "BOFU",
      citation_count: 9,
      brand_mentioned: true,
      associated_pages: Array(9).fill().map((_, i) => ({
        page_analysis_id: `page-${i+90}`,
        citation_url: `https://example.com/page-${i+90}`,
        brand_mentioned: i < 7,
        domain_authority: 42 + i
      }))
    },
    {
      query_id: "query-11",
      query_text: "best construction management apps",
      funnel_stage: "MOFU",
      citation_count: 7,
      brand_mentioned: true,
      associated_pages: Array(7).fill().map((_, i) => ({
        page_analysis_id: `page-${i+100}`,
        citation_url: `https://example.com/page-${i+100}`,
        brand_mentioned: i < 5,
        domain_authority: 36 + i
      }))
    },
    {
      query_id: "query-12",
      query_text: "construction resource allocation",
      funnel_stage: "TOFU",
      citation_count: 4,
      brand_mentioned: false,
      associated_pages: Array(4).fill().map((_, i) => ({
        page_analysis_id: `page-${i+110}`,
        citation_url: `https://example.com/page-${i+110}`,
        brand_mentioned: i < 1,
        domain_authority: 29 + i
      }))
    }
  ],
  client_summary: {
    total_queries: 120,
    total_pages: 850,
    average_citation_count: 7.2,
    brand_mention_rate: 0.72,
    average_page_speed: 88,
    average_domain_authority: 38
  }
};

// Hard-coded data for each client
const clientDatasets = {
  knak: {
    client_name: "Knak",
    query_data: generateQueries("Knak", "email marketing", 15),
    client_summary: {
      total_queries: 130,
      total_pages: 920,
      average_citation_count: 8.1,
      brand_mention_rate: 0.78,
      average_page_speed: 85,
      average_domain_authority: 42
    }
  },
  bridgit: defaultData,
  fidus: {
    client_name: "Fidus",
    query_data: generateQueries("Fidus", "digital payments", 12),
    client_summary: {
      total_queries: 110,
      total_pages: 780,
      average_citation_count: 6.8,
      brand_mention_rate: 0.65,
      average_page_speed: 82,
      average_domain_authority: 36
    }
  },
  metarouter: {
    client_name: "MetaRouter",
    query_data: generateQueries("MetaRouter", "data routing", 14),
    client_summary: {
      total_queries: 125,
      total_pages: 850,
      average_citation_count: 7.5,
      brand_mention_rate: 0.70,
      average_page_speed: 84,
      average_domain_authority: 40
    }
  },
  klipfolio: {
    client_name: "Klipfolio",
    query_data: generateQueries("Klipfolio", "business dashboard", 13),
    client_summary: {
      total_queries: 118,
      total_pages: 830,
      average_citation_count: 7.2,
      brand_mention_rate: 0.68,
      average_page_speed: 86,
      average_domain_authority: 39
    }
  },
  "humans-of-martech": {
    client_name: "Humans of Martech",
    query_data: generateQueries("Humans of Martech", "marketing technology", 11),
    client_summary: {
      total_queries: 105,
      total_pages: 730,
      average_citation_count: 6.5,
      brand_mention_rate: 0.62,
      average_page_speed: 80,
      average_domain_authority: 34
    }
  },
  "treasure-data": {
    client_name: "Treasure Data",
    query_data: generateQueries("Treasure Data", "customer data platform", 14),
    client_summary: {
      total_queries: 140,
      total_pages: 980,
      average_citation_count: 8.3,
      brand_mention_rate: 0.80,
      average_page_speed: 87,
      average_domain_authority: 44
    }
  },
  cart: {
    client_name: "Cart.com",
    query_data: generateQueries("Cart.com", "ecommerce platform", 13),
    client_summary: {
      total_queries: 120,
      total_pages: 840,
      average_citation_count: 7.0,
      brand_mention_rate: 0.67,
      average_page_speed: 83,
      average_domain_authority: 38
    }
  },
  "emmie-co": {
    client_name: "Emmie Co",
    query_data: generateQueries("Emmie Co", "sustainable fashion", 12),
    client_summary: {
      total_queries: 110,
      total_pages: 770,
      average_citation_count: 6.7,
      brand_mention_rate: 0.64,
      average_page_speed: 81,
      average_domain_authority: 35
    }
  }
};

// Reactive client data based on selection
const clientData = computed(() => {
  return clientDatasets[selectedClientId.value] || defaultData;
});

// Format percentage
function formatPercentage(value) {
  return Math.round(value) + '%';
}

// Get total citations
function getTotalCitations() {
  return clientData.value.query_data.reduce((total, query) => {
    return total + (query.associated_pages ? query.associated_pages.length : 0);
  }, 0);
}

// Get funnel stage color
function getFunnelColor(stage) {
  switch(stage) {
    case 'TOFU': return 'bg-blue-100 text-blue-800';
    case 'MOFU': return 'bg-purple-100 text-purple-800';
    case 'BOFU': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

// Generate queries helper function
function generateQueries(brandName, topic, count) {
  const queryTemplates = [
    `${topic} software`,
    `best ${topic} tools`,
    `${brandName} review`,
    `${topic} solutions`,
    `${brandName} vs competitors`,
    `${topic} platforms`,
    `enterprise ${topic} software`,
    `${topic} management system`,
    `${brandName} pricing`,
    `affordable ${topic} tools`,
    `${topic} for small business`,
    `${topic} automation`,
    `${brandName} alternatives`,
    `${topic} integration`,
    `${topic} best practices`
  ];
  
  return Array(count).fill().map((_, index) => {
    const queryText = queryTemplates[index % queryTemplates.length];
    const funnel = ['TOFU', 'MOFU', 'BOFU'][Math.floor(Math.random() * 3)];
    const isBrandMentioned = queryText.includes(brandName) || Math.random() > 0.4;
    const citationCount = Math.floor(Math.random() * 6) + 4;
    
    return {
      query_id: `query-${index + 1}`,
      query_text: queryText,
      funnel_stage: funnel,
      citation_count: citationCount,
      brand_mentioned: isBrandMentioned,
      associated_pages: Array(citationCount).fill().map((_, i) => ({
        page_analysis_id: `page-${index}-${i}`,
        citation_url: `https://example.com/page-${index}-${i}`,
        brand_mentioned: i < (citationCount * 0.6),
        domain_authority: 25 + Math.floor(Math.random() * 25)
      }))
    };
  });
}

// Watch client changes
watch(selectedClientId, (newClientId) => {
  console.log(`Selected client changed to: ${newClientId}`);
});
</script>

<style scoped>
/* Custom classes if needed */
</style>