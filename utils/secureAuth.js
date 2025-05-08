// utils/secureAuth.js

/**
 * This utility file provides authentication and client management functions
 * for the CiteBots admin dashboard and client login
 */

// In a real application, this would be stored in a database
// For demo purposes, we're defining it here
const clients = [
  { 
    id: 'bridgit', 
    name: 'Bridgit',
    password: 'bridgit2025',
    dataPath: '/bridgit-data.json'
  },
  { 
    id: 'knak', 
    name: 'Knak', 
    password: 'knak2025',
    dataPath: '/knak-data.json'
  },
  { 
    id: 'metarouter', 
    name: 'MetaRouter',
    password: 'metarouter2025',
    dataPath: '/metarouter-data.json'
  },
  { 
    id: 'cart', 
    name: 'Cart.com',
    password: 'cart2025',
    dataPath: '/cart-data.json'
  },
  { 
    id: 'emmie-co', 
    name: 'Emmie Co',
    password: 'emmie2025',
    dataPath: '/emmie-co-data.json'
  },
  { 
    id: 'fidus', 
    name: 'Fidus',
    password: 'fidus2025',
    dataPath: '/fidus-data.json'
  },
  { 
    id: 'humans-of-martech', 
    name: 'Humans of Martech',
    password: 'humans2025',
    dataPath: '/humans-of-martech-data.json'
  },
  { 
    id: 'klipfolio', 
    name: 'Klipfolio',
    password: 'klipfolio2025',
    dataPath: '/klipfolio-data.json'
  },
  { 
    id: 'treasure-data', 
    name: 'Treasure Data',
    password: 'treasure2025',
    dataPath: '/treasure-data-data.json'
  },
  {
    id: 'admin',
    name: 'Admin',
    password: 'knowbots2025',
    dataPath: '/sample-data.json'
  }
];

// Admin name and password for the admin dashboard
const adminName = 'Admin';
const adminPassword = 'knowbots2025';

/**
 * Get all clients (excluding passwords)
 * @returns {Array} Array of client objects without passwords
 */
export function getAllClients() {
  return clients.map(client => ({
    id: client.id,
    name: client.name
  }));
}

/**
 * Get client by ID
 * @param {string} clientId - The client ID to look up
 * @returns {Object|null} Client object or null if not found
 */
export function getClientById(clientId) {
  const client = clients.find(c => c.id === clientId);
  
  if (!client) return null;
  
  // Return client without password
  return {
    id: client.id,
    name: client.name,
    dataPath: client.dataPath
  };
}

/**
 * Authenticate a client with name and password
 * @param {string} clientName - The client name
 * @param {string} password - The client password
 * @returns {Object} Authentication result
 */
export function authenticateClient(clientName, password) {
  // Find client by name (case insensitive)
  const client = clients.find(c => 
    c.name.toLowerCase() === clientName.trim().toLowerCase()
  );
  
  // If client not found, return error
  if (!client) {
    return {
      success: false,
      message: 'Client not found'
    };
  }
  
  // Check password
  if (client.password !== password) {
    return {
      success: false,
      message: 'Invalid password'
    };
  }
  
  // Authentication successful
  return {
    success: true,
    clientId: client.id,
    clientName: client.name
  };
}

/**
 * Authenticate admin with name and password
 * @param {string} name - The admin name
 * @param {string} password - The admin password
 * @returns {boolean} Whether authentication was successful
 */
export function authenticateAdmin(name, password) {
  return name === adminName && password === adminPassword;
}

/**
 * Check if the user is the admin
 * @param {string} clientName - The client name to check
 * @returns {boolean} Whether the client is the admin
 */
export function isAdmin(clientName) {
  return clientName === adminName;
}

/**
 * Generate a client token for authentication
 * @param {string} clientName - The client name
 * @returns {string} JWT-like token
 */
export function generateClientToken(clientName) {
  // In a real application, this would use a proper JWT library with encryption
  // For demonstration, we're using a simple base64 encoding
  
  const payload = {
    clientName,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours expiration
  };
  
  const encodedPayload = btoa(JSON.stringify(payload));
  return `citebot-${encodedPayload}`;
}

/**
 * Verify a client token
 * @param {string} token - The token to verify
 * @returns {Object} Verification result
 */
export function verifyClientToken(token) {
  try {
    // Check if token has the correct prefix
    if (!token.startsWith('citebot-')) {
      return { valid: false };
    }
    
    // Extract and decode payload
    const encodedPayload = token.substring(8); // Remove 'citebot-' prefix
    const payload = JSON.parse(atob(encodedPayload));
    
    // Check if token is expired
    if (payload.exp < Date.now()) {
      return { valid: false };
    }
    
    // Token is valid
    return {
      valid: true,
      clientName: payload.clientName
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { valid: false };
  }
}

/**
 * Generate an admin token for authentication
 * @returns {string} JWT-like token
 */
export function generateAdminToken() {
  // In a real application, this would use a proper JWT library with encryption
  
  const payload = {
    role: 'admin',
    exp: Date.now() + (12 * 60 * 60 * 1000) // 12 hours expiration
  };
  
  const encodedPayload = btoa(JSON.stringify(payload));
  return `citebot-admin-${encodedPayload}`;
}

/**
 * Verify an admin token
 * @param {string} token - The token to verify
 * @returns {boolean} Whether the token is valid
 */
export function verifyAdminToken(token) {
  try {
    // Check if token has the correct prefix
    if (!token.startsWith('citebot-admin-')) {
      return false;
    }
    
    // Extract and decode payload
    const encodedPayload = token.substring(14); // Remove 'citebot-admin-' prefix
    const payload = JSON.parse(atob(encodedPayload));
    
    // Check if token is expired
    if (payload.exp < Date.now()) {
      return false;
    }
    
    // Check if role is admin
    return payload.role === 'admin';
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return false;
  }
}

/**
 * Get data file path for a client
 * @param {string} clientName - The client name
 * @returns {string} Path to client data file
 */
export function getClientDataPath(clientName) {
  // Import here to avoid circular dependency - using dynamic import to prevent issues
  let isProduction;
  try {
    isProduction = process.env.NODE_ENV === 'production';
  } catch(e) {
    // Fallback if process is not available
    isProduction = false;
  }
  
  // Find client by name (case insensitive)
  const client = clients.find(c => 
    c.name.toLowerCase() === clientName.trim().toLowerCase()
  );
  
  // If client not found, return a default data path
  if (!client) {
    return '/data/default-data.json';
  }
  
  // Import here to avoid circular dependency
  let isProduction;
  try {
    isProduction = process.env.NODE_ENV === 'production';
  } catch(e) {
    // Fallback if process is not available (client-side)
    isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  }

  // Add a timestamp query parameter to prevent caching
  const timestamp = Date.now();
  
  // In production, use the API endpoint for enhanced security
  if (isProduction) {
    return `/api/client-data/${client.id}?t=${timestamp}`;
  }
  
  // In development, use direct file access for easier debugging
  return `${client.dataPath}?t=${timestamp}`;
}

/**
 * Add authorization headers to fetch requests for client data
 * @param {Object} options - The fetch options
 * @returns {Object} The updated fetch options with auth headers
 */
export function addAuthHeaders(options = {}) {
  // Get the token from localStorage
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('citebot-token') : null;
  
  if (!token) return options;
  
  // Create a new options object
  const newOptions = { ...options };
  
  // Add the headers if they don't exist
  if (!newOptions.headers) {
    newOptions.headers = {};
  }
  
  // Add the Authorization header
  newOptions.headers.Authorization = `Bearer ${token}`;
  
  return newOptions;
}