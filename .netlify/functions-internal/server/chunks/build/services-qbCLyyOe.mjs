import _sfc_main$3 from './Customers-BnCU43c4.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as useRuntimeConfig, c as useSeoMeta, _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import ContactForm from './ContactForm-BB15n9US.mjs';
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
        description: "We are invested in your results. We have a small team because it is how we operate best. You will work directly with our principal consultants, not project managers and a rotating cast of contributors. Our proactive, embedded approach is what makes us stand out.",
        offerings: [
          "Direct collaboration with principal consultant",
          "Proactive and embedded approach",
          "Customized solutions tailored to your needs"
        ]
      },
      {
        image: "/images/full-stack-seo.png",
        // Replace with actual image path
        title: "Full Stack SEO",
        description: "We are writers and content creators. From writing top ranked content to founding successful podcasts, our team are veterans in the space. Check out our blog to see our content in action.",
        offerings: [
          "SEO-optimized blog posts",
          "Programmatic SEO",
          "Content strategy and planning"
        ]
      },
      {
        image: "/images/dashboards-reports.png",
        // Replace with actual image path
        title: "Web Analytics & Reporting",
        description: "We are innovators and tech experts. We bring years of experience as operators in martech as well as development chops. We blend the technical and creative to generate uncanny results. Our Labs is groundzero innovation at Knowbots.",
        offerings: [
          "Tag Manager set up",
          "GA4 and web analytics configuration",
          "Automated dashboards and reporting"
        ]
      },
      {
        image: "/images/ai-for-marketing.png",
        // Replace with actual image path
        title: "AI for Marketing",
        description: "We set a fast pace when it comes to delivering projects. Time-in-market is an advantage and we want to ensure you get the most value from our services. Not only are pacesetters; we are proactive partners always on the lookout for new ideas.",
        offerings: [
          "Cutting-edge expertise",
          "AI assistant development and automation",
          "Innovation-as-a-service"
        ]
      },
      {
        image: "/images/micro-app-websites.png",
        // Replace with actual image path
        title: "Micro Apps & Websites",
        description: "Curiosity is the fuel for our fire. We maintain a Lab where we experiment with AI tools and build micro apps. Innovation is what makes us tick.",
        offerings: [
          "Micro SaaS development",
          "AI & web dev projects",
          "Innovative projects and cutting edge tooling"
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-brownBackground py-16 px-8 border-t-2 border-gray-150" }, _attrs))} data-v-902e8035><div class="max-w-screen-lg mx-auto text-center mb-12" data-v-902e8035><h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy" data-v-902e8035> Our Services </h2><p class="text-xl leading-relaxed mb-8 text-darkNavy" data-v-902e8035> Our goal is to be your competitive advantage. </p></div><div class="max-w-screen-lg mx-auto space-y-12" data-v-902e8035><!--[-->`);
      ssrRenderList(valueProps, (prop, index) => {
        _push(`<div class="${ssrRenderClass([{ "md:flex-row-reverse md:space-x-reverse": index % 2 !== 0 }, "flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"])}" data-v-902e8035><div class="md:w-1/2" data-v-902e8035><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl" data-v-902e8035><img${ssrRenderAttr("src", prop.image)} alt="Value Proposition Image" class="object-cover h-full w-full" data-v-902e8035></div></div><div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4" data-v-902e8035><h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading" data-v-902e8035>${ssrInterpolate(prop.title)}</h3><p class="text-darkNavy leading-relaxed font-body mb-4" data-v-902e8035>${ssrInterpolate(prop.description)}</p><ul class="list-disc list-inside space-y-2 text-darkNavy font-body" data-v-902e8035><!--[-->`);
        ssrRenderList(prop.offerings, (item, idx) => {
          _push(`<li data-v-902e8035>${ssrInterpolate(item)}</li>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-902e8035"]]);
const _imports_0 = publicAssetsURL("/images/serviceshero.png");
const _sfc_main$1 = {
  __name: "ServicesHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-96515a9d><div class="relative" data-v-96515a9d><div data-v-96515a9d><img${ssrRenderAttr("src", _imports_0)} alt="Services Hero Image" class="object-cover object-top w-full h-full" data-v-96515a9d><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-96515a9d></div><div class="absolute inset-0 flex items-center px-6 md:px-8" data-v-96515a9d><div class="w-full max-w-screen-lg mx-auto" data-v-96515a9d><div class="sm:w-2/3 w-3/4" data-v-96515a9d><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-96515a9d> Digital Marketing Services </h1><div class="hidden sm:block" data-v-96515a9d><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-96515a9d> Blending Tech and Creativity for a Brighter Marketing Future. </p><button class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out" data-v-96515a9d> Tell Us How We Can Help </button></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/services/ServicesHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ServicesHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-96515a9d"]]);
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
//# sourceMappingURL=services-qbCLyyOe.mjs.map
