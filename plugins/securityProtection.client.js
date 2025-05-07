// plugins/securityProtection.client.js - Client-side only plugin 
// to protect sensitive data from inspection

import { isProduction } from '~/utils/dataVerification';

export default defineNuxtPlugin((nuxtApp) => {
  // Execute in browser only
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      // Only apply in production to avoid hindering development
      if (isProduction()) {
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
          // PROTECTION 1: Disable right-click
          document.addEventListener('contextmenu', (e) => {
            const target = e.target;
            // Only prevent on data elements with class "sensitive-data"
            // or on the entire page if it has the "secure-page" class
            if (target.closest('.sensitive-data') || document.body.classList.contains('secure-page')) {
              e.preventDefault();
              return false;
            }
          });
          
          // PROTECTION 2: Disable keyboard shortcuts for inspect
          document.addEventListener('keydown', (e) => {
            // Prevent inspector shortcuts
            if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c')) ||
                (e.ctrlKey && e.key === 'u')) {
              e.preventDefault();
              return false;
            }
          });
          
          // PROTECTION 3: Add CSS to prevent copy/selection of sensitive data
          const style = document.createElement('style');
          style.textContent = `
            .sensitive-data {
              user-select: none !important;
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
            }
            .secure-page * {
              user-select: none !important;
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
            }
          `;
          document.head.appendChild(style);
          
          // PROTECTION 4: Obfuscate visible data by generating fake elements
          // This makes it harder to extract from inspector
          setTimeout(() => {
            // Add dummy elements to confuse inspector
            document.querySelectorAll('.sensitive-data').forEach(el => {
              // Add data-* attributes with fake versions of the real data
              const realText = el.innerText;
              el.setAttribute('data-obfuscated', 'true');
              
              // Create hidden siblings with variations of the text
              // only some of which contain the real data
              for (let i = 0; i < 5; i++) {
                const shadow = document.createElement('div');
                shadow.style.display = 'none';
                shadow.className = 'shadow-data';
                shadow.textContent = realText.split('').reverse().join('');
                el.parentNode.insertBefore(shadow, el.nextSibling);
              }
            });
            
            // Warn users about data security in console
            console.log('%c⚠️ This page contains sensitive information that should not be shared.', 
                       'color: red; font-size: 14px; font-weight: bold;');
            console.log('%cAll activity on this page is logged and monitored.', 
                       'color: red; font-size: 12px;');
          }, 1000);
        }
      }
    });
  }
});