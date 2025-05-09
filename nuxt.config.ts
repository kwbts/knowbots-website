// Import the Sanity client at the top of your file
import { createClient } from '@sanity/client'

export default defineNuxtConfig({
  // Basic configuration
  ssr: true,
  devtools: { enabled: true },
  css: ['./assets/css/tailwind.css'],
  
  // Add Supabase module
  modules: [
    '@nuxtjs/supabase'
  ],
  
  // Supabase module configuration
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*']
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    },
    // Explicitly define URL and key for module
    url: process.env.SUPABASE_URL || 'https://placeholder-during-build.supabase.co',
    key: process.env.SUPABASE_KEY || 'placeholder-key-for-build-time',
    // Use client mode during prerendering to avoid server-side issues
    serviceKey: process.env.SUPABASE_SERVICE_KEY || 'placeholder-service-key-for-build-time'
  },
  
  // Environment variables - public ones will be exposed to the client
  runtimeConfig: {
    // Private variables (server-side only)
    // These are only accessible on the server and not exposed to clients
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    
    // Public variables (accessible on client-side)
    public: {
      // Supabase configuration for client-side
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseSignedUrl: process.env.SUPABASE_SIGNED_URL,
      
      // Storage configuration
      storageBucket: process.env.STORAGE_BUCKET || 'may-core-sample',
      targetFile: process.env.TARGET_FILE || 'core-sample-may-2025.json',
    }
  },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=EB+Garamond:wght@400;700&family=Alegreya:wght@400;700&display=swap',
        },
      ],
    },
  },
  
  // External dependencies
  vite: {
    define: {
      // Fix for "global is not defined" error with Supabase
      global: 'window',
    },
    ssr: {
      noExternal: ['rxjs', '@sanity/client', '@sanity/image-url', '@supabase/supabase-js'],
    },
  },
  
  // Nitro configuration
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about/', '/contact/', '/services/', '/labs/', '/blog/'],
      failOnError: false,  // Continue build even if prerendering has errors
      ignore: [
        // Ignore any routes with query parameters (typically dynamic routes)
        /\?/,
        // Ignore specific paths that might cause issues with Supabase
        '/citebots/admin/',
        '/citebots/dashboard/',
        // Ignore all JSON files
        /\.json$/,
        // Ignore specific data files
        '/sample-data.json',
        '/*/data.json'
      ]
    },
    routeRules: {
      // Make dynamic routes static at build time, using static fallbacks
      '/blog/**': { static: true },
      '/core-sample/**': { static: true },
      
      // Special rule for citebots API endpoints - ensure they are handled dynamically
      '/api/client-direct-json': { swr: false },
      '/api/client-supabase-data': { swr: false },
      '/api/client-core-sample': { swr: false },
      
      // Special treatment for citebots pages - ensure they are handled dynamically
      '/citebots/**': { static: false },
      
      // Protect JSON files
      '/**/*.json': {
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    }
  },
  
  // Only add hooks for prerendering blog posts
  hooks: {
    'nitro:config': async (nitroConfig) => {
      if (nitroConfig.dev) return
      
      try {
        // Create Sanity client here
        const client = createClient({
          projectId: 'c1m9ouc7',
          dataset: 'production',
          apiVersion: '2024-12-16',
          useCdn: false,
        })

        // Fetch all blog post slugs
        const posts = await client.fetch(`*[_type == "post"].slug.current`)
        
        // Add each blog post route to prerender routes
        posts.forEach((slug) => {
          nitroConfig.prerender.routes.push(`/blog/${slug}/`)
        })
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
  },
  
  // Generate fallback pages for any route that's not pre-rendered
  generate: {
    fallback: true
  },

  router: {
    options: {
      trailingSlash: true
    }
  },
  
  compatibilityDate: '2024-12-16',
})