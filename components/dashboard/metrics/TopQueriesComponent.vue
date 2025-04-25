<!-- components/dashboard/metrics/TopQueriesComponent.vue -->
<template>
    <div>
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Top Queries by Citation Count</h4>
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Citations</th>
              <th scope="col" class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Funnel</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(query, index) in topQueries" :key="index" class="hover:bg-gray-50">
              <td class="px-3 py-2 text-sm text-gray-900 truncate max-w-[200px]">{{ query.query_text }}</td>
              <td class="px-3 py-2 text-sm text-gray-900 text-center">{{ query.citation_count }}</td>
              <td class="px-3 py-2 text-sm text-center">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="getFunnelStageClass(query.funnel_stage)"
                >
                  {{ query.funnel_stage }}
                </span>
              </td>
            </tr>
            <tr v-if="topQueries.length === 0" class="hover:bg-gray-50">
              <td colspan="3" class="px-3 py-4 text-sm text-center text-gray-500">No queries available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    clientData: {
      type: Object,
      required: true
    }
  });
  
  // Get top queries by citation count
  const topQueries = computed(() => {
    if (!props.clientData || !props.clientData.query_data) return [];
    
    const queries = [...props.clientData.query_data]
      .filter(query => {
        // Check for citation_count in different places
        return query.citation_count !== undefined || 
               (query.query_metrics && query.query_metrics.citation_count !== undefined);
      })
      .map(query => {
        // Extract the funnel stage and citation count from different possible locations
        const funnelStage = query.funnel_stage || 
                           (query.query_metrics && query.query_metrics.funnel_stage) || 
                           'Unknown';
                           
        const citationCount = query.citation_count || 
                             (query.query_metrics && query.query_metrics.citation_count) || 
                             0;
        
        return {
          query_id: query.query_id,
          query_text: query.query_text || 
                     (query.query_metrics && query.query_metrics.query_text) || 
                     'Unnamed Query',
          citation_count: citationCount,
          funnel_stage: funnelStage
        };
      })
      .sort((a, b) => b.citation_count - a.citation_count)
      .slice(0, 5); // Only show top 5
    
    return queries;
  });
  
  // Funnel stage class - determine styling for funnel stage badges
  const getFunnelStageClass = (stage) => {
    if (!stage) return 'bg-gray-100 text-gray-800';
    
    switch(stage.toUpperCase()) {
      case 'TOFU':
        return 'bg-blue-100 text-blue-800';
      case 'MOFU':
        return 'bg-purple-100 text-purple-800';
      case 'BOFU':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  </script>