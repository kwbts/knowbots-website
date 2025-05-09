<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Data Debugger</h1>
        <p class="text-gray-600 dark:text-gray-400">
          This tool helps diagnose data loading issues by exposing structured data for the dashboard.
        </p>
      </div>
      
      <!-- Authentication Status -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Authentication Status</h2>
        <div class="flex items-center">
          <div :class="isAuthenticated ? 'bg-green-500' : 'bg-red-500'" class="h-4 w-4 rounded-full mr-2"></div>
          <span class="font-medium" :class="isAuthenticated ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ isAuthenticated ? 'Authenticated' : 'Not Authenticated' }}
          </span>
          <span v-if="isAuthenticated" class="ml-4 text-gray-600 dark:text-gray-400">
            Logged in as: <span class="font-medium text-gray-800 dark:text-white">{{ clientName }}</span>
          </span>
        </div>
      </div>
      
      <!-- Client Selector -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Load Client Data</h2>
        <div class="flex items-end space-x-4">
          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
            <select v-model="selectedClient" class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>
          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method</label>
            <select v-model="selectedMethod" class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="direct-json">Direct JSON</option>
              <option value="supabase-data">Supabase Data</option>
              <option value="core-sample">Core Sample</option>
            </select>
          </div>
          <button @click="loadData" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm">
            Load Data
          </button>
        </div>
      </div>
      
      <!-- Loading indicator -->
      <div v-if="isLoading" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6 flex justify-center">
        <div class="flex items-center">
          <div class="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mr-3"></div>
          <span class="text-gray-600 dark:text-gray-400">Loading client data...</span>
        </div>
      </div>
      
      <!-- Error message -->
      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 mb-6">
        <h3 class="font-semibold mb-1">Error Loading Data</h3>
        <p>{{ error }}</p>
      </div>
      
      <!-- Data Viewer -->
      <div v-if="clientData && !isLoading" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
            Client Data Structure
          </h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Loaded via: <span class="font-medium">{{ selectedMethod }}</span>
          </div>
        </div>
        
        <!-- Basic data info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Client Name</div>
            <div class="font-medium text-gray-800 dark:text-white">{{ clientData.client_name || 'Not set' }}</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Query Data Count</div>
            <div class="font-medium text-gray-800 dark:text-white">
              {{ clientData.query_data ? clientData.query_data.length : 'Not found' }}
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Client Summary</div>
            <div class="font-medium text-gray-800 dark:text-white">
              {{ clientData.client_summary ? 'Present' : 'Not found' }}
            </div>
          </div>
        </div>
        
        <!-- JSON structure tree -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium text-gray-800 dark:text-white">Data Structure</h3>
            <button @click="expandAll = !expandAll" class="text-xs text-blue-600 dark:text-blue-400">
              {{ expandAll ? 'Collapse All' : 'Expand All' }}
            </button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div class="font-mono text-sm overflow-x-auto">
              <div v-for="(value, key) in dataStructure" :key="key" class="mb-1">
                <span class="text-blue-600 dark:text-blue-400">{{ key }}:</span> {{ value }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- First query sample -->
        <div v-if="clientData.query_data && clientData.query_data.length > 0">
          <h3 class="font-medium text-gray-800 dark:text-white mb-2">Sample Query</h3>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded overflow-x-auto">
            <pre class="text-xs font-mono text-gray-800 dark:text-gray-200">{{ JSON.stringify(clientData.query_data[0], null, 2) }}</pre>
          </div>
        </div>
      </div>
      
      <!-- Navigation buttons -->
      <div class="flex space-x-4 mb-8">
        <button @click="goToDashboard" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm">
          Back to Dashboard
        </button>
        <button @click="goToDebug" class="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md shadow-sm">
          System Diagnostics
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Authentication state
const isAuthenticated = ref(false);
const clientName = ref('');

// Client data
const clientData = ref(null);
const isLoading = ref(false);
const error = ref(null);
const expandAll = ref(false);

// Client selection
const selectedClient = ref('knak');
const selectedMethod = ref('direct-json');

// List of available clients
const clients = [
  { id: 'knak', name: 'Knak' },
  { id: 'bridgit', name: 'Bridgit' },
  { id: 'metarouter', name: 'MetaRouter' },
  { id: 'fidus', name: 'Fidus' },
  { id: 'klipfolio', name: 'Klipfolio' },
  { id: 'humans-of-martech', name: 'Humans of Martech' },
  { id: 'treasure-data', name: 'Treasure Data' },
  { id: 'cart', name: 'Cart.com' },
  { id: 'emmie-co', name: 'Emmie Co' },
  { id: 'admin', name: 'Admin Sample' }
];

// Navigation functions
const goToDashboard = () => router.push('/citebots/dashboard/');
const goToDebug = () => router.push('/citebots/debug');

// Computed data structure
const dataStructure = computed(() => {
  if (!clientData.value) return {};
  
  // Helper to get structure recursively
  const getObjectStructure = (obj, maxDepth = 3, currentDepth = 0) => {
    if (currentDepth >= maxDepth) return '{ ... }';
    if (!obj) return typeof obj;
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'Array(0)';
      return `Array(${obj.length})`;
    }
    
    if (typeof obj === 'object') {
      const structure = {};
      Object.keys(obj).forEach(key => {
        structure[key] = getObjectStructure(obj[key], maxDepth, currentDepth + 1);
      });
      return structure;
    }
    
    return typeof obj;
  };
  
  return getObjectStructure(clientData.value);
});

// Load client data
const loadData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    let apiUrl;
    if (selectedMethod.value === 'direct-json') {
      apiUrl = `/api/client-direct-json?clientId=${encodeURIComponent(selectedClient.value)}`;
    } else if (selectedMethod.value === 'supabase-data') {
      apiUrl = `/api/client-supabase-data?clientId=${encodeURIComponent(selectedClient.value)}`;
    } else if (selectedMethod.value === 'core-sample') {
      apiUrl = `/api/client-core-sample?clientId=${encodeURIComponent(selectedClient.value)}`;
    }
    
    console.log(`Loading client data from ${selectedMethod.value} API:`, apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    clientData.value = data;
    
    // Debug log data structure
    console.log('Loaded client data structure:', dataStructure.value);
  } catch (e) {
    error.value = e.message || 'Failed to load client data';
    console.error('Error loading client data:', e);
  } finally {
    isLoading.value = false;
  }
};

// Check login on mount
onMounted(() => {
  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem('citebot-token');
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.substring(8)));
        isAuthenticated.value = true;
        clientName.value = tokenData.clientName;
        
        // Auto-select the logged-in client
        const matchingClient = clients.find(c => 
          c.name.toLowerCase() === clientName.value.toLowerCase()
        );
        if (matchingClient) {
          selectedClient.value = matchingClient.id;
        }
        
        // Auto load data
        loadData();
      } catch (e) {
        console.error('Error parsing token:', e);
        isAuthenticated.value = false;
      }
    } else {
      isAuthenticated.value = false;
    }
  };
  
  checkAuth();
});
</script>