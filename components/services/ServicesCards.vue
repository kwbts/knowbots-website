<!-- src/components/ServicesCards.vue -->
<template>
    <section class="bg-brownBackground py-16 px-8 border-t-2 border-gray-150">
      <!-- Section Heading and Intro Text -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy">
          Our Services
        </h2>
        <p class="text-xl leading-relaxed mb-8 text-darkNavy">
          Tools and tactics carefully selected to drive your business forward.
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
        "We are invested in your results. Our small team structure is intentional—it's how we operate best. You'll work directly with our principal consultants, not project managers or a revolving door of contributors. Our hands-on, embedded approach is what truly sets us apart.",
      offerings: [
        'Direct collaboration with principal consultants',
        'Proactive and embedded approach',
        'Customized solutions tailored to your needs',
      ],
    },
    {
      image: '/images/full-stack-seo.png', // Replace with actual image path
      title: 'Full Stack SEO',
      description:
        "We are writers and content creators at heart. From crafting top-ranked articles to founding successful podcasts, our team brings veteran expertise to your projects. Our work balances search performance with exceptional writing quality—check out our blog to see our content in action.",
      offerings: [
        'SEO-optimized blog posts that read like they were written for humans, not algorithms',
        'Programmatic SEO that scales your content strategy',
        'Content planning that aligns with both search trends and business goals',
      ],
    },
    {
      image: '/images/dashboards-reports.png', // Replace with actual image path
      title: 'Web Analytics & Reporting',
      description:
        "We transform raw data into clear insights that drive smart decisions. Our technical expertise in implementation is matched by our ability to interpret results in ways that automated tools can't. We make complex data accessible and actionable through thoughtful analysis and clear reporting.",
      offerings: [
        'Tag Manager setup and optimization',
        'GA4 and web analytics configuration that tracks what matters',
        'Custom dashboards that tell the story behind your data',
      ],
    },
    {
      image: '/images/ai-for-marketing.png', // Replace with actual image path
      title: 'AI for Marketing',
      description:
       "We harness AI as a tool that enhances human creativity, not replaces it. Our approach combines technical knowledge with strategic thinking to create efficiencies where appropriate while ensuring your marketing maintains its distinctive voice and direction.",
      offerings: [
        'Cutting-edge expertise in practical AI applications',
        'AI assistant development that supports rather than supplants your team',
        'Innovation-as-a-service that keeps you ahead of the curve',
      ],
    },
    {
      image: '/images/micro-app-websites.png', // Replace with actual image path
      title: 'Micro Apps & Websites',
      description:
        'We build digital experiences that engage your audience and showcase your expertise. Our development skills and marketing knowledge come together to create tools and microsites that serve a strategic purpose—not just flashy technology for its own sake.',
      offerings: [
        'Micro SaaS development that solves specific business problems',
        'Web development projects with marketing strategy built in',
        'Interactive tools that generate leads while providing value',
      ],
    },
  ];
  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>