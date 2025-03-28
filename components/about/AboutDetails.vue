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
                Driven by Curiosity
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                Digital marketing is applied science to me. I approach each challenge with equal parts analytical thinking and creative problem-solving—testing hypotheses, measuring outcomes, and refining approaches based on data.</p>
                <p class="text-darkGray leading-relaxed font-body mt-4">
                  As a builder, I combine martech expertise with a storyteller's instinct. I'm equally interested in mastering technical SEO and crafting narratives that connect. This fusion of skills is what makes Knowbots different from agencies that excel at either technical execution OR creative development, but rarely both.</p>
            </div>
          </div>
  
          <!-- Section 2: Unique Skills -->
          <div class="flex flex-col md:flex-row-reverse items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400">
            <div class="md:w-1/3 h-full rounded-lg overflow-hidden">
              <img src="~/public/images/unique-skills.png" alt="Unique Skills" class="object-cover w-full h-full" style="aspect-ratio: 3 / 4;" />
            </div>
            <div class="md:w-2/3 p-6">
              <h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading">
                Strategic Observer
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                My natural tendency is to collect and synthesize information, finding patterns others miss. This makes me particularly effective at SEO research, competitive analysis, and identifying content opportunities that deliver real results. I don't chase marketing trends—I analyze what works and why.
              </p>
              <p class="text-darkGray leading-relaxed font-body">
                In a world of marketing generalists, I've chosen depth over breadth. Rather than offering surface-level knowledge across dozens of channels, I focus on becoming genuinely expert in the areas where I can deliver exceptional value.
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
                Why We Remain Small
              </h2>
              <p class="text-darkGray leading-relaxed font-body">
                I founded Knowbots with a simple mission: practice my craft at the highest level for a small number of clients who value personalized service. By intentionally limiting our size, we ensure you work directly with expert consultants who are invested in your success.
              </p>
              <p class="text-darkGray leading-relaxed font-body">
                This approach creates a different kind of agency relationship—one where we function as an extension of your team rather than an external vendor. We're genuinely invested in your outcomes because your success is our success.
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