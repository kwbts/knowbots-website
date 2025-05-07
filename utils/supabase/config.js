// Configuration for Supabase Storage

// The bucket name where the core sample file is stored
export const STORAGE_BUCKET = 'may-core-sample';

// The file name in the bucket
export const TARGET_FILE = 'core-sample-may-2025.json';

// Default signed URL should come from environment variables only
export const DEFAULT_SIGNED_URL = '';

// Bucket configuration
export const STORAGE_CONFIG = {
  bucket: STORAGE_BUCKET,
  filePath: TARGET_FILE,
  expirySeconds: 60 * 60 * 24, // 24 hours
  // No fallback URL - we want to see if Supabase fails
};