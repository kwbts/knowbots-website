// Configuration for Supabase Storage for client dashboards

// Export client configuration by client ID
export const CLIENT_STORAGE_CONFIG = {
  // This maps client IDs to their storage configuration
  'knak': {
    bucket: 'may-core-sample',
    filePath: 'clients/knak-data.json',
    expirySeconds: 60 * 60 * 24, // 24 hours
  },
  'bridgit': {
    bucket: 'may-core-sample',
    filePath: 'clients/bridgit-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'metarouter': {
    bucket: 'may-core-sample',
    filePath: 'clients/metarouter-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'fidus': {
    bucket: 'may-core-sample',
    filePath: 'clients/fidus-data.json',
    expirySeconds: 60 * 60 * 24,
  }, 
  'klipfolio': {
    bucket: 'may-core-sample',
    filePath: 'clients/klipfolio-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'humans-of-martech': {
    bucket: 'may-core-sample',
    filePath: 'clients/humans-of-martech-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'treasure-data': {
    bucket: 'may-core-sample',
    filePath: 'clients/treasure-data-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'cart': {
    bucket: 'may-core-sample',
    filePath: 'clients/cart-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'emmie-co': {
    bucket: 'may-core-sample',
    filePath: 'clients/emmie-co-data.json',
    expirySeconds: 60 * 60 * 24,
  },
  'admin': {
    bucket: 'may-core-sample',
    filePath: 'core-sample-may-2025.json', // Admin gets access to full report
    expirySeconds: 60 * 60 * 24,
  }
};

// Function to get client storage config
export function getClientStorageConfig(clientId) {
  // Default to admin config if client ID not found
  return CLIENT_STORAGE_CONFIG[clientId] || CLIENT_STORAGE_CONFIG['admin'];
}