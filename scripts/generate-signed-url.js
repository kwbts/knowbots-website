#!/usr/bin/env node

// This script generates a properly formatted signed URL for Supabase
// Run it with: node scripts/generate-signed-url.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function generateSignedUrl() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
  const bucket = process.env.STORAGE_BUCKET || 'may-core-sample';
  const file = process.env.TARGET_FILE || 'core-sample-may-2025.json';
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing required environment variables: SUPABASE_URL and SUPABASE_KEY or SUPABASE_SERVICE_KEY');
    process.exit(1);
  }
  
  console.log('Generating signed URL with:');
  console.log(`- Supabase URL: ${supabaseUrl}`);
  console.log(`- Bucket: ${bucket}`);
  console.log(`- File: ${file}`);
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(file, 60 * 60 * 24 * 30); // 30 days expiry
    
    if (error) {
      console.error('Error generating signed URL:', error.message);
      process.exit(1);
    }
    
    console.log('\nGenerated Signed URL:');
    console.log(data.signedUrl);
    console.log('\nAdd this to your .env file as:');
    console.log(`SUPABASE_SIGNED_URL="${data.signedUrl}"`);
    
  } catch (err) {
    console.error('Unexpected error:', err.message);
    process.exit(1);
  }
}

generateSignedUrl();