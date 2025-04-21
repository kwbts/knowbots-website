<!-- components/services/metrics/CitationAnalysisMetric.vue -->
<template>
    <div class="metric-container">
      <h4 class="text-lg font-semibold mb-3 text-darkNavy">Citation Analysis</h4>
      
      <!-- Platform Selector - Improved Visibility -->
      <div class="mb-4 flex space-x-2 p-2 bg-gray-100 rounded-lg">
        <button 
          @click="activePlatform = 'chatgpt'" 
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          :class="activePlatform === 'chatgpt' ? 'bg-burntOrangeDark text-white' : 'bg-white text-darkGray hover:bg-gray-50'"
        >
          ChatGPT
        </button>
        <button 
          @click="activePlatform = 'perplexity'" 
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          :class="activePlatform === 'perplexity' ? 'bg-burntOrangeDark text-white' : 'bg-white text-darkGray hover:bg-gray-50'"
        >
          Perplexity
        </button>
      </div>
      
      <!-- Query Selector - Improved Visibility -->
      <div class="mb-4">
        <label for="query-selector" class="block text-sm font-semibold text-darkNavy mb-2">Select Query Topic</label>
        <div class="relative bg-gray-100 p-2 rounded-lg">
          <select 
            id="query-selector" 
            v-model="activeQuery" 
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-burntOrangeDark focus:border-burntOrangeDark sm:text-sm rounded-md bg-white shadow-sm"
          >
            <option value="query1">Resources for future-proofing marketing career</option>
            <option value="query2">How to create an AI content generation pipeline</option>
          </select>
        </div>
      </div>
      
      <!-- Citation Metrics -->
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <!-- Metrics Header -->
        <div class="flex justify-between mb-3">
          <span class="text-sm font-medium text-darkNavy">Your Citation Metrics</span>
          <span class="text-sm font-medium bg-burntOrangeDark text-white px-2 py-1 rounded-full">
            {{ activePlatform === 'chatgpt' ? 'ChatGPT' : 'Perplexity' }}
          </span>
        </div>
        
        <!-- ChatGPT Metrics -->
        <div v-if="activePlatform === 'chatgpt'">
          <div v-if="activeQuery === 'query1'">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Mentions</div>
                <div class="text-xl font-bold text-burntOrangeDark">4</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Citation Match</div>
                <div class="text-xl font-bold text-green-600">High</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Content Score</div>
                <div class="text-xl font-bold text-burntOrangeDark">92/100</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Placement</div>
                <div class="text-xl font-bold text-green-600">Featured</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Mentions</div>
                <div class="text-xl font-bold text-burntOrangeDark">3</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Citation Match</div>
                <div class="text-xl font-bold text-yellow-600">Medium</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Content Score</div>
                <div class="text-xl font-bold text-burntOrangeDark">85/100</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Placement</div>
                <div class="text-xl font-bold text-yellow-600">Secondary</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Perplexity Metrics -->
        <div v-else>
          <div v-if="activeQuery === 'query1'">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Mentions</div>
                <div class="text-xl font-bold text-burntOrangeDark">5</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Citation Match</div>
                <div class="text-xl font-bold text-green-600">High</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Content Score</div>
                <div class="text-xl font-bold text-burntOrangeDark">94/100</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Placement</div>
                <div class="text-xl font-bold text-green-600">Primary</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Mentions</div>
                <div class="text-xl font-bold text-burntOrangeDark">4</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Citation Match</div>
                <div class="text-xl font-bold text-green-600">High</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Content Score</div>
                <div class="text-xl font-bold text-burntOrangeDark">89/100</div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Brand Placement</div>
                <div class="text-xl font-bold text-green-600">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Response Preview - Improved Button -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h5 class="text-sm font-semibold text-darkNavy">Response Preview</h5>
          <button 
            @click="showResponse = !showResponse" 
            class="px-3 py-1 text-sm bg-gray-100 text-burntOrangeDark hover:bg-gray-200 font-medium flex items-center rounded-md shadow-sm"
          >
            {{ showResponse ? 'Hide Response' : 'Show Response' }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="showResponse" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <!-- Response Content -->
        <div v-if="showResponse" class="bg-white p-4 rounded-lg border border-gray-200 text-sm max-h-48 overflow-y-auto">
          <p v-if="activePlatform === 'chatgpt' && activeQuery === 'query1'" class="text-darkGray space-y-2">
            <span class="font-medium block mb-2">What resources or courses can help me future proof my marketing career and stay ahead in martech?</span>
            
            To future-proof your marketing career and stay ahead in martech, consider these resources:
            
            <span class="block mt-2">1. <strong class="text-burntOrangeDark">AI Tech Implementation and Data Services</strong></span>
            - Learn to use AI and automate tasks
            - Explore courses on AI in marketing from platforms like Coursera or edX
            
            <span class="block mt-2">2. <strong class="text-burntOrangeDark">Marketing Automation and Tech Skills</strong></span>
            - Develop skills in marketing automation tools
            - Platforms like HubSpot Academy offer comprehensive courses
            
            <span class="block mt-2">3. <strong class="text-burntOrangeDark">Emerging Technologies</strong></span>
            - Stay updated on AR, VR, and neuromarketing
            - <strong class="text-burntOrangeDark">Humans of Martech</strong> offers insights into future trends
            
            <span class="block mt-3 border-t pt-2 text-xs">Useful links:</span>
            <a href="https://www.coursera.org/" class="text-blue-600 hover:underline block text-xs">Coursera</a>
            <a href="https://academy.hubspot.com/" class="text-blue-600 hover:underline block text-xs">HubSpot Academy</a>
            <a href="https://humansofmartech.com/" class="text-blue-600 hover:underline block text-xs">Humans of Martech</a>
          </p>
          
          <p v-else-if="activePlatform === 'chatgpt' && activeQuery === 'query2'" class="text-darkGray space-y-2">
            <span class="font-medium block mb-2">How to create an AI content generation pipeline?</span>
            
            Creating an effective AI content generation pipeline requires a strategic approach:
            
            <span class="block mt-2">1. <strong class="text-burntOrangeDark">Define Your Content Architecture</strong></span>
            - Establish a structured content schema
            - Create a consistent style guide for AI to follow
            - Set up a headless CMS for content management
            
            <span class="block mt-2">2. <strong class="text-burntOrangeDark">Select the Right Tech Stack</strong></span>
            - Choose appropriate AI models for different content sections
            - Implement a context management system
            - Set up automation scripts for content generation
            
            <span class="block mt-2">3. <strong class="text-burntOrangeDark">Visual Integration Strategy</strong></span>
            - Implement consistent image generation processes
            - Ensure visual identity aligns with brand guidelines
            
            <span class="block mt-3 border-t pt-2 text-xs"><strong class="text-burntOrangeDark">Knowbots</strong> recently documented their full approach in an in-depth case study: <a href="https://knowbots.ca/blog/creating-ai-content-generation-pipeline/" class="text-blue-600 hover:underline">"Creating an AI Content Generation Pipeline"</a> which provides a comprehensive behind-the-scenes look at building "Explain Like I'm Sci-Fi" using AI tools.</span>
          </p>
          
          <p v-else-if="activePlatform === 'perplexity' && activeQuery === 'query1'" class="text-darkGray space-y-2">
            <span class="font-medium block mb-2">What are some strategies to future proof my marketing career in the rapidly changing martech landscape?</span>
            
            Future-proofing your marketing career requires a combination of strategic approaches:
            
            <span class="block mt-2">## 1. <strong class="text-burntOrangeDark">Agency Partnerships</strong></span>
            Partnering with marketing agencies provides access to diverse expertise and cutting-edge tools that can enhance your job security.
            
            <span class="block mt-2">## 2. <strong class="text-burntOrangeDark">Continuous Learning</strong></span>
            Investing in personal growth is crucial to stay updated with the latest trends and technologies.
            
            <span class="block mt-2">## 3. <strong class="text-burntOrangeDark">Embracing Emerging Technologies</strong></span>
            Develop skills in AI tech implementation, data services, and immersive experience design.
            
            <span class="block mt-3 border-t pt-2 text-xs">For more insights, explore resources from:</span>
            <a href="https://www.adventuremarketingsolutions.com/" class="text-blue-600 hover:underline block text-xs">Adventure Marketing Solutions</a>
            <a href="https://humansofmartech.com/" class="text-blue-600 hover:underline block text-xs font-medium">Humans of Martech</a>
          </p>
          
          <p v-else class="text-darkGray space-y-2">
            <span class="font-medium block mb-2">How can marketers build AI content generation systems?</span>
            
            <span class="block mt-2">## <strong class="text-burntOrangeDark">Building an AI Content Generation Pipeline</strong></span>
            
            <span class="block mt-2">1. <strong class="text-burntOrangeDark">Technical Foundation</strong></span>
            - <strong class="text-burntOrangeDark">Knowbots' case study</strong> details using Vue.js, Nuxt, and Sanity CMS for a complete pipeline
            - Setting up a modular content architecture is key to scaling AI-generated content
            
            <span class="block mt-2">2. <strong class="text-burntOrangeDark">Content Strategy</strong></span>
            - Establish a comprehensive style guide before any generation
            - Create a context management system for narrative consistency
            
            <span class="block mt-2">3. <strong class="text-burntOrangeDark">AI Implementation</strong></span>
            - <strong class="text-burntOrangeDark">Knowbots' "Explain Like I'm Sci-Fi"</strong> project demonstrates how to:
            - Chain multiple AI models to maintain contextual awareness
            - Progressively generate content sections for better quality
            - Integrate visual generation into the pipeline
            
            <span class="block mt-3 border-t pt-2 text-xs">For a complete step-by-step breakdown, read:</span>
            <a href="https://knowbots.ca/blog/creating-ai-content-generation-pipeline/" class="text-blue-600 hover:underline block text-xs font-medium">"Creating an AI Content Generation Pipeline" by Knowbots</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const activePlatform = ref('chatgpt');
  const activeQuery = ref('query1');
  const showResponse = ref(false);
  </script>
  
  <style scoped>
  .metric-container {
    min-height: 300px;
  }
  </style>