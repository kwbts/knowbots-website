<!-- components/global/MailerLiteForm.vue -->
<template>
  <section id="mailer-form" class="bg-white text-darkGray pt-16 pb-16 px-8">
    <!-- Flex container for two-column layout -->
    <div class="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center gap-12">
      <!-- Left Column: Text Content -->
      <div class="md:w-1/2">
        <h2 class="text-4xl font-bold mb-4 text-darkTeal font-heading">
          Subscribe to our newsletter
        </h2>
        <h3 class="text-2xl mb-6 text-darkGray font-body">
          Get the latest GEO insights delivered to your inbox
        </h3>
        <!-- Content Description -->
        <div class="space-y-4">
          <p class="text-darkGray font-body">
            We'll send you regular updates about:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-darkGray font-body">
            <li>LLM citation trends and analysis</li>
            <li>Optimization strategies for AI visibility</li>
            <li>Case studies and success stories</li>
            <li>Industry news and expert insights</li>
          </ul>
          <p class="text-sm text-gray-500 font-body mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      <!-- Right Column: Form or Thank You Message -->
      <div class="md:w-1/2 bg-white border border-gray-200 shadow-md p-8 rounded-3xl">
        <!-- Conditional Rendering -->
        <div v-if="!isSubmitted">
          <form 
            id="mlb2-8365866"
            class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-8365866 grid grid-cols-2 gap-4"
            @submit.prevent="handleSubmit"
          >
            <input type="hidden" name="ml-submit" value="1">
            
            <!-- Name Field -->
            <div>
              <label class="block mb-2 font-heading text-darkGray" for="ml-form-firstname">Name</label>
              <input
                v-model="form.name"
                type="text"
                id="ml-form-firstname"
                name="fields[firstname]"
                placeholder="Your Name"
                class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
                required
              />
            </div>
            
            <!-- Email Field -->
            <div>
              <label class="block mb-2 font-heading text-darkGray" for="ml-form-email">Email</label>
              <input
                v-model="form.email"
                type="email"
                id="ml-form-email"
                name="fields[email]"
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
                required
              />
            </div>
            
            <!-- Company Field -->
            <div>
              <label class="block mb-2 font-heading text-darkGray" for="ml-form-company">Company</label>
              <input
                v-model="form.company"
                type="text"
                id="ml-form-company"
                name="fields[company]"
                placeholder="Your Company"
                class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300"
              />
            </div>
            
            <!-- Empty div to maintain grid structure -->
            <div></div>
            
            <!-- Terms Checkbox -->
            <div class="col-span-2 mt-2">
              <div class="flex items-start">
                <input
                  v-model="form.terms"
                  type="checkbox"
                  id="terms"
                  name="terms"
                  class="mt-1 h-4 w-4 text-burntOrangeDark rounded border-gray-300 focus:ring-burntOrangeDark"
                  required
                />
                <label for="terms" class="ml-2 block text-sm text-darkGray font-body">
                  I agree to receive marketing emails and can unsubscribe at any time.
                </label>
              </div>
            </div>
            
            <!-- Error Message -->
            <div class="col-span-2 mt-2" v-if="errorMessage">
              <p class="text-red-500">{{ errorMessage }}</p>
            </div>
            
            <!-- Submit Button -->
            <div class="col-span-2 mt-4">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-burntOrangeDark hover:bg-jasperOrange text-white font-bold font-body px-8 py-3 rounded-md shadow-md transition-all duration-200 disabled:opacity-70"
              >
                <span v-if="isSubmitting">Subscribing...</span>
                <span v-else>Subscribe Now</span>
              </button>
            </div>
            
            <!-- Hidden MailerLite inputs -->
            <input type="hidden" name="ml-submit" value="1" />
            <input type="hidden" name="anticsrf" v-model="anticsrf" />
          </form>
        </div>
        
        <!-- Thank You Message -->
        <div v-else tabindex="-1" ref="thankYouMessage" class="thank-you-message">
          <h2 class="text-3xl font-bold mb-4 text-darkTeal font-heading">
            Thank You for Subscribing!
          </h2>
          <p class="text-lg text-darkGray font-body mb-4">
            You've been added to our newsletter. Check your inbox soon for GEO insights and updates.
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
import { reactive, ref, onMounted, nextTick } from 'vue';

// Form state
const form = reactive({
  name: '',
  email: '',
  company: '',
  terms: false
});

const isSubmitted = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const thankYouMessage = ref(null);
const anticsrf = ref('');

// Generate a random anticsrf token
onMounted(() => {
  // Generate a random string for the anticsrf token
  const randomString = Math.random().toString(36).substring(2, 15);
  anticsrf.value = randomString;
});

const handleSubmit = async (event) => {
  // Clear previous error messages
  errorMessage.value = '';
  
  // Form validation
  if (!form.name || !form.email || !form.terms) {
    errorMessage.value = 'Please fill in all required fields and accept the terms.';
    return;
  }
  
  // Set submitting state
  isSubmitting.value = true;
  
  try {
    // Create form data
    const formData = new FormData();
    formData.append('fields[firstname]', form.name);
    formData.append('fields[email]', form.email);
    formData.append('fields[company]', form.company || '');
    formData.append('ml-submit', '1');
    formData.append('anticsrf', anticsrf.value);
    
    // MailerLite endpoint - this is their API endpoint for form submissions
    const response = await fetch('https://static.mailerlite.com/webforms/submit/8365866', {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // This is crucial for cross-origin requests to MailerLite
    });
    
    // Since we're using no-cors, we can't actually check the response status
    // We'll assume success and handle any issues with MailerLite's own error handling
    
    // Set submitted state
    isSubmitted.value = true;
    
    // Reset form
    form.name = '';
    form.email = '';
    form.company = '';
    form.terms = false;
    
    // Focus on thank you message for accessibility
    await nextTick();
    if (thankYouMessage.value) {
      thankYouMessage.value.focus();
    }
    
  } catch (error) {
    // Handle errors
    errorMessage.value = 'An error occurred while submitting the form. Please try again.';
    console.error('Form submission error:', error);
  } finally {
    // Reset submitting state
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom styles for the form */
.thank-you-message {
  @apply text-center;
}

.thank-you-message h2 {
  @apply text-3xl font-bold mb-4 text-darkTeal font-heading;
}

.thank-you-message p {
  @apply text-lg text-darkGray font-body mb-4;
}

.thank-you-message a {
  @apply text-burntOrange hover:text-jasperOrange font-body;
}
</style>