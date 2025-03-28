<!-- src/components/ServicesPage.vue -->
<template>
    <main class="flex-grow">
      <section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2">
        <!-- Page Heading -->
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h1 class="text-5xl font-bold mb-4 font-heading text-darkNavy">
            Our Services
          </h1>
          <p class="text-xl leading-relaxed mb-8 text-darkNavy font-body">
            The market is competitive. Our services are aimed to provide you an advantage in a crowded field.
          </p>
        </div>
  
        <!-- Services List -->
        <div class="max-w-screen-lg mx-auto space-y-12">
          <!-- Service Category -->
          <div
            v-for="(service, index) in services"
            :key="index"
            class="flex flex-col md:flex-row items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
          >
            <!-- Image Block -->
            <div class="md:w-1/3 h-full rounded-lg overflow-hidden">
              <img
                :src="service.image"
                :alt="service.title"
                class="object-cover w-full h-full"
                style="aspect-ratio: 3 / 4;"
              />
            </div>
            <!-- Text Block -->
            <div class="md:w-2/3 p-6">
              <!-- Service Title -->
              <h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading">
                {{ service.title }}
              </h2>
              <!-- Service Description -->
              <p class="text-darkGray leading-relaxed font-body mb-4">
                {{ service.description }}
              </p>
              <!-- Service Offerings List -->
              <ul class="list-disc list-inside space-y-2 text-darkGray font-body">
                <li v-for="(item, idx) in service.offerings" :key="idx">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  </template>
  
  <script setup>
  
  const services = [
    {
      title: 'Content Creation & Blog Management',
      description:
        'Engage your audience with high-quality content tailored to your brand voice and audience preferences.',
      offerings: [
        'Content Strategy Development',
        'SEO-Optimized Blog Posts',
        'Editorial Calendar Management',
        'Content Refreshes and Updates',
      ],
      image: '/images/contentservices.png', 
    },
    {
      title: 'Full-Stack SEO',
      description:
        'Optimize your online presence to rank higher on search engines and attract more organic traffic.',
      offerings: [
        'Keyword Research & Targeting',
        'On-Page & Technical SEO',
        'Link Building Strategies',
        'SEO Audits and Reporting',
      ],
      image: '/images/fullstack-seo.png', 
    },
    {
      title: 'Web Analytics & Reporting',
      description:
        'Make data-driven decisions with in-depth analytics and reporting tailored to your business goals.',
      offerings: [
        'Google Tag Manager Configuration',
        'Google Analytics 4 Setup & Management',
        'Custom Dashboard Creation',
        'Conversion Tracking',      ],
      image: '/images/web-reporting.png', 
    },
    {
      title: 'AI for Marketing',
      description:
        'Leverage the power of AI to enhance your marketing strategies and automate processes.',
      offerings: [
        'AI Tool Implementation',
        'AI Training',
        'ChtGPT and MidJourney Expertise',
        'Integrating AI in your apps',
      ],
      image: '/images/marketingai.png', 
    }, 
    {
      title: 'Micro Apps and Websites',
      description:
        'Stand out with custom micro applications and websites that engage users and drive conversions.',
      offerings: [
        'Custom Web App Development',
        'Micro App Development',
        'Web Design',
        'Headless CMS Implementation',
      ],
      image: '/images/microapps.png',
    },
  ];
  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>