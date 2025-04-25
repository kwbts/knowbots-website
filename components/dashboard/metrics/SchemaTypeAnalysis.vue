<!-- components/dashboard/metrics/SchemaTypeAnalysis.vue -->
<template>
    <div class="schema-container">
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Schema Type Analysis</h4>
      
      <!-- Domain Selector -->
      <div class="mb-4">
        <label for="domain-selector" class="block text-sm font-semibold text-darkNavy mb-2">Select Domain</label>
        <div class="relative">
          <select 
            id="domain-selector" 
            v-model="selectedDomain" 
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark sm:text-sm rounded-md bg-white shadow-sm appearance-none"
          >
            <option value="all">All Domains</option>
            <option v-for="domain in domains" :key="domain" :value="domain">
              {{ domain }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Schema Type Chart -->
      <div v-if="schemaTypes.length > 0" class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="mb-4">
          <h5 class="text-sm font-semibold text-darkNavy">Top Schema Types</h5>
          <p class="text-xs text-gray-500 mt-1">
            {{ selectedDomain === 'all' ? 'Across all domains' : `Domain: ${selectedDomain}` }}
          </p>
        </div>
        
        <!-- Bar Chart -->
        <div class="mt-4 space-y-3">
          <div v-for="(schema, index) in schemaTypes.slice(0, 10)" :key="index" class="schema-bar">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-medium text-darkNavy truncate" :title="schema.type">
                {{ schema.type }}
              </span>
              <span class="text-xs font-medium text-darkNavy">
                {{ schema.count }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full" 
                :style="{ 
                  width: `${(schema.count / maxSchemaCount) * 100}%`,
                  backgroundColor: getSchemaColor(index)
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Domain Schema Summary -->
      <div v-if="selectedDomain !== 'all'" class="mt-4 bg-gray-50 p-4 rounded-lg">
        <h5 class="text-sm font-semibold text-darkNavy mb-3">Domain Schema Health</h5>
        
        <!-- Schema Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Pages with Schema</div>
            <div class="text-xl font-bold text-darkNavy">{{ formatPercentage(domainSchemaPercentage) }}</div>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <div class="text-xs text-gray-500 mb-1">Schema Types</div>
            <div class="text-xl font-bold text-darkNavy">{{ uniqueSchemaCount }}</div>
          </div>
        </div>
        
        <!-- Schema Recommendations -->
        <div class="mt-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <h6 class="font-medium text-indigo-800 mb-1 text-sm">Schema Recommendations</h6>
          <div v-if="missingSchemaTypes.length > 0">
            <p class="text-sm text-indigo-700 mb-2">
              Consider adding these commonly used schema types:
            </p>
            <ul class="list-disc list-inside space-y-1 text-xs text-indigo-700 pl-2">
              <li v-for="(schemaType, index) in missingSchemaTypes.slice(0, 3)" :key="index">
                {{ schemaType }} - {{ getSchemaDescription(schemaType) }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-sm text-indigo-700">
              This domain has good schema coverage with {{ uniqueSchemaCount }} types. Consider regularly updating schema markup as content changes.
            </p>
          </div>
        </div>
      </div>
      
      <!-- No Data Message -->
      <div v-if="schemaTypes.length === 0" class="bg-gray-50 p-8 rounded-lg text-center">
        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No schema data available</h3>
        <p class="mt-1 text-sm text-gray-500">
          No schema types found in the analyzed pages.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  
  const props = defineProps({
    clientData: {
      type: Object,
      required: true
    }
  });
  
  // State
  const selectedDomain = ref('all');
  const schemaTypes = ref([]);
  const domains = ref([]);
  
  // Common schema types that are recommended for most sites
  const commonSchemaTypes = [
    "WebPage", 
    "Organization", 
    "BreadcrumbList", 
    "Article", 
    "Product", 
    "FAQPage", 
    "LocalBusiness", 
    "Person"
  ];
  
  // Schema descriptions for recommendations
  const schemaDescriptions = {
    "WebPage": "Basic information about web pages",
    "Organization": "Information about your business entity",
    "BreadcrumbList": "Helps search engines understand site hierarchy",
    "Article": "For blog posts and articles",
    "Product": "For product pages with details",
    "FAQPage": "Helps appear in FAQ rich results",
    "LocalBusiness": "Improves local search visibility",
    "Person": "For author pages or about pages"
  };
  
  // Get schema description
  const getSchemaDescription = (schemaType) => {
    return schemaDescriptions[schemaType] || "Improves structured data";
  };
  
  // Extract domains and schema types from client data
  const extractSchemaData = () => {
    if (!props.clientData?.query_data) {
      domains.value = [];
      schemaTypes.value = [];
      return;
    }
    
    // Extract all domains from associated pages
    const domainSet = new Set();
    
    props.clientData.query_data.forEach(query => {
      if (query.associated_pages && Array.isArray(query.associated_pages)) {
        query.associated_pages.forEach(page => {
          // Add domain to list if it has a valid domain name
          if (page.domain_name) {
            domainSet.add(page.domain_name);
          }
        });
      }
    });
    
    // Update domains list
    domains.value = Array.from(domainSet).sort();
    
    // Update schema types for the current selected domain
    updateSchemaTypes();
  };
  
  // Update schema types based on selected domain
  const updateSchemaTypes = () => {
    // Create a new schema map
    const newSchemaMap = new Map();
    
    props.clientData.query_data.forEach(query => {
      if (query.associated_pages && Array.isArray(query.associated_pages)) {
        query.associated_pages.forEach(page => {
          // Skip if not matching selected domain
          if (selectedDomain.value !== 'all' && page.domain_name !== selectedDomain.value) {
            return;
          }
          
          // Process schema types
          if (page.schema_types && Array.isArray(page.schema_types) && page.schema_types.length > 0) {
            page.schema_types.forEach(schemaType => {
              const count = newSchemaMap.get(schemaType) || 0;
              newSchemaMap.set(schemaType, count + 1);
            });
          }
        });
      }
    });
    
    // Convert map to array and sort by count
    const schemaArray = [];
    
    newSchemaMap.forEach((count, schemaType) => {
      schemaArray.push({ type: schemaType, count });
    });
    
    // Sort by count descending
    schemaArray.sort((a, b) => b.count - a.count);
    
    schemaTypes.value = schemaArray;
    
    console.log(`Schema types for domain "${selectedDomain.value}":`, schemaTypes.value);
  };
  
  // Get color for schema bar
  const getSchemaColor = (index) => {
    const colors = [
      '#3B82F6', // blue-500
      '#10B981', // emerald-500
      '#8B5CF6', // violet-500
      '#EC4899', // pink-500
      '#F59E0B', // amber-500
      '#EF4444', // red-500
      '#06B6D4', // cyan-500
      '#6366F1', // indigo-500
      '#D946EF', // fuchsia-500
      '#F97316'  // orange-500
    ];
    
    return colors[index % colors.length];
  };
  
  // Get maximum schema count for calculating bar widths
  const maxSchemaCount = computed(() => {
    if (schemaTypes.value.length === 0) return 1;
    return Math.max(...schemaTypes.value.map(schema => schema.count));
  });
  
  // Calculate domain-specific metrics
  const domainPages = computed(() => {
    if (selectedDomain.value === 'all' || !props.clientData?.query_data) return [];
    
    // Get all pages for the selected domain
    const pages = [];
    
    props.clientData.query_data.forEach(query => {
      if (query.associated_pages && Array.isArray(query.associated_pages)) {
        query.associated_pages.forEach(page => {
          if (page.domain_name === selectedDomain.value) {
            pages.push(page);
          }
        });
      }
    });
    
    return pages;
  });
  
  // Percentage of pages with schema markup
  const domainSchemaPercentage = computed(() => {
    const pages = domainPages.value;
    if (pages.length === 0) return 0;
    
    const pagesWithSchema = pages.filter(page => 
      page.schema_markup_present === true || 
      page.schema_markup_present === "checked" ||
      (page.schema_types && Array.isArray(page.schema_types) && page.schema_types.length > 0)
    ).length;
    
    return (pagesWithSchema / pages.length) * 100;
  });
  
  // Count of unique schema types for this domain
  const uniqueSchemaCount = computed(() => {
    if (selectedDomain === 'all') return schemaTypes.value.length;
    
    // Get unique schema types for the domain
    const uniqueTypes = new Set();
    
    domainPages.value.forEach(page => {
      if (page.schema_types && Array.isArray(page.schema_types)) {
        page.schema_types.forEach(type => uniqueTypes.add(type));
      }
    });
    
    return uniqueTypes.size;
  });
  
  // Schema types that are commonly recommended but missing
  const missingSchemaTypes = computed(() => {
    if (selectedDomain === 'all') return [];
    
    // Get all schema types currently used by the domain
    const currentTypes = new Set();
    
    domainPages.value.forEach(page => {
      if (page.schema_types && Array.isArray(page.schema_types)) {
        page.schema_types.forEach(type => currentTypes.add(type));
      }
    });
    
    // Find common types that are missing
    return commonSchemaTypes.filter(type => !currentTypes.has(type));
  });
  
  // Format percentage
  const formatPercentage = (value) => {
    if (value === undefined || value === null) return '0%';
    return Math.round(value) + '%';
  };
  
  // Initialize component
  onMounted(() => {
    console.log("SchemaTypeAnalysis mounted with client data:", props.clientData);
    extractSchemaData();
  });
  
  // Watch for changes in data or selected domain
  watch(() => props.clientData, () => {
    console.log("Client data updated in SchemaTypeAnalysis");
    extractSchemaData();
  }, { deep: true });
  
  watch(selectedDomain, () => {
    console.log("Selected domain changed to:", selectedDomain.value);
    updateSchemaTypes();
  });
  </script>
  
  <style scoped>
  .schema-container {
    min-height: 300px;
  }
  
  .schema-bar {
    transition: all 0.3s ease;
  }
  
  .schema-bar:hover {
    transform: translateX(2px);
  }
  </style>