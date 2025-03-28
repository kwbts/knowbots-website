<!-- src/components/ContactHero.vue -->
<template>
  <section class="relative bg-deepPurple text-white">
    <!-- Hero image with custom height -->
    <div class="relative">
      <!-- Image -->
      <img
        src="/images/contact-hero-image.png"
        alt="Contact Hero Image"
        class="object-cover object-center w-full h-full"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-deepPurple opacity-60"></div>
      
      <!-- Content overlay -->
      <div class="absolute inset-0 flex items-center px-8 lg:px-4 xl:px-0">
        <div class="w-full max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center">
          <!-- Text content - left column on large screens, centered on mobile -->
          <div class="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <!-- Headline and Subtext -->
            <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0">
              Digital Marketing Services
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body">
              Imagine what we can build together
            </p>
          </div>
          
          <!-- Form - right column on large screens, centered on mobile -->
          <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div class="bg-white border border-gray-200 shadow-lg p-8 rounded-lg w-full max-w-md">
              <!-- Form or Thank You Message -->
              <div v-if="!isSubmitted">
                <h2 class="text-2xl font-bold mb-6 text-black font-heading">Let's talk digital marketing strategy</h2>
                <form 
                  name="knowbots-contact" 
                  method="POST" 
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  @submit.prevent="handleSubmit"
                  class="grid grid-cols-1 gap-4"
                >
                  <!-- Hidden Netlify fields -->
                  <input type="hidden" name="form-name" value="knowbots-contact" />
                  <div class="hidden">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </div>

                  <!-- Name Field -->
                  <div>
                    <label class="block mb-2 font-heading text-black" for="name">Name</label>
                    <input
                      v-model="form.name"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300"
                      required
                    />
                  </div>
                  
                  <!-- Email Field -->
                  <div>
                    <label class="block mb-2 font-heading text-black" for="email">Email</label>
                    <input
                      v-model="form.email"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@website.com"
                      class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300"
                      required
                    />
                  </div>
                  
                  <!-- Company Field -->
                  <div>
                    <label class="block mb-2 font-heading text-black" for="company">Company</label>
                    <input
                      v-model="form.company"
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300"
                    />
                  </div>
                  
                  <!-- Message Field -->
                  <div>
                    <label class="block mb-2 font-heading text-black" for="message">How can we help?</label>
                    <textarea
                      v-model="form.message"
                      id="message"
                      name="message"
                      placeholder="Let us know how we can help"
                      class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300 resize-none"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  
                  <!-- Error Message -->
                  <div v-if="errorMessage">
                    <p class="text-red-500">{{ errorMessage }}</p>
                  </div>
                  
                  <!-- Submit Button -->
                  <div>
                    <button
                      type="submit"
                      class="w-full bg-burntOrangeDark hover:bg-jasperOrange text-white font-bold font-body px-8 py-3 rounded-md shadow-md transition-all duration-200"
                    >
                      Get in Touch Today
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Thank You Message -->
              <div v-else tabindex="-1" ref="thankYouMessage" class="text-black">
                <h2 class="text-3xl font-bold mb-4 text-black font-heading">
                  Thank You!
                </h2>
                <p class="text-lg text-black font-body mb-4">
                  We received your message and will get in touch shortly. 
                </p>
                <NuxtLink to="/" class="text-burntOrange hover:text-jasperOrange font-body">
                  Return to Homepage
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue';

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: '',
});

const isSubmitted = ref(false);
const errorMessage = ref('');
const thankYouMessage = ref(null);

const handleSubmit = async (event) => {
  // Clear any previous error messages
  errorMessage.value = '';

  // Simple form validation
  if (!form.name || !form.email || !form.message) {
    errorMessage.value = 'Please fill in all required fields.';
    return;
  }

  try {
    const formData = new FormData(event.target);
    
    // Submit the form data to Netlify
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });
    
    // Upon successful submission
    isSubmitted.value = true;
    
    // Reset form fields
    form.name = '';
    form.email = '';
    form.company = '';
    form.message = '';
    
    // Move focus to the Thank You message for accessibility
    await nextTick();
    thankYouMessage.value.focus();
  } catch (error) {
    // Handle submission error
    errorMessage.value = 'An error occurred while submitting the form. Please try again.';
  }
};
</script>

<style scoped>
/* Ensure the hero has enough height */
.relative > img {
  min-height: 80vh;
}

@media (max-width: 1023px) {
  .relative > img {
    min-height: 100vh; /* Full height on mobile to accommodate stacked content */
  }
}
</style>