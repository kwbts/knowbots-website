<template>
  <section class="relative bg-deepPurple text-white">
    <!-- Hero image with custom height -->
    <div class="relative">
      <div>
        <!-- Image h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[720px] -->
        <img
          src="/images/homepage-hero.png"
          alt="Hero Image"
          class="object-cover w-full h-full"
        />
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-deepPurple opacity-60"></div>
        <!-- Text overlay -->
        <div class="absolute inset-0 flex items-center px-8 lg:px-4 xl:px-0">
          <div class="w-full max-w-screen-lg mx-auto">
            <div class="sm:w-2/3 w-1/2">
              <!-- Headline and Subtext -->
               <h1 class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0">
                We Speak Algorithm So You Don't Have To
              </h1>
              <div class="hidden sm:block">
              <p class="sm:text-xl md:text-2xl mb-6 font-light font-body">
                The future of digital marketing is here. Build it with Knowbots.
              </p>
              <!-- Call to Action Button -->
              <button
                @click="scrollToContact"
                class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out"
              >
                Book An Intro Call
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const scrollToContact = () => {
  const contactForm = document.getElementById('contact-form');
  contactForm.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
/* Custom styles if necessary */
</style>