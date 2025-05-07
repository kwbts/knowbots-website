import { createError } from 'h3';
import fs from 'fs';
import path from 'path';

/**
 * Secure API endpoint to serve JSON data with proper access controls
 */
export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event);
  const { file, token } = query;
  
  // Check for required parameters
  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameter: file'
    });
  }
  
  // Validate the file parameter (basic security)
  if (!/^[a-zA-Z0-9_-]+\.json$/.test(file)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file parameter format'
    });
  }
  
  // Check for API token (simple verification)
  const apiToken = process.env.API_ACCESS_TOKEN || 'knowbots-default-token';
  if (token !== apiToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Invalid or missing access token'
    });
  }
  
  try {
    // First, try to get from private directory
    const privateDir = path.resolve(process.cwd(), '.data-private');
    const privatePath = path.resolve(privateDir, file);
    
    if (fs.existsSync(privatePath)) {
      const fileContent = fs.readFileSync(privatePath, 'utf8');
      return JSON.parse(fileContent);
    }
    
    // Fall back to public directory
    const publicPath = path.resolve(process.cwd(), 'public', file);
    
    if (fs.existsSync(publicPath)) {
      const fileContent = fs.readFileSync(publicPath, 'utf8');
      return JSON.parse(fileContent);
    }
    
    // File not found
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    });
  } catch (error) {
    console.error(`Error serving secure data (${file}):`, error);
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve data'
    });
  }
});