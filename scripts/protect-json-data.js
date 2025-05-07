/**
 * This script moves public JSON data files to a more protected location
 * and creates placeholder files that redirect to controlled endpoints
 */

import fs from 'fs';
import path from 'path';

// Files to protect
const filesToProtect = [
  'sample-data.json',
  'bridgit-data.json',
  'cart-data.json',
  'emmie-co-data.json',
  'fidus-data.json',
  'humans-of-martech-data.json',
  'klipfolio-data.json',
  'knak-data.json',
  'metarouter-data.json',
  'treasure-data-data.json'
];

// Create private data directory if it doesn't exist
const privateDir = path.resolve(process.cwd(), '.data-private');
if (!fs.existsSync(privateDir)) {
  fs.mkdirSync(privateDir, { recursive: true });
  console.log(`Created private data directory: ${privateDir}`);
}

// Move files from public to private
filesToProtect.forEach(file => {
  const publicPath = path.resolve(process.cwd(), 'public', file);
  const privatePath = path.resolve(privateDir, file);
  
  // Check if file exists
  if (fs.existsSync(publicPath)) {
    try {
      // Copy to private directory
      fs.copyFileSync(publicPath, privatePath);
      console.log(`Copied ${file} to private directory`);
      
      // Create a placeholder file
      const placeholder = {
        message: "This data is only accessible through the API",
        redirectTo: "/api/secure-data",
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(publicPath, JSON.stringify(placeholder, null, 2));
      console.log(`Replaced ${file} with placeholder`);
    } catch (err) {
      console.error(`Error protecting ${file}:`, err);
    }
  }
});

console.log('JSON data protection complete');