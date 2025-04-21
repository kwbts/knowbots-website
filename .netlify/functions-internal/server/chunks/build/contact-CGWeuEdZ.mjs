import { defineComponent, computed, reactive, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { b as useRuntimeConfig, c as useSeoMeta, _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
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

const _imports_0 = publicAssetsURL("/images/contact-hero-image.png");
const _sfc_main$1 = {
  __name: "ContactHero",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      company: "",
      message: ""
    });
    const isSubmitted = ref(false);
    const errorMessage = ref("");
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-a446045b><div class="relative" data-v-a446045b><img${ssrRenderAttr("src", _imports_0)} alt="Contact Hero Image" class="object-cover object-center w-full h-full" data-v-a446045b><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-a446045b></div><div class="absolute inset-0 flex items-center px-8 lg:px-4 xl:px-0" data-v-a446045b><div class="w-full max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center" data-v-a446045b><div class="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0" data-v-a446045b><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-a446045b> Digital Marketing Services </h1><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-a446045b> Imagine what we can build together </p></div><div class="w-full lg:w-1/2 flex justify-center lg:justify-end" data-v-a446045b><div class="bg-white border border-gray-200 shadow-lg p-8 rounded-lg w-full max-w-md" data-v-a446045b>`);
      if (!isSubmitted.value) {
        _push(`<div data-v-a446045b><h2 class="text-2xl font-bold mb-6 text-black font-heading" data-v-a446045b>Let&#39;s talk digital marketing strategy</h2><form name="knowbots-contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="grid grid-cols-1 gap-4" data-v-a446045b><input type="hidden" name="form-name" value="knowbots-contact" data-v-a446045b><div class="hidden" data-v-a446045b><label data-v-a446045b>Don&#39;t fill this out if you&#39;re human: <input name="bot-field" data-v-a446045b></label></div><div data-v-a446045b><label class="block mb-2 font-heading text-black" for="name" data-v-a446045b>Name</label><input${ssrRenderAttr("value", form.name)} type="text" id="name" name="name" placeholder="Your Name" class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300" required data-v-a446045b></div><div data-v-a446045b><label class="block mb-2 font-heading text-black" for="email" data-v-a446045b>Email</label><input${ssrRenderAttr("value", form.email)} type="email" id="email" name="email" placeholder="you@website.com" class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300" required data-v-a446045b></div><div data-v-a446045b><label class="block mb-2 font-heading text-black" for="company" data-v-a446045b>Company</label><input${ssrRenderAttr("value", form.company)} type="text" id="company" name="company" placeholder="Your Company" class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300" data-v-a446045b></div><div data-v-a446045b><label class="block mb-2 font-heading text-black" for="message" data-v-a446045b>How can we help?</label><textarea id="message" name="message" placeholder="Let us know how we can help" class="w-full px-4 py-3 rounded-md bg-white text-black border border-gray-300 resize-none" rows="4" required data-v-a446045b>${ssrInterpolate(form.message)}</textarea></div>`);
        if (errorMessage.value) {
          _push(`<div data-v-a446045b><p class="text-red-500" data-v-a446045b>${ssrInterpolate(errorMessage.value)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-a446045b><button type="submit" class="w-full bg-burntOrangeDark hover:bg-jasperOrange text-white font-bold font-body px-8 py-3 rounded-md shadow-md transition-all duration-200" data-v-a446045b> Get in Touch Today </button></div></form></div>`);
      } else {
        _push(`<div tabindex="-1" class="text-black" data-v-a446045b><h2 class="text-3xl font-bold mb-4 text-black font-heading" data-v-a446045b> Thank You! </h2><p class="text-lg text-black font-body mb-4" data-v-a446045b> We received your message and will get in touch shortly. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-burntOrange hover:text-jasperOrange font-body"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to Homepage `);
            } else {
              return [
                createTextVNode(" Return to Homepage ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contact/ContactHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ContactHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a446045b"]]);
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
      _push(ssrRenderComponent(ContactHero, _attrs, null, _parent));
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
//# sourceMappingURL=contact-CGWeuEdZ.mjs.map
