import _sfc_main$3 from './Customers-BnCU43c4.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as useRuntimeConfig, c as useSeoMeta, _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import ContactForm from './ContactForm-CDW_aj0U.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'get-it';
import 'get-it/middleware';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _sfc_main$2 = {
  __name: "ServicesCards",
  __ssrInlineRender: true,
  setup(__props) {
    const valueProps = [
      {
        image: "/images/content-creation.png",
        // Replace with actual image path
        title: "Content Creation",
        description: "We are invested in your results. Our small team structure is intentional\u2014it's how we operate best. You'll work directly with our principal consultants, not project managers or a revolving door of contributors. Our hands-on, embedded approach is what truly sets us apart.",
        offerings: [
          "Direct collaboration with principal consultants",
          "Proactive and embedded approach",
          "Customized solutions tailored to your needs"
        ]
      },
      {
        image: "/images/full-stack-seo.png",
        // Replace with actual image path
        title: "Full Stack SEO",
        description: "We are writers and content creators at heart. From crafting top-ranked articles to founding successful podcasts, our team brings veteran expertise to your projects. Our work balances search performance with exceptional writing quality\u2014check out our blog to see our content in action.",
        offerings: [
          "SEO-optimized blog posts that read like they were written for humans, not algorithms",
          "Programmatic SEO that scales your content strategy",
          "Content planning that aligns with both search trends and business goals"
        ]
      },
      {
        image: "/images/dashboards-reports.png",
        // Replace with actual image path
        title: "Web Analytics & Reporting",
        description: "We transform raw data into clear insights that drive smart decisions. Our technical expertise in implementation is matched by our ability to interpret results in ways that automated tools can't. We make complex data accessible and actionable through thoughtful analysis and clear reporting.",
        offerings: [
          "Tag Manager setup and optimization",
          "GA4 and web analytics configuration that tracks what matters",
          "Custom dashboards that tell the story behind your data"
        ]
      },
      {
        image: "/images/ai-for-marketing.png",
        // Replace with actual image path
        title: "AI for Marketing",
        description: "We harness AI as a tool that enhances human creativity, not replaces it. Our approach combines technical knowledge with strategic thinking to create efficiencies where appropriate while ensuring your marketing maintains its distinctive voice and direction.",
        offerings: [
          "Cutting-edge expertise in practical AI applications",
          "AI assistant development that supports rather than supplants your team",
          "Innovation-as-a-service that keeps you ahead of the curve"
        ]
      },
      {
        image: "/images/micro-app-websites.png",
        // Replace with actual image path
        title: "Micro Apps & Websites",
        description: "We build digital experiences that engage your audience and showcase your expertise. Our development skills and marketing knowledge come together to create tools and microsites that serve a strategic purpose\u2014not just flashy technology for its own sake.",
        offerings: [
          "Micro SaaS development that solves specific business problems",
          "Web development projects with marketing strategy built in",
          "Interactive tools that generate leads while providing value"
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-brownBackground py-16 px-8 border-t-2 border-gray-150" }, _attrs))} data-v-cef1da96><div class="max-w-screen-lg mx-auto text-center mb-12" data-v-cef1da96><h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy" data-v-cef1da96> Our Services </h2><p class="text-xl leading-relaxed mb-8 text-darkNavy" data-v-cef1da96> Tools and tactics carefully selected to drive your business forward. </p></div><div class="max-w-screen-lg mx-auto space-y-12" data-v-cef1da96><!--[-->`);
      ssrRenderList(valueProps, (prop, index) => {
        _push(`<div class="${ssrRenderClass([{ "md:flex-row-reverse md:space-x-reverse": index % 2 !== 0 }, "flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"])}" data-v-cef1da96><div class="md:w-1/2" data-v-cef1da96><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl" data-v-cef1da96><img${ssrRenderAttr("src", prop.image)} alt="Value Proposition Image" class="object-cover h-full w-full" data-v-cef1da96></div></div><div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4" data-v-cef1da96><h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading" data-v-cef1da96>${ssrInterpolate(prop.title)}</h3><p class="text-darkNavy leading-relaxed font-body mb-4" data-v-cef1da96>${ssrInterpolate(prop.description)}</p><ul class="list-disc list-inside space-y-2 text-darkNavy font-body" data-v-cef1da96><!--[-->`);
        ssrRenderList(prop.offerings, (item, idx) => {
          _push(`<li data-v-cef1da96>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/services/ServicesCards.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-cef1da96"]]);
const _imports_0 = publicAssetsURL("/images/serviceshero.png");
const _sfc_main$1 = {
  __name: "ServicesHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-5925fc40><div class="relative" data-v-5925fc40><div data-v-5925fc40><img${ssrRenderAttr("src", _imports_0)} alt="Services Hero Image" class="object-cover object-top w-full h-full" data-v-5925fc40><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-5925fc40></div><div class="absolute inset-0 flex items-center px-6 md:px-8" data-v-5925fc40><div class="w-full max-w-screen-lg mx-auto" data-v-5925fc40><div class="sm:w-2/3 w-3/4" data-v-5925fc40><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-5925fc40> Digital Marketing Services </h1><div class="hidden sm:block" data-v-5925fc40><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-5925fc40> Where Data-Driven Strategy Meets Creative Craftsmanship. </p><button class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out" data-v-5925fc40> Book An Intro Call </button></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/services/ServicesHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ServicesHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5925fc40"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const siteUrl = computed(() => config.public.siteUrl);
    useSeoMeta({
      // Essential tags
      title: "Digital Marketing Services - Knowbots Marketing",
      description: "Discover Knowbots Marketing\u2019s full suite of digital marketing services. We blend tech and creativity to drive SEO, analytics, AI, and web innovation for growth.",
      // Open Graph
      ogTitle: "Digital Marketing Services - Knowbots Marketing",
      ogDescription: "Explore how Knowbots Marketing combines technical expertise and creative strategies to deliver SEO, AI, and digital growth solutions for businesses.",
      ogType: "website",
      ogImage: () => `${siteUrl.value}/images/serviceshero.png`,
      ogUrl: () => `${siteUrl.value}/`,
      ogSiteName: "Knowbots Marketing",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: "Digital Marketing Services - Knowbots Marketing",
      twitterDescription: "Blending tech and creativity, Knowbots Marketing offers SEO, AI, and web analytics services to accelerate your growth.",
      twitterImage: () => `${siteUrl.value}/images/serviceshero.png`,
      // Basic SEO controls
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Customers = _sfc_main$3;
      const _component_ServicesCards = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(ServicesHero, null, null, _parent));
      _push(ssrRenderComponent(_component_Customers, null, null, _parent));
      _push(ssrRenderComponent(_component_ServicesCards, null, null, _parent));
      _push(ssrRenderComponent(ContactForm, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=services-CFR8K4Xt.mjs.map
