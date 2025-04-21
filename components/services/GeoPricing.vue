<!-- src/components/services/GeoPricing.vue -->
<template>
    <section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy">
          Pricing &amp; Packages
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkNavy">
          Our services are laser-focused on getting you results.
        </p>
      </div>
  
      <!-- Pricing Cards -->
      <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Starter Package -->
        <div class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200">
          <!-- Card Header -->
          <div class="bg-burntOrangeDark text-white p-6 text-center">
            <h3 class="text-2xl font-bold font-heading mb-3">Starter Package</h3>
            <div class="text-1xl font-body font-bold">One Time Fee</div>
          </div>
          <!-- Card Body -->
          <div class="p-6">
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">A complete report</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Citation analysis</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Competitive analysis</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body font-medium bg-yellow-100 px-2 py-1 rounded">50 queries + citation analysis</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Customized recommendations</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">GEO Web Audit</span>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Growth Package -->
        <div class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200">
          <!-- Card Header -->
          <div class="bg-burntOrangeDark text-white p-6 text-center">
            <h3 class="text-2xl font-bold font-heading mb-3">Growth Package</h3>
            <div class="text-1xl font-body font-bold">One Time Fee</div>
          </div>
          <!-- Card Body -->
          <div class="p-6">
            <p class="font-bold text-deepPurple mb-4 border-b border-gray-200 pb-2">Everything in Starter Package +</p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body font-bold bg-yellow-100 px-2 py-1 rounded">150 queries</span>
                <span class="text-darkGray font-body ml-2">(3x more than Starter)</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">50 queries for specialized audit</span>
              </li>
              <li class="flex items-start pl-8">
                <svg class="h-5 w-5 text-jasperOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span class="text-darkGray font-body">Content marketing opportunities</span>
              </li>
              <li class="flex items-start pl-8">
                <svg class="h-5 w-5 text-jasperOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span class="text-darkGray font-body">Product discovery</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Audit readout</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Content strategy session</span>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Monthly Service -->
        <div class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200">
          <!-- Card Header -->
          <div class="bg-burntOrangeDark text-white p-6 text-center">
            <h3 class="text-2xl font-bold font-heading mb-3">Monthly</h3>
            <div class="text-1xl font-body font-bold">Ongoing Support</div>
          </div>
          <!-- Card Body -->
          <div class="p-6">
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Weekly citation analysis and tracking for selected queries</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Run additional queries and analysis</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-burntOrange mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-darkGray font-body">Ongoing content strategy support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const scrollToContact = () => {
    const contactForm = document.getElementById('contact-form');
    contactForm.scrollIntoView({ behavior: 'smooth' });
  };
  </script>
  
  <style scoped>
  /* Add any specific custom styles here if needed */
  </style>