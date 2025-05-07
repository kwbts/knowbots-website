import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';

// Create a function to get the Supabase client with runtime config
export function getSupabaseClient() {
  try {
    // Get config values from runtime config
    const config = useRuntimeConfig().public || {};
    
    // Get Supabase URL and anon key from runtime config
    const supabaseUrl = config.supabaseUrl || 'https://jwhqqlcpfpvswxmeqbbq.supabase.co';
    const supabaseAnonKey = config.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3aHFxbGNwZnB2c3d4bWVxYmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5OTQ1NjQsImV4cCI6MTk5OTU3MDU2NH0.A_iIbZOSsz9H8nFdPFfm_-QdcTYH3KDEfglEMHVPX8Q';
    
    console.log('Supabase initialization:', {
      url: supabaseUrl,
      keyAvailable: !!supabaseAnonKey,
      configKeys: Object.keys(config)
    });
    
    // Create and return the client if we have the required values
    if (supabaseUrl && supabaseAnonKey) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
    
    console.warn('Missing Supabase URL or key');
    return null;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

// For compatibility with existing code, export the function itself
export const supabase = getSupabaseClient();

// Function to fetch JSON directly from a signed URL
export async function fetchJsonFromSignedUrl(signedUrl) {
  console.log('Attempting to fetch from signed URL');
  
  if (!signedUrl) {
    console.error('No signed URL provided');
    return null;
  }
  
  try {
    // Log signed URL for debugging (don't do this in production)
    const urlStart = signedUrl.split('?')[0]; // Only log the URL part without the token
    console.log(`Signed URL (partial): ${urlStart}?[token-hidden]`);
    
    // Adding cache-busting query param to avoid CORS cached preflight issues
    const url = new URL(signedUrl);
    url.searchParams.append('_cb', Date.now());
    
    console.log('Fetching with CORS mode and headers');
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      mode: 'cors'
    });
    
    console.log(`Fetch response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully parsed JSON from signed URL');
    return data;
  } catch (err) {
    console.error('Error fetching JSON from signed URL:', err);
    console.error('Error details:', {
      message: err.message,
      name: err.name,
      cause: err.cause
    });
    return null;
  }
}

// Function to get file data from Supabase storage
export async function getFileFromStorage(bucket, filePath) {
  console.log(`Attempting to fetch file from Supabase storage: ${bucket}/${filePath}`);
  
  try {
    // Get a fresh Supabase client instance
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      console.warn('Supabase client not initialized. Skipping storage access.');
      return null;
    }
    
    console.log('Storage access: Got client, attempting to download');
    
    try {
      // First, check if the bucket exists and we have access
      const { data: buckets, error: bucketError } = await client.storage.listBuckets();
      
      if (bucketError) {
        console.error('Error listing buckets:', bucketError);
      } else {
        console.log('Available buckets:', buckets.map(b => b.name));
        const bucketExists = buckets.some(b => b.name === bucket);
        
        if (!bucketExists) {
          console.error(`Bucket "${bucket}" does not exist or is not accessible`);
        }
      }
    } catch (bucketCheckError) {
      console.error('Error checking buckets:', bucketCheckError);
    }
    
    // Try to download the file
    const { data, error } = await client
      .storage
      .from(bucket)
      .download(filePath);
      
    if (error) {
      console.error(`Storage download error (${bucket}/${filePath}):`, error);
      throw error;
    }
    
    console.log('Successfully downloaded file, parsing JSON');
    
    // Parse the JSON data
    const text = await data.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching from Supabase storage:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      cause: error.cause,
      stack: error.stack
    });
    return null;
  }
}

// Function to get a signed URL for a file
export async function getSignedUrl(bucket, filePath) {
  try {
    // Get a fresh Supabase client instance
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      console.warn('Supabase client not initialized. Skipping signed URL creation.');
      return null;
    }
    
    const { data, error } = await client
      .storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24); // 24 hours expiry
      
    if (error) throw error;
    
    return data?.signedUrl;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
}