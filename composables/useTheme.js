// composables/useTheme.js
import { ref, watch } from 'vue';

export const useTheme = () => {
  // Theme state - 'dark' or 'light'
  const theme = ref('dark');
  
  // Apply theme to document
  const applyTheme = (newTheme) => {
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Store user preference
      localStorage.setItem('geo-report-theme', newTheme);
    }
    
    // Update reactive state
    theme.value = newTheme;
  };
  
  // Toggle between dark and light mode
  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };
  
  // Initialize theme
  const initTheme = () => {
    if (typeof window === 'undefined') return;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('geo-report-theme');
    
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // If no saved preference, use system preference with dark fallback
      const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemPrefersDark ? 'dark' : 'dark'); // Default to dark even if system is light
    }
    
    // Setup listeners for system preference changes
    if (window.matchMedia) {
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (colorSchemeQuery.addEventListener) {
        colorSchemeQuery.addEventListener('change', (e) => {
          // Only change if user hasn't set a preference
          if (!localStorage.getItem('geo-report-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    }
  };
  
  // Initialize when running in browser (using onMounted in Nuxt can cause hydration issues)
  if (typeof window !== 'undefined') {
    // Use setTimeout to ensure it runs after DOM is ready
    setTimeout(() => {
      initTheme();
    }, 0);
  }
  
  return {
    theme,
    toggleTheme,
    initTheme
  };
};