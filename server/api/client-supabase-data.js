// server/api/client-supabase-data.js
import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#imports';
import { CLIENT_STORAGE_CONFIG, getClientStorageConfig } from '~/utils/supabase/client-config';
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to fetch client data directly from Supabase storage
 * This keeps all Supabase credentials server-side only and provides
 * a secure way to access client-specific data
 */
export default defineEventHandler(async (event) => {
  try {
    // Get the client ID from query parameters
    const query = getQuery(event);
    const clientId = query.clientId;
    
    // Check for required client ID
    if (!clientId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required parameter: clientId'
      });
    }

    // Check if client ID is valid
    if (!CLIENT_STORAGE_CONFIG[clientId]) {
      // For security, don't reveal if client ID exists or not
      throw createError({
        statusCode: 404,
        statusMessage: 'Client data not found'
      });
    }
    
    // Get client-specific storage config
    const storageConfig = getClientStorageConfig(clientId);
    
    // Get runtime config (only accessible on server)
    const config = useRuntimeConfig();
    
    // Extract Supabase credentials (server-side only)
    const supabaseUrl = config.supabaseUrl;
    const supabaseKey = config.supabaseServiceKey;
    
    // Try to use Supabase if credentials are available
    if (supabaseUrl && supabaseKey) {
      try {
        // Create Supabase client with server-side credentials
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Get bucket and file path from client config
        const bucket = storageConfig.bucket;
        const filePath = storageConfig.filePath;
        
        // Download file from storage
        const { data, error } = await supabase
          .storage
          .from(bucket)
          .download(filePath);
          
        if (!error && data) {
          // Convert to text and parse JSON
          const jsonText = await data.text();
          const clientData = JSON.parse(jsonText);
          
          // Return client data
          return clientData;
        }
        
        // If we get here, there was an error but we'll continue to fallback
        console.warn(`Supabase download failed for client ${clientId}:`, error);
      } catch (supabaseErr) {
        console.warn(`Supabase client error for ${clientId}:`, supabaseErr.message);
      }
    } else {
      console.warn('Missing Supabase credentials, using fallback data');
    }
    
    // FALLBACK: Try to load from local client JSON file
    try {
      const clientFileName = `${clientId.toLowerCase()}-data.json`;
      const publicFilePath = path.resolve('public', clientFileName);
      
      // Check if file exists
      if (fs.existsSync(publicFilePath)) {
        console.log(`Found ${clientFileName}, loading it now...`);
        
        try {
          const fileContent = fs.readFileSync(publicFilePath, 'utf8');
          const jsonData = JSON.parse(fileContent);
          
          console.log(`Successfully loaded and parsed ${clientFileName}`);
          return jsonData;
        } catch (parseErr) {
          console.error(`Error parsing ${clientFileName}:`, parseErr);
          // Continue to other fallbacks
        }
      } else {
        console.warn(`${clientFileName} file not found at path:`, publicFilePath);
      }
    } catch (fsErr) {
      console.error('Error accessing local file:', fsErr);
    }
    
    // If all methods failed, return generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve client data'
    });
    
  } catch (err) {
    console.error('Server API error:', err);
    
    // If the error is already an h3 error, re-throw it
    if (err.statusCode) {
      throw err;
    }
    
    // Otherwise create a generic server error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve client data',
      data: { error: err.message }
    });
  }
});