<!-- components/services/GeoFrameworkStep.vue -->
<template>
  <div class="relative mb-20">
    <!-- MOBILE: stacked -->
    <div class="md:hidden">
      <!-- Text Box -->
      <div class="border border-burntOrangeDark rounded-lg bg-white p-4 mb-4">
        <div class="flex items-center mb-3">
          <div
            class="bg-burntOrangeDark rounded-full w-8 h-8 flex items-center justify-center text-white font-bold z-10"
          >
            <slot name="step-number" />
          </div>
          <h3 class="text-xl font-bold ml-3 text-darkNavy font-heading">
            {{ title }}
          </h3>
        </div>
        <p class="text-darkGray font-body mb-2 text-sm">{{ description }}</p>
      </div>
      <!-- Metric Box -->
      <div class="border border-burntOrangeDark rounded-lg bg-white p-4">
        <component :is="getMetricComponent()" v-if="getMetricComponent()" />
        <div v-else class="h-32 flex items-center justify-center">
          <p class="text-gray-500 text-sm">
            {{ title }} visualization will appear here
          </p>
        </div>
      </div>
    </div>

    <!-- DESKTOP: side‑by‑side + connector -->
    <div class="hidden md:block relative" ref="wrapperRef">
      <div
        class="flex justify-between items-start"
        :class="reverse ? 'flex-row-reverse' : ''"
      >
        <!-- Text Box -->
        <div
          ref="textRef"
          class="relative z-10 w-5/12 border border-burntOrangeDark rounded-lg bg-white p-6"
        >
          <div class="flex items-center mb-3">
            <div
              class="bg-burntOrangeDark rounded-full w-8 h-8 flex items-center justify-center text-white font-bold z-10"
            >
              <slot name="step-number" />
            </div>
            <h3 class="text-xl font-bold ml-3 text-darkNavy font-heading">
              {{ title }}
            </h3>
          </div>
          <p class="text-darkGray font-body text-sm">{{ description }}</p>
        </div>

        <!-- flexible spacer with your min‑width -->
        <div class="flex-grow min-w-[60px]"></div>

        <!-- Metric Box -->
        <div
          ref="metricRef"
          class="relative z-10 w-[45%] border border-burntOrangeDark rounded-lg bg-white p-5"
        >
          <component :is="getMetricComponent()" v-if="getMetricComponent()" />
          <div v-else class="h-32 flex items-center justify-center">
            <p class="text-gray-500 text-sm">
              {{ title }} visualization will appear here
            </p>
          </div>
        </div>
      </div>

      <!-- Connector line -->
      <div
        v-if="connector.visible"
        class="absolute h-0.5 bg-burntOrangeDark z-0 pointer-events-none"
        :style="{
          top:    connector.top,
          left:   connector.left,
          width:  connector.width
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  nextTick,
} from 'vue';

import QueryAnalysisMetric     from './metrics/QueryAnalysisMetric.vue';
import CompetitiveReviewMetric from './metrics/CompetitiveReviewMetric.vue';
import CitationAnalysisMetric  from './metrics/CitationAnalysisMetric.vue';
import ContentOptimizationMetric from './metrics/ContentOptimizationMetric.vue';
import TechnicalSeoMetric from './metrics/TechnicalSeoMetric.vue';
import MonitoringMetric from './metrics/MonitoringMetric.vue';

const props = defineProps({
  title:         { type: String,  required: true },
  description:   { type: String,  required: true },
  reverse:       { type: Boolean, default: false },
  componentName: { type: String,  required: true },
});

const getMetricComponent = () => {
  switch (props.componentName) {
    case 'QueryAnalysisMetric':      return QueryAnalysisMetric;
    case 'CompetitiveReviewMetric':  return CompetitiveReviewMetric;
    case 'CitationAnalysisMetric':   return CitationAnalysisMetric;
    case 'ContentOptimizationMetric': return ContentOptimizationMetric;
    case 'TechnicalSeoMetric':       return TechnicalSeoMetric;
    case 'MonitoringMetric':         return MonitoringMetric;
    // …and all your other metrics…
    default:                         return null;
  }
};

// Refs to measure
const wrapperRef = ref(null);
const textRef    = ref(null);
const metricRef  = ref(null);

// Connector state
const connector = reactive({
  top:     '0px',
  left:    '0px',
  width:   '0px',
  visible: false,
});

function calculateConnector() {
  if (!wrapperRef.value || !textRef.value || !metricRef.value) {
    connector.visible = false;
    return;
  }

  const wrap = wrapperRef.value.getBoundingClientRect();
  const txt  = textRef.value.getBoundingClientRect();
  const met  = metricRef.value.getBoundingClientRect();

  // y‑coordinate at vertical middle of text box
  const midY = txt.top + txt.height / 2 - wrap.top;

  let startX, endX;
  if (!props.reverse) {
    startX = txt.right - wrap.left;
    endX   = met.left  - wrap.left;
  } else {
    startX = met.right - wrap.left;
    endX   = txt.left  - wrap.left;
  }

  connector.top     = `${midY}px`;
  connector.left    = `${Math.min(startX, endX)}px`;
  connector.width   = `${Math.abs(endX - startX)}px`;
  connector.visible = true;
}

onMounted(() => {
  nextTick(calculateConnector);
  window.addEventListener('resize', calculateConnector);
});
onUpdated(() => {
  // recalc after any update (e.g. inner metric chart loads)
  nextTick(calculateConnector);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateConnector);
});
</script>

<style scoped>
/* your colors & rounded corners are already in the utility classes */
</style>