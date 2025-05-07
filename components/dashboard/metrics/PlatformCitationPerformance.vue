<!-- components/dashboard/metrics/PlatformCitationPerformance.vue -->
<template>
  <div class="metric-container">
    <h4 class="text-lg font-semibold mb-4 text-darkNavy">Platform Citation Performance</h4>
    
    <!-- Platform-specific metrics -->
    <div class="space-y-0">
      <div v-for="platform in platforms" :key="platform.name" class="bg-gray-50 p-6">
        <div class="flex flex-col md:flex-row items-start">
          <!-- Platform Title and Citation Rate -->
          <div class="w-full md:w-1/4 mb-8 md:mb-0">
            <h5 class="text-lg font-medium text-darkNavy mb-3">{{ platform.label }}</h5>
            <!-- Small Client Platform Gauge -->
            <div class="relative w-36 h-36 mx-auto">
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
                
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#C2410C" 
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="calculateStrokeDashOffset(platform.clientRate)"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <div class="absolute inset-0 flex items-center justify-center flex-col">
                <span class="text-2xl font-bold text-darkNavy">{{ formatPercentage(platform.clientRate) }}</span>
                <span class="text-xs text-gray-500 mt-1">Citation Rate</span>
              </div>
            </div>
            <div class="text-sm text-center mt-2 text-darkGray">
              {{ platform.citationCount }} of {{ platform.totalCitations }} total citations
            </div>
          </div>
          
          <!-- Platform metrics -->
          <div class="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <!-- Citation Metrics - Top Row -->
            <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Count -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.citationCount }}</p>
                <p class="text-xs text-gray-500">Citation Count</p>
              </div>
              
              <!-- Avg Quality -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.avgQuality }}</p>
                <p class="text-xs text-gray-500">Avg Quality</p>
              </div>
              
              <!-- Citation Match Score -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.matchScore || '-' }}</p>
                <p class="text-xs text-gray-500">Match Score</p>
              </div>
              
              <!-- Unique Content Score -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.uniqueContentScore || '-' }}</p>
                <p class="text-xs text-gray-500">Uniqueness</p>
              </div>
            </div>
            
            <!-- Content Types Donut Chart -->
            <div class="md:col-span-2 row-span-2">
              <p class="text-sm font-medium text-darkGray mb-3">Content Types</p>
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <div class="flex flex-row items-center">
                  <!-- Donut Chart SVG -->
                  <div class="w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full">
                      <!-- Donut chart segments -->
                      <circle
                        v-for="(segment, i) in generateDonutSegments(platform.contentTypes)"
                        :key="i"
                        cx="50"
                        cy="50"
                        r="40"
                        :stroke="segment.color"
                        stroke-width="20"
                        fill="none"
                        :stroke-dasharray="segment.dashArray"
                        :stroke-dashoffset="segment.dashOffset"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  
                  <!-- Content Type Labels to the right of the chart -->
                  <div class="flex flex-col pl-4 space-y-2">
                    <div v-for="(type, i) in platform.contentTypes" :key="i" class="flex items-center">
                      <span class="w-3 h-3 rounded-full mr-2" :style="`background-color: ${getContentTypeColor(i)}`"></span>
                      <span class="text-xs text-darkGray whitespace-nowrap">{{ type.type }}: <strong>{{ Math.round(type.percentage) }}%</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Additional Metrics - Bottom Row -->
            <div class="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Content Depth -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.avgDepth || '-' }}</p>
                <p class="text-xs text-gray-500">Avg Depth</p>
              </div>
              
              <!-- Content Optimization -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.avgOptimization || '-' }}</p>
                <p class="text-xs text-gray-500">Optimization</p>
              </div>
              
              <!-- HTML Structure -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.avgHtmlStructure || '-' }}</p>
                <p class="text-xs text-gray-500">HTML Structure</p>
              </div>
              
              <!-- GPT Analysis -->
              <div class="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                <p class="text-2xl font-bold text-darkNavy mb-1">{{ platform.avgGptAnalysis || '-' }}</p>
                <p class="text-xs text-gray-500">GPT Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  clientData: {
    type: Object,
    required: true
  }
});

// Get client name from data
const clientName = computed(() => {
  return props.clientData?.client_name || 'Client';
});

// Define platforms with different starting values
const platforms = ref([
  {
    name: 'chatgpt',
    label: 'ChatGPT',
    clientRate: 0,
    citationCount: 0,
    avgQuality: 0,
    totalCitations: 0,
    matchScore: null,
    uniqueContentScore: null,
    avgDepth: null,
    avgOptimization: null,
    avgHtmlStructure: null,
    avgGptAnalysis: null,
    contentTypes: [
      { type: 'No Data', percentage: 100 }
    ]
  },
  {
    name: 'perplexity',
    label: 'Perplexity',
    clientRate: 0,
    citationCount: 0,
    avgQuality: 0,
    totalCitations: 0,
    matchScore: null,
    uniqueContentScore: null,
    avgDepth: null,
    avgOptimization: null,
    avgHtmlStructure: null,
    avgGptAnalysis: null,
    contentTypes: [
      { type: 'No Data', percentage: 100 }
    ]
  }
]);

// Helper function to calculate stroke-dashoffset for gauge chart
const calculateStrokeDashOffset = (percentage) => {
  const circumference = 251.2;
  return circumference - (circumference * percentage / 100);
};

// Format percentage value
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return Math.round(value) + '%';
};

// Get color for content types
const getContentTypeColor = (index) => {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#F59E0B', // Amber
    '#EF4444'  // Red
  ];
  
  return colors[index % colors.length];
};

// Generate donut chart segments for SVG
const generateDonutSegments = (items) => {
  const circumference = 251.2; // 2 * Math.PI * 40
  const segments = [];
  let dashOffset = 0;
  
  items.forEach((item, index) => {
    // Make sure we're using the raw percentage value here, not a percentage of 100
    const dashArray = (item.percentage / 100) * circumference;
    segments.push({
      dashArray: `${dashArray} ${circumference - dashArray}`,
      dashOffset: dashOffset,
      color: getContentTypeColor(index)
    });
    dashOffset -= dashArray;
  });
  
  return segments;
};

// Helper function to determine platform from various sources
const determinePlatform = (page, query) => {
  // Direct data_source property takes precedence
  if (page.data_source) {
    return page.data_source.toLowerCase();
  }
  
  // Check query ID for platform identifier
  if (query && query.query_id) {
    if (query.query_id.toLowerCase().includes('perplexity')) {
      return 'perplexity';
    } else if (query.query_id.toLowerCase().includes('chatgpt')) {
      return 'chatgpt';
    }
  }
  
  // Check query data_source
  if (query && query.data_source) {
    return query.data_source.toLowerCase();
  }
  
  // Check query_metrics data_source
  if (query && query.query_metrics && query.query_metrics.data_source) {
    return query.query_metrics.data_source.toLowerCase();
  }
  
  // Default to unknown if no platform information available
  return 'unknown';
};

// Analyze platform data - focused on citations
const analyzePlatformData = () => {
  if (!props.clientData?.query_data || props.clientData.query_data.length === 0) return;
  
  // Analyzing platform data for client
  
  // Reset the platforms with fresh data
  platforms.value = [
    {
      name: 'chatgpt',
      label: 'ChatGPT',
      clientRate: 0,
      citationCount: 0,
      avgQuality: 0,
      totalCitations: 0,
      matchScore: null,
      uniqueContentScore: null,
      avgDepth: null,
      avgOptimization: null,
      avgHtmlStructure: null,
      avgGptAnalysis: null,
      contentTypes: [
        { type: 'No Data', percentage: 100 }
      ]
    },
    {
      name: 'perplexity',
      label: 'Perplexity',
      clientRate: 0,
      citationCount: 0,
      avgQuality: 0,
      totalCitations: 0,
      matchScore: null,
      uniqueContentScore: null,
      avgDepth: null,
      avgOptimization: null,
      avgHtmlStructure: null,
      avgGptAnalysis: null,
      contentTypes: [
        { type: 'No Data', percentage: 100 }
      ]
    }
  ];
  
  // Count pages for each platform
  const platformCounts = {
    chatgpt: { total: 0, brand: 0, pages: [] },
    perplexity: { total: 0, brand: 0, pages: [] }
  };
  
  // Process all associated pages
  props.clientData.query_data.forEach(query => {
    if (query.associated_pages && Array.isArray(query.associated_pages)) {
      query.associated_pages.forEach(page => {
        // Determine platform (ChatGPT or Perplexity)
        const platform = determinePlatform(page, query);
        
        // Skip pages with unknown platform
        if (platform !== 'chatgpt' && platform !== 'perplexity') {
          return;
        }
        
        // Increment total count for this platform
        platformCounts[platform].total++;
        
        // Add this page to the platform's pages
        platformCounts[platform].pages.push(page);
        
        // Check if it's a brand mention
        if (page.brand_mentioned === true || 
            page.brand_mentioned === "checked" ||
            page.is_client_domain === true || 
            page.is_client_domain === "checked") {
          platformCounts[platform].brand++;
        }
      });
    }
  });
  
  // Process metrics for each platform
  platforms.value.forEach(platform => {
    const platformData = platformCounts[platform.name];
    
    // Skip if no pages for this platform
    if (platformData.total === 0) {
      platform.contentTypes = [
        { type: 'Blog', percentage: 45 },
        { type: 'Product', percentage: 35 },
        { type: 'Documentation', percentage: 20 }
      ];
      return;
    }
    
    // Update platform metrics
    platform.totalCitations = platformData.total;
    platform.citationCount = platformData.brand;
    
    // Calculate client rate
    if (platformData.total > 0) {
      platform.clientRate = (platformData.brand / platformData.total) * 100;
    } else {
      platform.clientRate = 0;
    }
    
    // Calculate quality metrics
    let totalQuality = 0;
    let totalMatchScore = 0;
    let totalUniqueScore = 0;
    let totalDepthScore = 0;
    let totalOptimizationScore = 0;
    let totalHtmlStructureScore = 0;
    let totalGptAnalysisScore = 0;
    
    let qualityCount = 0;
    let matchScoreCount = 0;
    let uniqueScoreCount = 0;
    let depthScoreCount = 0;
    let optimizationScoreCount = 0;
    let htmlStructureScoreCount = 0;
    let gptAnalysisScoreCount = 0;
    
    // Process brand pages for quality metrics
    const contentTypes = {};
    
    // Only look at brand pages for content metrics
    const brandPages = platformData.pages.filter(page => 
      page.brand_mentioned === true || 
      page.brand_mentioned === "checked" ||
      page.is_client_domain === true || 
      page.is_client_domain === "checked"
    );
    
    brandPages.forEach(page => {
      // Add to quality calculation
      if (page.citation_match_quality) {
        totalQuality += page.citation_match_quality;
        qualityCount++;
      }
      
      // Add to match score calculation
      if (page.citation_match_quality) {
        totalMatchScore += page.citation_match_quality;
        matchScoreCount++;
      }
      
      // Add to uniqueness score calculation
      if (page.content_uniqueness) {
        totalUniqueScore += page.content_uniqueness;
        uniqueScoreCount++;
      }
      
      // Add to depth score calculation
      if (page.content_depth_score) {
        totalDepthScore += page.content_depth_score;
        depthScoreCount++;
      }
      
      // Add to optimization score calculation
      if (page.content_optimization_score) {
        totalOptimizationScore += page.content_optimization_score;
        optimizationScoreCount++;
      }
      
      // Add to HTML structure score calculation
      if (page.html_structure_score) {
        totalHtmlStructureScore += page.html_structure_score;
        htmlStructureScoreCount++;
      }
      
      // Add to GPT analysis score calculation
      if (page.gpt_analysis_score) {
        totalGptAnalysisScore += page.gpt_analysis_score;
        gptAnalysisScoreCount++;
      }
      
      // Track content type for client pages
      if (page.content_type) {
        contentTypes[page.content_type] = (contentTypes[page.content_type] || 0) + 1;
      } else if (page.page_title) {
        // If no explicit content type, try to infer from title
        if (page.page_title.toLowerCase().includes('blog')) {
          contentTypes['Blog'] = (contentTypes['Blog'] || 0) + 1;
        } else if (page.page_title.toLowerCase().includes('product')) {
          contentTypes['Product'] = (contentTypes['Product'] || 0) + 1;
        } else if (page.page_title.toLowerCase().includes('doc')) {
          contentTypes['Documentation'] = (contentTypes['Documentation'] || 0) + 1;
        } else {
          contentTypes['Other'] = (contentTypes['Other'] || 0) + 1;
        }
      }
    });
    
    // Calculate average quality score
    if (qualityCount > 0) {
      platform.avgQuality = Math.round((totalQuality / qualityCount) * 10) / 10;
    } else {
      platform.avgQuality = 0;
    }
    
    // Calculate match score
    if (matchScoreCount > 0) {
      platform.matchScore = Math.round((totalMatchScore / matchScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.matchScore = null;
    }
    
    // Calculate unique content score
    if (uniqueScoreCount > 0) {
      platform.uniqueContentScore = Math.round((totalUniqueScore / uniqueScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.uniqueContentScore = null;
    }
    
    // Calculate content depth score
    if (depthScoreCount > 0) {
      platform.avgDepth = Math.round((totalDepthScore / depthScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.avgDepth = null;
    }
    
    // Calculate content optimization score
    if (optimizationScoreCount > 0) {
      platform.avgOptimization = Math.round((totalOptimizationScore / optimizationScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.avgOptimization = null;
    }
    
    // Calculate HTML structure score
    if (htmlStructureScoreCount > 0) {
      platform.avgHtmlStructure = Math.round((totalHtmlStructureScore / htmlStructureScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.avgHtmlStructure = null;
    }
    
    // Calculate GPT analysis score
    if (gptAnalysisScoreCount > 0) {
      platform.avgGptAnalysis = Math.round((totalGptAnalysisScore / gptAnalysisScoreCount) * 10) / 10;
    } else {
      // No data available
      platform.avgGptAnalysis = null;
    }
    
    // Convert content types to percentage-based array
    const contentTypeEntries = Object.entries(contentTypes);
    const totalContent = contentTypeEntries.reduce((sum, [_, count]) => sum + count, 0);
    
    if (contentTypeEntries.length > 0 && totalContent > 0) {
      platform.contentTypes = contentTypeEntries
        .map(([type, count]) => ({
          type,
          percentage: (count / totalContent) * 100
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3); // Take top 3
    } else {
      // No content types data found, use empty array or minimal data representation
      platform.contentTypes = [
        { type: 'No Data', percentage: 100 }
      ];
    }
    
    // Platform processed successfully
  });
};

// Initialize on mount
onMounted(() => {
  analyzePlatformData();
});

// Watch for changes in data
watch(() => props.clientData, () => {
  analyzePlatformData();
}, { deep: true });
</script>

<style scoped>
.metric-container {
  min-height: 300px;
}
</style>