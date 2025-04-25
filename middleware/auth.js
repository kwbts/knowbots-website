// middleware/auth.js
import { verifyClientToken } from '@/utils/secureAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware if not client-side
  if (process.server) return;
  
  // Get the client token from localStorage
  const token = localStorage.getItem('citebot-token');
  
  // Verify token if it exists
  const isAuthenticated = token ? verifyClientToken(token).valid : false;
  
  // If trying to access dashboard without being authenticated, redirect to login
  if (to.path.startsWith('/citebots/dashboard') && !isAuthenticated) {
    console.log('Auth middleware: Redirecting unauthenticated user to login page');
    return navigateTo('/citebots/');
  }
});