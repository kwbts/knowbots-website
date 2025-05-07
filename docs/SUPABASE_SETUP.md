# Supabase Integration for Core Sample Reports

## Overview

This document explains how to set up and manage the Supabase integration for the Core Sample Reports in the Knowbots website. The integration uses Supabase Storage with signed URLs to securely access private data.

## Why Supabase Storage?

Supabase Storage is used to protect client data by:
1. Keeping the data private and access-controlled
2. Using signed URLs with expiration dates for access
3. Avoiding exposing sensitive client data in public files

## Setup Instructions

### 1. Supabase Project Configuration

1. **Create a Supabase project** at https://supabase.com
2. **Create a storage bucket** named `may-core-sample` (or your preferred name)
3. **Set bucket permissions** to non-public (requiring authentication)
4. **Upload your JSON data file** (e.g., `core-sample-may-2025.json`)

### 2. Generate a Signed URL

1. In the Supabase dashboard, navigate to Storage
2. Select your bucket
3. Find your file and click the three dots menu
4. Select "Get URL"
5. Choose an expiration time (e.g., 1 month)
6. Generate and copy the signed URL

### 3. Environment Configuration

Add the signed URL to your environment variables:

```bash
# In your .env file
SUPABASE_SIGNED_URL=https://your-project.supabase.co/storage/v1/object/sign/your-bucket/your-file.json?token=your-token
```

For production deployments, add this as an environment variable in your hosting platform (e.g., Netlify).

## How It Works

The integration follows these steps:

1. A plugin provides access to the signed URL and bucket configuration
2. When the page loads, it tries to fetch data from the signed URL
3. If successful, it displays the data from Supabase Storage
4. If the fetch fails, it falls back to a local file (in development)

## Maintaining the Integration

### Refreshing Signed URLs

Signed URLs expire after their configured lifetime. To refresh:

1. Generate a new signed URL in the Supabase dashboard
2. Update your environment variables with the new URL
3. Redeploy your application

### Updating the Data

To update the report data:

1. Make changes to your JSON file
2. Upload the new version to Supabase Storage
3. Generate a new signed URL if needed
4. Update your environment variables if the URL changed

## Troubleshooting

### Common Issues

1. **"Error Loading Report Data"**
   - Check if the signed URL is valid and not expired
   - Verify the bucket permissions
   - Look for CORS issues in the browser console

2. **"Failed to parse JSON"**
   - Validate your JSON file format
   - Check for errors in the JSON structure

3. **"Network error"**
   - Ensure your Supabase project is online
   - Check for network connectivity issues

### Debugging

The page includes detailed logging to help diagnose issues:
- Check the browser console for request details
- Look for specific error messages about fetch status and headers
- Note any JSON parsing errors

## Security Considerations

1. **Signed URL Security**:
   - Signed URLs provide temporary access to specific files
   - They expire after a set period, limiting exposure
   - They don't expose your Supabase API keys

2. **Data Sensitivity**:
   - Consider data minimization principles
   - Remove any PII or highly sensitive information from the dataset
   - Use field-level sanitization for extra protection

## Future Improvements

Consider these enhancements:

1. **Server-side URL Generation**:
   - Create a serverless function to generate fresh signed URLs on demand
   - Reduces the need for manual URL updates

2. **Client Authentication**:
   - Implement user authentication to restrict access to reports
   - Use Supabase Auth alongside Storage for complete protection

3. **Data Transformation**:
   - Add server-side processing to sanitize data before delivery
   - Filter or mask sensitive fields based on user permissions