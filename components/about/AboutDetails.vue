<!-- src/components/AboutUsPage.vue -->
<template>
    <main class="flex-grow">
      <section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-300">
        <!-- Page Heading -->
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h2 class="text-5xl font-bold mb-4 font-heading text-darkNavy">
            From Our Founder
          </h2>
          <p class="text-xl leading-relaxed mb-8 text-darkNavy font-body">
            Totally human, most days.
          </p>
        </div>
  
        <!-- About Us Content -->
        <div class="max-w-screen-lg mx-auto space-y-12">
          <!-- Section 1: Our Passion -->
          <div class="flex flex-col md:flex-row items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400">
            <div class="md:w-1/3 h-full rounded-lg overflow-hidden">
              <img src="~/public/images/our-passion.png" alt="Our Passion" class="object-cover w-full h-full" style="aspect-ratio: 3 / 4;" />
            </div>
            <div class="md:w-2/3 p-6">
              <h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading">
                You can't teach passion
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                Curiousity is what drives me. Digital marketing is applied science for me. Our craft demands to be tested in the field. Wild ideas need an audience, curiousity needs to be tested (and measured).</p>
                <p class="text-darkGray leading-relaxed font-body mt-4">
                 I am a builder. My tools are martech and creativity. I am a storyteller with a desire to master the technical details. I built <a href="https://elisci.com/">Explain Like I'm Sci Fi</a> to test my web development, AI scripting, and SEO skills. This isn't just a businsess, it's a passion project.</p>
            </div>
          </div>
  
          <!-- Section 2: Unique Skills -->
          <div class="flex flex-col md:flex-row-reverse items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400">
            <div class="md:w-1/3 h-full rounded-lg overflow-hidden">
              <img src="~/public/images/unique-skills.png" alt="Unique Skills" class="object-cover w-full h-full" style="aspect-ratio: 3 / 4;" />
            </div>
            <div class="md:w-2/3 p-6">
              <h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading">
                We are a fusion of skills
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                Digital marketing. Web analytics and tag management. Technical SEO. Content marketing. Marketing operations. AI in Marketing. Web Development. Our curiousity fuels our journey. 
              </p>
            </div>
          </div>
  
          <!-- Section 3: Our Story -->
          <div class="flex flex-col md:flex-row items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400">
            <div class="md:w-1/3 h-full rounded-lg overflow-hidden">
              <img src="/images/story-knowbots.png" alt="Our Story" class="object-cover w-full h-full" style="aspect-ratio: 3 / 4;" />
            </div>
            <div class="md:w-2/3 p-6">
              <h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading">
                The story of Knowbots
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                 My goal is simple: I want to practice my craft at the highest level. Founding Knowbots, I made my mission to help a small number of clients with highly personalized services. I want to be a part of your team, and I want you to feel that way, too.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  /* Optional: Custom styles for finer control */
  </style>