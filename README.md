# Knowbots Marketing Website

This is the main website for Knowbots Marketing, built with Nuxt 3.

## Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Citebots Dashboard

The Citebots dashboard is a client-only section accessible through `/citebots`. It requires authentication and provides client-specific data visualization.

### Debugging Tools

For troubleshooting in production, use these debug routes:

- `/citebots/debug` - Shows file system status, environment details
- `/citebots/dashboard/debug-data` - Directly test client data loading

### Data Structure

Client data follows this structure:

```javascript
{
  client_name: "Client Name",
  query_data: [
    {
      query_id: "query-123",
      query_text: "Search query text",
      query_keyword: "keyword",
      funnel_stage: "TOFU|MOFU|BOFU",
      citation_count: 5,
      brand_mentioned: true,
      associated_pages: [
        {
          page_analysis_id: "page-123",
          client_name: "Client Name",
          citation_url: "https://example.com/page",
          page_title: "Page Title",
          domain_name: "example.com",
          brand_mentioned: true,
          is_client_domain: true,
          domain_authority: 40,
          page_authority: 35
        }
      ]
    }
  ],
  client_summary: {
    total_queries: 200,
    total_pages: 800,
    average_citation_count: 7.5,
    brand_mention_rate: 0.65,
    average_page_speed: 80,
    average_domain_authority: 35
  }
}
```

### Data Sources

Client data is loaded using one of these methods based on environment:

1. **Production**: Loads directly from Supabase storage bucket
2. **Development**: Uses local JSON files from public directory
3. **Fallback**: API endpoint that serves static JSON data

## Core Sample Reports

Public-facing reports accessible at `/core-sample`. These use the same data structure and Supabase integration as the Citebots dashboard.

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.