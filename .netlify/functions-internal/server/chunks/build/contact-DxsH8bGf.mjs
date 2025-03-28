import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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

const _imports_0 = publicAssetsURL("/images/contact-hero-image.png");
const _sfc_main$1 = {
  __name: "ContactHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-83e433f1><div class="relative" data-v-83e433f1><div data-v-83e433f1><img${ssrRenderAttr("src", _imports_0)} alt="Contact Hero Image" class="object-cover object-center w-full h-full" data-v-83e433f1><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-83e433f1></div><div class="absolute inset-0 flex items-center px-6 md:px-8" data-v-83e433f1><div class="w-full max-w-screen-lg mx-auto" data-v-83e433f1><div class="w-full md:w-2/3" data-v-83e433f1><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-83e433f1> We Can Help </h1><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-83e433f1> Let&#39;s talk about your digital marketing strategy. </p></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contact/ContactHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ContactHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-83e433f1"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const siteUrl = computed(() => config.public.siteUrl);
    useSeoMeta({
      // Essential tags
      title: "Contact Us - Knowbots",
      description: "Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let\u2019s build something great together.",
      // Open Graph
      ogTitle: "Contact Us - Knowbots",
      ogDescription: "Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let\u2019s build something great together.",
      ogType: "website",
      ogImage: () => `${siteUrl.value}/images/contact-form-hero.jpg`,
      // Replace with the correct image path if needed
      ogUrl: () => `${siteUrl.value}/`,
      ogSiteName: "Knowbots",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: "Contact Us - Knowbots",
      twitterDescription: "Get in touch with Knowbots to talk digital marketing, SEO, and strategy. Let\u2019s build something great together.",
      twitterImage: () => `${siteUrl.value}/images/contact-form-hero.jpg`,
      // Replace with the correct image path
      // Basic SEO controls
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(ContactHero, null, null, _parent));
      _push(ssrRenderComponent(ContactForm, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-DxsH8bGf.mjs.map
