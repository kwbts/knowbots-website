// Middleware to protect direct access to JSON files
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  const referer = getRequestHeader(event, 'referer') || '';
  
  // Check if this is a request for a JSON file
  if (path.endsWith('.json')) {
    // Allow API endpoints (they're handled by other middleware)
    if (path.startsWith('/api/')) {
      return;
    }
    
    // Check if referrer is from our own domain
    const hostDomain = url.host;
    const isFromOurSite = referer.includes(hostDomain);
    
    // Block direct access to JSON files if not referred from our site
    if (!isFromOurSite) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Access Denied'
      }));
    }
  }
});