<!-- src/components/GeoContactForm.vue -->
<template>
    <section id="contact-form" class="bg-white text-darkGray pt-16 pb-16 px-8">
      <!-- Flex container for two-column layout -->
      <div class="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center gap-12">
        <!-- Left Column: Text Content -->
        <div class="md:w-1/2">
          <h2 class="text-4xl font-bold mb-4 text-darkTeal font-heading">
            It's time to improve your LLM visibility
          </h2>
          <h3 class="text-2xl mb-6 text-darkGray font-body">
            Let's get to work
          </h3>
          <!-- Testimonial Section -->
          <div class="flex items-start space-x-4">
            <img src="/images/nick-donaldson.jpeg" alt="Nick Donaldson" class="w-12 h-12 rounded-full">
            <div>
              <p class="italic text-darkGray mb-2 font-body">
                "I'm certain I have learnt more from Jon in one year than I would have in 2 Ivy League degrees. He's a champ."
              </p>
              <p class="italic text-darkGray mb-2 font-body">
                "When it comes to marketing, strategic thinking, and being an all-around nice person, Jon is world class."
              </p>
              <p class="font-bold text-darkGray font-body">
                - Nick Donaldson
                <br>Director of Growth @ Knak
              </p>
            </div>
          </div>
        </div>
  
        <!-- Right Column: Form or Thank You Message -->
        <div class="md:w-1/2 bg-white border border-gray-200 shadow-md p-8 rounded-3xl">
          <!-- Conditional Rendering -->
          <div v-if="!isSubmitted">
            <form 
              name="knowbots-contact" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              @submit.prevent="handleSubmit"
              class="grid grid-cols-2 gap-4"
            >
              <!-- Hidden Netlify fields -->
              <input type="hidden" name="form-name" value="knowbots-contact" />
              <p class="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>
  
              <!-- Name Field -->
              <div>
                <label class="block mb-2 font-heading text-darkGray" for="name">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
                  required
                />
              </div>
              <!-- Email Field -->
              <div>
                <label class="block mb-2 font-heading text-darkGray" for="email">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@website.com"
                  class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
                  required
                />
              </div>
              <!-- Company Field -->
              <div>
                <label class="block mb-2 font-heading text-darkGray" for="company">Company</label>
                <input
                  v-model="form.company"
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Your Company"
                  class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
                />
              </div>
              <!-- Empty div to maintain grid structure -->
              <div></div>
              <!-- Message Field -->
              <div class="col-span-2">
                <label class="block mb-2 font-heading text-darkGray" for="message">How can we help?</label>
                <textarea
                  v-model="form.message"
                  id="message"
                  name="message"
                  placeholder="Let us know how we can help"
                  class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300 resize-none"
                  rows="5"
                  required
                ></textarea>
              </div>
              <!-- Error Message -->
              <div class="col-span-2" v-if="errorMessage">
                <p class="text-red-500">{{ errorMessage }}</p>
              </div>
              <!-- Submit Button -->
              <div class="col-span-2">
                <button
                  type="submit"
                  class="bg-burntOrangeDark hover:bg-jasperOrange text-white font-bold font-body px-8 py-3 rounded-md shadow-md transition-all duration-200"
                >
                  Get in Touch Today
                </button>
              </div>
            </form>
          </div>
          <!-- Thank You Message -->
          <div v-else tabindex="-1" ref="thankYouMessage">
            <h2 class="text-3xl font-bold mb-4 text-darkTeal font-heading">
              Thank You!
            </h2>
            <p class="text-lg text-darkGray font-body mb-4">
              We received your message and will get in touch shortly. 
            </p>
            <NuxtLink to="/" class="text-burntOrange hover:text-jasperOrange font-body">
              Return to Homepage
            </NuxtLink>
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
  /* Custom styles for the Thank You message */
  #contact-form .thank-you-message {
    @apply text-center;
  }
  
  #contact-form .thank-you-message h2 {
    @apply text-3xl font-bold mb-4 text-darkNavy font-heading;
  }
  
  #contact-form .thank-you-message p {
    @apply text-lg text-darkGray font-body mb-4;
  }
  
  #contact-form .thank-you-message a {
    @apply text-burntOrange hover:text-jasperOrange font-body;
  }
  </style>