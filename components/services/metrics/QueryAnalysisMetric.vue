<!-- components/services/metrics/QueryAnalysisMetric.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Brand Citation Rate</h4>
    
    <!-- Platform Selector -->
    <div class="mb-4 flex space-x-2">
      <button 
        @click="activePlatform = 'chatgpt'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activePlatform === 'chatgpt' ? 'bg-burntOrangeDark text-white' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        ChatGPT
      </button>
      <button 
        @click="activePlatform = 'perplexity'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activePlatform === 'perplexity' ? 'bg-burntOrangeDark text-white' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        Perplexity
      </button>
    </div>
    
    <!-- Citation Rate Visualization - Gauge Charts -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <div class="grid grid-cols-2 gap-4">
        <!-- Your Brand Gauge -->
        <div class="flex flex-col items-center">
          <div class="text-center">
            <p class="text-sm font-medium text-darkGray mb-2">Your Brand</p>
            <div class="relative w-32 h-32 mx-auto">
              <!-- Background Circle -->
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  stroke-width="12"
                  stroke-linecap="round"
                />
                
                <!-- Value arc -->
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  :stroke="activePlatform === 'chatgpt' ? '#C2410C' : '#C2410C'" 
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="calculateStrokeDashOffset(activePlatform === 'chatgpt' ? 45 : 48)"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ activePlatform === 'chatgpt' ? '45%' : '48%' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Competitor Gauge -->
        <div class="flex flex-col items-center">
          <div class="text-center">
            <p class="text-sm font-medium text-darkGray mb-2">Your Competitor</p>
            <div class="relative w-32 h-32 mx-auto">
              <!-- Background Circle -->
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  stroke-width="12"
                  stroke-linecap="round"
                />
                
                <!-- Value arc -->
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#6366F1" 
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="calculateStrokeDashOffset(activePlatform === 'chatgpt' ? 21 : 25)"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <!-- Value in the center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-darkNavy">{{ activePlatform === 'chatgpt' ? '21%' : '25%' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison summary -->
      <div class="mt-4 text-center">
        <p class="text-sm text-darkGray">
          Your brand has a 
          <span class="font-medium text-green-600">
            {{ activePlatform === 'chatgpt' ? '24%' : '23%' }} advantage
          </span> 
          over your competitor on {{ activePlatform === 'chatgpt' ? 'ChatGPT' : 'Perplexity' }}.
        </p>
      </div>
    </div>
    
    <!-- Quick Win Opportunity -->
    <div class="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
      <h5 class="font-medium text-green-800 mb-1">Quick Win Opportunity</h5>
      <p class="text-sm text-green-700">
        Increase citations by 35% with focused optimization on 3 key query clusters.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activePlatform = ref('chatgpt');

// Helper function to calculate stroke-dashoffset for gauge chart
// 251.2 is the circumference of the circle with r=40 (2 * PI * r)
const calculateStrokeDashOffset = (percentage) => {
  const circumference = 251.2;
  return circumference - (circumference * percentage / 100);
};
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>