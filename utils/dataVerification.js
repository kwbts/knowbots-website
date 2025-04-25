// utils/dataVerification.js

/**
 * Utility for verifying client data files during development
 */

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
    const dataUrl = `/${clientSlug}-data.json`;
    
    try {
      const response = await fetch(dataUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error(`Error checking data file for ${clientName}:`, error);
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
    return `/${clientSlug}-data.json`;
  };
  
  // Export client passwords for development use only
  // In a production environment, these would be stored securely
  export const CLIENT_PASSWORDS = {
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