import { d as useNuxtApp, b as useRuntimeConfig, c as useSeoMeta, a as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, mergeProps, withCtx, unref, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { parseISO, format } from 'date-fns';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'get-it';
import 'get-it/middleware';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $sanityClient, $urlFor } = useNuxtApp();
    const blogs = ref([]);
    const featuredBlog = ref(null);
    const formatDate = (dateStr) => {
      if (!dateStr) return "Unknown date";
      try {
        const date = parseISO(dateStr);
        return format(date, "MMM d, yyyy");
      } catch (error) {
        console.error("Date parsing error:", error);
        return "Invalid date";
      }
    };
    const config = useRuntimeConfig();
    const siteUrl = computed(() => config.public.siteUrl);
    useSeoMeta({
      // Essential tags
      title: "Insights & Innovations - The Knowbots Marketing Blog",
      description: "Stay ahead with expert insights on SEO, AI, marketing technology, and growth strategies. Explore the Knowbots Marketing Blog for cutting-edge ideas and inspiration.",
      // Open Graph
      ogTitle: "Insights & Innovations - The Knowbots Marketing Blog",
      ogDescription: "Explore expert insights on SEO, AI innovation, and marketing technology. Discover strategies to drive growth with Knowbots Marketing.",
      ogType: "website",
      ogImage: () => `${siteUrl.value}/images/blog-hero.png`,
      // Update with your blog hero image
      ogUrl: () => `${siteUrl.value}/blog/`,
      ogSiteName: "Knowbots Marketing",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: "Insights & Innovations - The Knowbots Marketing Blog",
      twitterDescription: "Discover expert insights, strategies, and ideas on SEO, AI, and marketing tech from Knowbots Marketing.",
      twitterImage: () => `${siteUrl.value}/images/blog-hero.png`,
      // Update with your blog hero image
      // Basic SEO controls
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow" }, _attrs))}>`);
      if (featuredBlog.value) {
        _push(`<section class="py-12 px-8 border-b border-gray-300 pt-36" style="${ssrRenderStyle({ backgroundColor: "rgba(244, 244, 244, 0.8)" })}"><div class="max-w-screen-xl mx-auto flex flex-col md:flex-row"><div class="md:w-3/4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog/${featuredBlog.value.slug.current}/`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (featuredBlog.value.mainImage) {
                _push2(`<img${ssrRenderAttr("src", `${unref($urlFor)(featuredBlog.value.mainImage).url()}/`)} alt="Featured Blog Image" class="w-full h-full object-cover rounded-lg"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                featuredBlog.value.mainImage ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: `${unref($urlFor)(featuredBlog.value.mainImage).url()}/`,
                  alt: "Featured Blog Image",
                  class: "w-full h-full object-cover rounded-lg"
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="md:w-1/4 md:pl-8 flex flex-col justify-center mt-4 md:mt-0"><h2 class="text-3xl font-semibold text-darkNavy font-heading mb-4">${ssrInterpolate(featuredBlog.value.title)}</h2><p class="text-sm text-darkGray font-body mb-6">${ssrInterpolate(formatDate(featuredBlog.value.publishedDate))}</p><button class="bg-gray-100 text-darkNavy font-body py-2 px-4 rounded shadow hover:bg-charcoalGray hover:text-white transition-colors duration-300"> Read More </button></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="py-12 px-8"><div class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(blogs.value, (blog) => {
        _push(`<div class="bg-white border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg cursor-pointer">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog/${blog.slug.current}/`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-full aspect-w-3 aspect-h-2 overflow-hidden rounded-t-lg"${_scopeId}>`);
              if (blog.mainImage) {
                _push2(`<img${ssrRenderAttr("src", unref($urlFor)(blog.mainImage).url())} alt="Blog Image" class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "w-full aspect-w-3 aspect-h-2 overflow-hidden rounded-t-lg" }, [
                  blog.mainImage ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref($urlFor)(blog.mainImage).url(),
                    alt: "Blog Image",
                    class: "w-full h-full object-cover"
                  }, null, 8, ["src"])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="p-4"><h3 class="text-xl font-semibold text-darkNavy font-heading mb-2">${ssrInterpolate(blog.title)}</h3><p class="text-sm text-darkGray font-body">${ssrInterpolate(formatDate(blog.publishedDate))}</p></div></div>`);
      });
      _push(`<!--]--></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DmlmLjxt.mjs.map
