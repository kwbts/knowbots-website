// Plugin to fix Node.js specific globals in the browser
export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    // Polyfill global for browser environment
    window.global = window;
    
    // Other Node.js globals that might be needed
    window.process = window.process || { env: {} };
    window.Buffer = window.Buffer || { isBuffer: () => false };
  }
});