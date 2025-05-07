// public/scripts/dark-mode.js
// This script handles dark mode initialization before Vue hydrates
// to prevent flash of incorrect theme

(function() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
  
    // Try to get the saved preference from localStorage
    const savedTheme = localStorage.getItem('geo-report-theme');
  
    // If we have a saved preference, apply it right away
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // If no saved preference, check system preference (with dark as default)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  })();