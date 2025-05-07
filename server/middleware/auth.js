// This is an API route that handles authentication for protected resources
// such as client data files

export default defineEventHandler(async (event) => {
  // Get the requested URL
  const url = getRequestURL(event);
  const path = url.pathname;

  // Define patterns for sensitive data files
  const sensitivePatterns = [
    /-data\.json$/,       // Any file ending with -data.json
    /\/client-data\//,    // Anything in the client-data directory
    /\/core-sample-/      // Any core sample files
  ];

  // Check if the path matches any sensitive patterns
  const isSensitiveFile = sensitivePatterns.some(pattern => pattern.test(path));
  
  if (isSensitiveFile) {
    // Check for a valid auth token in headers
    const authHeader = getRequestHeader(event, 'Authorization');
    const validAuth = checkAuth(authHeader);
    
    if (!validAuth) {
      // No valid auth, respond with 401 (not authorized)
      event.res.statusCode = 401;
      return { error: 'Authentication required to access this file' };
    }
  }
  
  // Continue with the request if not sensitive or authorized
});

// Simple function to check for valid authentication
// In a real application, you would verify the token with your auth system
function checkAuth(authHeader) {
  if (!authHeader) return false;
  
  // Basic implementation - the client dashboards should set an auth header
  // with a token that matches what's stored in their local storage
  const token = authHeader.split(' ')[1]; // Get the token part of "Bearer TOKEN"
  
  // Return true if token exists and is of expected format 
  // (actual validation should be more robust)
  return !!token && token.length > 10;
}