# Netlify Deployment Guide

This document explains how to properly deploy the Knowbots website to Netlify, particularly focusing on the Supabase integration.

## Prerequisites

1. Netlify account with access to the knowbots.ca site
2. Supabase project set up with storage bucket
3. `.env` file with all necessary configuration

## Deployment Options

### Option 1: Using the Deployment Script

We've provided a script that helps with the deployment process:

```bash
# Make sure the script is executable
chmod +x scripts/deploy-netlify.sh

# Run the deployment script
./scripts/deploy-netlify.sh
```

This script will:
1. Check that all required environment variables are set
2. Deploy to Netlify using the CLI (if installed)
3. Or provide instructions for manual deployment

### Option 2: Manual Netlify Deployment

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select the Knowbots site
3. Go to **Site settings** → **Environment variables**
4. Add the following environment variables:

   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_KEY` - Your Supabase anon key
   - `SUPABASE_SERVICE_KEY` - Your Supabase service role key
   - `STORAGE_BUCKET` - Storage bucket name (default: may-core-sample)
   - `TARGET_FILE` - Data file name (default: core-sample-may-2025.json)
   - `NUXT_PUBLIC_SITE_URL` - Site URL (e.g., https://knowbots.ca)

5. Deploy the site from the Netlify dashboard

## Troubleshooting Deployment Issues

### 500 Errors During Prerender

If you see 500 errors during the prerender stage, it's likely due to Supabase connection issues. We've implemented several fallbacks:

1. During prerendering, we use mock Supabase clients
2. The API endpoint can use local public/sample-data.json
3. Pages will fall back to mock data if all else fails

These measures should prevent build failures.

### Missing or Invalid Signed URL

The `SUPABASE_SIGNED_URL` is optional but recommended for production. To generate a valid signed URL:

```bash
# Generate a proper signed URL
node scripts/generate-signed-url.js
```

This will output a valid signed URL that you can add to your environment variables.

### Global is Not Defined Error in Browser

If you see `ReferenceError: global is not defined` in the browser console, it means the Supabase Node.js polyfills are not working. We've added:

1. A globals.js plugin to provide shims for Node.js globals
2. A Vite configuration to define global as window

If this error persists, check that these components are properly loaded.

## Data Access Strategy

The website uses a multi-tiered approach to access data:

1. **Primary**: API endpoint (/api/core-sample) which tries:
   - Supabase storage with service key
   - Local file (public/sample-data.json)
   - Public URL fallback
   - Default mock data

2. **Client Fallbacks**:
   - Direct Supabase storage access
   - Signed URL (if provided)
   - API endpoint

This ensures that even if Supabase is unavailable, the site will still function with sample data.

## Post-Deployment Verification

After deploying, check:

1. That pages load without 500 errors
2. The Core Sample data is displayed correctly
3. Browser console doesn't show Supabase-related errors

If you encounter issues, check the browser console and server logs in Netlify.

## Updating Sample Data

When you need to update the sample data:

1. Update the file in Supabase storage
2. Generate a new signed URL
3. Update the environment variables in Netlify
4. Redeploy the site