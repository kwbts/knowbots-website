import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';

// Create a dedicated global variable for the Supabase client
// We'll assign this in browser context and reuse it to prevent multiple instances
let supabaseClientInstance = null;

/**
 * Creates and returns a Supabase client singleton
 * This implementation ensures only one GoTrueClient exists in browser context
 */
export function getSupabaseClient() {
  // SERVER SIDE: Always create a fresh instance on the server
  if (process.server) {
    try {
      const config = useRuntimeConfig();
      const supabaseUrl = config.supabaseUrl;
      const supabaseKey = config.supabaseServiceKey;

      if (!supabaseUrl || !supabaseKey) {
        // During prerendering, it's okay to return null without failing
        if (process.env.NITRO_PRERENDER) {
          return null;
        }
        
        // For regular SSR, create a mock client or return null safely
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: { message: 'Prerendering mode' } }),
              createSignedUrl: async () => ({ data: null, error: { message: 'Prerendering mode' } })
            })
          }
        };
      }

      // Create server-side client
      return createClient(supabaseUrl, supabaseKey);
    } catch (error) {
      // During prerendering, we need to handle errors gracefully
      if (process.env.NITRO_PRERENDER) {
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: { message: 'Prerendering mode' } }),
              createSignedUrl: async () => ({ data: null, error: { message: 'Prerendering mode' } })
            })
          }
        };
      }
      return null;
    }
  }
  
  // CLIENT SIDE: Ensure we reuse the same instance
  if (typeof window !== 'undefined') {
    // If we already have an instance, return it
    if (supabaseClientInstance) {
      return supabaseClientInstance;
    }
    
    try {
      // Get runtime config
      const config = useRuntimeConfig();
      
      // Get values for client side
      const supabaseUrl = config.public.supabaseUrl;
      const supabaseKey = config.public.supabaseKey;
      
      if (!supabaseUrl || !supabaseKey) {
        return null;
      }
      
      // Create a single client-side instance with a unique storage key
      supabaseClientInstance = createClient(supabaseUrl, supabaseKey, {
        auth: {
          storageKey: 'knowbots_app_auth_token',
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false
        },
        global: {
          headers: {
            'x-application-name': 'knowbots-website'
          }
        }
      });
      
      return supabaseClientInstance;
    } catch (error) {
      return null;
    }
  }
  
  return null;
}

// We no longer initialize the client at the module level
// Instead we'll use the function in components

// Function to fetch JSON directly from a signed URL
export async function fetchJsonFromSignedUrl(signedUrl) {
  if (!signedUrl) {
    return null;
  }
  
  try {
    // Adding cache-busting query param to avoid CORS cached preflight issues
    const url = new URL(signedUrl);
    url.searchParams.append('_cb', Date.now());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}

/**
 * Get file data from Supabase storage with minimal logging
 * This function should be called within a Vue setup function or lifecycle hook
 */
export async function getFileFromStorage(bucket, filePath) {
  try {
    // Get Supabase client using our singleton pattern
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      return null;
    }
    
    // Try to download the file
    const { data, error } = await client
      .storage
      .from(bucket)
      .download(filePath);
      
    if (error) {
      throw error;
    }
    
    // Parse the JSON data
    const text = await data.text();
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

/**
 * Get a signed URL for a file with minimal logging
 * This function should be called within a Vue setup function or lifecycle hook
 */
export async function getSignedUrl(bucket, filePath) {
  try {
    // Get Supabase client using our singleton pattern
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      return null;
    }
    
    const { data, error } = await client
      .storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24); // 24 hours expiry
      
    if (error) throw error;
    
    return data?.signedUrl;
  } catch (error) {
    return null;
  }
}