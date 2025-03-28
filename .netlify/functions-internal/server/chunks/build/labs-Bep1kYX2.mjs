import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _imports_0 = publicAssetsURL("/images/labsheroimage.png");
const _sfc_main$1 = {
  __name: "LabsHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-54ffd527><div class="relative" data-v-54ffd527><div data-v-54ffd527><img${ssrRenderAttr("src", _imports_0)} alt="Labs Hero Image" class="object-cover w-full h-full" data-v-54ffd527><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-54ffd527></div><div class="absolute inset-0 flex items-center px-6 md:px-8" data-v-54ffd527><div class="w-full max-w-screen-lg mx-auto" data-v-54ffd527><div class="w-full md:w-2/3" data-v-54ffd527><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-54ffd527> Bold Ideas Start Here </h1><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-54ffd527> Experiments and ideas from our Innovation Lab. </p></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/labs/LabsHero.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LabsHero = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-54ffd527"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "labs",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(LabsHero, null, null, _parent));
      _push(ssrRenderComponent(ContactForm, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/labs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=labs-Bep1kYX2.mjs.map
