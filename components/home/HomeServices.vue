<template>
    <section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-darkNavy font-heading">
          Our Services Make A Difference
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkGray font-body">
          Your goals are our compass. These are the tools we use to get you there:        </p>
      </div>
  
      <!-- Services List -->
      <div class="max-w-screen-lg mx-auto space-y-12">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"
          :class="{ 'md:flex-row-reverse md:space-x-reverse': index % 2 !== 0 }"
        >
          <!-- Image Block -->
          <div class="md:w-1/2">
            <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl">
              <img
                :src="service.image"
                :alt="service.title"
                class="object-cover h-full w-full"
              />
            </div>
          </div>
          <!-- Text Block -->
          <div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4">
            <h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading">
              {{ service.title }}
            </h3>
            <p class="text-darkGray leading-relaxed font-body">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const services = [
    {
      image: '/images/seo.png',
      title: 'Full-Stack SEO',
      description:
        'From in-depth audits to content creation and keyword targeting, we optimize every inch of your digital presence.',
    },
    {
      image: '/images/data-reports.png',
      title: 'Web Analytics & Reporting',
      description:
        'Need GA4? Google Tag Manager audits? Dashboards that make your wins crystal clear? Done, done, and done.',
    },
    {
      image: '/images/ai-marketing.png',
      title: 'AI for Marketing',
      description:
        'We’re emerging leaders in AI. Whether it’s training your team on cutting-edge tools or building an AI assistant, we’ve got you covered.',
    },
    {
      image: '/images/micro-app.png',
      title: 'Micro Apps and Websites',
      description:
        'From calculators to AI-driven tools, we build micro-apps and interactive websites that bring your coolest ideas to life.',
    },
    // Add more services as needed
  ];
  </script>
  
  <style scoped>
  /* Optional: Additional custom styles for finer control */
  </style>