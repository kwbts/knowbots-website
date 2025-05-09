<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-semibold text-darkNavy">{{ title }}</h3>
      <div>
        <span class="px-2 py-1 rounded text-xs" 
              :class="propsReceived ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ propsReceived ? 'Props Received' : 'No Props' }}
        </span>
      </div>
    </div>
    
    <div class="bg-gray-50 p-3 rounded mb-3">
      <div><span class="font-medium">Props Status:</span> {{ propsReceived ? 'Received' : 'Missing' }}</div>
      <div v-if="propsReceived">
        <div><span class="font-medium">Client Name:</span> {{ clientData.client_name }}</div>
        <div><span class="font-medium">Queries:</span> {{ clientData.query_data?.length || 0 }}</div>
        <div><span class="font-medium">Has Summary:</span> {{ clientData.client_summary ? 'Yes' : 'No' }}</div>
      </div>
    </div>
    
    <div class="text-sm">
      <div v-if="propsReceived">
        <div>
          <button @click="showFullProps = !showFullProps" class="text-blue-600 underline text-xs">
            {{ showFullProps ? 'Hide' : 'Show' }} Full Props
          </button>
        </div>
        <pre v-if="showFullProps" class="mt-2 bg-gray-100 p-2 text-xs rounded overflow-auto max-h-40">{{ stringifiedProps }}</pre>
      </div>
      <div v-else class="text-red-600">
        Component is not receiving any props or they are invalid/empty.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  clientData: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: 'Component Props Debug'
  }
});

const showFullProps = ref(false);

// Check if we have real props
const propsReceived = computed(() => {
  return props.clientData && 
         typeof props.clientData === 'object' && 
         Object.keys(props.clientData).length > 0 &&
         props.clientData.client_name;
});

// Stringify props for display
const stringifiedProps = computed(() => {
  try {
    return JSON.stringify(props.clientData, null, 2);
  } catch (e) {
    return `Error stringifying props: ${e.message}`;
  }
});

// Log props on mount for debugging in console
onMounted(() => {
  console.log(`[PropDebugger] ${props.title} mounted with props:`, props.clientData);
  console.log(`[PropDebugger] Props received: ${propsReceived.value}`);
});

// Track props changes
watch(() => props.clientData, (newValue) => {
  console.log(`[PropDebugger] ${props.title} props changed:`, newValue);
  console.log(`[PropDebugger] Props received: ${propsReceived.value}`);
}, { deep: true });
</script>