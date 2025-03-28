<template>
    <!-- Updated background color and padding for a sharper look -->
    <section class="bg-offWhiteBackground py-16 px-6">
      <div class="max-w-screen-lg mx-auto text-center py-4">
        <h2 class="text-3xl font-bold text-center mb-4 text-darkNavy font-heading">
          Trusted by Forward-Thinking Teams Across Industries        </h2>
        <!-- Increased paragraph text size for better readability -->
        <p class="text-xl leading-relaxed mb-8 text-darkGray font-light font-body">
          From SEO to AI, we accelerate growth for industry leaders.
        </p>
  
        <!-- Updated grid and logo styling -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(customer, index) in customers"
            :key="index"
            class="flex items-center justify-center py-4 px-2 transition-opacity duration-200 hover:opacity-80"
          >
            <!-- Logo with reduced height and 50% opacity -->
            <img
              :src="customer.logo"
              :alt="customer.name"
              class="h-8 w-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const customers = [
    { name: 'Knak', logo: '/images/knak-logo.png' },
    { name: 'Bridgit', logo: '/images/bridgit-logo.webp' },
    { name: 'MetaRouter', logo: '/images/metarouter-logo.png' },
    { name: 'Nogin', logo: '/images/nogin-logo.jpg' },
  
  
    // Add more customers as needed
  ];
  </script>