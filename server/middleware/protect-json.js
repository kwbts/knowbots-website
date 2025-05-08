// Middleware to protect direct access to JSON files
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  const referer = getRequestHeader(event, 'referer') || '';
  const authHeader = getRequestHeader(event, 'Authorization');
  
  // Check if this is a request for a JSON file
  if (path.endsWith('.json')) {
    // Allow API endpoints (they're handled by other middleware)
    if (path.startsWith('/api/')) {
      return;
    }
    
    // Always allow access to payload files needed by Nuxt for SSR and hydration
    if (path.includes('_payload.json')) {
      return;
    }
    
    // For client data files, allow access if:
    // 1. The referrer is from citebots dashboard
    // 2. There's a valid authorization header
    // 3. The referrer is from our own domain
    if (path.includes('-data.json')) {
      // Check if referrer includes a citebots path as these are legitimate access points
      const isCitebotsAccess = referer.includes('/citebots/') || referer.includes('/core-sample/');
      
      // Check for auth header
      const hasValidAuth = Boolean(authHeader && authHeader.startsWith('Bearer ') && authHeader.length > 10);
      
      // Check if referrer is from our own domain
      const hostDomain = url.host;
      const isFromOurSite = referer.includes(hostDomain);
      
      if (isCitebotsAccess || hasValidAuth || isFromOurSite) {
        return; // Allow the request to continue
      }
      
      // If none of the above conditions are met, block access
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Access Denied - Unauthorized'
      }));
    }
    
    // For other JSON files, only allow access if referrer is from our site
    const hostDomain = url.host;
    const isFromOurSite = referer.includes(hostDomain);
    
    if (!isFromOurSite) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Access Denied'
      }));
    }
  }
});