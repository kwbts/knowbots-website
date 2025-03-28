<!-- src/components/ValueProps.vue -->
<template>
    <section class="bg-brownBackground py-16 px-8 border-t-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy">
          Digital Marketing for the Imaginative Mind
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkNavy">
          We don't just analyze data—we transform it into creative solutions that captivate audiences and drive results.        </p>
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
        "You won't get lost in a corporate structure or handed off to junior staff. As an intentionally small team, we work directly with you—responsive, accountable, and invested in your success. Consider us your in-house marketing scientists, without the overhead.",
    },
    {
      image: '/images/content.png', // Replace with actual image path
      title: 'World-Class Content',
      alt: 'Books and notepads representing content marketing',
      description:
        "Content isn't just words on a page; it's a strategic asset that should deliver results. Our approach combines storytelling with data analysis to create content that ranks, converts, and builds authority in your space." ,
    },
    {
      image: '/images/experts.png', // Replace with actual image path
      title: 'Tech Experts',
      alt: 'Human Expertise, Enhanced by Technology',
      description:
        "We build tools that amplify our capabilities, not replace our judgment. With both development skills and marketing expertise, we create custom solutions that combine technical know-how with hands-on craftsmanship—solving problems most agencies don't even recognize.",
    },
    {
      image: '/images/delivery.png', // Replace with actual image path
      title: 'Unmatched Rate of Delivery',
      alt: 'Flowers growing out of pots',
      description:
        "Without layers of approval and bureaucracy, we move fast. Your projects don't sit in queue for weeks—we set a fast pace to get your initiatives to market quickly, giving you a competitive edge and more time to see results.",
    },
    {
      image: '/images/innovating.png', // Replace with actual image path
      title: 'Innovation Workshop',
      alt: 'An innovation lab with scientific equipment',
      description:
        "Our Lab is where we explore the intersection of creativity and technology. We test new approaches, build useful tools, and develop techniques that enhance our work—not replace it. When you work with us, you get the perfect balance of proven methods and forward-thinking approaches.",
    },
  ];
  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>