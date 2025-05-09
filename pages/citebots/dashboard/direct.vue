<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4 flex items-center justify-between">
          <!-- Left: Logo/Title -->
          <div class="flex items-center space-x-3">
            <div class="rounded-md bg-orange-600 p-2">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">{{ displayedClientName }} Core Sample Report</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Dashboard</p>
            </div>
          </div>
          
          <!-- Right: User Menu -->
          <div class="flex items-center space-x-4">
            <span v-if="clientName" class="text-sm text-gray-600">Welcome, {{ clientName }}</span>
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
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
        <p class="text-gray-600 mb-4">You need to log in to access this dashboard.</p>
        <button 
          @click="goToLogin"
          class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
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
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p class="text-gray-600 mb-4">{{ error }}</p>
        </div>
        
        <!-- Debug info -->
        <div class="bg-gray-50 p-4 rounded-lg mb-4 text-left text-sm">
          <div class="font-semibold mb-2">Debug Information:</div>
          <div class="overflow-auto max-h-40 font-mono text-xs">
            <div><strong>Client:</strong> {{ clientName }}</div>
            <div><strong>Client ID:</strong> {{ clientId }}</div>
            <div><strong>Authentication:</strong> {{ authenticated ? 'Yes' : 'No' }}</div>
            <div><strong>File URL:</strong> /{{ clientId }}-data.json</div>
          </div>
        </div>
        
        <div class="flex space-x-4 justify-center">
          <button 
            @click="loadData"
            class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div v-else-if="dataLoaded" class="space-y-6">
        <!-- Debug Toggle -->
        <div class="mb-6 bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Dashboard Data</h3>
          <button 
            @click="showDebug = !showDebug"
            class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded"
          >
            {{ showDebug ? 'Hide' : 'Show' }} Debug
          </button>
        </div>
        
        <!-- Debug Information -->
        <div v-if="showDebug" class="mb-6 bg-white rounded-lg shadow-sm p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Debug Information</h3>
          <div class="bg-gray-50 p-3 rounded mb-3">
            <div class="grid grid-cols-2 gap-2">
              <div><span class="font-medium">Client Name:</span> {{ displayedClientName }}</div>
              <div><span class="font-medium">Client ID:</span> {{ clientId }}</div>
              <div><span class="font-medium">Query Count:</span> {{ data.query_data?.length || 0 }}</div>
              <div><span class="font-medium">Has Summary:</span> {{ !!data.client_summary }}</div>
              <div><span class="font-medium">Data Source:</span> {{ data.source || 'JSON File' }}</div>
              <div><span class="font-medium">File URL:</span> /{{ clientId }}-data.json</div>
            </div>
          </div>
          <div v-if="showRawData">
            <div class="text-sm font-semibold mb-2">Raw JSON Data:</div>
            <div class="bg-gray-50 p-3 rounded max-h-96 overflow-auto">
              <pre class="text-xs font-mono">{{ JSON.stringify(data, null, 2) }}</pre>
            </div>
          </div>
          <div class="mt-3 flex justify-end">
            <button 
              @click="showRawData = !showRawData" 
              class="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded"
            >
              {{ showRawData ? 'Hide' : 'Show' }} Raw Data
            </button>
          </div>
        </div>
        
        <!-- Performance Summary -->
        <div class="mb-6">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900">{{ displayedClientName }} Performance Summary</h2>
              <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-medium">
                {{ data.query_data?.length || 0 }} Queries Analyzed
              </span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <!-- Mention Rate with Horizontal Bar -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-2">Brand Mention Rate</div>
                <div class="text-3xl font-bold text-gray-900 mb-2">{{ formatPercent(data.client_summary?.brand_mention_rate * 100 || 0) }}</div>
                <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div 
                    class="h-3 rounded-full bg-orange-600" 
                    :style="`width: ${data.client_summary?.brand_mention_rate * 100 || 0}%`"
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
                <div class="text-sm text-gray-500 mb-2">Total Queries</div>
                <div class="flex items-center">
                  <div class="bg-blue-100 rounded-full p-2 mr-3">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-3xl font-bold text-gray-900">{{ data.query_data?.length || 0 }}</div>
                    <div class="text-xs text-gray-500 mt-1">{{ data.client_summary?.total_queries || 0 }} total analyzed</div>
                  </div>
                </div>
              </div>
              
              <!-- Citation Count with Icon -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-2">Domain Authority</div>
                <div class="flex items-center">
                  <div class="bg-green-100 rounded-full p-2 mr-3">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-3xl font-bold text-gray-900">{{ data.client_summary?.average_domain_authority || 0 }}</div>
                    <div class="text-xs text-gray-500 mt-1">Average score</div>
                  </div>
                </div>
              </div>
              
              <!-- Citation Rate with Horizontal Bar -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-2">Citation Rate</div>
                <div class="text-3xl font-bold text-gray-900 mb-2">{{ formatPercent(getCitationRate()) }}</div>
                <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div 
                    class="h-3 rounded-full bg-orange-600" 
                    :style="`width: ${getCitationRate()}%`"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Query Table -->
        <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Queries</h3>
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
                <tr v-for="(query, index) in data.query_data?.slice(0, 10) || []" :key="index">
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
                    {{ query.associated_pages?.length || 0 }}
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
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardDirect',
  
  data() {
    return {
      clientName: '',
      clientId: '',
      authenticated: false,
      loading: true,
      error: null,
      data: {},
      dataLoaded: false,
      showDebug: true,
      showRawData: false,
    }
  },
  
  computed: {
    displayedClientName() {
      return this.data.client_name || this.clientName || 'Client';
    }
  },
  
  mounted() {
    // Check authentication
    this.checkAuth();
  },
  
  methods: {
    // Check if user is authenticated
    checkAuth() {
      // Check localStorage for token
      const token = localStorage.getItem('citebot-token');
      
      if (!token) {
        this.authenticated = false;
        this.loading = false;
        return;
      }
      
      try {
        // Very simple token verification (similar to verifyClientToken in secureAuth.js)
        if (token.startsWith('citebot-')) {
          const encodedPayload = token.substring(8); // Remove 'citebot-' prefix
          const payload = JSON.parse(atob(encodedPayload));
          
          // Check if token is expired
          if (payload.exp < Date.now()) {
            this.authenticated = false;
            this.error = 'Your session has expired. Please log in again.';
          } else {
            this.authenticated = true;
            this.clientName = payload.clientName;
            this.clientId = this.getClientIdFromName(payload.clientName);
            
            // Load data now that we're authenticated
            this.loadData();
          }
        } else {
          this.authenticated = false;
          this.error = 'Invalid authentication token.';
        }
      } catch (e) {
        console.error('Error checking authentication:', e);
        this.authenticated = false;
        this.error = 'Authentication error. Please log in again.';
      }
      
      this.loading = false;
    },
    
    // Convert client name to ID format
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
    
    // Load data directly from the JSON file
    async loadData() {
      if (!this.authenticated) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const timestamp = Date.now(); // Cache-busting
        const url = `/${this.clientId}-data.json?t=${timestamp}`;
        
        console.log(`Loading data from: ${url}`);
        
        // Use cache-busting headers
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load data: HTTP ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Data loaded successfully:', jsonData);
        
        // Store data
        this.data = jsonData;
        this.dataLoaded = true;
      } catch (error) {
        console.error('Error loading data:', error);
        this.error = `Error loading data: ${error.message}`;
        this.dataLoaded = false;
      }
      
      this.loading = false;
    },
    
    // Handle logout
    handleLogout() {
      localStorage.removeItem('citebot-token');
      this.$router.push('/citebots/');
    },
    
    // Go to login page
    goToLogin() {
      this.$router.push('/citebots/');
    },
    
    // Format percentage for display
    formatPercent(value) {
      return Math.round(value) + '%';
    },
    
    // Get funnel stage color class
    getFunnelColor(stage) {
      switch(stage) {
        case 'TOFU': return 'bg-blue-100 text-blue-800';
        case 'MOFU': return 'bg-purple-100 text-purple-800';
        case 'BOFU': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    },
    
    // Calculate citation rate
    getCitationRate() {
      try {
        if (!this.data.query_data) return 0;
        
        let totalCitations = 0;
        let brandCitations = 0;
        
        this.data.query_data.forEach(query => {
          if (query.associated_pages && Array.isArray(query.associated_pages)) {
            totalCitations += query.associated_pages.length;
            
            query.associated_pages.forEach(page => {
              if (page.brand_mentioned || page.is_client_domain) {
                brandCitations++;
              }
            });
          }
        });
        
        if (totalCitations === 0) return 0;
        return Math.round((brandCitations / totalCitations) * 100);
      } catch (error) {
        console.error('Error calculating citation rate:', error);
        return 0;
      }
    }
  }
}
</script>

<style>
/* Default styles are handled by Tailwind */
</style>