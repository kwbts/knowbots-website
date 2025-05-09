<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
    <div class="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">CiteBots Diagnostics</h1>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-8">
        <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-400">Running diagnostics...</span>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
        <h2 class="font-bold mb-2">Error</h2>
        <p>{{ error }}</p>
        <button @click="runDiagnostics" class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
          Try Again
        </button>
      </div>
      
      <!-- Results -->
      <div v-else-if="diagnostics">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Environment Info -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Environment</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Mode:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ diagnostics.environment }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Platform:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ diagnostics.serverInfo.platform }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Node Version:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ diagnostics.serverInfo.nodeVersion }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Timestamp:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ formatDate(diagnostics.serverInfo.timestamp) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Test File Read -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Test File: {{ diagnostics.filesInfo.testFileRead?.fileName }}
            </h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Exists:</span>
                <span class="font-medium" :class="diagnostics.filesInfo.testFileRead?.exists ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ diagnostics.filesInfo.testFileRead?.exists ? 'Yes' : 'No' }}
                </span>
              </div>
              <div v-if="diagnostics.filesInfo.testFileRead?.size" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Size:</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ formatBytes(diagnostics.filesInfo.testFileRead.size) }}</span>
              </div>
              <div v-if="diagnostics.filesInfo.testFileRead?.error" class="text-red-600 dark:text-red-400">
                Error: {{ diagnostics.filesInfo.testFileRead.error }}
              </div>
              <div v-if="diagnostics.filesInfo.testFileRead?.preview" class="mt-2">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Preview:</div>
                <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-xs overflow-x-auto">
                  {{ diagnostics.filesInfo.testFileRead.preview }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Client Data Files -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Client Data Files</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white dark:bg-gray-900 rounded-lg">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client ID</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exists</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Modified</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="file in diagnostics.filesInfo.clientDataFiles" :key="file.clientId" 
                    :class="file.exists ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'">
                  <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{{ file.clientId }}</td>
                  <td class="px-4 py-2 text-sm font-mono text-gray-800 dark:text-gray-200">{{ file.fileName }}</td>
                  <td class="px-4 py-2 text-sm">
                    <span :class="file.exists ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ file.exists ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {{ file.size ? formatBytes(file.size) : '-' }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {{ file.lastModified ? formatDate(file.lastModified) : '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Directories -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Directories</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div v-for="(dir, name) in diagnostics.directories" :key="name" 
                 class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 dark:text-white mb-2">{{ name }}</h3>
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Exists:</span>
                  <span :class="dir.exists ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ dir.exists ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div v-if="dir.error" class="text-red-600 dark:text-red-400 text-sm">
                  Error: {{ dir.error }}
                </div>
                <div v-if="dir.exists && dir.contents && dir.contents.length > 0" class="mt-2">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Contents:</div>
                  <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded max-h-40 overflow-y-auto">
                    <ul class="text-xs font-mono">
                      <li v-for="item in dir.contents" :key="item" class="truncate">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Request Info -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Request Information</h2>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="mb-2">
              <span class="text-gray-600 dark:text-gray-400">URL:</span>
              <span class="ml-2 font-medium text-gray-800 dark:text-white">{{ diagnostics.requestInfo.url }}</span>
            </div>
            <div>
              <div class="text-gray-600 dark:text-gray-400 mb-1">Headers:</div>
              <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-xs overflow-x-auto">
                <div v-for="(value, key) in diagnostics.requestInfo.headers" :key="key" class="pb-1">
                  <span class="text-blue-600 dark:text-blue-400">{{ key }}:</span> {{ value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!isLoading" class="mt-6 flex space-x-4">
        <button @click="runDiagnostics" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Run Diagnostics Again
        </button>
        <button @click="goToDashboard" class="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State for diagnostics data and loading
const diagnostics = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Format bytes to human-readable size
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Format date to human-readable format
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (e) {
    return dateString || 'N/A';
  }
};

// Run the diagnostics API call
const runDiagnostics = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await fetch('/api/debug-files');
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    diagnostics.value = await response.json();
  } catch (e) {
    error.value = e.message || 'Failed to run diagnostics';
  } finally {
    isLoading.value = false;
  }
};

// Navigate back to dashboard
const goToDashboard = () => {
  router.push('/citebots/dashboard/');
};

// Run diagnostics when component mounts
onMounted(() => {
  runDiagnostics();
});
</script>