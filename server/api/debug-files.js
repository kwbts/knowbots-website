// server/api/debug-files.js
// A diagnostic API to inspect file availability in production

import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  // Create a comprehensive diagnostics report
  const diagnostics = {
    environment: process.env.NODE_ENV || 'unknown',
    serverInfo: {
      platform: process.platform,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    },
    filesInfo: {},
    directories: {},
    requestInfo: {
      url: getRequestURL(event).toString(),
      headers: Object.fromEntries(
        Object.entries(getRequestHeaders(event) || {})
          .filter(([key]) => !['cookie', 'authorization'].includes(key.toLowerCase()))
      )
    }
  };

  // Check specific client data files
  const clientIds = ['knak', 'bridgit', 'metarouter', 'fidus', 'cart', 'emmie-co', 'treasure-data'];
  
  diagnostics.filesInfo.clientDataFiles = clientIds.map(clientId => {
    const fileName = `${clientId}-data.json`;
    const filePath = path.resolve('public', fileName);
    
    try {
      const stats = fs.statSync(filePath);
      return {
        clientId,
        fileName,
        exists: true,
        size: stats.size,
        lastModified: stats.mtime,
        isAccessible: true
      };
    } catch (error) {
      return {
        clientId,
        fileName,
        exists: false,
        error: error.code,
        isAccessible: false
      };
    }
  });

  // Check key directories
  const directories = ['public', 'dist', '.output'];
  diagnostics.directories = directories.reduce((acc, dir) => {
    const dirPath = path.resolve(dir);
    
    try {
      const exists = fs.existsSync(dirPath);
      const stats = exists ? fs.statSync(dirPath) : null;
      
      let contents = [];
      if (exists && stats.isDirectory()) {
        try {
          contents = fs.readdirSync(dirPath)
            .filter(item => !item.startsWith('.')) // Filter out hidden files
            .slice(0, 20); // Limit to first 20 items
        } catch (e) {
          contents = [`Error reading directory: ${e.message}`];
        }
      }
      
      acc[dir] = {
        exists,
        isDirectory: stats ? stats.isDirectory() : false,
        contents
      };
    } catch (error) {
      acc[dir] = {
        exists: false,
        error: error.message
      };
    }
    
    return acc;
  }, {});

  // Try to fetch a JSON file directly
  const testFile = 'knak-data.json';
  const testPath = path.resolve('public', testFile);
  
  try {
    // Check if file exists first
    if (fs.existsSync(testPath)) {
      // Get file info
      const stats = fs.statSync(testPath);
      
      // Try to read the first 100 characters of the file
      let filePreview = '';
      if (stats.isFile() && stats.size > 0) {
        const buffer = Buffer.alloc(Math.min(100, stats.size));
        const fd = fs.openSync(testPath, 'r');
        fs.readSync(fd, buffer, 0, buffer.length, 0);
        fs.closeSync(fd);
        filePreview = buffer.toString('utf8');
      }
      
      diagnostics.filesInfo.testFileRead = {
        fileName: testFile,
        exists: true,
        size: stats.size,
        preview: filePreview.length > 0 ? `${filePreview}...` : '(empty file)'
      };
    } else {
      diagnostics.filesInfo.testFileRead = {
        fileName: testFile,
        exists: false,
        error: 'File not found'
      };
    }
  } catch (error) {
    diagnostics.filesInfo.testFileRead = {
      fileName: testFile,
      error: error.message
    };
  }

  // Add environment variables (excluding sensitive ones)
  diagnostics.environmentVariables = Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => !key.match(/token|key|secret|password|auth/i))
      .map(([key, value]) => [key, typeof value === 'string' ? value.substring(0, 20) : value])
  );

  // Return the diagnostic information
  return diagnostics;
});