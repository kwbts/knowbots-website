// server/api/data-access-test.js
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to test data accessibility from the server-side
 */
export default defineEventHandler(async (event) => {
  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    tests: [],
    publicDirExists: false,
    publicDirContents: [],
    serverInfo: {
      platform: process.platform,
      nodeVersion: process.version,
      uptime: process.uptime(),
      pid: process.pid
    }
  };
  
  // Check if public directory exists
  try {
    const publicDir = path.resolve('public');
    const publicDirExists = fs.existsSync(publicDir);
    results.publicDirExists = publicDirExists;
    
    if (publicDirExists) {
      // List directory contents
      const files = fs.readdirSync(publicDir);
      results.publicDirContents = files.filter(file => file.endsWith('.json')).map(file => ({
        name: file,
        type: 'file',
        size: fs.statSync(path.join(publicDir, file)).size
      }));
    }
  } catch (err) {
    results.publicDirError = err.message;
  }
  
  // Test file accessibility for all clients
  const clients = [
    'knak', 'bridgit', 'fidus', 'metarouter', 'klipfolio', 
    'humans-of-martech', 'treasure-data', 'cart', 'emmie-co', 'admin'
  ];
  
  for (const clientId of clients) {
    const testResult = {
      clientId,
      fileName: `${clientId}-data.json`,
      fileExists: false,
      fileSize: 0,
      fileReadable: false,
      sampleData: null,
      error: null
    };
    
    try {
      // Check if file exists
      const filePath = path.resolve('public', `${clientId}-data.json`);
      testResult.fileExists = fs.existsSync(filePath);
      
      if (testResult.fileExists) {
        // Get file stats
        const stats = fs.statSync(filePath);
        testResult.fileSize = stats.size;
        
        // Try to read the file
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          testResult.fileReadable = true;
          
          // Try to parse as JSON
          try {
            const jsonData = JSON.parse(fileContent);
            // Only include a small sample of the data to avoid huge responses
            testResult.sampleData = {
              client_name: jsonData.client_name,
              query_count: jsonData.query_data?.length || 0,
              has_summary: !!jsonData.client_summary
            };
          } catch (parseError) {
            testResult.error = `JSON parse error: ${parseError.message}`;
          }
        } catch (readError) {
          testResult.error = `File read error: ${readError.message}`;
        }
      }
    } catch (accessError) {
      testResult.error = `File access error: ${accessError.message}`;
    }
    
    results.tests.push(testResult);
  }
  
  return results;
});