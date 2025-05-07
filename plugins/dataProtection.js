// plugins/dataProtection.js

import { setupProductionSafety, obfuscateClientData, isProduction } from '~/utils/dataVerification';

export default defineNuxtPlugin((nuxtApp) => {
  // Setup production safety measures
  const originalConsole = setupProductionSafety();

  // Add a global middleware function to secure data
  nuxtApp.hook('app:created', () => {
    // Replace fetch in production to intercept and obfuscate sensitive data
    if (isProduction()) {
      const originalFetch = global.fetch;
      
      global.fetch = async (url, options) => {
        const response = await originalFetch(url, options);
        
        // Clone the response so we can read it multiple times
        const responseClone = response.clone();
        
        // Check if this is a JSON response containing client data
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const text = await responseClone.text();
            // Check if the response contains likely client data (quick heuristic)
            if (text.includes('client_name') || text.includes('query_data')) {
              // Parse, obfuscate, and create a new response
              const jsonData = JSON.parse(text);
              const obfuscatedData = obfuscateClientData(jsonData);
              
              // Create a new response with the obfuscated data
              return new Response(JSON.stringify(obfuscatedData), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
              });
            }
          } catch (error) {
            // If there's an error processing the response, return the original
            console.error('Error in fetch interceptor:', error);
          }
        }
        
        // Return the original response for non-client data
        return response;
      };
    }
  });

  // Add data sanitization to Vue prototype 
  nuxtApp.vueApp.config.globalProperties.$sanitizeData = obfuscateClientData;
  
  // Disable right-click and keyboard shortcuts in production
  if (isProduction() && process.client) {
    nuxtApp.hook('app:mounted', () => {
      // Disable right-click context menu on sensitive pages
      const sensitiveRoutes = ['/citebots/dashboard', '/citebots/admin'];
      
      // Check if current route is sensitive
      const isSensitivePage = () => {
        if (!window || !window.location) return false;
        return sensitiveRoutes.some(route => window.location.pathname.includes(route));
      };
      
      if (isSensitivePage()) {
        // Disable right-click
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          return false;
        });
        
        // Disable keyboard shortcuts
        document.addEventListener('keydown', (e) => {
          // Prevent common inspect element shortcuts
          if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c')) ||
              (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
          }
        });
        
        // Add warning when opening dev tools
        const devToolsMessage = '%c⚠️ This page contains sensitive client data. Please do not share or inspect this data.';
        const devToolsStyle = 'color: red; font-size: 18px; font-weight: bold;';
        console.log(devToolsMessage, devToolsStyle);
      }
    });
  }
  
  return {
    provide: {
      sanitizeData: obfuscateClientData
    }
  };
});