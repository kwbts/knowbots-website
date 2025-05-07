// Simple plugin to provide configuration values
export default defineNuxtPlugin(() => {
  // Get runtime config to access environment variables
  const runtimeConfig = useRuntimeConfig();
  
  // Check if we're in prerendering mode
  const isPrerendering = process.server && process.env.NITRO_PRERENDER;
  
  // Get the signed URL ONLY from environment variables
  const signedUrl = isPrerendering 
    ? null 
    : (runtimeConfig.public.supabaseSignedUrl || process.env.SUPABASE_SIGNED_URL || '');
  
  return {
    provide: {
      storageConfig: {
        bucket: runtimeConfig.public.storageBucket || 'may-core-sample',
        filePath: runtimeConfig.public.targetFile || 'core-sample-may-2025.json',
        signedUrl: signedUrl,
        isPrerendering: isPrerendering
      }
    }
  };
});