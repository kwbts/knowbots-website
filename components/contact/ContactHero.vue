<!-- src/components/ContactHero.vue -->
<template>
  <section class="relative bg-deepPurple text-white">
    <!-- Hero image with custom height -->
    <div class="relative">
      <div>
        <!-- Image -->
        <img
          src="/images/contact-hero-image.png"
          alt="Contact Hero Image"
          class="object-cover object-center w-full h-full"
        />
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-deepPurple opacity-60"></div>
        <!-- Text overlay -->
        <div class="absolute inset-0 flex items-center px-6 md:px-8">
          <div class="w-full max-w-screen-lg mx-auto">
            <div class="w-full md:w-2/3">
              <!-- Headline and Subtext -->
              <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0">
                We Can Help
              </h1>
              <p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body">
                Let's talk about your digital marketing strategy.
              </p>
              <!-- Optional: Add a Call to Action Button if desired -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No need for scrollToContact if there's no button
</script>

<style scoped>
/* Custom styles if necessary */
</style>