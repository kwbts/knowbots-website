/**
 * Environment detection utilities
 */

// Detect if we're in prerendering/build mode
export const isPrerendering = () => {
  return process.server && (
    process.env.NITRO_PRERENDER === 'true' || 
    process.env.NUXT_PRERENDER === 'true' ||
    process.env.NODE_ENV === 'prerender'
  );
};

// Detect if we're in development mode
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Detect if we're in production mode
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' && !isPrerendering();
};

// Detect if we should access external data
export const shouldAccessExternalData = () => {
  return !isPrerendering();
};