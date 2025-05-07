# Supabase Security Guidelines

## Overview

This document outlines the security best practices for using Supabase with signed URLs to access private data in our application. Following these guidelines will help ensure client data remains secure.

## Signed URLs: Security Considerations

### What are Signed URLs?

Signed URLs are temporary URLs that provide time-limited access to resources in Supabase Storage. They include a token that authenticates the request without requiring user authentication.

### Security Risks

1. **URL Exposure**: Signed URLs can be intercepted in network traffic
2. **Long Expiration Times**: Default expiration is often too long
3. **Hardcoded Credentials**: Never hardcode these URLs in source code
4. **Client-Side Storage**: URLs should not be stored in local storage

## Best Practices

### 1. Environment Variable Management

Always store signed URLs in environment variables:

```
# .env file
SUPABASE_SIGNED_URL=https://your-project.supabase.co/storage/v1/object/sign/...
```

**Important**:
- NEVER commit the `.env` file to version control
- Use `.env.example` as a template without real values
- For production, set environment variables in your hosting platform (e.g., Netlify, Vercel)

### 2. Short-Lived Tokens

Generate signed URLs with shorter expiration times:

```javascript
// Generate a URL that expires in 24 hours
const { data } = await supabase.storage
  .from('bucket-name')
  .createSignedUrl('file.json', 60 * 60 * 24);
```

### 3. Regular Rotation

Implement a routine for regularly rotating signed URLs:

1. Set up a scheduled task (cron job, GitHub Action, etc.)
2. Generate a new signed URL with a shorter expiration
3. Update the environment variable in your hosting platform

### 4. Server-Side Generation (Recommended)

The most secure approach is to move URL generation server-side:

1. Create a serverless function or API endpoint that:
   - Authenticates the user
   - Generates a fresh signed URL on demand
   - Returns only the necessary data (not the full signed URL)

2. Example serverless function:
   ```javascript
   // /api/getReportData.js
   export default async function handler(req, res) {
     // Authenticate request
     // Generate signed URL
     // Fetch and filter data
     // Return only necessary data
     res.json(filteredData);
   }
   ```

### 5. Access Control

Configure Supabase storage with proper access controls:

1. Make buckets private (not public)
2. Set up Row Level Security (RLS) policies
3. Consider using IP allowlisting for additional security

## Implementation

### Current Implementation

Our current implementation:

1. Stores the signed URL in environment variables
2. Keeps all URL references in server-rendered code
3. Doesn't expose the URL directly in client-side code
4. Doesn't log the URL or sensitive data to the console

### Future Improvements

Consider implementing:

1. Server-side data fetching via API routes
2. Automated URL rotation
3. User authentication requirement
4. Data transformation/filtering before client delivery

## Monitoring for Security Issues

Regularly check:

1. Network requests in browser dev tools
2. Console logs for data exposure
3. Local storage for sensitive information
4. Public URL accessibility

## References

- [Supabase Storage Documentation](https://supabase.io/docs/reference/javascript/storage)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)