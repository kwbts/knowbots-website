// utils/dataVerification.js

/**
 * Utility for verifying client data files and protecting sensitive information
 * Provides tools for data sanitization, obfuscation, and environment-aware logging
 */

// Check if we're in production environment
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// List of all client names
export const CLIENT_NAMES = [
  'Knak',
  'Bridgit',
  'Fidus',
  'MetaRouter',
  'Klipfolio',
  'Humans of Martech',
  'Treasure Data',
  'Cart.com',
  'Emmie Co'
];

/**
 * Convert a client name to a URL-friendly slug
 * @param {string} clientName - The client name to convert
 * @returns {string} The URL-friendly slug
 */
export const clientNameToSlug = (clientName) => {
  return clientName.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Check if a data file exists for a specific client
 * @param {string} clientName - The client name to check
 * @returns {Promise<boolean>} True if the file exists, false otherwise
 */
export const checkClientDataFile = async (clientName) => {
  const clientSlug = clientNameToSlug(clientName);
  // Add a timestamp to prevent caching in production
  const cacheBuster = isProduction() ? `?t=${Date.now()}` : '';
  const dataUrl = `/${clientSlug}-data.json${cacheBuster}`;
  
  try {
    const response = await fetch(dataUrl, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    if (!isProduction()) {
      console.error(`Error checking data file for ${clientName}:`, error);
    }
    return false;
  }
};

/**
 * Check all client data files and return their status
 * @returns {Promise<Array>} Array of objects with client names and file status
 */
export const checkAllClientDataFiles = async () => {
  const results = [];
  
  for (const clientName of CLIENT_NAMES) {
    const exists = await checkClientDataFile(clientName);
    results.push({
      clientName,
      slug: clientNameToSlug(clientName),
      fileExists: exists
    });
  }
  
  return results;
};

/**
 * Get data file path for a client
 * @param {string} clientName - The client name
 * @returns {string} The data file path
 */
export const getClientDataPath = (clientName) => {
  const clientSlug = clientNameToSlug(clientName);
  // Add cache-busting param in production
  const cacheBuster = isProduction() ? `?t=${Date.now()}` : '';
  return `/${clientSlug}-data.json${cacheBuster}`;
};

// Export client passwords for development use only - will be removed in production build
export const CLIENT_PASSWORDS = isProduction() ? 
  // In production, we don't expose actual passwords - use a mechanism that requires server-side verification
  {} :
  {
    'Knak': 'knak2024',
    'Bridgit': 'bridgit2024',
    'Fidus': 'fidus2024',
    'MetaRouter': 'metarouter2024',
    'Klipfolio': 'klipfolio2024',
    'Humans of Martech': 'hom2024',
    'Treasure Data': 'treasure2024',
    'Cart.com': 'cart2024',
    'Emmie Co': 'emmie2024'
  };

// Simple hashing function for consistent obfuscation
const hashString = (str) => {
  if (!str) return '';
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8);
};

/**
 * Obfuscate sensitive client information
 * @param {Object} data - The client data to obfuscate
 * @param {Object} options - Options for obfuscation
 * @returns {Object} The obfuscated data
 */
export const obfuscateClientData = (data, options = {}) => {
  // Don't obfuscate in development unless forced
  if (!isProduction() && !options.forceObfuscation) {
    return data;
  }

  if (!data) return data;
  
  const clonedData = JSON.parse(JSON.stringify(data));
  
  // Process client name if present
  if (clonedData.client_name) {
    // Keep first word but obfuscate the rest
    const nameParts = clonedData.client_name.split(' ');
    if (nameParts.length > 1) {
      clonedData.client_name = `${nameParts[0]} ${hashString(clonedData.client_name)}`;
    } else {
      // If just one word, preserve first 2 chars
      clonedData.client_name = `${clonedData.client_name.substring(0, 2)}...${hashString(clonedData.client_name)}`;
    }
  }
  
  // Obfuscate URLs and domains
  if (clonedData.domains && Array.isArray(clonedData.domains)) {
    clonedData.domains = clonedData.domains.map(domain => {
      return `${domain.split('.')[0]}.xxx.xxx`;
    });
  }
  
  // Obfuscate email addresses
  if (clonedData.email) {
    const emailParts = clonedData.email.split('@');
    if (emailParts.length === 2) {
      clonedData.email = `${emailParts[0].substring(0, 2)}...@xxx.xxx`;
    }
  }
  
  // Handle query data - obfuscate sensitive information
  if (clonedData.query_data && Array.isArray(clonedData.query_data)) {
    clonedData.query_data = clonedData.query_data.map(query => {
      // Clone query to avoid mutating original
      const processedQuery = { ...query };
      
      // Obfuscate brand names in text
      if (processedQuery.query_text) {
        // Keep the query but remove any brand names (assuming brands are capitalized)
        processedQuery.query_text = processedQuery.query_text
          .replace(/\b[A-Z][a-z]+ ?[A-Z][a-z]+\b/g, '[BRAND]') // Pattern for "Brand Name"
          .replace(/\b[A-Z][A-Z]+\b/g, '[BRAND]'); // Pattern for "BRAND" all caps
      }
      
      // Obfuscate URLs in associated pages
      if (processedQuery.associated_pages && Array.isArray(processedQuery.associated_pages)) {
        processedQuery.associated_pages = processedQuery.associated_pages.map(page => {
          const processedPage = { ...page };
          
          if (processedPage.citation_url) {
            const urlParts = processedPage.citation_url.split('/');
            if (urlParts.length > 2) {
              const domain = urlParts[2];
              const domainParts = domain.split('.');
              if (domainParts.length > 1) {
                const obfuscatedDomain = `${domainParts[0]}.xxx.xxx`;
                urlParts[2] = obfuscatedDomain;
                processedPage.citation_url = `${urlParts[0]}//${obfuscatedDomain}/[...]`;
              }
            }
          }
          
          // Obfuscate page titles that might contain client/brand names
          if (processedPage.page_title) {
            processedPage.page_title = processedPage.page_title
              .replace(/\b[A-Z][a-z]+ ?[A-Z][a-z]+\b/g, '[BRAND]')
              .replace(/\b[A-Z][A-Z]+\b/g, '[BRAND]');
          }
          
          return processedPage;
        });
      }
      
      return processedQuery;
    });
  }
  
  return clonedData;
};

/**
 * Safely log data without exposing sensitive information
 * @param {string} message - The message to log
 * @param {*} data - The data to log (will be sanitized in production)
 */
export const safeLog = (message, data) => {
  // In production, strip sensitive data, in development allow full logging
  if (isProduction()) {
    // If data is an object, sanitize it
    if (data && typeof data === 'object') {
      const safeData = obfuscateClientData(data, { forceObfuscation: true });
      console.log(message, safeData);
    } else {
      console.log(message);
    }
  } else {
    console.log(message, data);
  }
};

/**
 * Disable all console logs in production
 * @returns {Object} The original console object
 */
export const setupProductionSafety = () => {
  if (isProduction()) {
    const noop = () => {};
    
    // Store original console methods
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    };
    
    // Replace with no-op or sanitized versions
    console.log = noop;
    console.info = noop;
    console.warn = console.warn; // Keep warnings
    console.error = console.error; // Keep errors
    
    // Add safe logging method
    console.safeLog = (message, data) => safeLog(message, data);
    
    return originalConsole;
  }
  
  // In development, add safeLog but don't replace existing methods
  console.safeLog = (message, data) => safeLog(message, data);
  return console;
};