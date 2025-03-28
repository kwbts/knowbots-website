<!-- src/components/Footer.vue -->
<template>
    <footer class="bg-deepPurple text-offWhite pt-10 pb-10">
      <div class="max-w-screen-lg px-8 lg:px-0 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Company Info -->
        <div>
          <h3 class="text-2xl font-bold mb-4 font-heading">Knowbots</h3>
          <p>
            Explore the future of digital marketing with Knowbots.
          </p>
        </div>
        <!-- Middle Column: Quick Links -->
        <div>
          <h4 class="text-xl font-semibold mb-4 font-heading">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <a href="/"
              class="font-body hover:text-burntOrange transition-colors cursor-pointer">
              Home
            </a>       
          </li>
            <li>
              <a href="/services/"
              class="font-body hover:text-burntOrange transition-colors cursor-pointer">
              Services
            </a>      
              </li>
            <li>
              <a href="/about/"
              class="font-body hover:text-burntOrange transition-colors cursor-pointer">
              About
            </a>    
            </li>
            <li>
              <a href="/blog/"
              class="font-body hover:text-burntOrange transition-colors cursor-pointer">
              Blog
            </a>    
            </li>
          </ul>
        </div>
        <!-- Right Column: Social Media -->
        <div>
          <h4 class="text-xl font-semibold mb-4">Connect with Us</h4>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-softOrange transition-colors">
              <i class="fa-brands fa-bluesky"></i>
            </a>
            <a href="#" class="hover:text-softOrange transition-colors">
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="#" class="hover:text-softOrange transition-colors">
              <i class="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 text-center border-t border-gray-700 pt-4">
        <p class="font-heading">&copy; {{ new Date().getFullYear() }} Knowbots. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script setup>
  /* No additional script required */
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>