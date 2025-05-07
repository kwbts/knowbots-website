# Supabase Integration for Core Sample Reports

This document explains how the Knowbots Core Sample Reports integrate with Supabase for secure and private data storage.

## Overview

The Core Sample Reports (like May 2025) use Supabase Storage for data persistence to ensure client data remains private and secure. The implementation includes multiple fallback mechanisms for data retrieval to ensure high availability.

## Setup Instructions

### 1. Prerequisites

- Supabase account and project
- Storage bucket named `may-core-sample` (or as specified in environment variables)
- JSON data file uploaded to the bucket (e.g., `core-sample-may-2025.json`)

### 2. Environment Variables

Create a `.env` file in the project root with the following variables:

```
# Supabase configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
# Optional: Pre-generated signed URL for direct access
SUPABASE_SIGNED_URL=https://your-project-id.supabase.co/storage/v1/object/sign/your-bucket/your-file.json?token=your-token-here
# Storage configuration
STORAGE_BUCKET=may-core-sample
TARGET_FILE=core-sample-may-2025.json
```

### 3. Generating a Signed URL

For production use, you can generate a signed URL that provides temporary direct access to the file:

```bash
# Using the Supabase CLI
supabase storage createSignedUrl may-core-sample core-sample-may-2025.json 86400

# Or using the Supabase dashboard:
# 1. Navigate to Storage
# 2. Select your bucket
# 3. Find your file and click "Get URL"
# 4. Select expiry time and generate
```

### 4. Data File Format

The JSON data file should follow this structure:

```json
{
  "timestamp": "2025-05-15T12:00:00Z",
  "total_queries": 651,
  "total_pages": 3165,
  "clients": [
    {
      "name": "Client Name",
      "query_data": [
        {
          "query_text": "Example query",
          "associated_pages": [
            {
              "url": "https://example.com/page",
              "domain_authority": 60,
              "page_authority": 45,
              "content_quality_score": 85,
              "word_count": 1200,
              "schema_type": "Article"
              // Additional metrics...
            }
          ]
        }
      ]
    }
  ],
  "domains": [
    "example.com",
    "another-domain.com"
  ],
  "benchmarks": {
    "domainAuthority": 40,
    "pageAuthority": 35
  }
}
```

## Implementation Details

### Data Retrieval Flow

The application uses a multi-tiered approach to fetch data:

1. **Primary Method**: Fetch data using a pre-generated signed URL
2. **Secondary Method**: Directly download the file from Supabase Storage using the client
3. **Fallback Method**: Use local file if Supabase methods fail

### Security Considerations

- Data is sanitized before display to remove sensitive information
- In production, all requests use security headers
- Development mode uses local files by default
- Error messages are sanitized in production to prevent information leakage

### Error Handling

The implementation includes robust error handling:

- Connection errors
- Authentication errors
- Permission errors
- File not found errors
- Timeout handling
- JSON parsing errors

## Utility Functions

The following utilities are available for working with Supabase:

### Client Functions (`utils/supabase/client.js`)

- `supabase`: The main Supabase client instance
- `fetchJsonFromSignedUrl(signedUrl)`: Fetch JSON data from a signed URL
- `getFileFromStorage(bucket, filePath)`: Get file data directly from Supabase Storage
- `getSignedUrl(bucket, filePath)`: Generate a new signed URL for a file

### Error Handling (`utils/supabase/errorHandler.js`)

- `handleSupabaseError(error, operation, isProduction)`: Process and normalize Supabase errors
- `tryMultipleRetrievalMethods(methods, operationName, isProduction)`: Try different data retrieval methods with fallbacks
- `sanitizeReportData(rawData)`: Clean sensitive information from report data

## Deployment Notes

When deploying to production:

1. **Environment Variables**: Ensure all required environment variables are set in your deployment platform
2. **Scheduled Tasks**: Set up a task to regenerate signed URLs before expiration
3. **CORS Configuration**: Configure Supabase CORS settings to allow your domain
4. **Security Headers**: Review and update security headers as needed
5. **Error Monitoring**: Consider adding error monitoring for Supabase-related errors

## Troubleshooting

### Common Issues

- **Authentication Errors**: Check your SUPABASE_ANON_KEY
- **CORS Errors**: Verify CORS settings in Supabase dashboard
- **File Not Found**: Confirm bucket name and file path
- **Expired Signed URL**: Generate a new signed URL
- **Data Format Issues**: Validate your JSON structure

### Debugging

In development mode, detailed error messages are logged to the console. In production, errors are handled gracefully with user-friendly messages.

## Maintenance

- **Updating Data**: Upload new JSON files to Supabase Storage
- **Updating Signed URLs**: Generate new signed URLs before the existing ones expire
- **Monitoring**: Regularly check for Supabase errors in your logs

## Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase Storage API](https://supabase.io/docs/reference/javascript/storage)