import { _ as _export_sfc, d as useNuxtApp, g as useRoute, c as useSeoMeta, u as useHead, a as __nuxt_component_0$1, e as asyncDataDefaults, f as createError } from './server.mjs';
import { withAsyncContext, computed, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, createBlock, createCommentVNode, openBlock, toDisplayString, ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { parseISO, format } from 'date-fns';
import { PortableText } from '@portabletext/vue';
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

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useBlogSchema = () => {
  const baseUrl = "https://knowbots.ca";
  const createBlogPostSchema = (post, options = {}) => {
    var _a;
    if (!post) return null;
    const {
      urlFor = null,
      defaultImagePath = "/images/knowbots-default.jpg",
      defaultAuthor = "Knowbots",
      companyInfo = null
    } = options;
    const getImageUrl = () => {
      var _a2;
      if ((_a2 = post.mainImage) == null ? void 0 : _a2.asset) {
        return urlFor ? urlFor(post.mainImage.asset).width(1200).url() : post.mainImage.asset.url;
      }
      return `${baseUrl}${defaultImagePath}`;
    };
    const getPublishedDate = () => {
      return post.publishedDate || post.publishedAt || (/* @__PURE__ */ new Date()).toISOString();
    };
    const getModifiedDate = () => {
      return post.lastModified || getPublishedDate();
    };
    const getAuthor = () => {
      var _a2, _b;
      const authorInfo = {
        "@type": "Person",
        "name": ((_a2 = post.author) == null ? void 0 : _a2.name) || defaultAuthor
      };
      if (post.author) {
        if (post.author.jobTitle) {
          authorInfo.jobTitle = post.author.jobTitle;
        }
        if (post.author.url) {
          authorInfo.url = post.author.url;
        } else if (post.author.slug) {
          authorInfo.url = `${baseUrl}/authors/${post.author.slug.current}`;
        }
        if ((_b = post.author.image) == null ? void 0 : _b.asset) {
          authorInfo.image = urlFor ? urlFor(post.author.image.asset).width(400).url() : post.author.image.asset.url;
        }
        if (post.author.socialProfiles && post.author.socialProfiles.length > 0) {
          authorInfo.sameAs = [];
          post.author.socialProfiles.forEach((profile) => {
            if (profile.url) authorInfo.sameAs.push(profile.url);
          });
        }
        if (post.author.bio) {
          authorInfo.description = post.author.bio;
        }
      }
      if (companyInfo && companyInfo.authorProfiles) {
        if (!authorInfo.sameAs) authorInfo.sameAs = [];
        companyInfo.authorProfiles.forEach((profile) => {
          if (profile.url) authorInfo.sameAs.push(profile.url);
        });
      }
      return authorInfo;
    };
    const getPublisher = () => {
      const publisher = {
        "@type": "Organization",
        "name": "Knowbots",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        },
        "url": baseUrl
      };
      if (companyInfo && companyInfo.socialProfiles) {
        publisher.sameAs = companyInfo.socialProfiles.map((profile) => profile.url).filter(Boolean);
      }
      return publisher;
    };
    const getKeywords = () => {
      if (post.categories && post.categories.length > 0) {
        return post.categories.map((cat) => cat.title).join(", ");
      }
      return null;
    };
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": [getImageUrl()],
      "datePublished": getPublishedDate(),
      "dateModified": getModifiedDate(),
      "author": getAuthor(),
      "publisher": getPublisher(),
      "description": post.seoDescription || post.description || "",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${((_a = post.slug) == null ? void 0 : _a.current) || ""}`
      }
    };
    const keywords = getKeywords();
    if (keywords) {
      schema.keywords = keywords;
    }
    if (post.wordCount) {
      schema.wordCount = post.wordCount;
    }
    return schema;
  };
  const generateSchemaScript = (schema) => {
    if (!schema) return "";
    return `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
  };
  return {
    createBlogPostSchema,
    generateSchemaScript
  };
};
const _sfc_main$6 = {
  __name: "HeaderBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const headerTag = computed(() => {
      const level = parseInt(props.value.level, 10);
      if (level >= 1 && level <= 6) {
        return `h${level}`;
      }
      console.warn(`Invalid header level: ${props.value.level}. Defaulting to 'h2'.`);
      return "h2";
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(headerTag.value), mergeProps({ class: "mb-6" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.value.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.value.text), 1)
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/HeaderBlock.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeaderBlock = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-4ca5bfde"]]);
const _sfc_main$5 = {
  __name: "ParagraphBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { value } = props;
    const myPortableTextComponents = {
      // Define your custom components or leave empty for default rendering
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PortableText), mergeProps({
        value: unref(value).content,
        components: myPortableTextComponents
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/ParagraphBlock.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "MediaBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { $urlFor } = useNuxtApp();
    const imageUrl = computed(
      () => props.value.image ? $urlFor(props.value.image).width(800).url() : ""
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<figure${ssrRenderAttrs(mergeProps({ class: "mb-8" }, _attrs))}><img${ssrRenderAttr("src", imageUrl.value)}${ssrRenderAttr("alt", __props.value.alt || "Media Image")}>`);
      if (__props.value.caption) {
        _push(`<figcaption class="text-sm text-gray-600 mt-2">${ssrInterpolate(__props.value.caption)}</figcaption>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</figure>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/MediaBlock.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "QuoteBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { value } = props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<blockquote${ssrRenderAttrs(mergeProps({ class: "border-l-4 border-gray-300 pl-4 italic my-8" }, _attrs))}><p>${ssrInterpolate(unref(value).quote)}</p>`);
      if (unref(value).attribution) {
        _push(`<footer class="text-sm text-gray-600 mt-2"> \u2014 ${ssrInterpolate(unref(value).attribution)}</footer>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</blockquote>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/QuoteBlock.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "TableBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { value } = props;
    const rows = value.rows || [];
    const headers = ((_a = rows[0]) == null ? void 0 : _a.columns) || [];
    const dataRows = rows.slice(1) || [];
    const rowClass = (index) => index % 2 === 0 ? "bg-white" : "bg-gray-50";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<table${ssrRenderAttrs(mergeProps({ class: "table-auto w-full mb-8" }, _attrs))}><thead><tr><!--[-->`);
      ssrRenderList(unref(headers), (cell, index) => {
        _push(`<th class="border px-4 py-2 bg-gray-100">${ssrInterpolate(cell)}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(dataRows), (row, rowIndex) => {
        _push(`<tr class="${ssrRenderClass(rowClass(rowIndex))}"><!--[-->`);
        ssrRenderList(row.columns, (cell, cellIndex) => {
          _push(`<td class="border px-4 py-2">${ssrInterpolate(cell)}</td>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/TableBlock.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SpacerBlock",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const spacerClass = {
      small: "h-4",
      medium: "h-8",
      large: "h-12"
    }[props.value.size] || "h-8";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: unref(spacerClass) }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/SpacerBlock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $sanityClient, $urlFor } = useNuxtApp();
    const route = useRoute();
    const slug = route.params.slug || "";
    console.log("Slug:", slug);
    const {
      data: blogPost,
      pending: isLoading,
      error
    } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `blog-post-${slug}`,
      () => $sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      publishedDate,
      lastModified,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      "author": author->{
        name,
        jobTitle,
        "slug": slug,
        bio,
        image{
          asset->{
            _id,
            url
          }
        },
        socialProfiles[]{
          platform,
          url
        }
      },
      categories[]->{
        title
      },
      content[] {
        ...,
        // Include any necessary references or nested objects
      },
      seoTitle,
      seoDescription,
      description
    }`,
        { slug }
      )
    )), __temp = await __temp, __restore(), __temp);
    console.log("Fetched blog post:", blogPost);
    const {
      data: recentPosts,
      pending: recentPostsLoading,
      error: recentPostsError
    } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `recent-posts-exclude-${slug}`,
      () => $sanityClient.fetch(
        `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      }
    }`,
        { slug }
      )
    )), __temp = await __temp, __restore(), __temp);
    const formatDate = (dateStr, fallbackDateStr) => {
      const dateToFormat = dateStr || fallbackDateStr;
      if (!dateToFormat) return "Unknown date";
      try {
        const date = parseISO(dateToFormat);
        return format(date, "MMM d, yyyy");
      } catch (error2) {
        console.error("Date parsing error:", error2);
        return "Invalid date";
      }
    };
    const blockComponents = {
      header: HeaderBlock,
      paragraph: _sfc_main$5,
      media: _sfc_main$4,
      quote: _sfc_main$3,
      table: _sfc_main$2,
      spacer: _sfc_main$1
    };
    const getBlockComponent = (blockType) => {
      return blockComponents[blockType] || null;
    };
    useSeoMeta({
      title: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoTitle) || `${(_b = blogPost.value) == null ? void 0 : _b.title} - Knowbots`;
      },
      description: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoDescription) || ((_b = blogPost.value) == null ? void 0 : _b.description);
      },
      // Open Graph
      ogTitle: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoTitle) || ((_b = blogPost.value) == null ? void 0 : _b.title);
      },
      ogDescription: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoDescription) || ((_b = blogPost.value) == null ? void 0 : _b.description);
      },
      ogImage: () => {
        var _a, _b, _c, _d, _e, _f;
        return ((_c = (_b = (_a = blogPost.value) == null ? void 0 : _a.ogImage) == null ? void 0 : _b.asset) == null ? void 0 : _c.url) || ((_f = (_e = (_d = blogPost.value) == null ? void 0 : _d.mainImage) == null ? void 0 : _e.asset) == null ? void 0 : _f.url);
      },
      ogType: "article",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoTitle) || ((_b = blogPost.value) == null ? void 0 : _b.title);
      },
      twitterDescription: () => {
        var _a, _b;
        return ((_a = blogPost.value) == null ? void 0 : _a.seoDescription) || ((_b = blogPost.value) == null ? void 0 : _b.description);
      },
      twitterImage: () => {
        var _a, _b, _c, _d, _e, _f;
        return ((_c = (_b = (_a = blogPost.value) == null ? void 0 : _a.ogImage) == null ? void 0 : _b.asset) == null ? void 0 : _c.url) || ((_f = (_e = (_d = blogPost.value) == null ? void 0 : _d.mainImage) == null ? void 0 : _e.asset) == null ? void 0 : _f.url);
      },
      // Article specific
      articlePublishedTime: () => {
        var _a;
        return (_a = blogPost.value) == null ? void 0 : _a.publishedAt;
      },
      articleModifiedTime: () => {
        var _a;
        return (_a = blogPost.value) == null ? void 0 : _a.lastModified;
      },
      articleAuthor: () => {
        var _a, _b;
        return (_b = (_a = blogPost.value) == null ? void 0 : _a.author) == null ? void 0 : _b.name;
      }
    });
    const { createBlogPostSchema } = useBlogSchema();
    const blogSchema = computed(() => {
      if (!blogPost.value) return null;
      const companyInfo = {
        socialProfiles: [
          // Company social profiles
          { platform: "LinkedIn Company", url: "https://www.linkedin.com/company/knowbots-marketing/" },
          // Your company LinkedIn
          { platform: "Website", url: "https://www.knowbots.ca" }
          // Add more company social profiles as needed
        ],
        authorProfiles: [
          // Personal author profiles (when you're the author)
          { platform: "LinkedIn Personal", url: "https://www.linkedin.com/in/jontaylor85/" }
          // Your personal LinkedIn
          // Add more personal profiles as needed
          // { platform: 'Twitter', url: 'https://twitter.com/yourusername' },
          // { platform: 'GitHub', url: 'https://github.com/yourusername' },
        ]
      };
      return createBlogPostSchema(blogPost.value, {
        urlFor: $urlFor,
        defaultImagePath: "/images/knowbots-default.jpg",
        defaultAuthor: "Knowbots",
        companyInfo
      });
    });
    useHead({
      script: computed(() => {
        if (!blogSchema.value) return [];
        return [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(blogSchema.value)
          }
        ];
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow" }, _attrs))} data-v-35826142><section class="bg-offWhiteBackground py-16 px-8 pt-24" data-v-35826142><div class="max-w-screen-lg mx-auto px-20 blog-content" data-v-35826142>`);
      if (unref(isLoading)) {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-gray-500" data-v-35826142>Loading...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-red-500" data-v-35826142>${ssrInterpolate(unref(error).message)}</p></div>`);
      } else if (unref(blogPost)) {
        _push(`<div data-v-35826142>`);
        if (unref(blogPost).mainImage) {
          _push(`<div class="mb-4" data-v-35826142><img${ssrRenderAttr("src", unref($urlFor)(unref(blogPost).mainImage.asset).width(800).url())}${ssrRenderAttr("alt", unref(blogPost).mainImage.alt || "Blog Image")} class="w-full h-auto object-cover rounded-lg" data-v-35826142></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col sm:flex-row sm:space-x-16" data-v-35826142><div class="mb-4 sm:mb-0 tight-spacing" data-v-35826142><p class="text-sm text-darkGray font-body font-bold mb-1" data-v-35826142>Written by</p><p class="text-sm text-darkGray font-body" data-v-35826142>${ssrInterpolate(((_a = unref(blogPost).author) == null ? void 0 : _a.name) || "Unknown Author")}</p></div><div class="tight-spacing" data-v-35826142><p class="text-sm text-darkGray font-body font-bold mb-1" data-v-35826142>Published on</p><p class="text-sm text-darkGray font-body" data-v-35826142>${ssrInterpolate(formatDate(unref(blogPost).publishedDate, unref(blogPost).publishedAt))}</p></div></div><hr class="custom-hr" data-v-35826142><h1 data-v-35826142>${ssrInterpolate(unref(blogPost).title)}</h1>`);
        if (unref(blogPost).content && unref(blogPost).content.length) {
          _push(`<div data-v-35826142><!--[-->`);
          ssrRenderList(unref(blogPost).content, (block, index) => {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getBlockComponent(block._type) || "div"), {
              key: block._key || index,
              value: block
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (!getBlockComponent(block._type)) {
                    _push2(`<p class="text-red-500" data-v-35826142${_scopeId}>Unsupported block type: ${ssrInterpolate(block._type)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    !getBlockComponent(block._type) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-red-500"
                    }, "Unsupported block type: " + toDisplayString(block._type), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }), _parent);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-gray-500" data-v-35826142>No blog post found.</p></div>`);
      }
      _push(`</div></section><section class="bg-brownBackground py-8 px-8 border-b-2 border-gray-150" data-v-35826142><div class="max-w-screen-lg mx-auto read-more-section px-12 text-center pb-8" data-v-35826142><h2 class="text-2xl font-bold mb-6 text-darkNavy" data-v-35826142>Read More</h2>`);
      if (unref(recentPostsLoading)) {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-gray-500" data-v-35826142>Loading recent posts...</p></div>`);
      } else if (unref(recentPostsError)) {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-red-500" data-v-35826142>${ssrInterpolate(unref(recentPostsError).message)}</p></div>`);
      } else if (unref(recentPosts) && unref(recentPosts).length) {
        _push(`<div data-v-35826142><div class="grid grid-cols-1 sm:grid-cols-3 gap-6" data-v-35826142><!--[-->`);
        ssrRenderList(unref(recentPosts), (post) => {
          _push(`<div class="post-card hover:shadow-2xl hover:shadow-black border-solid border border-gray-300 transition duration-200 ease-in-out" data-v-35826142>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/blog/${post.slug.current}/`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", unref($urlFor)(post.mainImage.asset).width(600).height(400).fit("crop").url())}${ssrRenderAttr("alt", post.mainImage.alt || post.title)} class="w-full h-48 object-cover rounded-t-lg" data-v-35826142${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: unref($urlFor)(post.mainImage.asset).width(600).height(400).fit("crop").url(),
                    alt: post.mainImage.alt || post.title,
                    class: "w-full h-48 object-cover rounded-t-lg"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="p-4" data-v-35826142>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/blog/${post.slug.current}/`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="text-xl font-semibold text-darkNavy mb-2 hover:text-burntOrange transition-colors duration-200" data-v-35826142${_scopeId}>${ssrInterpolate(post.title)}</h3>`);
              } else {
                return [
                  createVNode("h3", { class: "text-xl font-semibold text-darkNavy mb-2 hover:text-burntOrange transition-colors duration-200" }, toDisplayString(post.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="text-sm text-darkGray" data-v-35826142>${ssrInterpolate(formatDate(post.publishedAt))}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="text-center" data-v-35826142><p class="text-lg text-gray-500" data-v-35826142>No recent posts available.</p></div>`);
      }
      _push(`</div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35826142"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CuNImRR-.mjs.map
