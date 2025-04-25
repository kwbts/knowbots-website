// data/data-processor.js

/**
 * Processes the raw client data into a consistent format needed by the dashboard
 * @param {Object} rawData - The raw client data from the API or JSON file
 * @returns {Object} - The processed data in the format needed by the dashboard
 */
export function processClientData(rawData) {
  // If data doesn't have the expected structure, initialize it
  if (!rawData) {
    return {
      client_name: '',
      query_data: [],
      client_summary: {
        total_queries: 0,
        total_pages: 0,
        average_citation_count: 0,
        brand_mention_rate: 0,
        average_page_speed: 0,
        average_domain_authority: 0
      }
    };
  }
  
  // Ensure client name is present
  const clientName = rawData.client_name || '';
  
  // Process query data
  let queryData = [];
  if (Array.isArray(rawData.query_data)) {
    // Process each query and ensure all required fields are present
    queryData = rawData.query_data.map(query => {
      // Make sure query has all required fields
      return {
        query_id: query.query_id || '',
        query_text: query.query_text || '',
        query_keyword: query.query_keyword || '',
        funnel_stage: query.funnel_stage || 'TOFU', // Default to TOFU if not specified
        citation_count: query.citation_count || 0,
        brand_mentioned: query.brand_mentioned === true,
        query_metrics: processQueryMetrics(query.query_metrics || query), // Use query itself if query_metrics not present
        associated_pages: processAssociatedPages(query.associated_pages || [])
      };
    });
  }
  
  // Process client summary
  let summary = rawData.client_summary || {};
  
  // If client summary is missing or incomplete, calculate it from query data
  if (!summary.total_queries || !summary.brand_mention_rate) {
    summary = calculateClientSummary(queryData, summary);
  }
  
  return {
    client_name: clientName,
    query_data: queryData,
    client_summary: summary
  };
}

/**
 * Process query metrics to ensure consistent structure
 * @param {Object} metrics - The raw query metrics
 * @returns {Object} - Processed query metrics
 */
function processQueryMetrics(metrics) {
  // Ensure all properties exist with defaults
  return {
    query_id: metrics.query_id || '',
    query_text: metrics.query_text || '',
    query_keyword: metrics.query_keyword || '',
    query_category: metrics.query_category || 'Informational',
    query_topic: metrics.query_topic || null,
    query_complexity: metrics.query_complexity || 'Moderate',
    run_timestamp: metrics.run_timestamp || new Date().toISOString(),
    perplexity_response: metrics.perplexity_response || null,
    citation_count: metrics.citation_count || 0,
    brand_mentioned: metrics.brand_mentioned === true,
    competitor_mentioned: metrics.competitor_mentioned === true,
    client_name: metrics.client_name || '',
    funnel_stage: metrics.funnel_stage || 'TOFU',
    data_source: metrics.data_source || determineDataSource(metrics.query_id || ''),
    competitor_mentioned_name: metrics.competitor_mentioned_name || null
  };
}

/**
 * Process associated pages to ensure consistent structure
 * @param {Array} pages - The raw associated pages data
 * @returns {Array} - Processed associated pages
 */
function processAssociatedPages(pages) {
  if (!Array.isArray(pages)) return [];
  
  return pages.map(page => {
    return {
      // Basic page identification
      page_analysis_id: page.page_analysis_id || generatePageId(page),
      query_id: page.query_id || '',
      citation_url: page.citation_url || '',
      
      // Content quality metrics
      citation_match_quality: page.citation_match_quality || 0,
      content_optimization_score: page.content_optimization_score || 0,
      content_uniqueness: page.content_uniqueness || 0,
      content_depth_score: page.content_depth_score || 0,
      readability_score: page.readability_score || 0,
      
      // Content structure metrics
      has_ordered_list_count: page.has_ordered_list_count || 0,
      has_unordered_list_count: page.has_unordered_list_count || 0,
      has_table_count: page.has_table_count || 0,
      has_table: page.has_table === true,
      image_count: page.image_count || 0,
      word_count: page.word_count || 0,
      
      // Technical metrics
      schema_markup_present: page.schema_markup_present === true,
      semantic_html_usage: page.semantic_html_usage === true,
      
      // Analysis notes
      analysis_notes: page.analysis_notes || ''
    };
  });
}

/**
 * Calculate client summary from query data
 * @param {Array} queryData - The processed query data
 * @param {Object} existingSummary - Any existing summary data
 * @returns {Object} - Complete client summary
 */
function calculateClientSummary(queryData, existingSummary = {}) {
  const totalQueries = queryData.length;
  
  // Count total pages across all queries
  const totalPages = queryData.reduce((sum, query) => 
    sum + (query.associated_pages ? query.associated_pages.length : 0), 0);
  
  // Calculate average citation count
  const totalCitations = queryData.reduce((sum, query) => 
    sum + (query.citation_count || 0), 0);
  const avgCitationCount = totalQueries > 0 ? totalCitations / totalQueries : 0;
  
  // Calculate brand mention rate
  const brandMentionCount = queryData.filter(query => query.brand_mentioned === true).length;
  const brandMentionRate = totalQueries > 0 ? brandMentionCount / totalQueries : 0;
  
  // Return complete summary
  return {
    total_queries: totalQueries,
    total_pages: totalPages,
    average_citation_count: avgCitationCount,
    brand_mention_rate: brandMentionRate,
    average_page_speed: existingSummary.average_page_speed || 0,
    average_domain_authority: existingSummary.average_domain_authority || 0
  };
}

/**
 * Determine data source from query ID
 * @param {string} queryId - The query ID
 * @returns {string} - The data source (perplexity or chatgpt)
 */
function determineDataSource(queryId) {
  if (queryId.toLowerCase().includes('perplexity')) {
    return 'perplexity';
  } else if (queryId.toLowerCase().includes('chatgpt')) {
    return 'chatgpt';
  }
  return 'unknown';
}

/**
 * Generate a unique ID for a page if none exists
 * @param {Object} page - The page data
 * @returns {string} - A generated ID
 */
function generatePageId(page) {
  // Create a unique ID based on query ID and URL if available
  if (page.query_id && page.citation_url) {
    return `${page.query_id}-${btoa(page.citation_url).slice(0, 10)}`;
  }
  // Fallback to a random ID with timestamp
  return `page-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * Load client data from a JSON string
 * @param {string} jsonString - The JSON string containing client data
 * @returns {Object} - The processed client data
 */
export function loadClientData(jsonString) {
  try {
    const rawData = JSON.parse(jsonString);
    return processClientData(rawData);
  } catch (error) {
    console.error('Failed to parse client data:', error);
    return processClientData(null);
  }
}

/**
 * Save client data to a JSON string
 * @param {Object} clientData - The client data to save
 * @returns {string} - The JSON string
 */
export function saveClientData(clientData) {
  try {
    return JSON.stringify(clientData, null, 2);
  } catch (error) {
    console.error('Failed to stringify client data:', error);
    return '{}';
  }
}