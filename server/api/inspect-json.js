// server/api/inspect-json.js
// A simple API endpoint to inspect actual JSON files for debugging

import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Get the client ID from query parameters
    const query = getQuery(event);
    const clientId = query.clientId;
    
    // Check for required client ID
    if (!clientId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required parameter: clientId'
      });
    }
    
    // Basic validation
    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      throw createError({
        statusCode: 400, 
        statusMessage: 'Invalid client ID format'
      });
    }
    
    // Construct file path
    const fileName = `${clientId.toLowerCase()}-data.json`;
    const filePath = path.resolve('public', fileName);
    
    // Check if file exists and get stats
    let fileInfo = {};
    try {
      const stats = fs.statSync(filePath);
      fileInfo = {
        exists: true,
        size: stats.size,
        isFile: stats.isFile(),
        modified: stats.mtime
      };
    } catch (err) {
      fileInfo = {
        exists: false,
        error: 'File not found'
      };
    }
    
    // Read the first 1000 characters of the file if it exists
    let filePreview = null;
    if (fileInfo.exists && fileInfo.isFile) {
      try {
        const buffer = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        filePreview = buffer.substring(0, 1000) + (buffer.length > 1000 ? '...' : '');
      } catch (err) {
        filePreview = `Error reading file: ${err.message}`;
      }
    }
    
    // Get a list of all JSON files in the public directory
    const publicDir = path.resolve('public');
    let jsonFiles = [];
    try {
      const files = fs.readdirSync(publicDir);
      jsonFiles = files.filter(file => file.endsWith('.json')).map(file => ({
        name: file,
        size: fs.statSync(path.join(publicDir, file)).size
      }));
    } catch (err) {
      jsonFiles = [`Error reading directory: ${err.message}`];
    }
    
    // Return combined information
    return {
      requestedFile: fileName,
      fileInfo,
      filePreview,
      availableJsonFiles: jsonFiles,
      publicDirectory: publicDir
    };
  } catch (err) {
    // If it's already an H3 error, throw it directly
    if (err.statusCode) {
      throw err;
    }
    
    // Otherwise create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to inspect JSON: ${err.message}`
    });
  }
});