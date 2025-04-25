// plugins/auth.client.js

export default defineNuxtPlugin(() => {
    // This plugin doesn't need to do anything itself, as our middleware handles the authentication
    // But we could add additional functionality here if needed in the future
    
    // For example, we could add a function to validate tokens, refresh sessions, etc.
    return {
      provide: {
        // Example function to check if user is authenticated
        isAuthenticated: () => {
          return !!localStorage.getItem('citebot-client');
        },
        
        // Example function to get current client name
        getClientName: () => {
          return localStorage.getItem('citebot-client') || '';
        },
        
        // Example function to logout
        logout: () => {
          localStorage.removeItem('citebot-client');
          return navigateTo('/citebots/');
        }
      }
    }
  });