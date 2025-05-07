// Simple plugin to provide configuration values
export default defineNuxtPlugin(() => {
  // Get runtime config to access environment variables
  const runtimeConfig = useRuntimeConfig();
  
  // Get the signed URL ONLY from environment variables
  const signedUrl = runtimeConfig.public.supabaseSignedUrl || process.env.SUPABASE_SIGNED_URL || '';
  
  return {
    provide: {
      storageConfig: {
        bucket: 'may-core-sample',
        filePath: 'core-sample-may-2025.json',
        signedUrl: signedUrl
      }
    }
  };
});