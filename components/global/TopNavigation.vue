<!-- src/components/TopNavigation.vue -->
<template>
  <header
    :class="[
      'fixed w-full top-0 z-50 transition-all duration-300',
      headerBackgroundClass,
    ]"
  >
    <div class="bg-transparent">
      <nav class="flex items-center justify-between py-2 sm:py-4 w-full max-w-screen-lg mx-auto px-8 lg:px-4 xl:px-0">
        <!-- Logo -->
        <div class="text-xl sm:text-2xl font-bold font-body">
          <NuxtLink
            to="/"
            class="hover:text-burntOrange cursor-pointer"
            :class="logoTextClass"
          >
            Knowbots
          </NuxtLink>
        </div>

        <!-- Hamburger Menu Button -->
        <button
          @click="toggleMenu"
          class="sm:hidden focus:outline-none"
          :aria-expanded="isMenuOpen.toString()"
          aria-label="Toggle navigation menu"
        >
          <svg
            :class="[
              'w-6 h-6',
              hamburgerIconColorClass,
              'transition-colors duration-200 ease-in-out',
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <!-- Hamburger Icon -->
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <!-- Close Icon -->
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Navigation Links (visible on larger screens) -->
        <ul class="hidden sm:flex space-x-6 font-sans">
          <li>
            <NuxtLink
              to="/services/"
              class="font-body transition-colors cursor-pointer"
              :class="[navTextClass, navHoverClass]"
            >
              Services
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about/"
              class="font-body transition-colors cursor-pointer"
              :class="[navTextClass, navHoverClass]"
            >
              About Us
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/blog/"
              class="font-body transition-colors cursor-pointer"
              :class="[navTextClass, navHoverClass]"
            >
              Blog
            </NuxtLink>
          </li>
        </ul>

        <!-- Call to Action Button (hidden on mobile) -->
        <div class="hidden sm:block">
          <NuxtLink to="/contact/">
            <button
              class="ml-6 font-body font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform"
              :class="ctaButtonClass"
            >
              Get In Touch
            </button>
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- Off-Canvas Menu -->
    <div
      class="fixed inset-0 z-40"
      v-show="isMenuOpen"
      role="dialog"
      aria-modal="true"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black opacity-50"
        @click="toggleMenu"
        aria-hidden="true"
      ></div>

      <!-- Menu -->
      <div
        class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform"
        :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <nav class="h-full flex flex-col py-4 px-6">
          <!-- Close Button -->
          <div class="flex justify-end">
            <button
              @click="toggleMenu"
              class="focus:outline-none"
              aria-label="Close navigation menu"
            >
              <svg
                :class="[
                  'w-6 h-6',
                  hamburgerIconColorClass,
                  'transition-colors duration-200 ease-in-out',
                ]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <ul class="flex flex-col space-y-4 mt-8 font-sans">
            <li>
              <NuxtLink
                to="/services/"
                class="font-body text-darkNavy"
                @click="toggleMenu"
              >
                Services
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about/"
                class="font-body text-darkNavy"
                @click="toggleMenu"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blog/"
                class="font-body text-darkNavy"
                @click="toggleMenu"
              >
                Blog
              </NuxtLink>
            </li>
            <!-- Call to Action Button -->
            <li>
              <NuxtLink to="/contact/">
                <button
                  class="w-full mt-4 font-body font-bold py-2 px-4 rounded-lg shadow-md bg-burntOrangeDark text-white"
                  @click="toggleMenu"
                >
                  Get In Touch
                </button>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useSiteNavigationSchema } from '@/composables/useSiteNavigationSchema';

// Define the props
const props = defineProps({
  isHeroSection: {
    type: Boolean,
    default: false,
  },
});

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Scroll Handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Computed classes for header background
const headerBackgroundClass = computed(() => {
  if (props.isHeroSection) {
    return isScrolled.value ? 'bg-white shadow-md' : 'bg-transparent';
  } else {
    return 'bg-white shadow-md';
  }
});

// Computed classes for text color
const textColorClass = computed(() => {
  if (props.isHeroSection) {
    return isScrolled.value ? 'text-darkNavy' : 'text-white';
  } else {
    return 'text-darkNavy';
  }
});

// Logo text color class
const logoTextClass = computed(() => textColorClass.value);

// Navigation text color class
const navTextClass = computed(() => textColorClass.value);

// Call to Action button classes
const ctaButtonClass = computed(() => {
  if (props.isHeroSection) {
    return isScrolled.value
      ? 'bg-burntOrangeDark text-white hover:bg-jasperOrange'
      : 'bg-white text-darkNavy hover:bg-jasperOrange hover:text-white';
  } else {
    return 'bg-burntOrangeDark text-white hover:bg-jasperOrange';
  }
});

// Hover effect class for navigation links
const navHoverClass = computed(() => {
  return 'hover:text-burntOrange';
});

// Computed property for Hamburger Icon Color
const hamburgerIconColorClass = computed(() => {
  if (props.isHeroSection && !isScrolled.value) {
    return 'text-white';
  } else {
    return 'text-black';
  }
});

// Create navigation schema
const { createSiteNavigationSchema } = useSiteNavigationSchema();

// Define navigation items
const navigationItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services/' },
  { name: 'About Us', url: '/about/' },
  { name: 'Blog', url: '/blog/' },
  { name: 'Contact', url: '/contact/' }
];

// Generate the navigation schema
const navigationSchema = createSiteNavigationSchema(navigationItems, {
  name: 'Knowbots Main Navigation',
  description: 'Main navigation menu for Knowbots website'
});

// Add the schema to the page head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(navigationSchema)
    }
  ]
});
</script>

<style scoped>
/* Optional custom styles */
</style>