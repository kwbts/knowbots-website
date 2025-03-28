import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Customers",
  __ssrInlineRender: true,
  setup(__props) {
    const customers = [
      { name: "Knak", logo: "/images/knak-logo.png" },
      { name: "Bridgit", logo: "/images/bridgit-logo.webp" },
      { name: "MetaRouter", logo: "/images/metarouter-logo.png" },
      { name: "Nogin", logo: "/images/nogin-logo.jpg" }
      // Add more customers as needed
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-offWhiteBackground py-16 px-6" }, _attrs))}><div class="max-w-screen-lg mx-auto text-center py-4"><h2 class="text-3xl font-bold text-center mb-4 text-darkNavy font-heading"> Trusted by Forward-Thinking Teams Across Industries </h2><p class="text-xl leading-relaxed mb-8 text-darkGray font-light font-body"> From SEO to AI, we accelerate growth for industry leaders. </p><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(customers, (customer, index) => {
        _push(`<div class="flex items-center justify-center py-4 px-2 transition-opacity duration-200 hover:opacity-80"><img${ssrRenderAttr("src", customer.logo)}${ssrRenderAttr("alt", customer.name)} class="h-8 w-auto opacity-50"></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Customers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Customers-BnCU43c4.mjs.map
