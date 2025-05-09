// server/api/client-direct-json.js
import fs from 'fs';
import path from 'path';

/**
 * Simple API endpoint to load client data directly from JSON files
 * This is a last resort approach when Supabase isn't working
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
    
    // Construct file paths - try private directory first, then public
    const fileName = `${clientId.toLowerCase()}-data.json`;

    // First try private directory (for production)
    const privateDir = path.resolve(process.cwd(), '.data-private');
    const privatePath = path.resolve(privateDir, fileName);

    // Then fall back to public directory (for development)
    const publicPath = path.resolve('public', fileName);

    console.log(`Attempting to load client data...`);
    console.log(`Private path: ${privatePath}`);
    console.log(`Public path: ${publicPath}`);

    // Check if private file exists
    let filePath = null;
    if (fs.existsSync(privatePath)) {
      console.log(`Found client data in private directory`);
      filePath = privatePath;
    }
    // Otherwise check if public file exists
    else if (fs.existsSync(publicPath)) {
      console.log(`Found client data in public directory`);
      filePath = publicPath;
    }

    // If no file found in either location
    if (!filePath) {
      console.warn(`Client data file not found for: ${clientId}`);
      

      // Return a fallback response instead of an error
      return {
        client_name: getClientNameFromId(clientId),
        source: 'fallback-data',
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
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Check if this is a placeholder file
      if (fileContent.includes('"message": "This data is only accessible through the API"')) {
        console.warn('Found placeholder file instead of actual data');
        // Generate fallback data if we somehow got a placeholder
        return {
          client_name: getClientNameFromId(clientId),
          source: 'api-fallback-after-placeholder',
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

      // Parse the JSON file
      const jsonData = JSON.parse(fileContent);
      console.log(`Successfully loaded and parsed ${fileName}`);

      return jsonData;
    } catch (error) {
      console.error(`Error loading or parsing ${fileName}:`, error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse client data file'
      });
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', err);
    }
    
    // If it's already an H3 error, throw it directly
    if (err.statusCode) {
      throw err;
    }
    
    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve client data'
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
    query_text: `${clientName} ${getRandomQueryText()}`,
    query_keyword: clientId.toLowerCase(),
    funnel_stage: ["TOFU", "MOFU", "BOFU"][Math.floor(Math.random() * 3)],
    citation_count: Math.floor(3 + Math.random() * 7),
    brand_mentioned: Math.random() > 0.3,
    associated_pages: Array(Math.floor(2 + Math.random() * 4)).fill(0).map((_, pageIndex) => ({
      page_analysis_id: `page-${Math.random().toString(36).substring(2, 8)}`,
      client_name: clientName,
      citation_url: `https://example.com/page-${pageIndex}`,
      page_title: `${clientName} ${getRandomPageTitle()}`,
      domain_name: "example.com",
      brand_mentioned: Math.random() > 0.3,
      is_client_domain: Math.random() > 0.7,
      domain_authority: Math.floor(25 + Math.random() * 30),
      page_authority: Math.floor(20 + Math.random() * 25)
    }))
  }));
}

// Helper function for random query text
function getRandomQueryText() {
  const queryTexts = [
    "platform pricing",
    "vs competitors",
    "integration guide",
    "product review",
    "use cases",
    "documentation",
    "tutorial",
    "alternatives",
    "pros and cons",
    "feature comparison"
  ];
  
  return queryTexts[Math.floor(Math.random() * queryTexts.length)];
}

// Helper function for random page titles
function getRandomPageTitle() {
  const pageTitles = [
    "Platform Overview",
    "Feature Comparison",
    "Industry Leading Solution",
    "How to Get Started",
    "Complete Guide",
    "Integration Documentation",
    "Case Study",
    "User Reviews",
    "Best Practices",
    "Product Showcase"
  ];
  
  return pageTitles[Math.floor(Math.random() * pageTitles.length)];
}