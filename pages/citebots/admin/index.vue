<!-- pages/citebots/admin/index.vue -->
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
                <h1 class="text-xl font-semibold text-darkNavy">CiteBots Admin Dashboard</h1>
                <p class="text-sm text-gray-500">Generative Engine Optimization Management</p>
              </div>
            </div>
            
            <!-- Right: User Menu -->
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">Welcome, Admin</span>
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
        <!-- Login Form (only shown if not authenticated) -->
        <div v-if="!isAuthenticated" class="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
          <h2 class="text-2xl font-semibold text-darkNavy mb-6 text-center">Admin Login</h2>
          
          <!-- Show error message if login failed -->
          <div v-if="errorMessage" class="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {{ errorMessage }}
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input 
                id="username" 
                type="text" 
                v-model="username" 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark" 
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                id="password" 
                type="password" 
                v-model="password" 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark" 
                placeholder="Enter password"
              />
            </div>
            
            <div>
              <button 
                type="submit" 
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-burntOrangeDark hover:bg-jasperOrange focus:outline-none"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        
        <!-- Admin Dashboard Content (only shown if authenticated) -->
        <div v-else class="space-y-6">
          <!-- Client Selector Card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-darkNavy">Client Management</h2>
              
              <!-- Client Dropdown Selector -->
              <div class="relative">
                <select 
                  v-model="selectedClient" 
                  @change="handleClientChange"
                  class="block w-64 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark rounded-md appearance-none bg-white"
                >
                  <option value="" disabled>Select a client</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Client Overview Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Total Clients</div>
                <div class="text-2xl font-bold text-darkNavy">{{ clients.length }}</div>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Active Reports</div>
                <div class="text-2xl font-bold text-green-600">{{ activeReportsCount }}</div>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Total Citations</div>
                <div class="text-2xl font-bold text-purple-600">{{ totalCitationsCount }}</div>
              </div>
              
              <div class="bg-orange-50 p-4 rounded-lg">
                <div class="text-sm text-gray-500 mb-1">Avg Citation Rate</div>
                <div class="text-2xl font-bold text-burntOrangeDark">{{ avgCitationRate }}%</div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4">
              <button 
                @click="viewClientDashboard" 
                :disabled="!selectedClient"
                class="px-4 py-2 bg-burntOrangeDark text-white rounded-md shadow-sm hover:bg-jasperOrange disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Dashboard
              </button>
              
              <button 
                @click="generateReport" 
                :disabled="!selectedClient"
                class="px-4 py-2 bg-white border border-gray-300 text-darkNavy rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Report
              </button>
              
              <button 
                @click="refreshData" 
                :disabled="!selectedClient"
                class="px-4 py-2 bg-white border border-gray-300 text-darkNavy rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refresh Data
              </button>
            </div>
          </div>
          
          <!-- Client List Table -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-darkNavy">Client List</h2>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citation Rate</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="client in clients" :key="client.id" :class="{'bg-blue-50': selectedClient === client.id}">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-darkNavy">{{ client.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(client.dataStatus)">
                        {{ client.dataStatus }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ client.citationRate }}%</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(client.lastUpdated) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        @click="() => selectClient(client.id)"
                        class="text-burntOrangeDark hover:text-jasperOrange"
                      >
                        Select
                      </button>
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
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const selectedClient = ref('');
  const isLoading = ref(false);
  
  // Check if admin is authenticated
  const isAuthenticated = ref(false);
  
  // Mock client data for demo
  const clients = ref([
    { 
      id: 'bridgit', 
      name: 'Bridgit', 
      dataStatus: 'Active',
      citationRate: 42,
      lastUpdated: new Date('2025-04-10T15:30:00')
    },
    { 
      id: 'knak', 
      name: 'Knak', 
      dataStatus: 'Active',
      citationRate: 38,
      lastUpdated: new Date('2025-04-15T09:45:00')
    },
    { 
      id: 'metarouter', 
      name: 'MetaRouter', 
      dataStatus: 'Active',
      citationRate: 31,
      lastUpdated: new Date('2025-04-05T11:20:00')
    },
    { 
      id: 'cart', 
      name: 'Cart.com', 
      dataStatus: 'Active',
      citationRate: 45,
      lastUpdated: new Date('2025-04-18T14:15:00')
    },
    { 
      id: 'emmie-co', 
      name: 'Emmie Co', 
      dataStatus: 'Active',
      citationRate: 32,
      lastUpdated: new Date('2025-04-12T10:30:00')
    },
    { 
      id: 'fidus', 
      name: 'Fidus', 
      dataStatus: 'Active',
      citationRate: 29,
      lastUpdated: new Date('2025-04-14T16:45:00')
    },
    { 
      id: 'humans-of-martech', 
      name: 'Humans of Martech', 
      dataStatus: 'Active',
      citationRate: 44,
      lastUpdated: new Date('2025-04-20T09:15:00')
    },
    { 
      id: 'klipfolio', 
      name: 'Klipfolio', 
      dataStatus: 'Processing',
      citationRate: 35,
      lastUpdated: new Date('2025-04-22T13:40:00')
    },
    { 
      id: 'treasure-data', 
      name: 'Treasure Data', 
      dataStatus: 'Active',
      citationRate: 41,
      lastUpdated: new Date('2025-04-17T11:25:00')
    }
  ]);
  
  // Computed values for dashboard stats
  const activeReportsCount = computed(() => {
    return clients.value.filter(client => client.dataStatus === 'Active').length;
  });
  
  const totalCitationsCount = computed(() => {
    // This would be calculated from actual data in a real implementation
    return 1284;
  });
  
  const avgCitationRate = computed(() => {
    const activeClients = clients.value.filter(client => client.dataStatus === 'Active');
    if (activeClients.length === 0) return 0;
    
    const sum = activeClients.reduce((total, client) => total + client.citationRate, 0);
    return Math.round(sum / activeClients.length);
  });
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Not available';
    
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Get CSS class for status badge
  const getStatusClass = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };
  
  // Handle admin login
  const handleLogin = () => {
    // Clear any previous error message
    errorMessage.value = '';
    
    // Validate inputs
    if (!username.value.trim()) {
      errorMessage.value = 'Please enter your company name.';
      return;
    }
    
    if (!password.value.trim()) {
      errorMessage.value = 'Please enter your password.';
      return;
    }
    
    // Check if the company name is "Admin" and password is "knowbots2025"
    if (username.value.trim() === 'Admin' && password.value === 'knowbots2025') {
      // Store in local storage to persist login (only in browser)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('citebot-admin-auth', 'true');
      }
      
      isAuthenticated.value = true;
      
      // Reset fields
      username.value = '';
      password.value = '';
    } else {
      // Show error message for incorrect credentials
      errorMessage.value = 'Invalid company name or password. Please try again.';
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    // Remove auth token from local storage (only in browser)
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('citebot-admin-auth');
    }
    
    // Reset authenticated state
    isAuthenticated.value = false;
  };
  
  // Handle client selection from dropdown
  const handleClientChange = () => {
    console.log(`Selected client: ${selectedClient.value}`);
  };
  
  // Select client from the table
  const selectClient = (clientId) => {
    selectedClient.value = clientId;
  };
  
  // View client dashboard
  const viewClientDashboard = () => {
    if (!selectedClient.value) return;
    
    // In a real implementation, this would navigate to the client dashboard with correct auth
    // For now, we'll just log the action
    console.log(`Viewing dashboard for client: ${selectedClient.value}`);
    
    // Navigate to client dashboard
    router.push(`/citebots/dashboard/?client=${selectedClient.value}`);
  };
  
  // Generate report for client
  const generateReport = () => {
    if (!selectedClient.value) return;
    
    console.log(`Generating report for client: ${selectedClient.value}`);
    // In a real implementation, this would trigger a report generation process
  };
  
  // Refresh client data
  const refreshData = () => {
    if (!selectedClient.value) return;
    
    console.log(`Refreshing data for client: ${selectedClient.value}`);
    // In a real implementation, this would trigger a data refresh process
  };
  
  // Check auth status on mount (client-side only)
  onMounted(() => {
    // Check if we're in a browser environment
    if (typeof localStorage !== 'undefined') {
      // Check if admin is authenticated from local storage
      const adminAuth = localStorage.getItem('citebot-admin-auth');
      isAuthenticated.value = adminAuth === 'true';
      
      // If selected client is stored in localStorage, restore it
      const storedClient = localStorage.getItem('citebot-selected-client');
      if (storedClient) {
        selectedClient.value = storedClient;
      }
    }
  });
  
  // Watch for changes to selectedClient and save to localStorage (client-side only)
  watch(selectedClient, (newValue) => {
    if (newValue && typeof localStorage !== 'undefined') {
      localStorage.setItem('citebot-selected-client', newValue);
    }
  });
  </script>