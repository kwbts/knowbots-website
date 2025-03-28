<!-- src/components/ServicesHero.vue -->
<template>
  <section class="relative bg-deepPurple text-white">
    <!-- Hero image with custom height -->
    <div class="relative">
      <div>
        <!-- Image -->
        <img
          src="/images/serviceshero.png"
          alt="Services Hero Image"
          class="object-cover object-top w-full h-full"
        />
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-deepPurple opacity-60"></div>
        <!-- Text overlay -->
        <div class="absolute inset-0 flex items-center px-6 md:px-8">
          <div class="w-full max-w-screen-lg mx-auto">
            <div class="sm:w-2/3 w-3/4">
              <!-- Headline and Subtext -->
              <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0">
                Digital Marketing Services
              </h1>
              <div class="hidden sm:block">

              <p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body">
                Blending Tech and Creativity for a Brighter Marketing Future.
              </p>
              <!-- Call to Action Button -->
              <button
                @click="scrollToContact"
                class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out"
              >
                Tell Us How We Can Help
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