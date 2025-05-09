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
              <h1 class="text-xl font-semibold text-darkNavy">{{ client_name }} Core Sample Report</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Dashboard</p>
            </div>
          </div>
          
          <!-- Right: User Menu -->
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ client_name }}</span>
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
      <div v-if="!authenticated" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h2 class="text-xl font-semibold text-darkNavy mb-2">Authentication Required</h2>
        <p class="text-gray-600 mb-4">You need to log in to access this dashboard.</p>
        <button 
          @click="$router.push('/citebots/')"
          class="px-4 py-2 bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md"
        >
          Go to Login
        </button>
      </div>
      
      <!-- Loading State -->
      <div v-else-if="loading" class="mb-6 bg-white p-4 rounded-lg shadow-sm text-center py-8">
        <div class="animate-pulse flex justify-center">
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <p class="mt-4 text-gray-500">Loading data...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-sm p-8">
        <div class="text-center mb-4">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-darkNavy mb-2">Error Loading Data</h2>
          <p class="text-gray-600 mb-4">{{ error }}</p>
        </div>
        
        <!-- Debug info -->
        <div class="bg-gray-50 p-4 rounded-lg mb-4 text-left text-sm">
          <div class="font-semibold mb-2">Debug Information:</div>
          <div class="overflow-auto max-h-40 font-mono text-xs">
            <div><strong>Client:</strong> {{ client_name }}</div>
            <div><strong>Client ID:</strong> {{ client_id }}</div>
            <div><strong>Authentication:</strong> {{ authenticated ? 'Yes' : 'No' }}</div>
            <div><strong>File Path:</strong> /{{ client_id }}-data.json</div>
          </div>
        </div>
        
        <div class="flex space-x-4 justify-center">
          <button 
            @click="loadData"
            class="px-4 py-2 bg-burntOrangeDark hover:bg-jasperOrange text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div v-else-if="dataLoaded" class="space-y-6">
        <!-- Debug Info -->
        <div class="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-darkNavy">Dashboard Status</h3>
            <button @click="showRawData = !showRawData" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
              {{ showRawData ? 'Hide' : 'Show' }} Raw Data
            </button>
          </div>
          
          <div class="bg-gray-50 p-3 rounded">
            <div><span class="font-medium">Client:</span> {{ client_name }}</div>
            <div><span class="font-medium">File Path:</span> /{{ client_id }}-data.json</div>
            <div><span class="font-medium">Queries:</span> {{ dashboard_data.query_data?.length || 0 }}</div>
            <div><span class="font-medium">Has Summary:</span> {{ !!dashboard_data.client_summary }}</div>
            <div><span class="font-medium">Environment:</span> {{ isProduction ? 'Production' : 'Development' }}</div>
          </div>
          
          <div v-if="showRawData" class="mt-3 bg-gray-50 p-3 rounded max-h-60 overflow-auto">
            <pre class="text-xs font-mono">{{ JSON.stringify(dashboard_data, null, 2) }}</pre>
          </div>
        </div>
        
        <!-- Performance Summary -->
        <div class="mb-6">
          <PerformanceSummary :clientData="dashboard_data" />
        </div>
        
        <!-- Dashboard Metrics -->
        <div class="space-y-6">
          <!-- First Row: Brand Citation Gauge and Competitor Comparison -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Brand Citation Gauge -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <BrandMentionRateGauge :clientData="dashboard_data" />
            </div>
            
            <!-- Competitor Comparison -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <CitationMentionRateGauge :clientData="dashboard_data" />
            </div>
          </div>

          <!-- New Row: Platform Citation Performance (Full Width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <PlatformCitationPerformance :clientData="dashboard_data" />
          </div>
          
          <!-- Query Analysis (full width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <QueryAnalysis :clientData="dashboard_data" />
          </div>
          
          <!-- Content Optimization Metric (full width) -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <ContentOptimizationMetric :clientData="dashboard_data" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import QueryAnalysis from '~/components/dashboard/metrics/QueryAnalysis.vue';
import ContentOptimizationMetric from '@/components/dashboard/metrics/ContentOptimizationMetric.vue';
import BrandMentionRateGauge from '@/components/dashboard/metrics/BrandMentionRateGauge.vue';
import CitationMentionRateGauge from '~/components/dashboard/metrics/CitationMentionRateGauge.vue';
import PerformanceSummary from '@/components/dashboard/metrics/PerformanceSummary.vue';
import PlatformCitationPerformance from '@/components/dashboard/metrics/PlatformCitationPerformance.vue';

export default {
  name: 'CitebotsDashboard',
  components: {
    QueryAnalysis,
    ContentOptimizationMetric,
    BrandMentionRateGauge,
    CitationMentionRateGauge,
    PerformanceSummary,
    PlatformCitationPerformance
  },
  
  data() {
    return {
      // Authentication
      authenticated: false,
      client_name: '',
      client_id: '',
      
      // Data loading
      loading: true,
      error: null,
      dataLoaded: false,
      dashboard_data: {
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
      },
      
      // UI state
      showRawData: false,
      
      // Environment detection
      isProduction: process.env.NODE_ENV === 'production'
    };
  },
  
  mounted() {
    // Check authentication when component mounts
    this.checkAuthentication();
  },
  
  methods: {
    // Check if user is authenticated
    checkAuthentication() {
      // Don't try to access localStorage during SSR
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('citebot-token');
      if (!token) {
        this.authenticated = false;
        this.loading = false;
        return;
      }
      
      try {
        // Simple token verification - similar to verifyClientToken
        if (token.startsWith('citebot-')) {
          const encodedPayload = token.substring(8); // Remove 'citebot-' prefix
          const payload = JSON.parse(atob(encodedPayload));
          
          // Check if token has expired
          if (payload.exp < Date.now()) {
            this.authenticated = false;
            this.error = 'Your session has expired. Please log in again.';
          } else {
            this.authenticated = true;
            this.client_name = payload.clientName;
            this.client_id = this.getClientIdFromName(payload.clientName);
            
            // Load data now that we're authenticated
            this.loadData();
          }
        } else {
          this.authenticated = false;
          this.error = 'Invalid authentication token';
        }
      } catch (err) {
        console.error('Auth error:', err);
        this.authenticated = false;
        this.error = 'Authentication error. Please log in again.';
      }
      
      this.loading = false;
    },
    
    // Convert client name to ID
    getClientIdFromName(name) {
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
      
      return clientIdMap[name] || name.toLowerCase().replace(/\s+/g, '-');
    },
    
    // Load client data directly from JSON file
    async loadData() {
      if (!this.authenticated) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const timestamp = Date.now(); // Cache busting
        const url = `/${this.client_id}-data.json?t=${timestamp}`;
        
        console.log(`Loading data from: ${url}`);
        
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load data: HTTP ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Data loaded successfully:', jsonData);
        
        // Make sure client name is set
        if (!jsonData.client_name) {
          jsonData.client_name = this.client_name;
        }
        
        // Assign data to component state
        this.dashboard_data = jsonData;
        this.dataLoaded = true;
        
        // Force component update to ensure changes are reflected
        this.$forceUpdate();
      } catch (err) {
        console.error('Error loading data:', err);
        this.error = `Error loading data: ${err.message}`;
        this.dataLoaded = false;
      } finally {
        this.loading = false;
      }
    },
    
    // Handle logout
    handleLogout() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('citebot-token');
      }
      this.$router.push('/citebots/');
    }
  }
};
</script>

<style>
/* Custom styles if needed */
</style>