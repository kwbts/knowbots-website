<!-- pages/citebots/dashboard/index.vue -->
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
              <h1 class="text-xl font-semibold text-darkNavy">{{ clientData.client_name }} Core Sample Report</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Dashboard</p>
            </div>
          </div>
          
          <!-- Right: User Menu -->
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ clientName }}</span>
            <button 
              @click="handleLogout"
              class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Authentication Check -->
      <div v-if="!isAuthenticated" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h2 class="text-xl font-semibold text-darkNavy mb-2">Authentication Required</h2>
        <p class="text-gray-600 mb-4">You need to log in to access this dashboard.</p>
        <button 
          @click="router.push('/citebots/')"
          class="px-4 py-2 bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md"
        >
          Go to Login
        </button>
      </div>
      
      <!-- Loading State -->
      <div v-else-if="isLoading" class="mb-6 bg-white p-4 rounded-lg shadow-sm text-center py-8">
        <div class="animate-pulse flex justify-center">
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <p class="mt-4 text-gray-500">Loading data...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="loadError" class="bg-white rounded-lg shadow-sm p-8">
        <div class="text-center mb-4">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-darkNavy mb-2">Error Loading Data</h2>
          <p class="text-gray-600 mb-4">{{ loadError }}</p>
        </div>
        
        <!-- Debug info -->
        <div class="bg-gray-50 p-4 rounded-lg mb-4 text-left text-sm">
          <div class="font-semibold mb-2">Debug Information:</div>
          <div class="overflow-auto max-h-40 font-mono text-xs">
            <div><strong>Client:</strong> {{ clientName }}</div>
            <div><strong>Client ID:</strong> {{ getClientIdFromName(clientName) }}</div>
            <div><strong>Authentication:</strong> {{ isAuthenticated ? 'Yes' : 'No' }}</div>
            <div><strong>API Endpoint:</strong> /api/client-direct-json?clientId={{ getClientIdFromName(clientName) }}</div>
          </div>
        </div>
        
        <div class="flex space-x-4 justify-center">
          <button 
            @click="loadClientData"
            class="px-4 py-2 bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md"
          >
            Try Again
          </button>
          <button 
            @click="router.push('/citebots/dashboard/debug-data')"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Data Debugger
          </button>
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div v-else class="space-y-6">
        <!-- Debug Component -->
        <div v-if="dataLoaded" class="mb-6">
          <MetricsDebugger :clientData="clientData" />
        </div>
        
        <!-- Performance Summary -->
        <div v-if="dataLoaded" class="mb-6">
          <PerformanceSummary :clientData="clientData" />
        </div>
        
        <!-- Dashboard Metrics -->
        <div v-if="dataLoaded" class="space-y-6">
          <!-- First Row: Brand Citation Gauge and Competitor Comparison -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Brand Citation Gauge -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <BrandMentionRateGauge :clientData="clientData" />
            </div>
            
            <!-- Competitor Comparison -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <CitationMentionRateGauge :clientData="clientData" />
            </div>
          </div>

          <!-- New Row: Platform Citation Performance (Full Width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <PlatformCitationPerformance :clientData="clientData" />
          </div>
          
          <!-- Query Analysis (full width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <QueryAnalysis :clientData="clientData" />
          </div>
          
          <!-- Content Optimization Metric (full width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <ContentOptimizationMetric :clientData="clientData" />
          </div>       
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import QueryAnalysis from '~/components/dashboard/metrics/QueryAnalysis.vue';
import ContentOptimizationMetric from '@/components/dashboard/metrics/ContentOptimizationMetric.vue';
import BrandMentionRateGauge from '@/components/dashboard/metrics/BrandMentionRateGauge.vue';
import CitationMentionRateGauge from '~/components/dashboard/metrics/CitationMentionRateGauge.vue';
import PerformanceSummary from '@/components/dashboard/metrics/PerformanceSummary.vue';
import PlatformCitationPerformance from '@/components/dashboard/metrics/PlatformCitationPerformance.vue';
import MetricsDebugger from '@/components/dashboard/metrics/MetricsDebugger.vue';
import { verifyClientToken, getClientDataPath } from '@/utils/secureAuth';

const router = useRouter();
const isLoading = ref(true);
const loadError = ref(null);
const dataLoaded = ref(false);

// Initialize with false during SSR
const isAuthenticatedValue = ref(false);

// Authentication check
const isAuthenticated = computed(() => isAuthenticatedValue.value);

// Check auth on client-side only
onMounted(() => {
  const token = localStorage.getItem('citebot-token');
  if (token) {
    const verification = verifyClientToken(token);
    isAuthenticatedValue.value = verification.valid;
  }
});

// Default client name value for SSR
const clientNameValue = ref('');

// Get client name from token
const clientName = computed(() => clientNameValue.value);

// Update client name on client-side only
onMounted(() => {
  const token = localStorage.getItem('citebot-token');
  if (token) {
    const verification = verifyClientToken(token);
    if (verification.valid) {
      clientNameValue.value = verification.clientName;
    }
  }
});

// Initialize client data
const clientData = ref({
  client_name: '',
  query_data: [],
  client_summary: {
    total_queries: 0,
    total_pages: 0,
    average_citation_count: 0,
    brand_mention_rate: 0,
    average_page_speed: 0,
    average_domain_authority: 0
  }
});

// Load client data
const loadClientData = async () => {
  // Reset states
  isLoading.value = true;
  loadError.value = null;
  dataLoaded.value = false;
  
  // If not authenticated, don't try to load data
  if (!isAuthenticated.value) {
    isLoading.value = false;
    return;
  }
  
  try {
    // Get client ID from the client name
    const clientId = getClientIdFromName(clientName.value);
    
    // Use the simple direct JSON API endpoint
    const apiUrl = `/api/client-direct-json?clientId=${encodeURIComponent(clientId)}`;
    
    console.log(`Loading client data from direct JSON API: ${apiUrl}`);
    
    // Fetch from the API endpoint
    const response = await fetch(apiUrl);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }
    
    // Parse the response
    const data = await response.json();
    
    // Make sure client name is set correctly
    if (!data.client_name) {
      data.client_name = clientName.value;
    }
    
    // Debug the data structure
    console.log("Data structure check:", {
      hasClientName: !!data.client_name,
      hasQueryData: Array.isArray(data.query_data),
      queryDataLength: data.query_data?.length || 0,
      hasClientSummary: !!data.client_summary,
      firstQuery: data.query_data && data.query_data.length > 0 ? 
        { 
          hasAssociatedPages: Array.isArray(data.query_data[0].associated_pages),
          associatedPagesLength: data.query_data[0].associated_pages?.length || 0
        } : 'No queries'
    });
    
    clientData.value = data;
    dataLoaded.value = true;
    console.log("Client data loaded successfully");
  } catch (error) {
    console.error('Error loading client data:', error);
    loadError.value = `Unable to load data for ${clientName.value}. Please try again later.`;
  } finally {
    isLoading.value = false;
  }
};

// Helper function to convert client name to ID
function getClientIdFromName(clientName) {
  // Convert client name to lowercase ID format
  const clientIdMap = {
    'Knak': 'knak',
    'Bridgit': 'bridgit',
    'Fidus': 'fidus',
    'MetaRouter': 'metarouter',
    'Klipfolio': 'klipfolio',
    'Humans of Martech': 'humans-of-martech',
    'Treasure Data': 'treasure-data',
    'Cart.com': 'cart',
    'Emmie Co': 'emmie-co',
    'Admin': 'admin'
  };
  
  return clientIdMap[clientName] || clientName.toLowerCase().replace(/\s+/g, '-');
}

// Handle logout
const handleLogout = () => {
  // Check if localStorage is available (won't be during SSR)
  if (typeof localStorage !== 'undefined') {
    // Clear client token from localStorage
    localStorage.removeItem('citebot-token');
  }
  
  // Redirect to login page
  router.push('/citebots/');
};

// Load data when component is mounted
onMounted(() => {
  loadClientData();
});
</script>