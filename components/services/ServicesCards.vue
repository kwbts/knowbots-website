<!-- src/components/ServicesCards.vue -->
<template>
    <section class="bg-brownBackground py-16 px-8 border-t-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy">
          Our Services
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkNavy">
          Our goal is to be your competitive advantage.
        </p>
      </div>
  
      <!-- Value Propositions List -->
      <div class="max-w-screen-lg mx-auto space-y-12">
        <div
          v-for="(prop, index) in valueProps"
          :key="index"
          class="flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"
          :class="{ 'md:flex-row-reverse md:space-x-reverse': index % 2 !== 0 }"
        >
          <!-- Image Block -->
          <div class="md:w-1/2">
            <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl">
              <img
                :src="prop.image"
                alt="Value Proposition Image"
                class="object-cover h-full w-full"
              />
            </div>
          </div>
          <!-- Text Block -->
          <div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4">
            <h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading">
              {{ prop.title }}
            </h3>
            <p class="text-darkNavy leading-relaxed font-body mb-4">
              {{ prop.description }}
            </p>
            <!-- Offerings List -->
            <ul class="list-disc list-inside space-y-2 text-darkNavy font-body">
              <li v-for="(item, idx) in prop.offerings" :key="idx">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const valueProps = [
    {
      image: '/images/content-creation.png', // Replace with actual image path
      title: 'Content Creation',
      description:
        'We are invested in your results. We have a small team because it is how we operate best. You will work directly with our principal consultants, not project managers and a rotating cast of contributors. Our proactive, embedded approach is what makes us stand out.',
      offerings: [
        'Direct collaboration with principal consultant',
        'Proactive and embedded approach',
        'Customized solutions tailored to your needs',
      ],
    },
    {
      image: '/images/full-stack-seo.png', // Replace with actual image path
      title: 'Full Stack SEO',
      description:
        'We are writers and content creators. From writing top ranked content to founding successful podcasts, our team are veterans in the space. Check out our blog to see our content in action.',
      offerings: [
        'SEO-optimized blog posts',
        'Programmatic SEO',
        'Content strategy and planning',
      ],
    },
    {
      image: '/images/dashboards-reports.png', // Replace with actual image path
      title: 'Web Analytics & Reporting',
      description:
        'We are innovators and tech experts. We bring years of experience as operators in martech as well as development chops. We blend the technical and creative to generate uncanny results. Our Labs is groundzero innovation at Knowbots.',
      offerings: [
        'Tag Manager set up',
        'GA4 and web analytics configuration',
        'Automated dashboards and reporting',
      ],
    },
    {
      image: '/images/ai-for-marketing.png', // Replace with actual image path
      title: 'AI for Marketing',
      description:
        'We set a fast pace when it comes to delivering projects. Time-in-market is an advantage and we want to ensure you get the most value from our services. Not only are pacesetters; we are proactive partners always on the lookout for new ideas.',
      offerings: [
        'Cutting-edge expertise',
        'AI assistant development and automation',
        'Innovation-as-a-service',
      ],
    },
    {
      image: '/images/micro-app-websites.png', // Replace with actual image path
      title: 'Micro Apps & Websites',
      description:
        'Curiosity is the fuel for our fire. We maintain a Lab where we experiment with AI tools and build micro apps. Innovation is what makes us tick.',
      offerings: [
        'Micro SaaS development',
        'AI & web dev projects',
        'Innovative projects and cutting edge tooling',
      ],
    },
  ];
  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>