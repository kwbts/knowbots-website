// Simple plugin to provide configuration values
export default defineNuxtPlugin(() => {
  // Get runtime config to access environment variables
  const runtimeConfig = useRuntimeConfig();
  
  // Check if we're in prerendering mode
  const isPrerendering = process.server && process.env.NITRO_PRERENDER;
  
  // Get the Supabase URL and bucket/file configuration
  const supabaseUrl = runtimeConfig.public.supabaseUrl || '';
  const bucket = runtimeConfig.public.storageBucket || 'may-core-sample';
  const filePath = runtimeConfig.public.targetFile || 'core-sample-may-2025.json';
  
  // Get or construct the signed URL
  let signedUrl = '';
  
  // First try to get it from explicit environment variable
  const configuredSignedUrl = runtimeConfig.public.supabaseSignedUrl || process.env.SUPABASE_SIGNED_URL || '';
  
  if (configuredSignedUrl && configuredSignedUrl.includes('token=')) {
    // Use the pre-configured signed URL if it looks valid (contains a token)
    signedUrl = configuredSignedUrl;
  } else if (supabaseUrl && bucket && filePath) {
    // Construct a URL to the API endpoint we created for this purpose
    signedUrl = `/api/core-sample`;
    console.log('Using API endpoint for data:', signedUrl);
  }
  
  return {
    provide: {
      storageConfig: {
        bucket: bucket,
        filePath: filePath,
        signedUrl: isPrerendering ? null : signedUrl,
        isPrerendering: isPrerendering,
        useApi: true // Set to true to prefer API endpoint over direct storage access
      }
    }
  };
});