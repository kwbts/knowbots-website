// plugins/securityProtection.client.js - Client-side only plugin 
// To prevent browser inspection of sensitive data
// TEMPORARILY DISABLED FOR TROUBLESHOOTING

import { isProduction } from '~/utils/dataVerification';

export default defineNuxtPlugin((nuxtApp) => {
  // Execute in browser only
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      console.log('Security plugin loaded but protections disabled for troubleshooting');
      
      // DEBUGGING FLAG - set to false to re-enable protection
      const DISABLE_PROTECTION = true;
      
      // Only apply in production AND if not disabled
      if (isProduction() && !DISABLE_PROTECTION) {
        // Define sensitive routes that should be protected
        const sensitiveRoutes = [
          '/citebots/dashboard',
          '/citebots/admin',
          '/core-sample'
        ];
        
        // Check if current route is in sensitiveRoutes
        const isRestrictedPage = () => {
          if (!window.location.pathname) return false;
          return sensitiveRoutes.some(route => 
            window.location.pathname.startsWith(route)
          );
        };
        
        // If we're on a sensitive route, apply protections
        if (isRestrictedPage()) {
          // Add a debug message to show we're on a restricted page
          console.log('On restricted page, security measures would normally be active');
          
          // ALL SECURITY PROTECTIONS DISABLED FOR TROUBLESHOOTING
        }
      }
    });
  }
});