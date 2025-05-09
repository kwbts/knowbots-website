// plugins/dataProtection.js

import { setupProductionSafety, obfuscateClientData, isProduction } from '~/utils/dataVerification';

export default defineNuxtPlugin((nuxtApp) => {
  // Setup production safety measures
  const originalConsole = setupProductionSafety();

  // Add a global middleware function to secure data
  nuxtApp.hook('app:created', () => {
    // DISABLED: Fetch interception for troubleshooting
    console.log('Data protection fetch interception disabled for troubleshooting');
    
    // Keep the original fetch behavior to avoid data hiding issues
    // This allows all JSON data to be viewed unmodified
  });

  // Add data sanitization to Vue prototype 
  nuxtApp.vueApp.config.globalProperties.$sanitizeData = obfuscateClientData;
  
  // DISABLED FOR TROUBLESHOOTING: Right-click and keyboard shortcuts protection
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      console.log('Right-click and keyboard shortcut protection disabled for troubleshooting');
      
      // Add troubleshooting notice to the console
      const devToolsMessage = '%c🔧 TROUBLESHOOTING MODE: Security restrictions temporarily disabled';
      const devToolsStyle = 'color: blue; font-size: 14px; font-weight: bold;';
      console.log(devToolsMessage, devToolsStyle);
    });
  }
  
  return {
    provide: {
      sanitizeData: obfuscateClientData
    }
  };
});