<!-- pages/citebots/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center">
    <!-- Header with Knowbots branding -->
    <header class="bg-white shadow-sm fixed top-0 w-full z-10">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="rounded-md bg-burntOrangeDark p-2">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold text-darkNavy">Knowbots CiteBots</h1>
              <p class="text-sm text-gray-500">Generative Engine Optimization Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content: Login Form -->
    <main class="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-16">
      <div class="max-w-md w-full">
        <!-- Already Logged In -->
        <div v-if="isAlreadyLoggedIn" class="bg-white py-8 px-6 shadow-md rounded-lg">
          <div class="text-center mb-8">
            <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 class="text-3xl font-bold text-darkNavy">Already Logged In</h2>
            <p class="mt-2 text-gray-600">You're logged in as {{ currentClient }}</p>
          </div>
          
          <div class="flex space-x-4">
            <button 
              @click="router.push('/citebots/dashboard/')" 
              class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-burntOrangeDark hover:bg-jasperOrange focus:outline-none"
            >
              Go to Dashboard
            </button>
            <button 
              @click="logout" 
              class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Log Out
            </button>
          </div>
        </div>

        <!-- Login Card -->
        <div v-else class="bg-white py-8 px-6 shadow-md rounded-lg">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-darkNavy">Client Login</h2>
            <p class="mt-2 text-gray-600">Access your CiteBots dashboard</p>
          </div>

          <!-- Error Message (if login fails) -->
          <div v-if="errorMessage" class="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {{ errorMessage }}
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Client Selection -->
            <div>
              <label for="client" class="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input 
                id="client" 
                type="text" 
                v-model="loginForm.client" 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark"
                placeholder="Enter your company name" 
                required
              />
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                id="password" 
                type="password" 
                v-model="loginForm.password" 
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark"
                placeholder="Enter your password" 
                required
              />
            </div>

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-burntOrangeDark hover:bg-jasperOrange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burntOrangeDark"
              >
                Sign In
              </button>
            </div>
          </form>

          <!-- Support Info -->
          <div class="mt-8 text-center text-sm text-gray-500">
            <p>Need help accessing your account?</p>
            <a 
              href="mailto:jon@knowbots.ca" 
              class="text-burntOrangeDark hover:text-jasperOrange"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white py-4 mt-8">
      <div class="max-w-screen-xl mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} Knowbots Marketing. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authenticateClient, getClientDataPath, generateClientToken, verifyClientToken, getAllClients } from '@/utils/secureAuth';

const router = useRouter();
const errorMessage = ref('');
const dataFilesStatus = ref([]);

// Check if already logged in by verifying token
const isAlreadyLoggedIn = computed(() => {
  const token = localStorage.getItem('citebot-token');
  if (!token) return false;
  
  const verification = verifyClientToken(token);
  return verification.valid;
});

// Get current client name from token
const currentClient = computed(() => {
  const token = localStorage.getItem('citebot-token');
  if (!token) return '';
  
  const verification = verifyClientToken(token);
  return verification.valid ? verification.clientName : '';
});

// Login form state (only defined once)
const loginForm = reactive({
  client: '',
  password: ''
});

// Handle login submission
const handleLogin = () => {
  // Clear any previous error messages
  errorMessage.value = '';
  
  // Validate inputs
  if (!loginForm.client.trim()) {
    errorMessage.value = 'Please enter your company name.';
    return;
  }
  
  if (!loginForm.password.trim()) {
    errorMessage.value = 'Please enter your password.';
    return;
  }
  
  // Authenticate the client
  const auth = authenticateClient(loginForm.client, loginForm.password);
  
  if (auth.success) {
    // Generate and store token
    const token = generateClientToken(auth.clientName);
    localStorage.setItem('citebot-token', token);
    
    // Redirect to dashboard
    router.push('/citebots/dashboard/');
  } else {
    // Failed login
    errorMessage.value = auth.message || 'Invalid client name or password.';
  }
};

// Handle logout
const logout = () => {
  localStorage.removeItem('citebot-token');
  window.location.reload(); // Reload the page to show login form
};

// Check for data files
const checkDataAvailability = async () => {
  try {
    // Get all clients
    const clients = getAllClients();
    
    // Check data file availability for each client
    const results = [];
    for (const client of clients) {
      const dataPath = getClientDataPath(client.name);
      let fileExists = false;
      
      try {
        const response = await fetch(dataPath, { method: 'HEAD' });
        fileExists = response.ok;
      } catch (error) {
        console.warn(`Error checking data file for ${client.name}:`, error);
      }
      
      results.push({
        clientName: client.name,
        clientId: client.id,
        dataPath,
        fileExists
      });
    }
    
    dataFilesStatus.value = results;
    console.table(dataFilesStatus.value);
    
    // Log summary of available data files
    const availableFiles = dataFilesStatus.value.filter(item => item.fileExists);
    console.log(`${availableFiles.length} of ${dataFilesStatus.value.length} client data files are available`);
    
    if (availableFiles.length === 0) {
      console.warn('⚠️ No client data files found! The dashboard will not work correctly.');
    }
  } catch (error) {
    console.error('Error checking data files:', error);
  }
};

onMounted(() => {
  // Check data file availability on mount (for debugging)
  checkDataAvailability();
  
  // If already logged in, redirect to dashboard
  if (isAlreadyLoggedIn.value && window.location.pathname === '/citebots/') {
    // Only redirect if directly on the login page
    setTimeout(() => {
      router.push('/citebots/dashboard/');
    }, 2000); // Delay to show the "Already Logged In" message
  }
});
</script>