// Import the Sanity client at the top of your file
import { createClient } from '@sanity/client'

export default defineNuxtConfig({
  // Basic configuration
  ssr: true,
  devtools: { enabled: true },
  css: ['./assets/css/tailwind.css'],
  
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
      noExternal: ['rxjs', '@sanity/client', '@sanity/image-url'],
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