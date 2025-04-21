<!-- components/services/GeoFramework.vue -->
<template>
  <section class="bg-offWhiteBackground py-12 px-6 border-t-2 border-gray-150">
    <!-- Section Heading and Intro Text -->
    <div class="max-w-screen-lg mx-auto text-center mb-24">
      <h2 class="font-heading text-4xl md:text-4xl font-bold mb-4 text-darkNavy">        Our Data-Driven Framework for LLM Search Success
      </h2>
      <p class="text-xl leading-relaxed mb-6 text-darkNavy">
        Get more mentions and citations on ChatGPT, Perplexity, Gemini and AI Overviews.
      </p>
    </div>

    <!-- Framework Steps Container -->
    <div class="max-w-screen-lg mx-auto relative">
      <!-- Framework Steps -->
      <div class="space-y-20">
        <!-- Step 1: Query Analysis -->
        <GeoFrameworkStep 
          title="Query Analysis" 
          :reverse="false"
          description="We start with a programmatic query analysis to understand where your brand shows up, who your competitors are, and where there are quick wins."
          component-name="QueryAnalysisMetric"
        >
          <template #step-number>1</template>
        </GeoFrameworkStep>

        <!-- Step 2: Competitive Review -->
        <GeoFrameworkStep 
          title="Competitive Review" 
          :reverse="true"
          description="What are your competitors doing and how can we learn from that? Track their citations, compare against your own mentions, and get content recommendations to help you win."
          component-name="CompetitiveReviewMetric"
        >
          <template #step-number>2</template>
        </GeoFrameworkStep>

        <!-- Step 3: Citation Analysis -->
        <GeoFrameworkStep 
          title="Citation Analysis" 
          :reverse="false"
          description="What pages on your website are being cited the most? What types of pages appear alongside you? We compare your citations to our data set to provide targeted, actionable, and ready to implement recommendations."
          component-name="CitationAnalysisMetric"
        >
          <template #step-number>3</template>
        </GeoFrameworkStep>

        <!-- Step 4: Content Optimization Strategy -->
        <GeoFrameworkStep 
          title="Content Optimization Strategy" 
          :reverse="true"
          description="Optimize your content marketing strategy to get mentions and citations in the major LLMs. Explore opportunities, gain insights from competitors, and craft a strategy that sets you up for long term success."
          component-name="ContentOptimizationMetric"
        >
          <template #step-number>4</template>
        </GeoFrameworkStep>

        <!-- Step 5: Technical and SEO foundations -->
        <GeoFrameworkStep 
          title="Technical and SEO Foundations" 
          :reverse="false"
          description="Generative Engine Optimization is built on the shoulders on your SEO efforts. Get GEO-specific recommendations to ensure your site is optimized for LLMs."
          component-name="TechnicalSeoMetric"
        >
          <template #step-number>5</template>
        </GeoFrameworkStep>

        <!-- Step 6: Continuous citation monitoring -->
        <GeoFrameworkStep 
          title="Continuous Citation Monitoring" 
          :reverse="true"
          description="Track individual queries to see how your LLM performance improves over time. We'll set up a monitoring strategy that fuels your GEO strategy."
          component-name="MonitoringMetric"
        >
          <template #step-number>6</template>
        </GeoFrameworkStep>
      </div>

     
    </div>
  </section>
</template>

<script setup>
import GeoFrameworkStep from './GeoFrameworkStep.vue';
</script>

<style scoped>
/* Any custom styles if needed */
</style>