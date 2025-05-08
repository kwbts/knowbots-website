// Middleware to protect direct access to JSON files
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  
  // Check if this is a request for a JSON file
  if (path.endsWith('.json')) {
    // Always allow access to:
    // 1. API endpoints
    // 2. Payload files needed for hydration
    // 3. Client data files (for simplicity)
    if (path.startsWith('/api/') || 
        path.includes('_payload.json') || 
        path.includes('-data.json')) {
      return;
    }
    
    // Only check referrer for non-client data JSON files
    const referer = getRequestHeader(event, 'referer') || '';
    const hostDomain = url.host;
    const isFromOurSite = referer.includes(hostDomain);
    
    // For non-data JSON files, only block if accessed directly from outside
    if (!isFromOurSite) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Access Denied'
      }));
    }
  }
});