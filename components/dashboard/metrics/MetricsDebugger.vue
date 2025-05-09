<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Data Structure Debugger</h3>
      <button @click="debugActive = !debugActive" class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
        {{ debugActive ? 'Hide' : 'Show' }} Debug Info
      </button>
    </div>
    
    <div v-if="debugActive" class="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
      <div class="text-sm mb-2 text-gray-700 dark:text-gray-300">Client data structure:</div>
      <div class="overflow-auto max-h-80">
        <pre class="text-xs font-mono whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-2 rounded-md">{{ clientDataInfo }}</pre>
      </div>
      
      <div class="grid grid-cols-2 gap-2 mt-4">
        <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <div class="text-xs text-gray-500 dark:text-gray-400">Client Name:</div>
          <div class="text-sm font-medium">{{ clientData?.client_name || 'Not set' }}</div>
        </div>
        
        <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <div class="text-xs text-gray-500 dark:text-gray-400">Query Data Length:</div>
          <div class="text-sm font-medium">{{ clientData?.query_data?.length || 0 }}</div>
        </div>
        
        <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <div class="text-xs text-gray-500 dark:text-gray-400">Has Client Summary:</div>
          <div class="text-sm font-medium">{{ clientData?.client_summary ? 'Yes' : 'No' }}</div>
        </div>
        
        <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <div class="text-xs text-gray-500 dark:text-gray-400">Total Citations:</div>
          <div class="text-sm font-medium">{{ totalCitations }}</div>
        </div>
      </div>
      
      <div v-if="clientData?.query_data?.length > 0" class="mt-4">
        <div class="text-sm mb-2 text-gray-700 dark:text-gray-300">First query sample:</div>
        <div class="overflow-auto max-h-40">
          <pre class="text-xs font-mono whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-2 rounded-md">{{ firstQuerySample }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  clientData: {
    type: Object,
    default: () => ({})
  }
});

const debugActive = ref(false);

// Calculate total citations across all queries
const totalCitations = computed(() => {
  if (!props.clientData?.query_data) return 0;
  
  let count = 0;
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      count += query.associated_pages.length;
    }
  });
  
  return count;
});

// Get sample of first query for debugging
const firstQuerySample = computed(() => {
  if (!props.clientData?.query_data?.length) return 'No queries available';
  
  try {
    return JSON.stringify(props.clientData.query_data[0], null, 2);
  } catch (e) {
    return `Error stringifying query: ${e.message}`;
  }
});

// Get client data structure overview
const clientDataInfo = computed(() => {
  try {
    // Create a simplified representation of the data structure
    const structure = {
      client_name: props.clientData?.client_name || null,
      query_data: props.clientData?.query_data 
        ? `Array(${props.clientData.query_data.length})` 
        : null,
      client_summary: props.clientData?.client_summary 
        ? Object.keys(props.clientData.client_summary) 
        : null,
      // Add sample of first query if available
      first_query: props.clientData?.query_data?.[0] 
        ? {
            query_text: props.clientData.query_data[0].query_text,
            associated_pages: props.clientData.query_data[0].associated_pages 
              ? `Array(${props.clientData.query_data[0].associated_pages.length})` 
              : null
          }
        : null
    };
    
    return JSON.stringify(structure, null, 2);
  } catch (e) {
    return `Error getting data structure: ${e.message}`;
  }
});
</script>