#!/bin/bash

# This script helps deploy the site to Netlify with all necessary environment variables

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Preparing for Netlify deployment...${NC}"

# 1. Check if necessary env vars exist
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found!${NC}"
  exit 1
fi

# 2. Source env vars
source .env

# 3. Check required variables
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ] || [ -z "$SUPABASE_SERVICE_KEY" ]; then
  echo -e "${RED}Error: Missing required Supabase environment variables!${NC}"
  echo "Required: SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_KEY"
  exit 1
fi

# 4. Deploy to Netlify
echo -e "${GREEN}Deploying to Netlify...${NC}"
echo -e "${YELLOW}This will use environment variables from your .env file${NC}"

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo -e "${YELLOW}Netlify CLI not found. You can install it with: npm install -g netlify-cli${NC}"
  echo -e "${YELLOW}For now, please deploy manually and set these environment variables:${NC}"
  echo "- SUPABASE_URL = $SUPABASE_URL"
  echo "- SUPABASE_KEY = $SUPABASE_KEY"
  echo "- SUPABASE_SERVICE_KEY = $SUPABASE_SERVICE_KEY"
  echo "- STORAGE_BUCKET = $STORAGE_BUCKET"
  echo "- TARGET_FILE = $TARGET_FILE"
  echo "- NUXT_PUBLIC_SITE_URL = $NUXT_PUBLIC_SITE_URL"
  
  if [ ! -z "$SUPABASE_SIGNED_URL" ]; then
    echo "- SUPABASE_SIGNED_URL = $SUPABASE_SIGNED_URL"
  else
    echo -e "${YELLOW}Note: SUPABASE_SIGNED_URL is not set. You can generate one with: node scripts/generate-signed-url.js${NC}"
  fi
  
  exit 0
fi

# Use Netlify CLI for deployment with env vars
netlify deploy --build --prod