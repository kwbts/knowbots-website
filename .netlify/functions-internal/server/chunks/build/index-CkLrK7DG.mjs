import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import _sfc_main$4 from './Customers-BnCU43c4.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { b as useRuntimeConfig, c as useSeoMeta, _ as _export_sfc } from './server.mjs';
import ContactForm from './ContactForm-BB15n9US.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'get-it';
import 'get-it/middleware';

const _imports_0 = publicAssetsURL("/images/homepage-hero.png");
const _sfc_main$3 = {
  __name: "HomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-a0fb170f><div class="relative" data-v-a0fb170f><div data-v-a0fb170f><img${ssrRenderAttr("src", _imports_0)} alt="Hero Image" class="object-cover w-full h-full" data-v-a0fb170f><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-a0fb170f></div><div class="absolute inset-0 flex items-center px-8 lg:px-4 xl:px-0" data-v-a0fb170f><div class="w-full max-w-screen-lg mx-auto" data-v-a0fb170f><div class="sm:w-2/3 w-1/2" data-v-a0fb170f><h1 class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-a0fb170f> We Speak Algorithm So You Don&#39;t Have To </h1><div class="hidden sm:block" data-v-a0fb170f><p class="sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-a0fb170f> The future of digital marketing is here. Build it with Knowbots. </p><button class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out" data-v-a0fb170f> Book An Intro Call </button></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeHero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HomeHero = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a0fb170f"]]);
const _sfc_main$2 = {
  __name: "HomeValueProps",
  __ssrInlineRender: true,
  setup(__props) {
    const valueProps = [
      {
        image: "/images/partnership.png",
        // Replace with actual image path
        title: "An Extension of Your Team",
        alt: "Astronauts climbing mountain representing our approach",
        description: "We don\u2019t do bureaucracy. You won\u2019t get passed off to project managers or lost in a rotating roster. You\u2019ll work directly with our principal consultants\u2014proactive, invested, and relentless. We\u2019re your competitive advantage, embedded where it matters most."
      },
      {
        image: "/images/content.png",
        // Replace with actual image path
        title: "World-Class Content",
        alt: "Books and notepads representing content marketing",
        description: "We\u2019re not just content creators; we\u2019re storytellers, strategists, and SEO veterans. From top-ranked articles to successful podcasts, our team crafts content that drives traffic and tells your story."
      },
      {
        image: "/images/experts.png",
        // Replace with actual image path
        title: "Tech Experts",
        alt: "Futuristic computer",
        description: "Marketing moves fast, and we move faster. With martech expertise, development skills, and a curiosity that never quits, we combine technical precision with creative firepower. Our Labs is where cutting-edge ideas come to life."
      },
      {
        image: "/images/delivery.png",
        // Replace with actual image path
        title: "Unmatched Rate of Delivery",
        alt: "Flowers growing out of pots",
        description: "We set a fast pace when it comes to delivering projects. Time-in-market is an advantage and we want to ensure you get the most value from our services. Not only are pacesetters; we are proactive partners always on the lookout for new ideas."
      },
      {
        image: "/images/innovating.png",
        // Replace with actual image path
        title: "Innovation at the Cutting Edge",
        alt: "An innovation lab with scientific equipment",
        description: "Curiosity drives us. Our Lab experiments with AI tools and builds micro-apps to stay one step ahead of the curve. When you partner with us, you get the benefit of that momentum."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-brownBackground py-16 px-8 border-t-2 border-gray-150" }, _attrs))} data-v-4df02d13><div class="max-w-screen-lg mx-auto text-center mb-12" data-v-4df02d13><h2 class="font-heading text-4xl md:text-5xl font-bold mb-4 text-darkNavy" data-v-4df02d13> Field Tested Digital Marketing </h2><p class="text-xl leading-relaxed mb-8 text-darkNavy" data-v-4df02d13> We\u2019re not here to keep pace\u2014we\u2019re here to set it. </p></div><div class="max-w-screen-lg mx-auto space-y-12" data-v-4df02d13><!--[-->`);
      ssrRenderList(valueProps, (prop, index) => {
        _push(`<div class="${ssrRenderClass([{ "md:flex-row-reverse md:space-x-reverse": index % 2 !== 0 }, "flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"])}" data-v-4df02d13><div class="md:w-1/2" data-v-4df02d13><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl" data-v-4df02d13><img${ssrRenderAttr("src", prop.image)}${ssrRenderAttr("alt", prop.alt)} class="object-cover h-full w-full" data-v-4df02d13></div></div><div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4" data-v-4df02d13><h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading" data-v-4df02d13>${ssrInterpolate(prop.title)}</h3><p class="text-darkNavy leading-relaxed font-body" data-v-4df02d13>${ssrInterpolate(prop.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeValueProps.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const HomeValueProps = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4df02d13"]]);
const _sfc_main$1 = {
  __name: "HomeServices",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [
      {
        image: "/images/seo.png",
        title: "Full-Stack SEO",
        description: "From in-depth audits to content creation and keyword targeting, we optimize every inch of your digital presence."
      },
      {
        image: "/images/data-reports.png",
        title: "Web Analytics & Reporting",
        description: "Need GA4? Google Tag Manager audits? Dashboards that make your wins crystal clear? Done, done, and done."
      },
      {
        image: "/images/ai-marketing.png",
        title: "AI for Marketing",
        description: "We\u2019re emerging leaders in AI. Whether it\u2019s training your team on cutting-edge tools or building an AI assistant, we\u2019ve got you covered."
      },
      {
        image: "/images/micro-app.png",
        title: "Micro Apps and Websites",
        description: "From calculators to AI-driven tools, we build micro-apps and interactive websites that bring your coolest ideas to life."
      }
      // Add more services as needed
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-150" }, _attrs))} data-v-d8eb64e5><div class="max-w-screen-lg mx-auto text-center mb-12" data-v-d8eb64e5><h2 class="text-4xl md:text-5xl font-bold mb-4 text-darkNavy font-heading" data-v-d8eb64e5> Our Services Make A Difference </h2><p class="text-xl leading-relaxed mb-8 text-darkGray font-body" data-v-d8eb64e5> Your goals are our compass. These are the tools we use to get you there: </p></div><div class="max-w-screen-lg mx-auto space-y-12" data-v-d8eb64e5><!--[-->`);
      ssrRenderList(services, (service, index) => {
        _push(`<div class="${ssrRenderClass([{ "md:flex-row-reverse md:space-x-reverse": index % 2 !== 0 }, "flex flex-col md:flex-row items-center w-full border border-gray-200 shadow-lg p-6 md:space-x-6 bg-white rounded-3xl hover:shadow-2xl hover:border-gray-300 transition duration-200 ease-in-out"])}" data-v-d8eb64e5><div class="md:w-1/2" data-v-d8eb64e5><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden rounded-3xl" data-v-d8eb64e5><img${ssrRenderAttr("src", service.image)}${ssrRenderAttr("alt", service.title)} class="object-cover h-full w-full" data-v-d8eb64e5></div></div><div class="md:w-1/2 flex flex-col justify-center md:mt-0 mt-4" data-v-d8eb64e5><h3 class="text-2xl font-semibold mb-4 text-darkNavy font-heading" data-v-d8eb64e5>${ssrInterpolate(service.title)}</h3><p class="text-darkGray leading-relaxed font-body" data-v-d8eb64e5>${ssrInterpolate(service.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeServices.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HomeServices = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d8eb64e5"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const siteUrl = computed(() => config.public.siteUrl);
    useSeoMeta({
      // Essential tags
      title: "Knowbots Marketing - Growth Lab and Consultancy",
      description: "Explore the future of digital marketing with Knowbots Marketing. From SEO to AI, we accelerate growth with innovative strategies and technical expertise.",
      // Open Graph
      ogTitle: "Knowbots Marketing - Growth Lab and Consultancy",
      ogDescription: "Knowbots Marketing combines SEO, AI innovation, and tech-driven strategies to accelerate growth for industry leaders.",
      ogType: "website",
      ogImage: () => `${siteUrl.value}/images/homepage-hero.png`,
      ogUrl: () => `${siteUrl.value}/`,
      ogSiteName: "Knowbots Marketing",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: "Knowbots Marketing - Growth Lab and Consultancy",
      twitterDescription: "Explore the future of digital marketing with Knowbots Marketing. From SEO to AI, we deliver cutting-edge solutions for growth.",
      twitterImage: () => `${siteUrl.value}/images/homepage-hero.png`,
      // Basic SEO controls
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(HomeHero, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(HomeValueProps, null, null, _parent));
      _push(ssrRenderComponent(HomeServices, null, null, _parent));
      _push(ssrRenderComponent(ContactForm, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CkLrK7DG.mjs.map
