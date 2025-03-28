// composables/useOrganizationSchema.js
import { ref, computed } from 'vue'

export const useOrganizationSchema = () => {
  const baseUrl = 'https://knowbots.ca'
  
  /**
   * Create a schema.org JSON-LD schema for the organization
   * @param {Object} options - Additional options for schema generation
   * @returns {Object} The structured data object for the organization
   */
  const createOrganizationSchema = (options = {}) => {
    const {
      organizationType = 'ProfessionalService', // Other options: 'LocalBusiness', 'Corporation', etc.
      name = 'Knowbots',
      description = 'AI and digital marketing solutions for businesses',
      foundingDate = '2018', // Update to your actual founding year
      logoPath = '/logo.png',
      socialProfiles = [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/knowbots-marketing/' },
        // Add more social profiles as needed
        // { platform: 'Twitter', url: 'https://twitter.com/knowbots' },
        // { platform: 'Facebook', url: 'https://facebook.com/knowbots' },
        // { platform: 'Instagram', url: 'https://instagram.com/knowbots' },
      ],
      address = {
        streetAddress: '', // Your street address
        addressLocality: 'Waterloo', // Your city
        addressRegion: 'ON', // Your state/province
        postalCode: '', // Your postal/zip code
        addressCountry: 'CA' // Your country code
      },
    } = options

    // Build the schema object
    const schema = {
      '@context': 'https://schema.org',
      '@type': organizationType,
      'name': name,
      'url': baseUrl,
      'logo': `${baseUrl}${logoPath}`,
      'description': description
    }

    // Add founding date if provided
    if (foundingDate) {
      schema.foundingDate = foundingDate
    }

    // Add address if available
    if (address && (address.streetAddress || address.addressLocality)) {
      schema.address = {
        '@type': 'PostalAddress',
        ...address
      }
    }

   
    // Add social media profiles if available
    if (socialProfiles && socialProfiles.length > 0) {
      schema.sameAs = socialProfiles.map(profile => profile.url).filter(Boolean)
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
    createOrganizationSchema,
    generateSchemaScript
  }
}