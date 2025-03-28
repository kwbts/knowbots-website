// knowbots plugins/sanity.js
import { defineNuxtPlugin } from '#app';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export default defineNuxtPlugin((nuxtApp) => {
  const sanityClient = createClient({
    projectId: 'c1m9ouc7', // Your project ID
    dataset: 'production', // Dataset name
    apiVersion: '2023-01-01', // Use the latest version
    useCdn: true, // Enable CDN for faster response times
  });

  // Helper for generating image URLs
  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source) => (source ? builder.image(source) : null);

  // Provide the sanityClient and urlFor globally
  nuxtApp.provide('sanityClient', sanityClient);
  nuxtApp.provide('urlFor', urlFor);
});