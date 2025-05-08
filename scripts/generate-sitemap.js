// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hardcode credentials for reliability
const sanityClient = createClient({
  projectId: 'c1m9ouc7',
  dataset: 'production', 
  apiVersion: '2024-12-16',
  useCdn: false
});

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  try {
    // Create sitemap stream
    const sitemap = new SitemapStream({ 
      hostname: 'https://knowbots.ca',
      trailingSlash: true  // Force trailing slashes
    });
    
    // Create list of static URLs
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about/', changefreq: 'monthly', priority: 0.8 },
      { url: '/services/', changefreq: 'monthly', priority: 0.9 },
      { url: '/contact/', changefreq: 'monthly', priority: 0.8 },
      { url: '/labs/', changefreq: 'monthly', priority: 0.8 },
      { url: '/blog/', changefreq: 'weekly', priority: 0.9 },
      // Add core sample reports
      { url: '/core-sample/', changefreq: 'monthly', priority: 0.8 },
      { url: '/core-sample/may-2025/', changefreq: 'monthly', priority: 0.8 }
    ];
    
    // Fetch blog posts from Sanity
    console.log('Fetching blog posts from Sanity...');
    const blogPosts = await sanityClient.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        "lastmod": _updatedAt
      }
    `);
    console.log(`Found ${blogPosts.length} blog posts`);
    
    // Add blog posts to links
    blogPosts.forEach(post => {
      links.push({
        url: `/blog/${post.slug}/`,
        lastmod: post.lastmod,
        changefreq: 'monthly',
        priority: 0.7
      });
    });
    
    // Generate sitemap XML
    const stream = Readable.from(links).pipe(sitemap);
    const buffer = await streamToPromise(stream);
    
    // Ensure the public directory exists
    const publicDir = path.join(path.resolve(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap to public directory
    fs.writeFileSync(
      path.join(publicDir, 'sitemap.xml'), 
      buffer.toString()
    );
    
    console.log('Sitemap generated successfully at public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the sitemap generator
generateSitemap();