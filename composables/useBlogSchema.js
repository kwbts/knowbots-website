// composables/useBlogSchema.js
import { ref, computed } from 'vue'

export const useBlogSchema = () => {
  const baseUrl = 'https://knowbots.ca'
  
  /**
   * Create a schema.org JSON-LD schema for a blog post
   * @param {Object} post - The blog post data from Sanity
   * @param {Object} options - Additional options for schema generation
   * @returns {Object} The structured data object for the blog post
   */
  const createBlogPostSchema = (post, options = {}) => {
    if (!post) return null

    const {
      urlFor = null,
      defaultImagePath = '/images/knowbots-default.jpg',
      defaultAuthor = 'Knowbots',
      companyInfo = null
    } = options

    // Get image URL with fallback
    const getImageUrl = () => {
      if (post.mainImage?.asset) {
        return urlFor 
          ? urlFor(post.mainImage.asset).width(1200).url()
          : post.mainImage.asset.url
      }
      return `${baseUrl}${defaultImagePath}`
    }

    // Format dates properly with fallbacks
    const getPublishedDate = () => {
      return post.publishedDate || post.publishedAt || new Date().toISOString()
    }

    const getModifiedDate = () => {
      return post.lastModified || getPublishedDate()
    }

    // Get enhanced author info
    const getAuthor = () => {
      // Base author information
      const authorInfo = {
        '@type': 'Person',
        'name': post.author?.name || defaultAuthor
      }

      // Add optional author properties if they exist in your Sanity data
      if (post.author) {
        // Add job title if available
        if (post.author.jobTitle) {
          authorInfo.jobTitle = post.author.jobTitle
        }

        // Add author URL - could be a profile page or social media
        if (post.author.url) {
          authorInfo.url = post.author.url
        } else if (post.author.slug) {
          // If you have author pages with slugs
          authorInfo.url = `${baseUrl}/authors/${post.author.slug.current}`
        }

        // Add author image
        if (post.author.image?.asset) {
          authorInfo.image = urlFor 
            ? urlFor(post.author.image.asset).width(400).url()
            : post.author.image.asset.url
        }

        // Add social media profiles if available from Sanity
        if (post.author.socialProfiles && post.author.socialProfiles.length > 0) {
          authorInfo.sameAs = []
          post.author.socialProfiles.forEach(profile => {
            if (profile.url) authorInfo.sameAs.push(profile.url)
          })
        }

        // Add author description/bio
        if (post.author.bio) {
          authorInfo.description = post.author.bio
        }
      }

      // If companyInfo provided with author social links, add those to author
      if (companyInfo && companyInfo.authorProfiles) {
        if (!authorInfo.sameAs) authorInfo.sameAs = []
        
        companyInfo.authorProfiles.forEach(profile => {
          if (profile.url) authorInfo.sameAs.push(profile.url)
        })
      }

      return authorInfo
    }

    // Get publisher info with enhanced structure
    const getPublisher = () => {
      const publisher = {
        '@type': 'Organization',
        'name': 'Knowbots',
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/logo.png`
        },
        'url': baseUrl
      }

      // Add company social profiles if available
      if (companyInfo && companyInfo.socialProfiles) {
        publisher.sameAs = companyInfo.socialProfiles.map(profile => profile.url).filter(Boolean)
      }

      return publisher
    }

    // Get article keywords from categories if available
    const getKeywords = () => {
      if (post.categories && post.categories.length > 0) {
        return post.categories.map(cat => cat.title).join(', ')
      }
      return null
    }

    // Build the schema object
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'image': [getImageUrl()],
      'datePublished': getPublishedDate(),
      'dateModified': getModifiedDate(),
      'author': getAuthor(),
      'publisher': getPublisher(),
      'description': post.seoDescription || post.description || '',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug?.current || ''}`
      }
    }

    // Add optional fields if they exist
    const keywords = getKeywords()
    if (keywords) {
      schema.keywords = keywords
    }

    // Add word count if available
    if (post.wordCount) {
      schema.wordCount = post.wordCount
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
    createBlogPostSchema,
    generateSchemaScript
  }
}