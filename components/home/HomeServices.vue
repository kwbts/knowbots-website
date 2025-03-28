<template>
    <section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-darkNavy font-heading">
          Services That Deliver Measurable Results
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkGray font-body">
          Your goals require specific tactics. Here's our toolkit:
        </p>
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
        "Beyond generic audits, we deliver custom SEO strategies based on your unique market position, combining technical optimization with exceptional content creation. Our transparent reporting shows real progress and the human thinking behind our recommendations.",
    },
    {
      image: '/images/data-reports.png',
      title: 'Web Analytics & Reporting',
      description:
        'Clear data leads to better decisions. From GA4 implementation to custom dashboards that track what matters to your business, we make analytics accessible and actionable—with human interpretation that goes beyond automated reports.',
    },
    {
      image: '/images/ai-marketing.png',
      title: 'AI-Enhanced Marketing',
      description:
        "We harness AI as a tool in our arsenal, not the entire solution. We skillfully combine AI capabilities with human creativity and strategic thinking to create efficiencies where appropriate while ensuring your marketing maintains its human touch and strategic direction.",
    },
    {
      image: '/images/micro-app.png',
      title: 'Exceptional Writing and Storytelling',
      description:
        "At our core, we're writers who understand both the art and science of effective communication. From SEO-optimized articles to compelling brand narratives, our writing cuts through the noise and connects with your audience, delivering measurable results without sacrificing creative quality.",
    },
    // Add more services as needed
  ];
  </script>
  
  <style scoped>
  /* Optional: Additional custom styles for finer control */
  </style>