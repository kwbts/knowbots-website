// Supabase Error Handler Utility

/**
 * Handles and normalizes errors from Supabase operations
 * 
 * @param {Error} error - The error object from Supabase
 * @param {string} operation - Description of the operation that failed
 * @param {boolean} isProduction - Whether the app is running in production mode
 * @returns {string} Normalized error message for display
 */
export function handleSupabaseError(error, operation = 'data access', isProduction = false) {
  // Only log detailed errors in development
  if (!isProduction) {
    console.error(`Supabase ${operation} error:`, error);
  }

  // Handle different error types
  if (error?.message?.includes('Failed to fetch')) {
    return 'Unable to connect to data source. Please check your network connection and try again.';
  }

  if (error?.message?.includes('401')) {
    return 'Authentication error. Please refresh the page or try again later.';
  }

  if (error?.message?.includes('403')) {
    return 'You do not have permission to access this content.';
  }

  if (error?.message?.includes('404')) {
    return 'The requested report data could not be found.';
  }

  if (error?.message?.includes('timeout')) {
    return 'The data request timed out. Please try again later.';
  }

  if (error?.message?.includes('JSON')) {
    return 'Error parsing the report data. Please contact support.';
  }

  // Return a generic message for production to avoid leaking sensitive info
  if (isProduction) {
    return 'An error occurred while accessing the report data. Please try again later.';
  }

  // In development, return the actual error message
  return error?.message || 'Unknown error occurred';
}

/**
 * Attempt to retrieve data using multiple methods with fallback
 * 
 * @param {Array} retrievalMethods - Array of async functions to try in order
 * @param {string} operationName - Name of the operation for error reporting
 * @param {boolean} isProduction - Whether app is in production mode
 * @returns {Object} Result object with data and/or error
 */
export async function tryMultipleRetrievalMethods(retrievalMethods, operationName = 'data retrieval', isProduction = false) {
  let lastError = null;
  
  for (const method of retrievalMethods) {
    try {
      const data = await method();
      if (data) {
        return { data, error: null };
      }
    } catch (error) {
      lastError = error;
      // Continue to next method if current one fails
    }
  }

  // If all methods failed, handle the last error
  const errorMessage = handleSupabaseError(lastError, operationName, isProduction);
  return { data: null, error: errorMessage };
}

/**
 * Sanitize sensitive information from report data
 * 
 * @param {Object} rawData - The raw data from Supabase
 * @returns {Object} Sanitized data safe for client display
 */
export function sanitizeReportData(rawData) {
  if (!rawData) return {};
  
  // Create a deep copy to avoid mutating the original
  const sanitizedData = JSON.parse(JSON.stringify(rawData));
  
  // Sanitize domain information
  if (sanitizedData.domains) {
    sanitizedData.domains = sanitizedData.domains.map(domain => {
      // Only show the domain name, not the full URL
      return domain.split('/')[0];
    });
  }
  
  // Remove any developer comments/notes
  if (sanitizedData.developer_notes) {
    delete sanitizedData.developer_notes;
  }
  
  // Hide exact query counts if they're too specific
  if (sanitizedData.total_queries && sanitizedData.total_queries < 10) {
    // Round up to nearest 10 to avoid revealing exact numbers
    sanitizedData.total_queries = Math.ceil(sanitizedData.total_queries / 10) * 10;
  }
  
  // Remove any internal IDs or keys
  if (sanitizedData.api_keys) {
    delete sanitizedData.api_keys;
  }
  
  // Remove any client-specific identifiers
  if (sanitizedData.clients) {
    sanitizedData.clients = sanitizedData.clients.map(client => {
      // Remove client IDs or other specific identifiers
      const { client_id, client_apikey, ...safeClientData } = client;
      return safeClientData;
    });
  }

  return sanitizedData;
}