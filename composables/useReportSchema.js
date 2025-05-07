// composables/useReportSchema.js
import { ref, computed } from 'vue'

export const useReportSchema = () => {
  const baseUrl = 'https://knowbots.ca'
  
  /**
   * Create a schema.org JSON-LD schema for a research report
   * @param {Object} report - The report data
   * @param {Object} options - Additional options for schema generation
   * @returns {Object} The structured data object for the report
   */
  const createReportSchema = (report, options = {}) => {
    if (!report) return null

    const {
      title = 'Generative Engine Optimization Query & Citation Analysis',
      datePublished = new Date().toISOString(),
      dateModified = new Date().toISOString(),
      description = 'Comprehensive analysis of how large language models cite and reference web content, examining domain authority, citation patterns, and optimization opportunities.',
      author = 'Jon Taylor',
      authorTitle = 'CEO, Knowbots Marketing',
      publisher = 'Knowbots',
      series = 'Core Sample',
      version = 'May 2025',
      image = '/images/geo-hero.png',
      url = '/core-sample/may-2025/',
      keywords = ['Generative Engine Optimization', 'LLM', 'AI Search', 'SEO', 'Citations', 'Content Optimization']
    } = options

    // Build the schema object using Research Report schema type
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Report',
      'headline': title,
      'name': title,
      'datePublished': datePublished,
      'dateModified': dateModified,
      'description': description,
      'image': `${baseUrl}${image}`,
      'url': `${baseUrl}${url}`,
      'publisher': {
        '@type': 'Organization',
        'name': publisher,
        'url': baseUrl
      },
      'author': {
        '@type': 'Person',
        'name': author,
        'jobTitle': authorTitle,
        'url': baseUrl,
        'sameAs': options.authorSameAs || []
      },
      'about': {
        '@type': 'Thing',
        'name': 'Generative Engine Optimization',
        'description': 'Analysis of AI content citation patterns and optimization strategies'
      },
      'reportNumber': `${series} - ${version}`,
      'keywords': keywords.join(', ')
    }

    // Add temporal coverage if date ranges are available
    if (report && report.timestamp) {
      const date = new Date(report.timestamp);
      const startDate = new Date(date);
      startDate.setMonth(startDate.getMonth() - 1);
      
      schema.temporalCoverage = `${startDate.toISOString()}/${date.toISOString()}`;
    }

    // Add specific fields for this type of report if available in the data
    if (report) {
      // Add data sample size 
      if (report.total_queries) {
        schema.variableMeasured = [
          {
            '@type': 'PropertyValue',
            'name': 'Queries Analyzed',
            'value': report.total_queries
          }
        ];
      }
      
      if (report.total_pages) {
        if (!schema.variableMeasured) {
          schema.variableMeasured = [];
        }
        
        schema.variableMeasured.push({
          '@type': 'PropertyValue',
          'name': 'Pages Analyzed',
          'value': report.total_pages
        });
      }
    }

    return schema
  }

  /**
   * Generate the script tag HTML for schema markup
   * @param {Object} schema - The schema object
   * @returns {string} HTML script tag with schema JSON-LD
   */
  const generateSchemaScript = (schema) => {
    if (!schema) return ''
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  }

  return {
    createReportSchema,
    generateSchemaScript
  }
}