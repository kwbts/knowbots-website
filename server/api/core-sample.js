// server/api/core-sample.js
import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';

/**
 * Secure server-side API endpoint to fetch report data from Supabase
 * This keeps all Supabase credentials server-side only
 */
export default defineEventHandler(async (event) => {
  try {
    // Get runtime config (only accessible on server)
    const config = useRuntimeConfig();
    
    // Extract full Supabase credentials (server-side only)
    const supabaseUrl = config.supabaseUrl;
    const supabaseKey = config.supabaseServiceKey;
    const bucketName = config.public.storageBucket || 'may-core-sample';
    const fileName = config.public.targetFile || 'core-sample-may-2025.json';
    
    // Validate required configuration
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      throw createError({
        statusCode: 500,
        statusMessage: 'Server configuration error'
      });
    }
    
    // Create Supabase client with server-side credentials
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Download file directly from storage using service role key (server-side only)
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .download(fileName);
      
    if (error) {
      console.error('Supabase storage error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Error retrieving report data'
      });
    }
    
    // Convert to text and parse JSON
    const jsonText = await data.text();
    const jsonData = JSON.parse(jsonText);
    
    // Log success (in development only)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Successfully retrieved data from ${bucketName}/${fileName}`);
    }
    
    // Return data to client
    return jsonData;
  } catch (err) {
    console.error('Server API error:', err);
    
    // Return sanitized error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve report data'
    });
  }
});