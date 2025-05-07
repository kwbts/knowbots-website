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
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
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
    ssr: {
      noExternal: ['rxjs', '@sanity/client', '@sanity/image-url', '@supabase/supabase-js'],
    },
  },
  
  // Nitro configuration
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about/', '/contact/', '/services/', '/labs/', '/blog/']
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