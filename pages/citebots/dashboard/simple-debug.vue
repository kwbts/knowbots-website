<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4">Simple Dashboard Debug</h1>
    
    <!-- Authentication Status -->
    <div class="mb-6 bg-white p-4 rounded shadow">
      <div v-if="isAuthenticated">
        Logged in as: <strong>{{ clientName }}</strong>
      </div>
      <div v-else>
        <p>Not authenticated</p>
        <button @click="$router.push('/citebots/')" class="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Login
        </button>
      </div>
    </div>
    
    <!-- Load Controls -->
    <div class="mb-6 bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">Load Data</h2>
      <div class="space-y-4">
        <div>
          <button @click="loadDirectJson" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Load via Direct JSON
          </button>
          <button @click="loadViaApi" class="bg-green-500 text-white px-4 py-2 rounded">
            Load via API
          </button>
        </div>
        <div v-if="loading" class="text-blue-600">
          Loading...
        </div>
        <div v-if="error" class="text-red-600">
          Error: {{ error }}
        </div>
      </div>
    </div>
    
    <!-- Data Status -->
    <div class="mb-6 bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">Data Status</h2>
      <div>
        <div><strong>Client Name:</strong> {{ data?.client_name || 'Not loaded' }}</div>
        <div><strong>Query Count:</strong> {{ data?.query_data?.length || 0 }}</div>
        <div><strong>Data Source:</strong> {{ data?.source || 'Not specified' }}</div>
        <div><strong>Has Summary:</strong> {{ data?.client_summary ? 'Yes' : 'No' }}</div>
        <div><strong>Environment:</strong> {{ isDevelopment ? 'Development' : 'Production' }}</div>
      </div>
    </div>
    
    <!-- Simple Raw Data Display -->
    <div class="mb-6 bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">
        Raw Data 
        <button @click="showRawData = !showRawData" class="text-xs bg-gray-200 px-2 py-1 rounded">
          {{ showRawData ? 'Hide' : 'Show' }}
        </button>
      </h2>
      <div v-if="showRawData">
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
    </div>
    
    <!-- Simple Query List -->
    <div class="mb-6 bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Simple Query List</h2>
      <div v-if="!data?.query_data?.length" class="text-gray-500">No queries available</div>
      <div v-else>
        <div class="space-y-4">
          <div v-for="(query, index) in data.query_data.slice(0, 5)" :key="index" 
               class="border p-3 rounded bg-gray-50">
            <div class="font-medium">{{ query.query_text }}</div>
            <div class="text-sm text-gray-600">
              Citations: {{ query.associated_pages?.length || 0 }} | 
              Brand Mentioned: {{ query.brand_mentioned ? 'Yes' : 'No' }}
            </div>
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-500">
          Showing 5 of {{ data.query_data.length }} queries
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="flex space-x-4">
      <button @click="$router.push('/citebots/dashboard/')" class="bg-blue-500 text-white px-4 py-2 rounded">
        Back to Dashboard
      </button>
      <button @click="$router.push('/citebots/')" class="bg-gray-500 text-white px-4 py-2 rounded">
        Go to Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { verifyClientToken } from '@/utils/secureAuth';

const router = useRouter();
const data = ref(null);
const loading = ref(false);
const error = ref(null);
const showRawData = ref(false);

// Authentication state
const isAuthenticated = ref(false);
const clientName = ref('');
const clientId = ref('');

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';

// Check authentication on mount
onMounted(() => {
  const token = localStorage.getItem('citebot-token');
  if (token) {
    try {
      const verification = verifyClientToken(token);
      if (verification.valid) {
        isAuthenticated.value = true;
        clientName.value = verification.clientName;
        clientId.value = getClientIdFromName(verification.clientName);
        console.log(`Authenticated as: ${clientName.value} (ID: ${clientId.value})`);
      }
    } catch (e) {
      console.error('Error verifying token:', e);
    }
  }
});

// Load data directly from JSON file
async function loadDirectJson() {
  if (!isAuthenticated.value) {
    error.value = 'Authentication required';
    return;
  }
  
  loading.value = true;
  error.value = null;
  
  try {
    const timestamp = Date.now();
    const url = `/${clientId.value}-data.json?t=${timestamp}`;
    console.log(`Loading data from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.status}`);
    }
    
    const jsonData = await response.json();
    console.log('Received data:', jsonData);
    
    // Force a deep clone to avoid reactivity issues
    data.value = JSON.parse(JSON.stringify(jsonData));
    console.log('Data loaded successfully via direct JSON');
  } catch (err) {
    console.error('Error loading direct JSON:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Load data via API endpoint
async function loadViaApi() {
  if (!isAuthenticated.value) {
    error.value = 'Authentication required';
    return;
  }
  
  loading.value = true;
  error.value = null;
  
  try {
    const timestamp = Date.now();
    const url = `/api/client-direct-json?clientId=${clientId.value}&t=${timestamp}`;
    console.log(`Loading data from API: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const jsonData = await response.json();
    console.log('Received API data:', jsonData);
    
    // Force a deep clone to avoid reactivity issues
    data.value = JSON.parse(JSON.stringify(jsonData));
    console.log('Data loaded successfully via API');
  } catch (err) {
    console.error('Error loading via API:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Convert client name to ID
function getClientIdFromName(name) {
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
}
</script>