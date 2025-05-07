<!-- components/dashboard/metrics/PlatformDistributionComponent.vue -->
<template>
    <div>
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Platform Distribution</h4>
      
      <!-- Platform Selector Toggle Buttons -->
      <div class="flex mb-4">
        <button 
          v-for="platform in platforms" 
          :key="platform.name"
          class="px-4 py-2 text-sm font-medium transition-colors"
          :class="activePlatform === platform.name ? 'bg-burntOrangeDark text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'"
          @click="activePlatform = platform.name"
        >
          <div class="flex items-center">
            {{ platform.label }}
          </div>
        </button>
      </div>
      
      <!-- Active Platform Distribution -->
      <div class="mb-4 bg-gray-100 p-4">
        <div class="text-xs text-gray-500 mb-1">{{ getActivePlatform().label }}</div>
        <div class="text-xl font-bold text-burntOrangeDark">{{ formatPercentage(getActivePlatform().mentionRate) }}</div>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            class="h-2 rounded-full" 
            :style="{ 
              width: `${getActivePlatform().mentionRate * 100}%`,
              backgroundColor: 'rgb(194, 65, 12)' 
            }"
          ></div>
        </div>
      </div>
      
      <!-- Funnel Stage Distribution -->
      <h5 class="text-sm font-semibold mb-2 text-darkNavy">Funnel Stage Distribution</h5>
      <div class="grid grid-cols-3 gap-3">
        <div 
          v-for="stage in funnelStages" 
          :key="stage.name" 
          class="text-center p-3 bg-gray-50 rounded-lg"
        >
          <div class="text-xs text-gray-500 mb-1">{{ stage.name }}</div>
          <div class="text-lg font-semibold" :class="getFunnelTextColor(stage.name)">
            {{ formatPercentage(stage.percentage) }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    clientData: {
      type: Object,
      required: true
    }
  });
  
  // Define platforms with default values
  const platforms = ref([
    {
      name: 'perplexity',
      label: 'Perplexity',
      mentionRate: 0,
      color: '#C2410C' // burntOrangeDark - consistent color
    },
    {
      name: 'chatgpt',
      label: 'ChatGPT',
      mentionRate: 0,
      color: '#C2410C' // burntOrangeDark - consistent color
    }
  ]);
  
  // Active platform
  const activePlatform = ref('perplexity');
  
  // Get active platform
  const getActivePlatform = () => {
    return platforms.value.find(p => p.name === activePlatform.value) || platforms.value[0];
  };
  
  // Define funnel stages with default values
  const funnelStages = ref([
    { name: 'TOFU', percentage: 0 },
    { name: 'MOFU', percentage: 0 },
    { name: 'BOFU', percentage: 0 }
  ]);
  
  // Calculate platform mention rates
  const calculatePlatformRates = () => {
    if (!props.clientData || !props.clientData.query_data) return;
    
    // Process each platform
    platforms.value.forEach(platform => {
      const platformQueries = props.clientData.query_data.filter(query => 
        query.query_id.toLowerCase().includes(platform.name.toLowerCase())
      );
      
      if (platformQueries.length === 0) {
        platform.mentionRate = 0;
        return;
      }
      
      const brandMentionedCount = platformQueries.filter(query => 
        query.brand_mentioned === true || 
        (query.query_metrics && query.query_metrics.brand_mentioned === true)
      ).length;
      
      platform.mentionRate = brandMentionedCount / platformQueries.length;
    });
  };
  
  // Calculate funnel stage percentages
  const calculateFunnelStages = () => {
    if (!props.clientData || !props.clientData.query_data) return;
    
    const totalQueries = props.clientData.query_data.length;
    if (totalQueries === 0) return;
    
    // Reset counts
    const stageCounts = {
      'TOFU': 0,
      'MOFU': 0,
      'BOFU': 0
    };
    
    // Count queries by funnel stage
    props.clientData.query_data.forEach(query => {
      const stage = query.funnel_stage || 
                   (query.query_metrics && query.query_metrics.funnel_stage);
      
      if (stage && stageCounts[stage] !== undefined) {
        stageCounts[stage]++;
      }
    });
    
    // Update percentages
    funnelStages.value = funnelStages.value.map(stage => ({
      name: stage.name,
      percentage: stageCounts[stage.name] / totalQueries
    }));
  };
  
  // Helper for text coloring
  const getFunnelTextColor = (stage) => {
    switch(stage.toUpperCase()) {
      case 'TOFU':
        return 'text-blue-600';
      case 'MOFU':
        return 'text-purple-600';
      case 'BOFU':
        return 'text-green-600';
      default:
        return 'text-gray-800';
    }
  };
  
  // Format percentage
  const formatPercentage = (value) => {
    if (value === undefined || value === null) return '0%';
    return Math.round(value * 100) + '%';
  };
  
  // Initialize data when mounted
  onMounted(() => {
    calculatePlatformRates();
    calculateFunnelStages();
  });
  
  // Watch for changes in client data
  watch(() => props.clientData, () => {
    calculatePlatformRates();
    calculateFunnelStages();
  }, { deep: true });
  </script>