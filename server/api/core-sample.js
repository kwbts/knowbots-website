// server/api/core-sample.js
import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';
import fs from 'fs';
import path from 'path';

/**
 * Secure server-side API endpoint to fetch report data from Supabase
 * This keeps all Supabase credentials server-side only
 * Falls back to local file if Supabase is not available
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
    
    // Try to use Supabase if credentials are available
    if (supabaseUrl && supabaseKey) {
      try {
        // Create Supabase client with server-side credentials
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Download file directly from storage using service role key (server-side only)
        const { data, error } = await supabase
          .storage
          .from(bucketName)
          .download(fileName);
          
        if (!error && data) {
          // Convert to text and parse JSON
          const jsonText = await data.text();
          const jsonData = JSON.parse(jsonText);
          
          // Log success (in development only)
          if (process.env.NODE_ENV !== 'production') {
            console.log(`Successfully retrieved data from Supabase: ${bucketName}/${fileName}`);
          }
          
          // Return data to client
          return jsonData;
        }
        
        // If we get here, there was an error but we'll continue to fallback
        console.warn('Supabase download failed, trying fallback...', error);
      } catch (supabaseErr) {
        console.warn('Supabase client error, trying fallback...', supabaseErr.message);
      }
    } else {
      console.warn('Missing Supabase credentials, using fallback data');
    }
    
    // FALLBACK: Try to load from local file in public directory
    const publicFilePath = path.resolve('public', 'sample-data.json');
    
    try {
      // Check if file exists
      if (fs.existsSync(publicFilePath)) {
        const fileContent = fs.readFileSync(publicFilePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        
        // Log success in development
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Loaded fallback data from ${publicFilePath}`);
        }
        
        return jsonData;
      }
    } catch (fsErr) {
      console.error('Error reading local file:', fsErr);
    }
    
    // If all methods failed, return sample data object with minimal structure
    console.warn('All data loading methods failed, returning minimal sample data');
    
    return {
      timestamp: new Date().toISOString(),
      total_queries: 651,
      total_pages: 3165,
      source: 'fallback-data',
      domains: [],
      benchmarks: {
        domainAuthority: 40,
        pageAuthority: 35
      }
    };
  } catch (err) {
    console.error('Server API error:', err);
    
    // Return sanitized error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve report data'
    });
  }
});