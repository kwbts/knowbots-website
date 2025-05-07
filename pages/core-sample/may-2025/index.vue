<!-- pages/core-sample/may-2025/index.vue -->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white" :class="{ 'secure-page': isProduction }">
    <!-- Custom Report Navigation -->
    <ReportNavigation />
    
    <!-- Report Header -->
    <section class="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mt-16">
      <div class="max-w-[1140px] mx-auto px-4 py-10">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              Generative Engine Optimization<br class="hidden md:block" /> Query & Citation Analysis
            </h1>
            <h2 class="text-xl md:text-2xl font-semibold text-burntOrangeDark dark:text-orange-400 mt-4">Core Sample Report - May 2025</h2>
          </div>
          
          <!-- Theme Toggle -->
          <div class="flex-shrink-0 ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-[1140px] mx-auto px-4 py-20 flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading report data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError" class="max-w-[1140px] mx-auto px-4 py-12">
      <div class="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Supabase Data Loading Error</h3>
        <p>{{ loadError }}</p>
        <p class="mt-2 text-sm">This page relies on Supabase for data. Check the browser console for detailed error information.</p>
        <button 
          @click="loadReportData"
          class="mt-4 px-4 py-2 bg-gradient-to-r from-burntOrangeDark to-jasperOrange hover:from-burntOrange hover:to-burntOrangeDark text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Report Content -->
    <div v-else>
      <!-- Introduction Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 shadow-md">
            <h2 class="text-2xl font-semibold mb-4 text-burntOrangeDark dark:text-orange-400">Generative Engine Optimization Core Sample Report</h2>
            <div class="text-gray-700 dark:text-gray-300 space-y-4">
              <p>What happens when AI becomes the gatekeeper to information? We wanted to know: do LLMs like ChatGPT and Perplexity mention your brand or your competitors? Which sources do they trust?</p>
              <p>So we ran an experiment.</p>
              <p>We analyzed 651 queries across both platforms, examining 3,165 cited pages. We dissected everything—HTML structure, technical SEO elements, page speed, domain metrics, and had AI evaluate content quality, reading level, and depth.</p>
              <p>This isn't the final word on GEO—it's an initial core sample drilling into the bedrock of LLM search. The patterns we've found should spark experimentation, not rigid conclusions.</p>
              <p>Of the 150 data points collected, we've only included those with reasonable confidence levels. Want the full methodology? Check our blog: "Running large-scale LLM analysis for Generative Engine Optimization."</p>
              <p>We'll extract another core sample in June 2025. Until then, it's time to experiment and explore!</p>
              <p class="mt-6">Happy optimizing,</p>
              <p class="font-signature text-2xl text-burntOrangeDark dark:text-orange-400 mt-2">Jon Taylor</p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: May 6, 2025
            </div>
          </div>
        </div>
      </section>

      <!-- Metrics Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Total Queries Metric -->
            <TotalQueriesMetric :reportData="reportData" />
            
            <!-- Total Pages Analyzed Metric -->
            <TotalPagesMetric :reportData="reportData" />
          </div>
        </div>
      </section>

      <!-- Questions to Answer Section -->
      <section class="py-8 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-[1140px] mx-auto px-4">
          <QuestionsToAnswer />
        </div>
      </section>
      
      <!-- Methodology Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <MethodologyComponent />
        </div>
      </section>

      <!-- Domain Metrics Section -->
      <section class="py-8 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-[1140px] mx-auto px-4">
          <DomainMetricsComponent :reportData="reportData" />
        </div>
      </section>
      
      <!-- Domain Authority Citation Metrics Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <DomainAuthorityCitationMetric :reportData="reportData" />
        </div>
      </section>
      
      <!-- On-page SEO & Core Web Vitals Two-Column Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- On-page SEO Component (Left Column) -->
            <OnPageSEOComponent :reportData="reportData" />
            
            <!-- Core Web Vitals Component (Right Column) -->
            <CoreWebVitalsComponent :reportData="reportData" />
          </div>
        </div>
      </section>
      
      <!-- Content Structure Metrics Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <ContentStructureMetricsContainer :reportData="reportData" />
        </div>
      </section>
      
      <!-- Schema Implementation Section -->
      <section class="py-8 bg-gray-50 dark:bg-gray-800">
        <div class="max-w-[1140px] mx-auto px-4">
          <SchemaImplementationComponent :reportData="reportData" />
        </div>
      </section>
      
      <!-- Content Type Breakdown Section -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-[1140px] mx-auto px-4">
          <ContentTypeBreakdownComponent :reportData="reportData" />
        </div>
      </section>

       <!-- Content Quality Metrics Section (New) -->
  <section class="py-8 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-[1140px] mx-auto px-4">
      <ContentQualityMetricsComponent :reportData="reportData" />
    </div>
  </section>

    <!-- Rock Paper Scissors Section (New) -->
    <section class="py-8 bg-white dark:bg-gray-900">
    <div class="max-w-[1140px] mx-auto px-4">
      <RockPaperScissorsComponent :reportData="reportData" />
    </div>
  </section>

   <!-- Our Next Study Section (New) -->
   <section class="py-8 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-[1140px] mx-auto px-4">
      <OurNextStudyComponent />
    </div>
  </section>

      <!-- Future sections will be added below -->
    </div>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-500 py-6">
      <div class="max-w-[1140px] mx-auto px-4 text-center">
        <p>© {{ new Date().getFullYear() }} Knowbots Marketing | GEO Analysis Report</p>
        <p class="mt-2">This report analyzes LLM citation behavior for educational purposes. Data collected May 2025.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ReportNavigation from '@/components/labs/reports/ReportNavigation.vue';
import TotalQueriesMetric from '@/components/labs/reports/TotalQueriesMetric.vue';
import TotalPagesMetric from '@/components/labs/reports/TotalPagesMetric.vue';
import ThemeToggle from '@/components/labs/reports/ThemeToggle.vue';
import QuestionsToAnswer from '@/components/labs/reports/QuestionsToAnswer.vue';
import MethodologyComponent from '@/components/labs/reports/MethodologyComponent.vue';
import DomainMetricsComponent from '@/components/labs/reports/DomainMetricsComponent.vue';
import DomainAuthorityCitationMetric from '@/components/labs/reports/DomainAuthorityCitationMetric.vue';
import OnPageSEOComponent from '@/components/labs/reports/OnPageSEOComponent.vue';
import CoreWebVitalsComponent from '@/components/labs/reports/CoreWebVitalsComponent.vue';
import SchemaImplementationComponent from '@/components/labs/reports/SchemaImplementationComponent.vue';
import ContentTypeBreakdownComponent from '@/components/labs/reports/ContentTypeBreakdownComponent.vue';
import ContentQualityMetricsComponent from '@/components/labs/reports/ContentQualityMetricsComponent.vue';
import RockPaperScissorsComponent from '@/components/labs/reports/RockPaperScissorsComponent.vue';
import OurNextStudyComponent from '@/components/labs/reports/OurNextStudyComponent.vue';
import ContentStructureMetricsContainer from '@/components/labs/reports/ContentStructureMetricsContainer.vue';

// Import Supabase utilities
import { fetchJsonFromSignedUrl } from '~/utils/supabase/client';
import { STORAGE_CONFIG, DEFAULT_SIGNED_URL } from '~/utils/supabase/config';
import { handleSupabaseError, tryMultipleRetrievalMethods, sanitizeReportData } from '~/utils/supabase/errorHandler';

// Skip Supabase and rely only on fetch
// Since we're having issues with both the Nuxt module and manual client
// We'll focus on the signed URL and local file approach
const supabase = null;

// Get storage config from plugin
const { $storageConfig } = useNuxtApp();


definePageMeta({
  layout: 'custom', // Using a custom layout to avoid the default navigation
});

// Add a script for inline fallback data
useHead({
  script: [
    { src: '/core-sample-inline-fallback.js' }
  ]
});

// Add SEO metadata
useSeoMeta({
  title: 'Generative Engine Optimization Query & Citation Analysis - May 2025 | Knowbots',
  description: 'Comprehensive analysis of how large language models cite and reference web content, examining domain authority, citation patterns, and optimization opportunities.',
  ogTitle: 'Generative Engine Optimization Query & Citation Analysis - May 2025',
  ogDescription: 'Explore our research on how LLMs cite content based on domain authority, technical factors, and content quality. Monthly core sample analysis by Knowbots.',
  ogType: 'website',
});

// Import Report schema composable
import { useReportSchema } from '~/composables/useReportSchema';

// Setup structured data/schema
const { createReportSchema, generateSchemaScript } = useReportSchema();

// Check if we're in production environment
const isProduction = computed(() => process.env.NODE_ENV === 'production');

// State with default values to prevent undefined property access
const reportData = ref({
  timestamp: new Date().toISOString(), // Default timestamp
  total_queries: 0,
  total_pages: 0,
  clients: [],
  domains: [],
  benchmarks: {
    domainAuthority: 40,
    pageAuthority: 35
  }
});
const isLoading = ref(true);
const loadError = ref(null);

// Create the schema object with the report data
const reportSchema = computed(() => {
  return createReportSchema(reportData.value, {
    title: 'Generative Engine Optimization Query & Citation Analysis',
    datePublished: reportData.value?.timestamp || new Date().toISOString(),
    dateModified: reportData.value?.timestamp || new Date().toISOString(),
    description: 'Comprehensive analysis of how large language models cite and reference web content, examining domain authority, citation patterns, and optimization opportunities.',
    author: 'Jon Taylor',
    authorTitle: 'CEO, Knowbots Marketing',
    authorSameAs: ['https://www.linkedin.com/in/jontaylor85/'],
    publisher: 'Knowbots Marketing',
    series: 'Core Sample Report',
    version: 'May 2025',
    image: '/images/geo-hero.png',
    url: '/core-sample/may-2025/',
    keywords: ['Generative Engine Optimization', 'LLM', 'AI Search', 'SEO', 'Citations', 'Content Optimization']
  });
});

// Add schema to head
useHead({
  script: [
    {
      children: computed(() => {
        const schema = reportSchema.value;
        return schema ? JSON.stringify(schema) : '';
      }),
      type: 'application/ld+json'
    }
  ]
});

// Access runtime config
const config = useRuntimeConfig().public || {};

// Check if storage config is available
// No logging for security

// Load report data - using server-side API endpoint
const loadReportData = async () => {
  isLoading.value = true;
  loadError.value = null;
  
  try {
    // Use the server API endpoint instead of direct Supabase access
    // This keeps all Supabase keys and tokens server-side only
    const response = await fetch('/api/core-sample', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    // Handle unsuccessful responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.statusMessage || `Server responded with status ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Set the data to the reactive reference
    reportData.value = data;
  } catch (error) {
    // Handle all errors from the process without logging sensitive info
    loadError.value = `Failed to load report data: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Load data when component is mounted
onMounted(() => {
  loadReportData();
});
</script>

<style>
/* Add Tailwind's dark mode classes */
:root {
  color-scheme: light dark;
}

/* Ensure body doesn't have a built-in margin */
body {
  margin: 0;
  padding: 0;
}

/* Helper class for max width to match nav */
.knowbots-container {
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Security styles to prevent data copying in production */
.secure-page .sensitive-data {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
}

/* Prevent text selection on data charts and metrics */
.secure-page [class*="Metric"] {
  pointer-events: none;
}

/* Allow interaction with buttons even when parent has pointer-events: none */
.secure-page button {
  pointer-events: auto;
}

/* Disable context menu in secure mode */
.secure-page {
  -webkit-touch-callout: none;
}
</style>