// composables/useSiteNavigationSchema.js
import { ref, computed } from 'vue'

export const useSiteNavigationSchema = () => {
  const baseUrl = 'https://knowbots.ca'
  
  /**
   * Create a schema.org JSON-LD schema for site navigation
   * @param {Array} navigationItems - Array of navigation items with URL and name
   * @param {Object} options - Additional options for schema generation
   * @returns {Object} The structured data object for the site navigation
   */
  const createSiteNavigationSchema = (navigationItems = [], options = {}) => {
    const {
      name = 'Knowbots Main Navigation',
      description = 'Primary site navigation for Knowbots website'
    } = options

    // Ensure all navigation items have absolute URLs
    const formattedItems = navigationItems.map(item => {
      // If URL doesn't start with http or https, assume it's relative
      const url = item.url.startsWith('http') 
        ? item.url 
        : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
        
      return {
        '@type': 'SiteNavigationElement',
        'name': item.name,
        'url': url
      }
    });

    // Build the schema object
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SiteNavigationElement',
      'name': name,
      'description': description,
      'potentialAction': formattedItems.map(item => ({
        '@type': 'ViewAction',
        'target': item.url,
        'name': item.name
      }))
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
    createSiteNavigationSchema,
    generateSchemaScript
  }
}