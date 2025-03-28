<!-- src/components/ValueProps.vue -->
<template>
    <section class="bg-brownBackground py-16 px-8 border-t-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy">
          Field Tested Digital Marketing
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkNavy">
          We’re not here to keep pace—we’re here to set it.        </p>
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
                :alt="prop.alt"
                class="object-cover h-full w-full"
              />
            </div>
          </div>
          <!-- Text Block -->
          <div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4">
            <h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading">
              {{ prop.title }}
            </h3>
            <p class="text-darkNavy leading-relaxed font-body">
              {{ prop.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const valueProps = [
  {
      image: '/images/partnership.png', // Replace with actual image path
      title: 'An Extension of Your Team',
      alt: 'Astronauts climbing mountain representing our approach',
      description:
        'We don’t do bureaucracy. You won’t get passed off to project managers or lost in a rotating roster. You’ll work directly with our principal consultants—proactive, invested, and relentless. We’re your competitive advantage, embedded where it matters most.',
    },
    {
      image: '/images/content.png', // Replace with actual image path
      title: 'World-Class Content',
      alt: 'Books and notepads representing content marketing',
      description:
        'We’re not just content creators; we’re storytellers, strategists, and SEO veterans. From top-ranked articles to successful podcasts, our team crafts content that drives traffic and tells your story.' ,
    },
    {
      image: '/images/experts.png', // Replace with actual image path
      title: 'Tech Experts',
      alt: 'Futuristic computer',
      description:
        'Marketing moves fast, and we move faster. With martech expertise, development skills, and a curiosity that never quits, we combine technical precision with creative firepower. Our Labs is where cutting-edge ideas come to life.',
    },
    {
      image: '/images/delivery.png', // Replace with actual image path
      title: 'Unmatched Rate of Delivery',
      alt: 'Flowers growing out of pots',
      description:
        'We set a fast pace when it comes to delivering projects. Time-in-market is an advantage and we want to ensure you get the most value from our services. Not only are pacesetters; we are proactive partners always on the lookout for new ideas.',
    },
    {
      image: '/images/innovating.png', // Replace with actual image path
      title: 'Innovation at the Cutting Edge',
      alt: 'An innovation lab with scientific equipment',
      description:
        'Curiosity drives us. Our Lab experiments with AI tools and builds micro-apps to stay one step ahead of the curve. When you partner with us, you get the benefit of that momentum.',
    },
  ];
  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>