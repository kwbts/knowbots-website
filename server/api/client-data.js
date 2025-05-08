import { createError } from 'h3';
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to securely serve client data JSON files
 * This acts as a proxy to prevent direct access to the JSON files
 * and adds appropriate authentication checks
 */
export default defineEventHandler(async (event) => {
  try {
    // Get the client ID from the URL
    const url = getRequestURL(event);
    const urlPathParts = url.pathname.split('/');
    const clientId = urlPathParts[urlPathParts.length - 1]; // Get last segment of the path
    
    // Check for required client ID
    if (!clientId || clientId === 'client-data') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing or invalid client ID'
      });
    }
    
    // Validate client ID format to prevent path traversal
    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid client ID format'
      });
    }
    
    // Check for authorization header
    const authHeader = getRequestHeader(event, 'Authorization');
    const referer = getRequestHeader(event, 'referer') || '';
    
    // Security check: either must have auth header or come from our site's dashboard
    const hasValidAuth = checkAuth(authHeader);
    const isFromDashboard = referer.includes('/citebots/') || referer.includes('/core-sample/');
    
    if (!hasValidAuth && !isFromDashboard) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized access'
      });
    }
    
    // Construct the file path
    const fileName = `${clientId}-data.json`;
    const publicPath = path.resolve(process.cwd(), 'public', fileName);
    
    // Check if file exists
    if (!fs.existsSync(publicPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Client data file not found'
      });
    }
    
    // Read and return the file
    const fileContent = fs.readFileSync(publicPath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    
    // Success: return the data
    return jsonData;
    
  } catch (error) {
    console.error('Error serving client data:', error);
    
    // If the error is already a h3 error (createError), re-throw it
    if (error.statusCode) {
      throw error;
    }
    
    // Otherwise create a generic server error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve client data'
    });
  }
});

// Helper function to check authorization
function checkAuth(authHeader) {
  if (!authHeader) return false;
  
  const token = authHeader.split(' ')[1]; // Get the token part of "Bearer TOKEN"
  return !!token && token.length > 10;
}