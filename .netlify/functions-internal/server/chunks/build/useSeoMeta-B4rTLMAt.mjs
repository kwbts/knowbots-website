import { c as useSeoMeta } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'get-it';
import 'get-it/middleware';

useSeoMeta({
  // Essential tags
  title: "Page Title - Site Name",
  description: "Clear, compelling description of your page content",
  // Open Graph
  ogTitle: "Page Title - Site Name",
  ogDescription: "Description for social sharing",
  ogType: "website",
  ogImage: `${origin}/images/your-image.jpg`,
  ogUrl: `${origin}/current-path`,
  ogSiteName: "Your Site Name",
  // Twitter
  twitterCard: "summary_large_image",
  twitterTitle: "Page Title - Site Name",
  twitterDescription: "Description for Twitter sharing",
  twitterImage: `${origin}/images/your-image.jpg`,
  // Basic SEO controls
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "utf-8"
});
//# sourceMappingURL=useSeoMeta-B4rTLMAt.mjs.map
