import { p as publicAssetsURL, a as buildAssetsURL } from '../routes/renderer.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { b as useRuntimeConfig, c as useSeoMeta, _ as _export_sfc } from './server.mjs';
import ContactForm from './ContactForm-CDW_aj0U.mjs';
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

const _imports_0$1 = publicAssetsURL("/images/about-knowbots.png");
const _sfc_main$2 = {
  __name: "AboutHero",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative bg-deepPurple text-white" }, _attrs))} data-v-166d99b6><div class="relative" data-v-166d99b6><div data-v-166d99b6><img${ssrRenderAttr("src", _imports_0$1)} alt="About Us Hero Image" class="object-cover object-top w-full h-full" data-v-166d99b6><div class="absolute inset-0 bg-deepPurple opacity-60" data-v-166d99b6></div><div class="absolute inset-0 flex items-center px-6 md:px-8" data-v-166d99b6><div class="w-full max-w-screen-lg mx-auto" data-v-166d99b6><div class="w-full md:w-2/3" data-v-166d99b6><h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide mb-4 leading-tight font-heading pt-10 sm:pt-0" data-v-166d99b6> The Minds Behind Knowbots </h1><div class="hidden sm:block" data-v-166d99b6><p class="text-lg sm:text-xl md:text-2xl mb-6 font-light font-body" data-v-166d99b6> Where Analytical Thinking Meets Creative Execution. </p><button class="bg-burntOrangeDark font-body hover:bg-jasperOrange text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out" data-v-166d99b6> Tell Us How We Can Help </button></div></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/AboutHero.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AboutHero = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-166d99b6"]]);
const _imports_0 = "" + buildAssetsURL("our-passion.C7JnY3Ja.png");
const _imports_1 = "" + buildAssetsURL("unique-skills.Ckg4OQ6c.png");
const _imports_2 = publicAssetsURL("/images/story-knowbots.png");
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-grow" }, _attrs))} data-v-b8a5d9de><section class="bg-blueBackground py-16 px-8 border-t-2 border-b-2 border-gray-300" data-v-b8a5d9de><div class="max-w-screen-lg mx-auto text-center mb-12" data-v-b8a5d9de><h2 class="text-5xl font-bold mb-4 font-heading text-darkNavy" data-v-b8a5d9de> From Our Founder </h2><p class="text-xl leading-relaxed mb-8 text-darkNavy font-body" data-v-b8a5d9de> Totally human, most days. </p></div><div class="max-w-screen-lg mx-auto space-y-12" data-v-b8a5d9de><div class="flex flex-col md:flex-row items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400" data-v-b8a5d9de><div class="md:w-1/3 h-full rounded-lg overflow-hidden" data-v-b8a5d9de><img${ssrRenderAttr("src", _imports_0)} alt="Our Passion" class="object-cover w-full h-full" style="${ssrRenderStyle({ "aspect-ratio": "3 / 4" })}" data-v-b8a5d9de></div><div class="md:w-2/3 p-6" data-v-b8a5d9de><h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading" data-v-b8a5d9de> Driven by Curiosity </h2><p class="text-darkGray leading-relaxed font-body" data-v-b8a5d9de> Digital marketing is applied science to me. I approach each challenge with equal parts analytical thinking and creative problem-solving\u2014testing hypotheses, measuring outcomes, and refining approaches based on data.</p><p class="text-darkGray leading-relaxed font-body mt-4" data-v-b8a5d9de> As a builder, I combine martech expertise with a storyteller&#39;s instinct. I&#39;m equally interested in mastering technical SEO and crafting narratives that connect. This fusion of skills is what makes Knowbots different from agencies that excel at either technical execution OR creative development, but rarely both.</p></div></div><div class="flex flex-col md:flex-row-reverse items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400" data-v-b8a5d9de><div class="md:w-1/3 h-full rounded-lg overflow-hidden" data-v-b8a5d9de><img${ssrRenderAttr("src", _imports_1)} alt="Unique Skills" class="object-cover w-full h-full" style="${ssrRenderStyle({ "aspect-ratio": "3 / 4" })}" data-v-b8a5d9de></div><div class="md:w-2/3 p-6" data-v-b8a5d9de><h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading" data-v-b8a5d9de> Strategic Observer </h2><p class="text-darkGray leading-relaxed font-body" data-v-b8a5d9de> My natural tendency is to collect and synthesize information, finding patterns others miss. This makes me particularly effective at SEO research, competitive analysis, and identifying content opportunities that deliver real results. I don&#39;t chase marketing trends\u2014I analyze what works and why. </p><p class="text-darkGray leading-relaxed font-body mt-4" data-v-b8a5d9de> In a world of marketing generalists, I&#39;ve chosen depth over breadth. Rather than offering surface-level knowledge across dozens of channels, I focus on becoming genuinely expert in the areas where I can deliver exceptional value. </p></div></div><div class="flex flex-col md:flex-row items-center w-full border border-gray-300 shadow-md rounded-lg transition-transform transform hover:shadow-lg hover:border-gray-400" data-v-b8a5d9de><div class="md:w-1/3 h-full rounded-lg overflow-hidden" data-v-b8a5d9de><img${ssrRenderAttr("src", _imports_2)} alt="Our Story" class="object-cover w-full h-full" style="${ssrRenderStyle({ "aspect-ratio": "3 / 4" })}" data-v-b8a5d9de></div><div class="md:w-2/3 p-6" data-v-b8a5d9de><h2 class="text-3xl font-semibold mb-4 text-darkNavy font-heading" data-v-b8a5d9de> Why We Remain Small </h2><p class="text-darkGray leading-relaxed font-body" data-v-b8a5d9de> I founded Knowbots with a simple mission: practice my craft at the highest level for a small number of clients who value personalized service. By intentionally limiting our size, we ensure you work directly with expert consultants who are invested in your success. </p><p class="text-darkGray leading-relaxed font-body mt-4" data-v-b8a5d9de> This approach creates a different kind of agency relationship\u2014one where we function as an extension of your team rather than an external vendor. We&#39;re genuinely invested in your outcomes because your success is our success. </p></div></div></div></section></main>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/AboutDetails.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AboutDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b8a5d9de"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const siteUrl = computed(() => config.public.siteUrl);
    useSeoMeta({
      // Essential tags
      title: "About Us - Knowbots Marketing - Growth Lab and Consultancy",
      description: "Discover the story of Knowbots Marketing, where passion, innovation, and expertise in SEO, AI, and digital marketing fuel results for industry leaders.",
      // Open Graph
      ogTitle: "About Us - Knowbots Marketing",
      ogDescription: "Learn more about Knowbots Marketing: a boutique consultancy blending technical expertise, strategic content, and AI innovation to drive growth.",
      ogType: "website",
      ogImage: () => `${siteUrl.value}/images/about-knowbots.png`,
      ogUrl: () => `${siteUrl.value}/`,
      ogSiteName: "Knowbots Marketing",
      // Twitter
      twitterCard: "summary_large_image",
      twitterTitle: "About Us - Knowbots Marketing",
      twitterDescription: "Explore the story of Knowbots Marketing, a consultancy delivering cutting-edge SEO, AI, and digital growth solutions.",
      twitterImage: () => `${siteUrl.value}/images/about-knowbots.png`,
      // Basic SEO controls
      robots: "index, follow",
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(AboutHero, null, null, _parent));
      _push(ssrRenderComponent(AboutDetails, null, null, _parent));
      _push(ssrRenderComponent(ContactForm, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-BgYH-sQn.mjs.map
