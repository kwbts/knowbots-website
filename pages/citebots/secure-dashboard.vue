<template>
  <div>
    <div v-if="!authenticated" style="padding: 20px; text-align: center;">
      <h1>Please log in first</h1>
      <button @click="$router.push('/citebots/')" style="padding: 10px; background: blue; color: white;">
        Go to Login
      </button>
    </div>
    
    <div v-else-if="loading" style="padding: 20px; text-align: center;">
      Loading...
    </div>
    
    <div v-else-if="error" style="padding: 20px; text-align: center;">
      <h1>Error</h1>
      <p>{{ error }}</p>
      <button @click="loadData" style="padding: 10px; background: blue; color: white;">
        Try Again
      </button>
    </div>
    
    <div v-else style="padding: 20px;">
      <h1>Dashboard for {{ clientName }}</h1>
      <p>Client ID: {{ clientId }}</p>
      <p>Data loaded: {{ !!data }}</p>
      <p>Queries: {{ data?.query_data?.length || 0 }}</p>
      
      <div style="margin-top: 20px;">
        <button @click="showData = !showData" style="padding: 10px; background: gray; color: white;">
          {{ showData ? 'Hide' : 'Show' }} Data
        </button>
      </div>
      
      <pre v-if="showData" style="background: #f5f5f5; padding: 10px; margin-top: 10px; overflow: auto; max-height: 500px;">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
      clientName: '',
      clientId: '',
      loading: true,
      error: null,
      data: null,
      showData: false
    }
  },
  
  mounted() {
    this.checkAuth();
  },
  
  methods: {
    // Check authentication
    checkAuth() {
      try {
        const token = localStorage.getItem('citebot-token');
        if (!token) {
          this.authenticated = false;
          this.loading = false;
          return;
        }
        
        // Simple token check
        if (token.startsWith('citebot-')) {
          const encodedPayload = token.substring(8);
          const payload = JSON.parse(atob(encodedPayload));
          
          this.authenticated = true;
          this.clientName = payload.clientName;
          this.clientId = this.getClientId(payload.clientName);
          
          // Load data
          this.loadData();
        } else {
          this.authenticated = false;
          this.loading = false;
        }
      } catch (err) {
        console.error(err);
        this.authenticated = false;
        this.loading = false;
      }
    },
    
    // Get client ID
    getClientId(name) {
      const map = {
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
      return map[name] || name.toLowerCase().replace(/\s+/g, '-');
    },
    
    // Load data from secure API
    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        // Use the API endpoint with client-direct-json
        const timestamp = Date.now();
        const apiUrl = `/api/client-direct-json?clientId=${this.clientId}&t=${timestamp}`;
        console.log(`Loading data from API: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const jsonData = await response.json();
        console.log('Data loaded:', jsonData);
        
        // Store data
        this.data = jsonData;
      } catch (err) {
        console.error('Load error:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>