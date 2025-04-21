<!-- src/components/services/GeoHero.vue -->
<template>
  <section class="relative bg-deepPurple text-white">
    <!-- Hero image with custom height -->
    <div class="relative">
      <!-- Image -->
      <img
        src="/images/geo-hero.png"
        alt="Generative Engine Optimization Hero Image"
        class="object-cover object-center w-full h-full"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-deepPurple opacity-60"></div>
      
      <!-- Content overlay -->
      <div class="absolute inset-0 flex items-center px-8 lg:px-4 xl:px-0">
        <div class="w-full max-w-screen-lg mx-auto">
          <!-- Text content - centered on mobile, left-aligned on desktop -->
          <div class="w-full md:w-2/3 text-center md:text-left">
            <!-- Headline and Subtext -->
            <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0">
              Generative Engine Optimization
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body">
              Data-driven GEO services combined with SEO expertise. No more black boxes; just results.
            </p>
            <!-- Call to Action Button -->
            <button
              @click="scrollToContact"
              class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out"
            >
              Book A Strategy Call
            </button>
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
/* Ensure the hero has enough height */
.relative > img {
  min-height: 60vh;
}

@media (max-width: 1023px) {
  .relative > img {
    min-height: 70vh;
  }
}
</style>