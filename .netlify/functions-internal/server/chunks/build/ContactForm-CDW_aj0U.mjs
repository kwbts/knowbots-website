import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { reactive, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _imports_0 = publicAssetsURL("/images/nick-donaldson.jpeg");
const _sfc_main = {
  __name: "ContactForm",
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
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact-form",
        class: "bg-contactFormBackground text-darkGray pt-16 pb-16 px-8"
      }, _attrs))} data-v-235b6a56><div class="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center gap-12" data-v-235b6a56><div class="md:w-1/2" data-v-235b6a56><h2 class="text-4xl font-bold mb-4 text-darkTeal font-heading" data-v-235b6a56> Let&#39;s create marketing that stands out and delivers </h2><h3 class="text-2xl mb-6 text-darkGray font-body" data-v-235b6a56> Imagine what we can build together </h3><div class="flex items-start space-x-4" data-v-235b6a56><img${ssrRenderAttr("src", _imports_0)} alt="Nick Donaldson" class="w-12 h-12 rounded-full" data-v-235b6a56><div data-v-235b6a56><p class="italic text-darkGray mb-2 font-body" data-v-235b6a56> &quot;I&#39;m certain I have learnt more from Jon in one year than I would have in 2 Ivy League degrees. He&#39;s a champ.&quot; </p><p class="italic text-darkGray mb-2 font-body" data-v-235b6a56> &quot;When it comes to marketing, strategic thinking, and being an all-around nice person, Jon is world class.&quot; </p><p class="font-bold text-darkGray font-body" data-v-235b6a56> - Nick Donaldson <br data-v-235b6a56>Director of Growth @ Knak </p></div></div></div><div class="md:w-1/2 bg-white border border-gray-200 shadow-md p-8 rounded-3xl" data-v-235b6a56>`);
      if (!isSubmitted.value) {
        _push(`<div data-v-235b6a56><form name="knowbots-contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="grid grid-cols-2 gap-4" data-v-235b6a56><input type="hidden" name="form-name" value="knowbots-contact" data-v-235b6a56><p class="hidden" data-v-235b6a56><label data-v-235b6a56>Don&#39;t fill this out if you&#39;re human: <input name="bot-field" data-v-235b6a56></label></p><div data-v-235b6a56><label class="block mb-2 font-heading text-darkGray" for="name" data-v-235b6a56>Name</label><input${ssrRenderAttr("value", form.name)} type="text" id="name" name="name" placeholder="Your Name" class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300" required data-v-235b6a56></div><div data-v-235b6a56><label class="block mb-2 font-heading text-darkGray" for="email" data-v-235b6a56>Email</label><input${ssrRenderAttr("value", form.email)} type="email" id="email" name="email" placeholder="you@website.com" class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300" required data-v-235b6a56></div><div data-v-235b6a56><label class="block mb-2 font-heading text-darkGray" for="company" data-v-235b6a56>Company</label><input${ssrRenderAttr("value", form.company)} type="text" id="company" name="company" placeholder="Your Company" class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300" data-v-235b6a56></div><div data-v-235b6a56></div><div class="col-span-2" data-v-235b6a56><label class="block mb-2 font-heading text-darkGray" for="message" data-v-235b6a56>How can we help?</label><textarea id="message" name="message" placeholder="Let us know how we can help" class="w-full px-4 py-3 rounded-md bg-white text-darkGray border border-gray-300 resize-none" rows="5" required data-v-235b6a56>${ssrInterpolate(form.message)}</textarea></div>`);
        if (errorMessage.value) {
          _push(`<div class="col-span-2" data-v-235b6a56><p class="text-red-500" data-v-235b6a56>${ssrInterpolate(errorMessage.value)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="col-span-2" data-v-235b6a56><button type="submit" class="bg-burntOrangeDark hover:bg-jasperOrange text-white font-bold font-body px-8 py-3 rounded-md shadow-md transition-all duration-200" data-v-235b6a56> Get in Touch Today </button></div></form></div>`);
      } else {
        _push(`<div tabindex="-1" data-v-235b6a56><h2 class="text-3xl font-bold mb-4 text-darkTeal font-heading" data-v-235b6a56> Thank You! </h2><p class="text-lg text-darkGray font-body mb-4" data-v-235b6a56> We received your message and will get in touch shortly. </p>`);
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
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/ContactForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ContactForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-235b6a56"]]);

export { ContactForm as default };
//# sourceMappingURL=ContactForm-CDW_aj0U.mjs.map
