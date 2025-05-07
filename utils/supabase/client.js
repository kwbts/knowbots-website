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
      // Check if we're in prerendering mode
      if (process.env.NITRO_PRERENDER) {
        console.log('PRERENDERING: Using mock Supabase client');
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: null }),
              createSignedUrl: async () => ({ data: { signedUrl: null }, error: null })
            })
          },
          auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null })
          }
        };
      }
      
      const config = useRuntimeConfig();
      const supabaseUrl = config.supabaseUrl;
      const supabaseKey = config.supabaseServiceKey;

      if (!supabaseUrl || !supabaseKey) {
        
        // For regular SSR, create a mock client or return null safely
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: { message: 'Missing Supabase credentials' } }),
              createSignedUrl: async () => ({ data: { signedUrl: null }, error: { message: 'Missing Supabase credentials' } })
            })
          }
        };
      }

      // Create server-side client
      return createClient(supabaseUrl, supabaseKey);
    } catch (error) {
      // During prerendering, we need to handle errors gracefully
      if (process.env.NITRO_PRERENDER) {
        console.log('PRERENDERING: Error in Supabase client, using mock client');
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: null }),
              createSignedUrl: async () => ({ data: { signedUrl: null }, error: null })
            })
          },
          auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null })
          }
        };
      }
      console.error('Error initializing Supabase client:', error.message);
      // For regular SSR, create a fallback client that won't throw
      return {
        storage: {
          from: () => ({
            download: async () => ({ data: null, error: { message: 'Client initialization failed' } }),
            createSignedUrl: async () => ({ data: { signedUrl: null }, error: { message: 'Client initialization failed' } })
          })
        },
        auth: {
          getUser: async () => ({ data: { user: null }, error: { message: 'Client initialization failed' } }),
          getSession: async () => ({ data: { session: null }, error: { message: 'Client initialization failed' } })
        }
      };
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
        console.warn('Missing Supabase credentials for client-side');
        // Return a mock client that won't throw errors
        return {
          storage: {
            from: () => ({
              download: async () => ({ data: null, error: { message: 'Missing Supabase credentials' } }),
              createSignedUrl: async () => ({ data: { signedUrl: null }, error: { message: 'Missing Supabase credentials' } })
            })
          },
          auth: {
            getUser: async () => ({ data: { user: null }, error: { message: 'Missing Supabase credentials' } }),
            getSession: async () => ({ data: { session: null }, error: { message: 'Missing Supabase credentials' } })
          }
        };
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
      console.error('Error creating client-side Supabase client:', error.message);
      // Return a mock client that won't throw errors
      return {
        storage: {
          from: () => ({
            download: async () => ({ data: null, error: { message: 'Client initialization failed' } }),
            createSignedUrl: async () => ({ data: { signedUrl: null }, error: { message: 'Client initialization failed' } })
          })
        },
        auth: {
          getUser: async () => ({ data: { user: null }, error: { message: 'Client initialization failed' } }),
          getSession: async () => ({ data: { session: null }, error: { message: 'Client initialization failed' } })
        }
      };
    }
  }
  
  return null;
}

// We no longer initialize the client at the module level
// Instead we'll use the function in components

// Function to fetch JSON directly from a signed URL
export async function fetchJsonFromSignedUrl(signedUrl) {
  // In prerendering mode or if URL is missing, return fallback data
  if (process.env.NITRO_PRERENDER || !signedUrl) {
    return getFallbackData('fetchJsonFromSignedUrl');
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
    console.warn('Error fetching from signed URL:', err.message);
    return getFallbackData('fetchJsonFromSignedUrl');
  }
}

// Helper function to get fallback data
function getFallbackData(source) {
  return {
    timestamp: new Date().toISOString(),
    total_queries: 651,
    total_pages: 3165,
    source: `fallback-from-${source}`,
    domains: [],
    benchmarks: {
      domainAuthority: 40,
      pageAuthority: 35
    }
  };
}

/**
 * Get file data from Supabase storage with minimal logging
 * This function should be called within a Vue setup function or lifecycle hook
 */
export async function getFileFromStorage(bucket, filePath) {
  // In prerendering mode, return fallback data
  if (process.env.NITRO_PRERENDER) {
    return getFallbackData('getFileFromStorage');
  }
  
  try {
    // Get Supabase client using our singleton pattern
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      console.warn('No Supabase client available, returning fallback data');
      return getFallbackData('getFileFromStorage-noClient');
    }
    
    // Try to download the file
    const { data, error } = await client
      .storage
      .from(bucket)
      .download(filePath);
      
    if (error) {
      console.warn('Error downloading from storage:', error.message);
      return getFallbackData('getFileFromStorage-downloadError');
    }
    
    // Parse the JSON data
    const text = await data.text();
    return JSON.parse(text);
  } catch (error) {
    console.warn('Error in getFileFromStorage:', error?.message);
    return getFallbackData('getFileFromStorage-exception');
  }
}

/**
 * Get a signed URL for a file with minimal logging
 * This function should be called within a Vue setup function or lifecycle hook
 */
export async function getSignedUrl(bucket, filePath) {
  // In prerendering mode, return null (which will trigger fallback logic)
  if (process.env.NITRO_PRERENDER) {
    return null;
  }
  
  try {
    // Get Supabase client using our singleton pattern
    const client = getSupabaseClient();
    
    // Check if Supabase client is available
    if (!client) {
      console.warn('No Supabase client available for getSignedUrl');
      return null;
    }
    
    const { data, error } = await client
      .storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24); // 24 hours expiry
      
    if (error) {
      console.warn('Error creating signed URL:', error.message);
      return null;
    }
    
    return data?.signedUrl;
  } catch (error) {
    console.warn('Exception in getSignedUrl:', error?.message);
    return null;
  }
}