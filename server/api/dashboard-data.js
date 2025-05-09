// server/api/dashboard-data.js
import fs from 'fs';
import path from 'path';

/**
 * Special API endpoint for dashboard data that forces direct access
 * to the JSON files in the public directory
 */
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
    
    // Basic validation to prevent path traversal
    if (!/^[a-zA-Z0-9_-]+$/.test(clientId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid client ID format'
      });
    }
    
    console.log(`Dashboard data API request for client: ${clientId}`);
    
    // Construct file path - force absolute path resolution
    const fileName = `${clientId.toLowerCase()}-data.json`;
    const filePath = path.resolve(process.cwd(), 'public', fileName);
    
    console.log(`Trying to load data from: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Client data file not found: ${filePath}`);
      
      // Return a fallback response with detailed error info
      return {
        client_name: getClientNameFromId(clientId),
        source: 'fallback-dashboard-api',
        error_info: {
          message: 'File not found',
          file_path: filePath,
          cwd: process.cwd(),
          node_env: process.env.NODE_ENV,
          files_in_public: fs.existsSync(path.resolve(process.cwd(), 'public')) 
            ? fs.readdirSync(path.resolve(process.cwd(), 'public'))
                .filter(f => f.endsWith('.json'))
            : []
        },
        query_data: generateFallbackQueryData(clientId),
        client_summary: {
          total_queries: 200 + Math.floor(Math.random() * 300),
          total_pages: 800 + Math.floor(Math.random() * 500),
          average_citation_count: 5 + (Math.random() * 5),
          brand_mention_rate: 0.6 + (Math.random() * 0.3),
          average_page_speed: 70 + (Math.random() * 20),
          average_domain_authority: 30 + (Math.random() * 15)
        }
      };
    }
    
    // Read and parse the file
    try {
      console.log(`Reading file: ${filePath}`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      console.log(`Successfully read ${fileName} (${fileContent.length} bytes)`);
      
      try {
        const jsonData = JSON.parse(fileContent);
        console.log(`Successfully parsed ${fileName}`);
        
        // Add some metadata to help debugging
        jsonData._meta = {
          file_path: filePath,
          file_size: fileContent.length,
          timestamp: new Date().toISOString(),
          source: 'server-direct-file',
          env: process.env.NODE_ENV
        };
        
        return jsonData;
      } catch (parseError) {
        console.error(`Error parsing ${fileName}:`, parseError);
        
        // Return raw file content for debugging
        return {
          error: 'JSON Parse Error',
          message: parseError.message,
          raw_content_sample: fileContent.substring(0, 500) + '...',
          file_path: filePath,
          file_size: fileContent.length
        };
      }
    } catch (fileError) {
      console.error(`Error reading ${fileName}:`, fileError);
      
      // Return detailed error for debugging
      return {
        error: 'File Read Error',
        message: fileError.message,
        file_path: filePath,
        env: process.env.NODE_ENV,
        file_stats: fs.existsSync(filePath) ? fs.statSync(filePath) : 'File does not exist'
      };
    }
  } catch (err) {
    console.error('Dashboard API error:', err);
    
    // If it's already an H3 error, throw it directly
    if (err.statusCode) {
      throw err;
    }
    
    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve dashboard data',
      data: {
        error_message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
    });
  }
});

// Helper function to get client name from ID
function getClientNameFromId(clientId) {
  const clientMap = {
    'knak': 'Knak',
    'bridgit': 'Bridgit',
    'fidus': 'Fidus',
    'metarouter': 'MetaRouter',
    'klipfolio': 'Klipfolio',
    'humans-of-martech': 'Humans of Martech',
    'treasure-data': 'Treasure Data',
    'cart': 'Cart.com',
    'emmie-co': 'Emmie Co',
    'admin': 'Admin Sample'
  };
  
  return clientMap[clientId.toLowerCase()] || clientId;
}

// Generate fallback query data for when no file exists
function generateFallbackQueryData(clientId) {
  const clientName = getClientNameFromId(clientId);
  
  // Create sample queries
  return Array(10).fill(0).map((_, index) => ({
    query_id: `${clientId}-query-${index}`,
    query_text: `${clientName} sample query ${index + 1}`,
    query_keyword: clientId.toLowerCase(),
    funnel_stage: ["TOFU", "MOFU", "BOFU"][Math.floor(Math.random() * 3)],
    citation_count: Math.floor(3 + Math.random() * 7),
    brand_mentioned: Math.random() > 0.3,
    associated_pages: Array(Math.floor(2 + Math.random() * 4)).fill(0).map((_, pageIndex) => ({
      page_analysis_id: `page-${Math.random().toString(36).substring(2, 8)}`,
      client_name: clientName,
      citation_url: `https://example.com/page-${pageIndex}`,
      page_title: `${clientName} Sample Page ${pageIndex + 1}`,
      domain_name: "example.com",
      brand_mentioned: Math.random() > 0.3,
      is_client_domain: Math.random() > 0.7,
      domain_authority: Math.floor(25 + Math.random() * 30),
      page_authority: Math.floor(20 + Math.random() * 25)
    }))
  }));
}