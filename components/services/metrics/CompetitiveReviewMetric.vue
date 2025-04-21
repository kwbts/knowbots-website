<!-- components/services/metrics/CompetitiveReviewMetric.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-3 text-darkNavy">Competitor Comparison</h4>
    
    <!-- Brand Selector -->
    <div class="mb-4 flex space-x-2">
      <button 
        @click="activeCompetitor = 'competitorA'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activeCompetitor === 'competitorA' ? 'bg-indigo-300 text-darkNavy' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        Competitor A
      </button>
      <button 
        @click="activeCompetitor = 'competitorB'" 
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="activeCompetitor === 'competitorB' ? 'bg-teal-200 text-darkNavy' : 'bg-gray-200 text-darkGray hover:bg-gray-300'"
      >
        Competitor B
      </button>
    </div>
    
    <!-- Comparison Chart -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <div v-if="activeCompetitor === 'competitorA'">
        <div class="flex justify-between text-sm font-medium text-darkGray mb-2">
          <span>Citation Metrics</span>
          <div class="flex space-x-4">
            <span class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-burntOrangeDark inline-block mr-1"></span>
              You
            </span>
            <span class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-indigo-300 inline-block mr-1"></span>
              Competitor A
            </span>
          </div>
        </div>
        
        <!-- Citation Rate -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Citation Rate</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 45%">
              45%
            </div>
            <div class="bg-indigo-300 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 32%">
              32%
            </div>
          </div>
        </div>
        
        <!-- Number of Citations -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Number of Citations</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 52%">
              156
            </div>
            <div class="bg-indigo-300 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 37%">
              112
            </div>
          </div>
        </div>
        
        <!-- Domain Authority -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Domain Authority</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 58%">
              58
            </div>
            <div class="bg-indigo-300 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 48%">
              48
            </div>
          </div>
        </div>
        
        <!-- Citation Match Score -->
        <div>
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Citation Match Score</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 76%">
              76%
            </div>
            <div class="bg-indigo-300 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 65%">
              65%
            </div>
          </div>
        </div>
      </div>
      
      <div v-else>
        <div class="flex justify-between text-sm font-medium text-darkGray mb-2">
          <span>Citation Metrics</span>
          <div class="flex space-x-4">
            <span class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-burntOrangeDark inline-block mr-1"></span>
              You
            </span>
            <span class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-teal-200 inline-block mr-1"></span>
              Competitor B
            </span>
          </div>
        </div>
        
        <!-- Citation Rate -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Citation Rate</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 45%">
              45%
            </div>
            <div class="bg-teal-200 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 18%">
              18%
            </div>
          </div>
        </div>
        
        <!-- Number of Citations -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Number of Citations</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 52%">
              156
            </div>
            <div class="bg-teal-200 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 20%">
              61
            </div>
          </div>
        </div>
        
        <!-- Domain Authority -->
        <div class="mb-4">
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Domain Authority</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 58%">
              58
            </div>
            <div class="bg-teal-200 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 36%">
              36
            </div>
          </div>
        </div>
        
        <!-- Citation Match Score -->
        <div>
          <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
            <span>Citation Match Score</span>
          </div>
          <div class="flex w-full h-5">
            <div class="bg-burntOrangeDark text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full" style="width: 76%">
              76%
            </div>
            <div class="bg-teal-200 text-xs font-medium text-darkNavy text-center p-0.5 leading-none rounded-r-full" style="width: 42%">
              42%
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Competitive Insight -->
    <div class="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
      <h5 class="font-medium text-blue-800 mb-1">Your Competitive Advantage</h5>
      <p class="text-sm text-blue-700">
        {{ activeCompetitor === 'competitorA' ? 
          'You outperform Competitor A in all key metrics, with a significant 13% edge in citation rate and 11% higher citation match score.' : 
          'Your brand dominates against Competitor B with more than double the citation rate and significantly higher domain authority.'
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeCompetitor = ref('competitorA');
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>