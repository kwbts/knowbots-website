import { defineComponent, ref, h, resolveComponent, hasInjectionContext, inject, computed, getCurrentInstance, watchEffect, watch, unref, version as version$1, defineAsyncComponent, provide, shallowReactive, Suspense, nextTick, Fragment, Transition, createApp, toRef, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, reactive, effectScope, shallowRef, isReadonly, isRef as isRef$1, isShallow, isReactive, toRaw, mergeProps, withCtx, createTextVNode, getCurrentScope, useSSRContext } from 'vue';
import { p as parseQuery, c as createError$1, h as hasProtocol, i as joinURL, w as withQuery, k as isScriptProtocol, l as getContext, m as withTrailingSlash, n as withoutTrailingSlash, s as sanitizeStatusCode, $ as $fetch, o as defu, q as createHooks, t as toRouteMatcher, r as createRouter$1 } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { defineHeadPlugin, composableNames, unpackMeta } from '@unhead/shared';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1 } from 'vue-router';
import { getIt } from 'get-it';
import { debug, headers, agent, retry as retry$2, jsonRequest, jsonResponse, progress, observable as observable$1 } from 'get-it/middleware';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _client, _client2, _client3, _client4, _client5, _httpRequest, _client6, _httpRequest2, _client7, _client8, _httpRequest3, _client9, _httpRequest4, _client10, _httpRequest5, _client11, _httpRequest6, _client12, _httpRequest7, _client13, _httpRequest8, _clientConfig, _httpRequest9, _clientConfig2, _httpRequest10;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.14.159";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args2) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args2));
      }
    };
    nuxtApp.hooks.callHook = (name2, ...args2) => nuxtApp.hooks.callHookWith(contextCaller, name2, ...args2);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name2, value) => {
    const $name = "$" + name2;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name2) => plugins2.some((p) => p._name === name2) && !resolvedPlugins.includes(name2))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args2) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware2) {
  return middleware2;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version$1[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved2 = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved2[k] = unref(root[k]);
        continue;
      }
      resolved2[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved2;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray$3(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$4 = {
  isHeroSection: true
};
const __nuxt_page_meta$3 = {
  isHeroSection: true
};
const __nuxt_page_meta$2 = {
  isHeroSection: true
};
const __nuxt_page_meta$1 = {
  isHeroSection: true
};
const __nuxt_page_meta = {
  isHeroSection: true
};
const _routes = [
  {
    name: "about",
    path: "/about",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./about-CA889y7d.mjs')
  },
  {
    name: "blog-slug",
    path: "/blog/:slug()",
    component: () => import('./_slug_-CuNImRR-.mjs')
  },
  {
    name: "blog",
    path: "/blog",
    component: () => import('./index-DmlmLjxt.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./contact-DxsH8bGf.mjs')
  },
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./index-CkLrK7DG.mjs')
  },
  {
    name: "labs",
    path: "/labs",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./labs-Bep1kYX2.mjs')
  },
  {
    name: "services",
    path: "/services",
    meta: __nuxt_page_meta || {},
    component: () => import('./services-qbCLyyOe.mjs')
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from2) {
  if (to === from2 || from2 === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from2)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from2.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from2, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from2) : to.meta.scrollToTop;
    if (!position && from2 && to && routeAllowsScrollToTop !== false && isChangingPage(to, from2)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from2.path) {
      if (from2.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from2) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  trailingSlash: true,
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from2, savedPosition) => {
        if (from2 === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from2) => {
      previousRoute.value = from2;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from2) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from2.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from2) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$3(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware2 = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware2) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware2(to, from2));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name2, reduce2) {
  {
    useNuxtApp().ssrContext._payloadReducers[name2] = reduce2;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef$1(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef$1(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef$1(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef$1(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyContactForm = defineAsyncComponent(() => import('./ContactForm-BB15n9US.mjs').then((r) => r["default"] || r.default || r));
const LazyCustomers = defineAsyncComponent(() => import('./Customers-BnCU43c4.mjs').then((r) => r["default"] || r.default || r));
const LazyFooter = defineAsyncComponent(() => Promise.resolve().then(function() {
  return Footer;
}).then((r) => r["default"] || r.default || r));
const LazyTopNavigation = defineAsyncComponent(() => Promise.resolve().then(function() {
  return TopNavigation;
}).then((r) => r["default"] || r.default || r));
const LazyUseSeoMeta = defineAsyncComponent(() => import('./useSeoMeta-B4rTLMAt.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["ContactForm", LazyContactForm],
  ["Customers", LazyCustomers],
  ["Footer", LazyFooter],
  ["TopNavigation", LazyTopNavigation],
  ["UseSeoMeta", LazyUseSeoMeta]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name2, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name2, component);
      nuxtApp.vueApp.component("Lazy" + name2, component);
    }
  }
});
async function preloadRouteComponents(to, router = useRouter()) {
  {
    return;
  }
}
const firstNonUndefined = (...args2) => args2.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config2 = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a;
      if (!to.value || isAbsoluteUrl.value) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return resolveTrailingSlashBehavior(
          href2,
          router.resolve
          /* will not be called */
        );
      }
      if (typeof to.value === "object") {
        return ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null;
      }
      return resolveTrailingSlashBehavior(
        joinURL(config2.app.baseURL, to.value),
        router.resolve
        /* will not be called */
      );
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (link == null ? void 0 : link.isActive) ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (link == null ? void 0 : link.isExactActive) ?? computed(() => to.value === router.currentRoute.value.path),
      route: (link == null ? void 0 : link.route) ?? computed(() => router.resolve(to.value)),
      async navigate() {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      function shouldPrefetch(mode) {
        var _a, _b;
        return !prefetched.value && (typeof props.prefetchOn === "string" ? props.prefetchOn === mode : ((_a = props.prefetchOn) == null ? void 0 : _a[mode]) ?? ((_b = options.prefetchOn) == null ? void 0 : _b[mode])) && (props.prefetch ?? options.prefetch) !== false && props.noPrefetch !== true && props.target !== "_blank" && !isSlowConnection();
      }
      async function prefetch(nuxtApp = useNuxtApp()) {
        if (prefetched.value) {
          return;
        }
        prefetched.value = true;
        const path = typeof to.value === "string" ? to.value : isExternal.value ? resolveRouteObject(to.value) : router.resolve(to.value).fullPath;
        const normalizedPath = isExternal.value ? new URL(path, (void 0).location.href).href : path;
        await Promise.all([
          nuxtApp.hooks.callHook("link:prefetch", normalizedPath).catch(() => {
          }),
          !isExternal.value && !hasTarget.value && preloadRouteComponents(to.value, router).catch(() => {
          })
        ]);
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (shouldPrefetch("interaction")) {
              routerLinkProps.onPointerenter = prefetch.bind(null, void 0);
              routerLinkProps.onFocus = prefetch.bind(null, void 0);
            }
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
function isSlowConnection() {
  {
    return;
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var cjs = {};
var Observable$1 = {};
var Subscriber = {};
var isFunction$1 = {};
Object.defineProperty(isFunction$1, "__esModule", { value: true });
isFunction$1.isFunction = void 0;
function isFunction(value) {
  return typeof value === "function";
}
isFunction$1.isFunction = isFunction;
var Subscription$1 = {};
var UnsubscriptionError = {};
var createErrorClass$1 = {};
Object.defineProperty(createErrorClass$1, "__esModule", { value: true });
createErrorClass$1.createErrorClass = void 0;
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
createErrorClass$1.createErrorClass = createErrorClass;
Object.defineProperty(UnsubscriptionError, "__esModule", { value: true });
UnsubscriptionError.UnsubscriptionError = void 0;
var createErrorClass_1$5 = createErrorClass$1;
UnsubscriptionError.UnsubscriptionError = createErrorClass_1$5.createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
var arrRemove$1 = {};
Object.defineProperty(arrRemove$1, "__esModule", { value: true });
arrRemove$1.arrRemove = void 0;
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
arrRemove$1.arrRemove = arrRemove;
var __values$8 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$i = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$h = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(Subscription$1, "__esModule", { value: true });
Subscription$1.isSubscription = Subscription$1.EMPTY_SUBSCRIPTION = Subscription$1.Subscription = void 0;
var isFunction_1$p = isFunction$1;
var UnsubscriptionError_1 = UnsubscriptionError;
var arrRemove_1$7 = arrRemove$1;
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values$8(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction_1$p.isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values$8(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                errors = __spreadArray$h(__spreadArray$h([], __read$i(errors)), __read$i(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError_1.UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove_1$7.arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove_1$7.arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty2 = new Subscription2();
    empty2.closed = true;
    return empty2;
  }();
  return Subscription2;
}();
Subscription$1.Subscription = Subscription;
Subscription$1.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction_1$p.isFunction(value.remove) && isFunction_1$p.isFunction(value.add) && isFunction_1$p.isFunction(value.unsubscribe);
}
Subscription$1.isSubscription = isSubscription;
function execFinalizer(finalizer) {
  if (isFunction_1$p.isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {};
Object.defineProperty(config, "__esModule", { value: true });
config.config = void 0;
config.config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var reportUnhandledError$1 = {};
var timeoutProvider = {};
(function(exports) {
  var __read2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
    for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
      to[j] = from2[i];
    return to;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.timeoutProvider = void 0;
  exports.timeoutProvider = {
    setTimeout: function(handler, timeout2) {
      var args2 = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args2[_i - 2] = arguments[_i];
      }
      var delegate = exports.timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray2([handler, timeout2], __read2(args2)));
      }
      return setTimeout.apply(void 0, __spreadArray2([handler, timeout2], __read2(args2)));
    },
    clearTimeout: function(handle) {
      var delegate = exports.timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };
})(timeoutProvider);
Object.defineProperty(reportUnhandledError$1, "__esModule", { value: true });
reportUnhandledError$1.reportUnhandledError = void 0;
var config_1$2 = config;
var timeoutProvider_1 = timeoutProvider;
function reportUnhandledError(err) {
  timeoutProvider_1.timeoutProvider.setTimeout(function() {
    var onUnhandledError = config_1$2.config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}
reportUnhandledError$1.reportUnhandledError = reportUnhandledError;
var noop$1 = {};
Object.defineProperty(noop$1, "__esModule", { value: true });
noop$1.noop = void 0;
function noop() {
}
noop$1.noop = noop;
var NotificationFactories = {};
Object.defineProperty(NotificationFactories, "__esModule", { value: true });
NotificationFactories.createNotification = NotificationFactories.nextNotification = NotificationFactories.errorNotification = NotificationFactories.COMPLETE_NOTIFICATION = void 0;
NotificationFactories.COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
NotificationFactories.errorNotification = errorNotification;
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
NotificationFactories.nextNotification = nextNotification;
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}
NotificationFactories.createNotification = createNotification;
var errorContext$1 = {};
Object.defineProperty(errorContext$1, "__esModule", { value: true });
errorContext$1.captureError = errorContext$1.errorContext = void 0;
var config_1$1 = config;
var context = null;
function errorContext(cb) {
  if (config_1$1.config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
errorContext$1.errorContext = errorContext;
function captureError(err) {
  if (config_1$1.config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}
errorContext$1.captureError = captureError;
(function(exports) {
  var __extends2 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
  var isFunction_12 = isFunction$1;
  var Subscription_12 = Subscription$1;
  var config_12 = config;
  var reportUnhandledError_12 = reportUnhandledError$1;
  var noop_12 = noop$1;
  var NotificationFactories_1 = NotificationFactories;
  var timeoutProvider_12 = timeoutProvider;
  var errorContext_12 = errorContext$1;
  var Subscriber2 = function(_super) {
    __extends2(Subscriber3, _super);
    function Subscriber3(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (Subscription_12.isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = exports.EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber3.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber3.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber3.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber3.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber3.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber3.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber3.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber3.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber3;
  }(Subscription_12.Subscription);
  exports.Subscriber = Subscriber2;
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends2(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction_12.isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config_12.config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber2);
  exports.SafeSubscriber = SafeSubscriber;
  function handleUnhandledError(error) {
    if (config_12.config.useDeprecatedSynchronousErrorHandling) {
      errorContext_12.captureError(error);
    } else {
      reportUnhandledError_12.reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config_12.config.onStoppedNotification;
    onStoppedNotification && timeoutProvider_12.timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  exports.EMPTY_OBSERVER = {
    closed: true,
    next: noop_12.noop,
    error: defaultErrorHandler,
    complete: noop_12.noop
  };
})(Subscriber);
var observable = {};
Object.defineProperty(observable, "__esModule", { value: true });
observable.observable = void 0;
observable.observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var pipe$1 = {};
var identity$1 = {};
Object.defineProperty(identity$1, "__esModule", { value: true });
identity$1.identity = void 0;
function identity(x) {
  return x;
}
identity$1.identity = identity;
Object.defineProperty(pipe$1, "__esModule", { value: true });
pipe$1.pipeFromArray = pipe$1.pipe = void 0;
var identity_1$e = identity$1;
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
pipe$1.pipe = pipe;
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity_1$e.identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
pipe$1.pipeFromArray = pipeFromArray;
Object.defineProperty(Observable$1, "__esModule", { value: true });
Observable$1.Observable = void 0;
var Subscriber_1$3 = Subscriber;
var Subscription_1$8 = Subscription$1;
var observable_1$2 = observable;
var pipe_1$2 = pipe$1;
var config_1 = config;
var isFunction_1$o = isFunction$1;
var errorContext_1$1 = errorContext$1;
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1$3.SafeSubscriber(observerOrNext, error, complete);
    errorContext_1$1.errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new Subscriber_1$3.SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable_1$2.observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipe_1$2.pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
Observable$1.Observable = Observable;
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction_1$o.isFunction(value.next) && isFunction_1$o.isFunction(value.error) && isFunction_1$o.isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber_1$3.Subscriber || isObserver(value) && Subscription_1$8.isSubscription(value);
}
var ConnectableObservable$1 = {};
var refCount$1 = {};
var lift = {};
Object.defineProperty(lift, "__esModule", { value: true });
lift.operate = lift.hasLift = void 0;
var isFunction_1$n = isFunction$1;
function hasLift(source) {
  return isFunction_1$n.isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
lift.hasLift = hasLift;
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
lift.operate = operate;
var OperatorSubscriber$1 = {};
var __extends$f = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(OperatorSubscriber$1, "__esModule", { value: true });
OperatorSubscriber$1.OperatorSubscriber = OperatorSubscriber$1.createOperatorSubscriber = void 0;
var Subscriber_1$2 = Subscriber;
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
OperatorSubscriber$1.createOperatorSubscriber = createOperatorSubscriber;
var OperatorSubscriber = function(_super) {
  __extends$f(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber_1$2.Subscriber);
OperatorSubscriber$1.OperatorSubscriber = OperatorSubscriber;
Object.defineProperty(refCount$1, "__esModule", { value: true });
refCount$1.refCount = void 0;
var lift_1$14 = lift;
var OperatorSubscriber_1$V = OperatorSubscriber$1;
function refCount() {
  return lift_1$14.operate(function(source, subscriber) {
    var connection = null;
    source._refCount++;
    var refCounter = OperatorSubscriber_1$V.createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
      if (!source || source._refCount <= 0 || 0 < --source._refCount) {
        connection = null;
        return;
      }
      var sharedConnection = source._connection;
      var conn = connection;
      connection = null;
      if (sharedConnection && (!conn || sharedConnection === conn)) {
        sharedConnection.unsubscribe();
      }
      subscriber.unsubscribe();
    });
    source.subscribe(refCounter);
    if (!refCounter.closed) {
      connection = source.connect();
    }
  });
}
refCount$1.refCount = refCount;
var __extends$e = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(ConnectableObservable$1, "__esModule", { value: true });
ConnectableObservable$1.ConnectableObservable = void 0;
var Observable_1$n = Observable$1;
var Subscription_1$7 = Subscription$1;
var refCount_1 = refCount$1;
var OperatorSubscriber_1$U = OperatorSubscriber$1;
var lift_1$13 = lift;
var ConnectableObservable = function(_super) {
  __extends$e(ConnectableObservable2, _super);
  function ConnectableObservable2(source, subjectFactory) {
    var _this = _super.call(this) || this;
    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._subject = null;
    _this._refCount = 0;
    _this._connection = null;
    if (lift_1$13.hasLift(source)) {
      _this.lift = source.lift;
    }
    return _this;
  }
  ConnectableObservable2.prototype._subscribe = function(subscriber) {
    return this.getSubject().subscribe(subscriber);
  };
  ConnectableObservable2.prototype.getSubject = function() {
    var subject = this._subject;
    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }
    return this._subject;
  };
  ConnectableObservable2.prototype._teardown = function() {
    this._refCount = 0;
    var _connection = this._connection;
    this._subject = this._connection = null;
    _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
  };
  ConnectableObservable2.prototype.connect = function() {
    var _this = this;
    var connection = this._connection;
    if (!connection) {
      connection = this._connection = new Subscription_1$7.Subscription();
      var subject_1 = this.getSubject();
      connection.add(this.source.subscribe(OperatorSubscriber_1$U.createOperatorSubscriber(subject_1, void 0, function() {
        _this._teardown();
        subject_1.complete();
      }, function(err) {
        _this._teardown();
        subject_1.error(err);
      }, function() {
        return _this._teardown();
      })));
      if (connection.closed) {
        this._connection = null;
        connection = Subscription_1$7.Subscription.EMPTY;
      }
    }
    return connection;
  };
  ConnectableObservable2.prototype.refCount = function() {
    return refCount_1.refCount()(this);
  };
  return ConnectableObservable2;
}(Observable_1$n.Observable);
ConnectableObservable$1.ConnectableObservable = ConnectableObservable;
var animationFrames$1 = {};
var performanceTimestampProvider = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.performanceTimestampProvider = void 0;
  exports.performanceTimestampProvider = {
    now: function() {
      return (exports.performanceTimestampProvider.delegate || performance).now();
    },
    delegate: void 0
  };
})(performanceTimestampProvider);
var animationFrameProvider = {};
(function(exports) {
  var __read2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
    for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
      to[j] = from2[i];
    return to;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.animationFrameProvider = void 0;
  var Subscription_12 = Subscription$1;
  exports.animationFrameProvider = {
    schedule: function(callback) {
      var request = requestAnimationFrame;
      var cancel = cancelAnimationFrame;
      var delegate = exports.animationFrameProvider.delegate;
      if (delegate) {
        request = delegate.requestAnimationFrame;
        cancel = delegate.cancelAnimationFrame;
      }
      var handle = request(function(timestamp2) {
        cancel = void 0;
        callback(timestamp2);
      });
      return new Subscription_12.Subscription(function() {
        return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
      });
    },
    requestAnimationFrame: function() {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      var delegate = exports.animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray2([], __read2(args2)));
    },
    cancelAnimationFrame: function() {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      var delegate = exports.animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray2([], __read2(args2)));
    },
    delegate: void 0
  };
})(animationFrameProvider);
Object.defineProperty(animationFrames$1, "__esModule", { value: true });
animationFrames$1.animationFrames = void 0;
var Observable_1$m = Observable$1;
var performanceTimestampProvider_1 = performanceTimestampProvider;
var animationFrameProvider_1$1 = animationFrameProvider;
function animationFrames(timestampProvider) {
  return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
animationFrames$1.animationFrames = animationFrames;
function animationFramesFactory(timestampProvider) {
  return new Observable_1$m.Observable(function(subscriber) {
    var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
    var start = provider.now();
    var id = 0;
    var run = function() {
      if (!subscriber.closed) {
        id = animationFrameProvider_1$1.animationFrameProvider.requestAnimationFrame(function(timestamp2) {
          id = 0;
          var now = provider.now();
          subscriber.next({
            timestamp: timestampProvider ? now : timestamp2,
            elapsed: now - start
          });
          run();
        });
      }
    };
    run();
    return function() {
      if (id) {
        animationFrameProvider_1$1.animationFrameProvider.cancelAnimationFrame(id);
      }
    };
  });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
var Subject$1 = {};
var ObjectUnsubscribedError = {};
Object.defineProperty(ObjectUnsubscribedError, "__esModule", { value: true });
ObjectUnsubscribedError.ObjectUnsubscribedError = void 0;
var createErrorClass_1$4 = createErrorClass$1;
ObjectUnsubscribedError.ObjectUnsubscribedError = createErrorClass_1$4.createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var __extends$d = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __values$7 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(Subject$1, "__esModule", { value: true });
Subject$1.AnonymousSubject = Subject$1.Subject = void 0;
var Observable_1$l = Observable$1;
var Subscription_1$6 = Subscription$1;
var ObjectUnsubscribedError_1 = ObjectUnsubscribedError;
var arrRemove_1$6 = arrRemove$1;
var errorContext_1 = errorContext$1;
var Subject = function(_super) {
  __extends$d(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext_1.errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values$7(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext_1.errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext_1.errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return Subscription_1$6.EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription_1$6.Subscription(function() {
      _this.currentObservers = null;
      arrRemove_1$6.arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable_1$l.Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable_1$l.Observable);
Subject$1.Subject = Subject;
var AnonymousSubject = function(_super) {
  __extends$d(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1$6.EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
Subject$1.AnonymousSubject = AnonymousSubject;
var BehaviorSubject$1 = {};
var __extends$c = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(BehaviorSubject$1, "__esModule", { value: true });
BehaviorSubject$1.BehaviorSubject = void 0;
var Subject_1$e = Subject$1;
var BehaviorSubject = function(_super) {
  __extends$c(BehaviorSubject2, _super);
  function BehaviorSubject2(_value) {
    var _this = _super.call(this) || this;
    _this._value = _value;
    return _this;
  }
  Object.defineProperty(BehaviorSubject2.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: false,
    configurable: true
  });
  BehaviorSubject2.prototype._subscribe = function(subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);
    !subscription.closed && subscriber.next(this._value);
    return subscription;
  };
  BehaviorSubject2.prototype.getValue = function() {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  };
  BehaviorSubject2.prototype.next = function(value) {
    _super.prototype.next.call(this, this._value = value);
  };
  return BehaviorSubject2;
}(Subject_1$e.Subject);
BehaviorSubject$1.BehaviorSubject = BehaviorSubject;
var ReplaySubject$1 = {};
var dateTimestampProvider = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.dateTimestampProvider = void 0;
  exports.dateTimestampProvider = {
    now: function() {
      return (exports.dateTimestampProvider.delegate || Date).now();
    },
    delegate: void 0
  };
})(dateTimestampProvider);
var __extends$b = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(ReplaySubject$1, "__esModule", { value: true });
ReplaySubject$1.ReplaySubject = void 0;
var Subject_1$d = Subject$1;
var dateTimestampProvider_1$2 = dateTimestampProvider;
var ReplaySubject = function(_super) {
  __extends$b(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider_1$2.dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last2 = 0;
      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last2 = i;
      }
      last2 && _buffer.splice(0, last2 + 1);
    }
  };
  return ReplaySubject2;
}(Subject_1$d.Subject);
ReplaySubject$1.ReplaySubject = ReplaySubject;
var AsyncSubject$1 = {};
var __extends$a = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AsyncSubject$1, "__esModule", { value: true });
AsyncSubject$1.AsyncSubject = void 0;
var Subject_1$c = Subject$1;
var AsyncSubject = function(_super) {
  __extends$a(AsyncSubject2, _super);
  function AsyncSubject2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this._value = null;
    _this._hasValue = false;
    _this._isComplete = false;
    return _this;
  }
  AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped || _isComplete) {
      _hasValue && subscriber.next(_value);
      subscriber.complete();
    }
  };
  AsyncSubject2.prototype.next = function(value) {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  };
  AsyncSubject2.prototype.complete = function() {
    var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && _super.prototype.next.call(this, _value);
      _super.prototype.complete.call(this);
    }
  };
  return AsyncSubject2;
}(Subject_1$c.Subject);
AsyncSubject$1.AsyncSubject = AsyncSubject;
var asap = {};
var AsapAction$1 = {};
var AsyncAction$1 = {};
var Action$1 = {};
var __extends$9 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(Action$1, "__esModule", { value: true });
Action$1.Action = void 0;
var Subscription_1$5 = Subscription$1;
var Action = function(_super) {
  __extends$9(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay2) {
    return this;
  };
  return Action2;
}(Subscription_1$5.Subscription);
Action$1.Action = Action;
var intervalProvider = {};
(function(exports) {
  var __read2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
    for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
      to[j] = from2[i];
    return to;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.intervalProvider = void 0;
  exports.intervalProvider = {
    setInterval: function(handler, timeout2) {
      var args2 = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args2[_i - 2] = arguments[_i];
      }
      var delegate = exports.intervalProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
        return delegate.setInterval.apply(delegate, __spreadArray2([handler, timeout2], __read2(args2)));
      }
      return setInterval.apply(void 0, __spreadArray2([handler, timeout2], __read2(args2)));
    },
    clearInterval: function(handle) {
      var delegate = exports.intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: void 0
  };
})(intervalProvider);
var __extends$8 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AsyncAction$1, "__esModule", { value: true });
AsyncAction$1.AsyncAction = void 0;
var Action_1 = Action$1;
var intervalProvider_1 = intervalProvider;
var arrRemove_1$5 = arrRemove$1;
var AsyncAction = function(_super) {
  __extends$8(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay2);
    }
    this.pending = true;
    this.delay = delay2;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && this.delay === delay2 && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider_1.intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay2) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay2);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove_1$5.arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action_1.Action);
AsyncAction$1.AsyncAction = AsyncAction;
var immediateProvider = {};
var Immediate = {};
Object.defineProperty(Immediate, "__esModule", { value: true });
Immediate.TestTools = Immediate.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}
Immediate.Immediate = {
  setImmediate: function(cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(function() {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function(handle) {
    findAndClearHandle(handle);
  }
};
Immediate.TestTools = {
  pending: function() {
    return Object.keys(activeHandles).length;
  }
};
(function(exports) {
  var __read2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
    for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
      to[j] = from2[i];
    return to;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.immediateProvider = void 0;
  var Immediate_1 = Immediate;
  var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
  exports.immediateProvider = {
    setImmediate: function() {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      var delegate = exports.immediateProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray2([], __read2(args2)));
    },
    clearImmediate: function(handle) {
      var delegate = exports.immediateProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: void 0
  };
})(immediateProvider);
var __extends$7 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AsapAction$1, "__esModule", { value: true });
AsapAction$1.AsapAction = void 0;
var AsyncAction_1$3 = AsyncAction$1;
var immediateProvider_1 = immediateProvider;
var AsapAction = function(_super) {
  __extends$7(AsapAction2, _super);
  function AsapAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
  };
  AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
    }
    var actions = scheduler.actions;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      immediateProvider_1.immediateProvider.clearImmediate(id);
      if (scheduler._scheduled === id) {
        scheduler._scheduled = void 0;
      }
    }
    return void 0;
  };
  return AsapAction2;
}(AsyncAction_1$3.AsyncAction);
AsapAction$1.AsapAction = AsapAction;
var AsapScheduler$1 = {};
var AsyncScheduler$1 = {};
var Scheduler$1 = {};
Object.defineProperty(Scheduler$1, "__esModule", { value: true });
Scheduler$1.Scheduler = void 0;
var dateTimestampProvider_1$1 = dateTimestampProvider;
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay2, state) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay2);
  };
  Scheduler2.now = dateTimestampProvider_1$1.dateTimestampProvider.now;
  return Scheduler2;
}();
Scheduler$1.Scheduler = Scheduler;
var __extends$6 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AsyncScheduler$1, "__esModule", { value: true });
AsyncScheduler$1.AsyncScheduler = void 0;
var Scheduler_1 = Scheduler$1;
var AsyncScheduler = function(_super) {
  __extends$6(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler_1.Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler_1.Scheduler);
AsyncScheduler$1.AsyncScheduler = AsyncScheduler;
var __extends$5 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AsapScheduler$1, "__esModule", { value: true });
AsapScheduler$1.AsapScheduler = void 0;
var AsyncScheduler_1$3 = AsyncScheduler$1;
var AsapScheduler = function(_super) {
  __extends$5(AsapScheduler2, _super);
  function AsapScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AsapScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsapScheduler2;
}(AsyncScheduler_1$3.AsyncScheduler);
AsapScheduler$1.AsapScheduler = AsapScheduler;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.asap = exports.asapScheduler = void 0;
  var AsapAction_1 = AsapAction$1;
  var AsapScheduler_1 = AsapScheduler$1;
  exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
  exports.asap = exports.asapScheduler;
})(asap);
var async = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.async = exports.asyncScheduler = void 0;
  var AsyncAction_12 = AsyncAction$1;
  var AsyncScheduler_12 = AsyncScheduler$1;
  exports.asyncScheduler = new AsyncScheduler_12.AsyncScheduler(AsyncAction_12.AsyncAction);
  exports.async = exports.asyncScheduler;
})(async);
var queue = {};
var QueueAction$1 = {};
var __extends$4 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(QueueAction$1, "__esModule", { value: true });
QueueAction$1.QueueAction = void 0;
var AsyncAction_1$2 = AsyncAction$1;
var QueueAction = function(_super) {
  __extends$4(QueueAction2, _super);
  function QueueAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  QueueAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 > 0) {
      return _super.prototype.schedule.call(this, state, delay2);
    }
    this.delay = delay2;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };
  QueueAction2.prototype.execute = function(state, delay2) {
    return delay2 > 0 || this.closed ? _super.prototype.execute.call(this, state, delay2) : this._execute(state, delay2);
  };
  QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.flush(this);
    return 0;
  };
  return QueueAction2;
}(AsyncAction_1$2.AsyncAction);
QueueAction$1.QueueAction = QueueAction;
var QueueScheduler$1 = {};
var __extends$3 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(QueueScheduler$1, "__esModule", { value: true });
QueueScheduler$1.QueueScheduler = void 0;
var AsyncScheduler_1$2 = AsyncScheduler$1;
var QueueScheduler = function(_super) {
  __extends$3(QueueScheduler2, _super);
  function QueueScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return QueueScheduler2;
}(AsyncScheduler_1$2.AsyncScheduler);
QueueScheduler$1.QueueScheduler = QueueScheduler;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.queue = exports.queueScheduler = void 0;
  var QueueAction_1 = QueueAction$1;
  var QueueScheduler_1 = QueueScheduler$1;
  exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
  exports.queue = exports.queueScheduler;
})(queue);
var animationFrame = {};
var AnimationFrameAction$1 = {};
var __extends$2 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AnimationFrameAction$1, "__esModule", { value: true });
AnimationFrameAction$1.AnimationFrameAction = void 0;
var AsyncAction_1$1 = AsyncAction$1;
var animationFrameProvider_1 = animationFrameProvider;
var AnimationFrameAction = function(_super) {
  __extends$2(AnimationFrameAction2, _super);
  function AnimationFrameAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function() {
      return scheduler.flush(void 0);
    }));
  };
  AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
    }
    var actions = scheduler.actions;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
      scheduler._scheduled = void 0;
    }
    return void 0;
  };
  return AnimationFrameAction2;
}(AsyncAction_1$1.AsyncAction);
AnimationFrameAction$1.AnimationFrameAction = AnimationFrameAction;
var AnimationFrameScheduler$1 = {};
var __extends$1 = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(AnimationFrameScheduler$1, "__esModule", { value: true });
AnimationFrameScheduler$1.AnimationFrameScheduler = void 0;
var AsyncScheduler_1$1 = AsyncScheduler$1;
var AnimationFrameScheduler = function(_super) {
  __extends$1(AnimationFrameScheduler2, _super);
  function AnimationFrameScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  AnimationFrameScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AnimationFrameScheduler2;
}(AsyncScheduler_1$1.AsyncScheduler);
AnimationFrameScheduler$1.AnimationFrameScheduler = AnimationFrameScheduler;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.animationFrame = exports.animationFrameScheduler = void 0;
  var AnimationFrameAction_1 = AnimationFrameAction$1;
  var AnimationFrameScheduler_1 = AnimationFrameScheduler$1;
  exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
  exports.animationFrame = exports.animationFrameScheduler;
})(animationFrame);
var VirtualTimeScheduler$1 = {};
var __extends = commonjsGlobal && commonjsGlobal.__extends || /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(VirtualTimeScheduler$1, "__esModule", { value: true });
VirtualTimeScheduler$1.VirtualAction = VirtualTimeScheduler$1.VirtualTimeScheduler = void 0;
var AsyncAction_1 = AsyncAction$1;
var Subscription_1$4 = Subscription$1;
var AsyncScheduler_1 = AsyncScheduler$1;
var VirtualTimeScheduler = function(_super) {
  __extends(VirtualTimeScheduler2, _super);
  function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
    if (schedulerActionCtor === void 0) {
      schedulerActionCtor = VirtualAction;
    }
    if (maxFrames === void 0) {
      maxFrames = Infinity;
    }
    var _this = _super.call(this, schedulerActionCtor, function() {
      return _this.frame;
    }) || this;
    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }
  VirtualTimeScheduler2.prototype.flush = function() {
    var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
    var error;
    var action;
    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  VirtualTimeScheduler2.frameTimeFactor = 10;
  return VirtualTimeScheduler2;
}(AsyncScheduler_1.AsyncScheduler);
VirtualTimeScheduler$1.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = function(_super) {
  __extends(VirtualAction2, _super);
  function VirtualAction2(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index;
    _this.active = true;
    _this.index = scheduler.index = index;
    return _this;
  }
  VirtualAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (Number.isFinite(delay2)) {
      if (!this.id) {
        return _super.prototype.schedule.call(this, state, delay2);
      }
      this.active = false;
      var action = new VirtualAction2(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay2);
    } else {
      return Subscription_1$4.Subscription.EMPTY;
    }
  };
  VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    this.delay = scheduler.frame + delay2;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction2.sortActions);
    return 1;
  };
  VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    return void 0;
  };
  VirtualAction2.prototype._execute = function(state, delay2) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay2);
    }
  };
  VirtualAction2.sortActions = function(a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };
  return VirtualAction2;
}(AsyncAction_1.AsyncAction);
VirtualTimeScheduler$1.VirtualAction = VirtualAction;
var Notification = {};
var empty = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.empty = exports.EMPTY = void 0;
  var Observable_12 = Observable$1;
  exports.EMPTY = new Observable_12.Observable(function(subscriber) {
    return subscriber.complete();
  });
  function empty2(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
  }
  exports.empty = empty2;
  function emptyScheduled(scheduler) {
    return new Observable_12.Observable(function(subscriber) {
      return scheduler.schedule(function() {
        return subscriber.complete();
      });
    });
  }
})(empty);
var of$1 = {};
var args = {};
var isScheduler$1 = {};
Object.defineProperty(isScheduler$1, "__esModule", { value: true });
isScheduler$1.isScheduler = void 0;
var isFunction_1$m = isFunction$1;
function isScheduler(value) {
  return value && isFunction_1$m.isFunction(value.schedule);
}
isScheduler$1.isScheduler = isScheduler;
Object.defineProperty(args, "__esModule", { value: true });
args.popNumber = args.popScheduler = args.popResultSelector = void 0;
var isFunction_1$l = isFunction$1;
var isScheduler_1$3 = isScheduler$1;
function last$2(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args2) {
  return isFunction_1$l.isFunction(last$2(args2)) ? args2.pop() : void 0;
}
args.popResultSelector = popResultSelector;
function popScheduler(args2) {
  return isScheduler_1$3.isScheduler(last$2(args2)) ? args2.pop() : void 0;
}
args.popScheduler = popScheduler;
function popNumber(args2, defaultValue) {
  return typeof last$2(args2) === "number" ? args2.pop() : defaultValue;
}
args.popNumber = popNumber;
var from$1 = {};
var scheduled$1 = {};
var scheduleObservable$1 = {};
var innerFrom$1 = {};
var isArrayLike = {};
Object.defineProperty(isArrayLike, "__esModule", { value: true });
isArrayLike.isArrayLike = void 0;
isArrayLike.isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
var isPromise$1 = {};
Object.defineProperty(isPromise$1, "__esModule", { value: true });
isPromise$1.isPromise = void 0;
var isFunction_1$k = isFunction$1;
function isPromise(value) {
  return isFunction_1$k.isFunction(value === null || value === void 0 ? void 0 : value.then);
}
isPromise$1.isPromise = isPromise;
var isInteropObservable$1 = {};
Object.defineProperty(isInteropObservable$1, "__esModule", { value: true });
isInteropObservable$1.isInteropObservable = void 0;
var observable_1$1 = observable;
var isFunction_1$j = isFunction$1;
function isInteropObservable(input) {
  return isFunction_1$j.isFunction(input[observable_1$1.observable]);
}
isInteropObservable$1.isInteropObservable = isInteropObservable;
var isAsyncIterable$1 = {};
Object.defineProperty(isAsyncIterable$1, "__esModule", { value: true });
isAsyncIterable$1.isAsyncIterable = void 0;
var isFunction_1$i = isFunction$1;
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction_1$i.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
isAsyncIterable$1.isAsyncIterable = isAsyncIterable;
var throwUnobservableError = {};
Object.defineProperty(throwUnobservableError, "__esModule", { value: true });
throwUnobservableError.createInvalidObservableTypeError = void 0;
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
throwUnobservableError.createInvalidObservableTypeError = createInvalidObservableTypeError;
var isIterable$1 = {};
var iterator = {};
Object.defineProperty(iterator, "__esModule", { value: true });
iterator.iterator = iterator.getSymbolIterator = void 0;
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
iterator.getSymbolIterator = getSymbolIterator;
iterator.iterator = getSymbolIterator();
Object.defineProperty(isIterable$1, "__esModule", { value: true });
isIterable$1.isIterable = void 0;
var iterator_1$1 = iterator;
var isFunction_1$h = isFunction$1;
function isIterable(input) {
  return isFunction_1$h.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1$1.iterator]);
}
isIterable$1.isIterable = isIterable;
var isReadableStreamLike$1 = {};
var __generator$2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (_2) try {
      if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __await = commonjsGlobal && commonjsGlobal.__await || function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = commonjsGlobal && commonjsGlobal.__asyncGenerator || function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f2, v) {
    if (f2(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
};
Object.defineProperty(isReadableStreamLike$1, "__esModule", { value: true });
isReadableStreamLike$1.isReadableStreamLike = isReadableStreamLike$1.readableStreamLikeToAsyncGenerator = void 0;
var isFunction_1$g = isFunction$1;
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator$2(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
isReadableStreamLike$1.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
function isReadableStreamLike(obj) {
  return isFunction_1$g.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
isReadableStreamLike$1.isReadableStreamLike = isReadableStreamLike;
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$1 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (_2) try {
      if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __asyncValues = commonjsGlobal && commonjsGlobal.__asyncValues || function(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values$6 === "function" ? __values$6(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __values$6 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(innerFrom$1, "__esModule", { value: true });
innerFrom$1.fromReadableStreamLike = innerFrom$1.fromAsyncIterable = innerFrom$1.fromIterable = innerFrom$1.fromPromise = innerFrom$1.fromArrayLike = innerFrom$1.fromInteropObservable = innerFrom$1.innerFrom = void 0;
var isArrayLike_1$2 = isArrayLike;
var isPromise_1$1 = isPromise$1;
var Observable_1$k = Observable$1;
var isInteropObservable_1$1 = isInteropObservable$1;
var isAsyncIterable_1$1 = isAsyncIterable$1;
var throwUnobservableError_1$1 = throwUnobservableError;
var isIterable_1$1 = isIterable$1;
var isReadableStreamLike_1$2 = isReadableStreamLike$1;
var isFunction_1$f = isFunction$1;
var reportUnhandledError_1 = reportUnhandledError$1;
var observable_1 = observable;
function innerFrom(input) {
  if (input instanceof Observable_1$k.Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable_1$1.isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike_1$2.isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise_1$1.isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable_1$1.isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable_1$1.isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike_1$2.isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw throwUnobservableError_1$1.createInvalidObservableTypeError(input);
}
innerFrom$1.innerFrom = innerFrom;
function fromInteropObservable(obj) {
  return new Observable_1$k.Observable(function(subscriber) {
    var obs = obj[observable_1.observable]();
    if (isFunction_1$f.isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
innerFrom$1.fromInteropObservable = fromInteropObservable;
function fromArrayLike(array) {
  return new Observable_1$k.Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
innerFrom$1.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
  return new Observable_1$k.Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError_1.reportUnhandledError);
  });
}
innerFrom$1.fromPromise = fromPromise;
function fromIterable(iterable) {
  return new Observable_1$k.Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values$6(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
innerFrom$1.fromIterable = fromIterable;
function fromAsyncIterable(asyncIterable) {
  return new Observable_1$k.Observable(function(subscriber) {
    process$1(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
innerFrom$1.fromAsyncIterable = fromAsyncIterable;
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(isReadableStreamLike_1$2.readableStreamLikeToAsyncGenerator(readableStream));
}
innerFrom$1.fromReadableStreamLike = fromReadableStreamLike;
function process$1(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator$1(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
var observeOn$1 = {};
var executeSchedule$1 = {};
Object.defineProperty(executeSchedule$1, "__esModule", { value: true });
executeSchedule$1.executeSchedule = void 0;
function executeSchedule(parentSubscription, scheduler, work, delay2, repeat2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  if (repeat2 === void 0) {
    repeat2 = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat2) {
      parentSubscription.add(this.schedule(null, delay2));
    } else {
      this.unsubscribe();
    }
  }, delay2);
  parentSubscription.add(scheduleSubscription);
  if (!repeat2) {
    return scheduleSubscription;
  }
}
executeSchedule$1.executeSchedule = executeSchedule;
Object.defineProperty(observeOn$1, "__esModule", { value: true });
observeOn$1.observeOn = void 0;
var executeSchedule_1$6 = executeSchedule$1;
var lift_1$12 = lift;
var OperatorSubscriber_1$T = OperatorSubscriber$1;
function observeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return lift_1$12.operate(function(source, subscriber) {
    source.subscribe(OperatorSubscriber_1$T.createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay2);
    }, function() {
      return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay2);
    }, function(err) {
      return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay2);
    }));
  });
}
observeOn$1.observeOn = observeOn;
var subscribeOn$1 = {};
Object.defineProperty(subscribeOn$1, "__esModule", { value: true });
subscribeOn$1.subscribeOn = void 0;
var lift_1$11 = lift;
function subscribeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return lift_1$11.operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay2));
  });
}
subscribeOn$1.subscribeOn = subscribeOn;
Object.defineProperty(scheduleObservable$1, "__esModule", { value: true });
scheduleObservable$1.scheduleObservable = void 0;
var innerFrom_1$D = innerFrom$1;
var observeOn_1$2 = observeOn$1;
var subscribeOn_1$2 = subscribeOn$1;
function scheduleObservable(input, scheduler) {
  return innerFrom_1$D.innerFrom(input).pipe(subscribeOn_1$2.subscribeOn(scheduler), observeOn_1$2.observeOn(scheduler));
}
scheduleObservable$1.scheduleObservable = scheduleObservable;
var schedulePromise$1 = {};
Object.defineProperty(schedulePromise$1, "__esModule", { value: true });
schedulePromise$1.schedulePromise = void 0;
var innerFrom_1$C = innerFrom$1;
var observeOn_1$1 = observeOn$1;
var subscribeOn_1$1 = subscribeOn$1;
function schedulePromise(input, scheduler) {
  return innerFrom_1$C.innerFrom(input).pipe(subscribeOn_1$1.subscribeOn(scheduler), observeOn_1$1.observeOn(scheduler));
}
schedulePromise$1.schedulePromise = schedulePromise;
var scheduleArray$1 = {};
Object.defineProperty(scheduleArray$1, "__esModule", { value: true });
scheduleArray$1.scheduleArray = void 0;
var Observable_1$j = Observable$1;
function scheduleArray(input, scheduler) {
  return new Observable_1$j.Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
scheduleArray$1.scheduleArray = scheduleArray;
var scheduleIterable$1 = {};
Object.defineProperty(scheduleIterable$1, "__esModule", { value: true });
scheduleIterable$1.scheduleIterable = void 0;
var Observable_1$i = Observable$1;
var iterator_1 = iterator;
var isFunction_1$e = isFunction$1;
var executeSchedule_1$5 = executeSchedule$1;
function scheduleIterable(input, scheduler) {
  return new Observable_1$i.Observable(function(subscriber) {
    var iterator2;
    executeSchedule_1$5.executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator_1.iterator]();
      executeSchedule_1$5.executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction_1$e.isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}
scheduleIterable$1.scheduleIterable = scheduleIterable;
var scheduleAsyncIterable$1 = {};
Object.defineProperty(scheduleAsyncIterable$1, "__esModule", { value: true });
scheduleAsyncIterable$1.scheduleAsyncIterable = void 0;
var Observable_1$h = Observable$1;
var executeSchedule_1$4 = executeSchedule$1;
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable_1$h.Observable(function(subscriber) {
    executeSchedule_1$4.executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule_1$4.executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
scheduleAsyncIterable$1.scheduleAsyncIterable = scheduleAsyncIterable;
var scheduleReadableStreamLike$1 = {};
Object.defineProperty(scheduleReadableStreamLike$1, "__esModule", { value: true });
scheduleReadableStreamLike$1.scheduleReadableStreamLike = void 0;
var scheduleAsyncIterable_1$1 = scheduleAsyncIterable$1;
var isReadableStreamLike_1$1 = isReadableStreamLike$1;
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable_1$1.scheduleAsyncIterable(isReadableStreamLike_1$1.readableStreamLikeToAsyncGenerator(input), scheduler);
}
scheduleReadableStreamLike$1.scheduleReadableStreamLike = scheduleReadableStreamLike;
Object.defineProperty(scheduled$1, "__esModule", { value: true });
scheduled$1.scheduled = void 0;
var scheduleObservable_1 = scheduleObservable$1;
var schedulePromise_1 = schedulePromise$1;
var scheduleArray_1 = scheduleArray$1;
var scheduleIterable_1$1 = scheduleIterable$1;
var scheduleAsyncIterable_1 = scheduleAsyncIterable$1;
var isInteropObservable_1 = isInteropObservable$1;
var isPromise_1 = isPromise$1;
var isArrayLike_1$1 = isArrayLike;
var isIterable_1 = isIterable$1;
var isAsyncIterable_1 = isAsyncIterable$1;
var throwUnobservableError_1 = throwUnobservableError;
var isReadableStreamLike_1 = isReadableStreamLike$1;
var scheduleReadableStreamLike_1 = scheduleReadableStreamLike$1;
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable_1.isInteropObservable(input)) {
      return scheduleObservable_1.scheduleObservable(input, scheduler);
    }
    if (isArrayLike_1$1.isArrayLike(input)) {
      return scheduleArray_1.scheduleArray(input, scheduler);
    }
    if (isPromise_1.isPromise(input)) {
      return schedulePromise_1.schedulePromise(input, scheduler);
    }
    if (isAsyncIterable_1.isAsyncIterable(input)) {
      return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable_1.isIterable(input)) {
      return scheduleIterable_1$1.scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike_1.isReadableStreamLike(input)) {
      return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
scheduled$1.scheduled = scheduled;
Object.defineProperty(from$1, "__esModule", { value: true });
from$1.from = void 0;
var scheduled_1 = scheduled$1;
var innerFrom_1$B = innerFrom$1;
function from(input, scheduler) {
  return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1$B.innerFrom(input);
}
from$1.from = from;
Object.defineProperty(of$1, "__esModule", { value: true });
of$1.of = void 0;
var args_1$c = args;
var from_1$6 = from$1;
function of() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var scheduler = args_1$c.popScheduler(args2);
  return from_1$6.from(args2, scheduler);
}
of$1.of = of;
var throwError$1 = {};
Object.defineProperty(throwError$1, "__esModule", { value: true });
throwError$1.throwError = void 0;
var Observable_1$g = Observable$1;
var isFunction_1$d = isFunction$1;
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction_1$d.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init = function(subscriber) {
    return subscriber.error(errorFactory());
  };
  return new Observable_1$g.Observable(scheduler ? function(subscriber) {
    return scheduler.schedule(init, 0, subscriber);
  } : init);
}
throwError$1.throwError = throwError;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
  var empty_12 = empty;
  var of_12 = of$1;
  var throwError_1 = throwError$1;
  var isFunction_12 = isFunction$1;
  (function(NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
  })(exports.NotificationKind || (exports.NotificationKind = {}));
  var Notification2 = function() {
    function Notification3(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === "N";
    }
    Notification3.prototype.observe = function(observer) {
      return observeNotification(this, observer);
    };
    Notification3.prototype.do = function(nextHandler, errorHandler, completeHandler) {
      var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
      return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification3.prototype.accept = function(nextOrObserver, error, complete) {
      var _a;
      return isFunction_12.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
    };
    Notification3.prototype.toObservable = function() {
      var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
      var result = kind === "N" ? of_12.of(value) : kind === "E" ? throwError_1.throwError(function() {
        return error;
      }) : kind === "C" ? empty_12.EMPTY : 0;
      if (!result) {
        throw new TypeError("Unexpected notification kind " + kind);
      }
      return result;
    };
    Notification3.createNext = function(value) {
      return new Notification3("N", value);
    };
    Notification3.createError = function(err) {
      return new Notification3("E", void 0, err);
    };
    Notification3.createComplete = function() {
      return Notification3.completeNotification;
    };
    Notification3.completeNotification = new Notification3("C");
    return Notification3;
  }();
  exports.Notification = Notification2;
  function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== "string") {
      throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
  }
  exports.observeNotification = observeNotification;
})(Notification);
var isObservable$1 = {};
Object.defineProperty(isObservable$1, "__esModule", { value: true });
isObservable$1.isObservable = void 0;
var Observable_1$f = Observable$1;
var isFunction_1$c = isFunction$1;
function isObservable(obj) {
  return !!obj && (obj instanceof Observable_1$f.Observable || isFunction_1$c.isFunction(obj.lift) && isFunction_1$c.isFunction(obj.subscribe));
}
isObservable$1.isObservable = isObservable;
var lastValueFrom$1 = {};
var EmptyError = {};
Object.defineProperty(EmptyError, "__esModule", { value: true });
EmptyError.EmptyError = void 0;
var createErrorClass_1$3 = createErrorClass$1;
EmptyError.EmptyError = createErrorClass_1$3.createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});
Object.defineProperty(lastValueFrom$1, "__esModule", { value: true });
lastValueFrom$1.lastValueFrom = void 0;
var EmptyError_1$5 = EmptyError;
function lastValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError_1$5.EmptyError());
        }
      }
    });
  });
}
lastValueFrom$1.lastValueFrom = lastValueFrom;
var firstValueFrom$1 = {};
Object.defineProperty(firstValueFrom$1, "__esModule", { value: true });
firstValueFrom$1.firstValueFrom = void 0;
var EmptyError_1$4 = EmptyError;
var Subscriber_1$1 = Subscriber;
function firstValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var subscriber = new Subscriber_1$1.SafeSubscriber({
      next: function(value) {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: function() {
        if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError_1$4.EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}
firstValueFrom$1.firstValueFrom = firstValueFrom;
var ArgumentOutOfRangeError = {};
Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
ArgumentOutOfRangeError.ArgumentOutOfRangeError = void 0;
var createErrorClass_1$2 = createErrorClass$1;
ArgumentOutOfRangeError.ArgumentOutOfRangeError = createErrorClass_1$2.createErrorClass(function(_super) {
  return function ArgumentOutOfRangeErrorImpl() {
    _super(this);
    this.name = "ArgumentOutOfRangeError";
    this.message = "argument out of range";
  };
});
var NotFoundError = {};
Object.defineProperty(NotFoundError, "__esModule", { value: true });
NotFoundError.NotFoundError = void 0;
var createErrorClass_1$1 = createErrorClass$1;
NotFoundError.NotFoundError = createErrorClass_1$1.createErrorClass(function(_super) {
  return function NotFoundErrorImpl(message) {
    _super(this);
    this.name = "NotFoundError";
    this.message = message;
  };
});
var SequenceError = {};
Object.defineProperty(SequenceError, "__esModule", { value: true });
SequenceError.SequenceError = void 0;
var createErrorClass_1 = createErrorClass$1;
SequenceError.SequenceError = createErrorClass_1.createErrorClass(function(_super) {
  return function SequenceErrorImpl(message) {
    _super(this);
    this.name = "SequenceError";
    this.message = message;
  };
});
var timeout = {};
var isDate = {};
Object.defineProperty(isDate, "__esModule", { value: true });
isDate.isValidDate = void 0;
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
isDate.isValidDate = isValidDate;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.timeout = exports.TimeoutError = void 0;
  var async_12 = async;
  var isDate_12 = isDate;
  var lift_12 = lift;
  var innerFrom_12 = innerFrom$1;
  var createErrorClass_12 = createErrorClass$1;
  var OperatorSubscriber_12 = OperatorSubscriber$1;
  var executeSchedule_12 = executeSchedule$1;
  exports.TimeoutError = createErrorClass_12.createErrorClass(function(_super) {
    return function TimeoutErrorImpl(info) {
      if (info === void 0) {
        info = null;
      }
      _super(this);
      this.message = "Timeout has occurred";
      this.name = "TimeoutError";
      this.info = info;
    };
  });
  function timeout2(config2, schedulerArg) {
    var _a = isDate_12.isValidDate(config2) ? { first: config2 } : typeof config2 === "number" ? { each: config2 } : config2, first2 = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_12.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
    if (first2 == null && each == null) {
      throw new TypeError("No timeout provided.");
    }
    return lift_12.operate(function(source, subscriber) {
      var originalSourceSubscription;
      var timerSubscription;
      var lastValue = null;
      var seen = 0;
      var startTimer = function(delay2) {
        timerSubscription = executeSchedule_12.executeSchedule(subscriber, scheduler, function() {
          try {
            originalSourceSubscription.unsubscribe();
            innerFrom_12.innerFrom(_with({
              meta,
              lastValue,
              seen
            })).subscribe(subscriber);
          } catch (err) {
            subscriber.error(err);
          }
        }, delay2);
      };
      originalSourceSubscription = source.subscribe(OperatorSubscriber_12.createOperatorSubscriber(subscriber, function(value) {
        timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
        seen++;
        subscriber.next(lastValue = value);
        each > 0 && startTimer(each);
      }, void 0, void 0, function() {
        if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
          timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
        }
        lastValue = null;
      }));
      !seen && startTimer(first2 != null ? typeof first2 === "number" ? first2 : +first2 - scheduler.now() : each);
    });
  }
  exports.timeout = timeout2;
  function timeoutErrorFactory(info) {
    throw new exports.TimeoutError(info);
  }
})(timeout);
var bindCallback$1 = {};
var bindCallbackInternals$1 = {};
var mapOneOrManyArgs$1 = {};
var map$1 = {};
Object.defineProperty(map$1, "__esModule", { value: true });
map$1.map = void 0;
var lift_1$10 = lift;
var OperatorSubscriber_1$S = OperatorSubscriber$1;
function map(project, thisArg) {
  return lift_1$10.operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(OperatorSubscriber_1$S.createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
map$1.map = map;
var __read$h = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$g = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(mapOneOrManyArgs$1, "__esModule", { value: true });
mapOneOrManyArgs$1.mapOneOrManyArgs = void 0;
var map_1$5 = map$1;
var isArray$2 = Array.isArray;
function callOrApply(fn, args2) {
  return isArray$2(args2) ? fn.apply(void 0, __spreadArray$g([], __read$h(args2))) : fn(args2);
}
function mapOneOrManyArgs(fn) {
  return map_1$5.map(function(args2) {
    return callOrApply(fn, args2);
  });
}
mapOneOrManyArgs$1.mapOneOrManyArgs = mapOneOrManyArgs;
var __read$g = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$f = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(bindCallbackInternals$1, "__esModule", { value: true });
bindCallbackInternals$1.bindCallbackInternals = void 0;
var isScheduler_1$2 = isScheduler$1;
var Observable_1$e = Observable$1;
var subscribeOn_1 = subscribeOn$1;
var mapOneOrManyArgs_1$6 = mapOneOrManyArgs$1;
var observeOn_1 = observeOn$1;
var AsyncSubject_1$1 = AsyncSubject$1;
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (isScheduler_1$2.isScheduler(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args2).pipe(mapOneOrManyArgs_1$6.mapOneOrManyArgs(resultSelector));
      };
    }
  }
  if (scheduler) {
    return function() {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args2).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
    };
  }
  return function() {
    var _this = this;
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var subject = new AsyncSubject_1$1.AsyncSubject();
    var uninitialized = true;
    return new Observable_1$e.Observable(function(subscriber) {
      var subs = subject.subscribe(subscriber);
      if (uninitialized) {
        uninitialized = false;
        var isAsync_1 = false;
        var isComplete_1 = false;
        callbackFunc.apply(_this, __spreadArray$f(__spreadArray$f([], __read$g(args2)), [
          function() {
            var results = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              results[_i2] = arguments[_i2];
            }
            if (isNodeStyle) {
              var err = results.shift();
              if (err != null) {
                subject.error(err);
                return;
              }
            }
            subject.next(1 < results.length ? results : results[0]);
            isComplete_1 = true;
            if (isAsync_1) {
              subject.complete();
            }
          }
        ]));
        if (isComplete_1) {
          subject.complete();
        }
        isAsync_1 = true;
      }
      return subs;
    });
  };
}
bindCallbackInternals$1.bindCallbackInternals = bindCallbackInternals;
Object.defineProperty(bindCallback$1, "__esModule", { value: true });
bindCallback$1.bindCallback = void 0;
var bindCallbackInternals_1$1 = bindCallbackInternals$1;
function bindCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals_1$1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
bindCallback$1.bindCallback = bindCallback;
var bindNodeCallback$1 = {};
Object.defineProperty(bindNodeCallback$1, "__esModule", { value: true });
bindNodeCallback$1.bindNodeCallback = void 0;
var bindCallbackInternals_1 = bindCallbackInternals$1;
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
bindNodeCallback$1.bindNodeCallback = bindNodeCallback;
var combineLatest$3 = {};
var argsArgArrayOrObject$1 = {};
Object.defineProperty(argsArgArrayOrObject$1, "__esModule", { value: true });
argsArgArrayOrObject$1.argsArgArrayOrObject = void 0;
var isArray$1 = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args2) {
  if (args2.length === 1) {
    var first_1 = args2[0];
    if (isArray$1(first_1)) {
      return { args: first_1, keys: null };
    }
    if (isPOJO(first_1)) {
      var keys = getKeys(first_1);
      return {
        args: keys.map(function(key) {
          return first_1[key];
        }),
        keys
      };
    }
  }
  return { args: args2, keys: null };
}
argsArgArrayOrObject$1.argsArgArrayOrObject = argsArgArrayOrObject;
function isPOJO(obj) {
  return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
var createObject$1 = {};
Object.defineProperty(createObject$1, "__esModule", { value: true });
createObject$1.createObject = void 0;
function createObject(keys, values) {
  return keys.reduce(function(result, key, i) {
    return result[key] = values[i], result;
  }, {});
}
createObject$1.createObject = createObject;
Object.defineProperty(combineLatest$3, "__esModule", { value: true });
combineLatest$3.combineLatestInit = combineLatest$3.combineLatest = void 0;
var Observable_1$d = Observable$1;
var argsArgArrayOrObject_1$1 = argsArgArrayOrObject$1;
var from_1$5 = from$1;
var identity_1$d = identity$1;
var mapOneOrManyArgs_1$5 = mapOneOrManyArgs$1;
var args_1$b = args;
var createObject_1$1 = createObject$1;
var OperatorSubscriber_1$R = OperatorSubscriber$1;
var executeSchedule_1$3 = executeSchedule$1;
function combineLatest$2() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var scheduler = args_1$b.popScheduler(args2);
  var resultSelector = args_1$b.popResultSelector(args2);
  var _a = argsArgArrayOrObject_1$1.argsArgArrayOrObject(args2), observables = _a.args, keys = _a.keys;
  if (observables.length === 0) {
    return from_1$5.from([], scheduler);
  }
  var result = new Observable_1$d.Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
    return createObject_1$1.createObject(keys, values);
  } : identity_1$d.identity));
  return resultSelector ? result.pipe(mapOneOrManyArgs_1$5.mapOneOrManyArgs(resultSelector)) : result;
}
combineLatest$3.combineLatest = combineLatest$2;
function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = identity_1$d.identity;
  }
  return function(subscriber) {
    maybeSchedule(scheduler, function() {
      var length = observables.length;
      var values = new Array(length);
      var active = length;
      var remainingFirstValues = length;
      var _loop_1 = function(i2) {
        maybeSchedule(scheduler, function() {
          var source = from_1$5.from(observables[i2], scheduler);
          var hasFirstValue = false;
          source.subscribe(OperatorSubscriber_1$R.createOperatorSubscriber(subscriber, function(value) {
            values[i2] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, function() {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      };
      for (var i = 0; i < length; i++) {
        _loop_1(i);
      }
    }, subscriber);
  };
}
combineLatest$3.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    executeSchedule_1$3.executeSchedule(subscription, scheduler, execute);
  } else {
    execute();
  }
}
var concat$3 = {};
var concatAll$1 = {};
var mergeAll$1 = {};
var mergeMap$1 = {};
var mergeInternals$1 = {};
Object.defineProperty(mergeInternals$1, "__esModule", { value: true });
mergeInternals$1.mergeInternals = void 0;
var innerFrom_1$A = innerFrom$1;
var executeSchedule_1$2 = executeSchedule$1;
var OperatorSubscriber_1$Q = OperatorSubscriber$1;
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand2, innerSubScheduler, additionalFinalizer) {
  var buffer2 = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer2.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer2.push(value);
  };
  var doInnerSub = function(value) {
    expand2 && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom_1$A.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1$Q.createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand2) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer2.shift();
            if (innerSubScheduler) {
              executeSchedule_1$2.executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer2.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(OperatorSubscriber_1$Q.createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
mergeInternals$1.mergeInternals = mergeInternals;
Object.defineProperty(mergeMap$1, "__esModule", { value: true });
mergeMap$1.mergeMap = void 0;
var map_1$4 = map$1;
var innerFrom_1$z = innerFrom$1;
var lift_1$$ = lift;
var mergeInternals_1$2 = mergeInternals$1;
var isFunction_1$b = isFunction$1;
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction_1$b.isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map_1$4.map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom_1$z.innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return lift_1$$.operate(function(source, subscriber) {
    return mergeInternals_1$2.mergeInternals(source, subscriber, project, concurrent);
  });
}
mergeMap$1.mergeMap = mergeMap;
Object.defineProperty(mergeAll$1, "__esModule", { value: true });
mergeAll$1.mergeAll = void 0;
var mergeMap_1$6 = mergeMap$1;
var identity_1$c = identity$1;
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap_1$6.mergeMap(identity_1$c.identity, concurrent);
}
mergeAll$1.mergeAll = mergeAll;
Object.defineProperty(concatAll$1, "__esModule", { value: true });
concatAll$1.concatAll = void 0;
var mergeAll_1$2 = mergeAll$1;
function concatAll() {
  return mergeAll_1$2.mergeAll(1);
}
concatAll$1.concatAll = concatAll;
Object.defineProperty(concat$3, "__esModule", { value: true });
concat$3.concat = void 0;
var concatAll_1$1 = concatAll$1;
var args_1$a = args;
var from_1$4 = from$1;
function concat$2() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  return concatAll_1$1.concatAll()(from_1$4.from(args2, args_1$a.popScheduler(args2)));
}
concat$3.concat = concat$2;
var connectable$1 = {};
var defer$1 = {};
Object.defineProperty(defer$1, "__esModule", { value: true });
defer$1.defer = void 0;
var Observable_1$c = Observable$1;
var innerFrom_1$y = innerFrom$1;
function defer(observableFactory) {
  return new Observable_1$c.Observable(function(subscriber) {
    innerFrom_1$y.innerFrom(observableFactory()).subscribe(subscriber);
  });
}
defer$1.defer = defer;
Object.defineProperty(connectable$1, "__esModule", { value: true });
connectable$1.connectable = void 0;
var Subject_1$b = Subject$1;
var Observable_1$b = Observable$1;
var defer_1$2 = defer$1;
var DEFAULT_CONFIG$1 = {
  connector: function() {
    return new Subject_1$b.Subject();
  },
  resetOnDisconnect: true
};
function connectable(source, config2) {
  if (config2 === void 0) {
    config2 = DEFAULT_CONFIG$1;
  }
  var connection = null;
  var connector = config2.connector, _a = config2.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
  var subject = connector();
  var result = new Observable_1$b.Observable(function(subscriber) {
    return subject.subscribe(subscriber);
  });
  result.connect = function() {
    if (!connection || connection.closed) {
      connection = defer_1$2.defer(function() {
        return source;
      }).subscribe(subject);
      if (resetOnDisconnect) {
        connection.add(function() {
          return subject = connector();
        });
      }
    }
    return connection;
  };
  return result;
}
connectable$1.connectable = connectable;
var forkJoin$1 = {};
Object.defineProperty(forkJoin$1, "__esModule", { value: true });
forkJoin$1.forkJoin = void 0;
var Observable_1$a = Observable$1;
var argsArgArrayOrObject_1 = argsArgArrayOrObject$1;
var innerFrom_1$x = innerFrom$1;
var args_1$9 = args;
var OperatorSubscriber_1$P = OperatorSubscriber$1;
var mapOneOrManyArgs_1$4 = mapOneOrManyArgs$1;
var createObject_1 = createObject$1;
function forkJoin() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var resultSelector = args_1$9.popResultSelector(args2);
  var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args2), sources = _a.args, keys = _a.keys;
  var result = new Observable_1$a.Observable(function(subscriber) {
    var length = sources.length;
    if (!length) {
      subscriber.complete();
      return;
    }
    var values = new Array(length);
    var remainingCompletions = length;
    var remainingEmissions = length;
    var _loop_1 = function(sourceIndex2) {
      var hasValue = false;
      innerFrom_1$x.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1$P.createOperatorSubscriber(subscriber, function(value) {
        if (!hasValue) {
          hasValue = true;
          remainingEmissions--;
        }
        values[sourceIndex2] = value;
      }, function() {
        return remainingCompletions--;
      }, void 0, function() {
        if (!remainingCompletions || !hasValue) {
          if (!remainingEmissions) {
            subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
          }
          subscriber.complete();
        }
      }));
    };
    for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      _loop_1(sourceIndex);
    }
  });
  return resultSelector ? result.pipe(mapOneOrManyArgs_1$4.mapOneOrManyArgs(resultSelector)) : result;
}
forkJoin$1.forkJoin = forkJoin;
var fromEvent$1 = {};
var __read$f = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
Object.defineProperty(fromEvent$1, "__esModule", { value: true });
fromEvent$1.fromEvent = void 0;
var innerFrom_1$w = innerFrom$1;
var Observable_1$9 = Observable$1;
var mergeMap_1$5 = mergeMap$1;
var isArrayLike_1 = isArrayLike;
var isFunction_1$a = isFunction$1;
var mapOneOrManyArgs_1$3 = mapOneOrManyArgs$1;
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction_1$a.isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1$3.mapOneOrManyArgs(resultSelector));
  }
  var _a = __read$f(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
  if (!add) {
    if (isArrayLike_1.isArrayLike(target)) {
      return mergeMap_1$5.mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom_1$w.innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable_1$9.Observable(function(subscriber) {
    var handler = function() {
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      return subscriber.next(1 < args2.length ? args2 : args2[0]);
    };
    add(handler);
    return function() {
      return remove(handler);
    };
  });
}
fromEvent$1.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction_1$a.isFunction(target.addListener) && isFunction_1$a.isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction_1$a.isFunction(target.on) && isFunction_1$a.isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction_1$a.isFunction(target.addEventListener) && isFunction_1$a.isFunction(target.removeEventListener);
}
var fromEventPattern$1 = {};
Object.defineProperty(fromEventPattern$1, "__esModule", { value: true });
fromEventPattern$1.fromEventPattern = void 0;
var Observable_1$8 = Observable$1;
var isFunction_1$9 = isFunction$1;
var mapOneOrManyArgs_1$2 = mapOneOrManyArgs$1;
function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1$2.mapOneOrManyArgs(resultSelector));
  }
  return new Observable_1$8.Observable(function(subscriber) {
    var handler = function() {
      var e = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
      }
      return subscriber.next(e.length === 1 ? e[0] : e);
    };
    var retValue = addHandler(handler);
    return isFunction_1$9.isFunction(removeHandler) ? function() {
      return removeHandler(handler, retValue);
    } : void 0;
  });
}
fromEventPattern$1.fromEventPattern = fromEventPattern;
var generate$1 = {};
var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (_2) try {
      if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
Object.defineProperty(generate$1, "__esModule", { value: true });
generate$1.generate = void 0;
var identity_1$b = identity$1;
var isScheduler_1$1 = isScheduler$1;
var defer_1$1 = defer$1;
var scheduleIterable_1 = scheduleIterable$1;
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
  var _a, _b;
  var resultSelector;
  var initialState;
  if (arguments.length === 1) {
    _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1$b.identity : _b, scheduler = _a.scheduler;
  } else {
    initialState = initialStateOrOptions;
    if (!resultSelectorOrScheduler || isScheduler_1$1.isScheduler(resultSelectorOrScheduler)) {
      resultSelector = identity_1$b.identity;
      scheduler = resultSelectorOrScheduler;
    } else {
      resultSelector = resultSelectorOrScheduler;
    }
  }
  function gen() {
    var state;
    return __generator(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          state = initialState;
          _a2.label = 1;
        case 1:
          if (!(!condition || condition(state))) return [3, 4];
          return [4, resultSelector(state)];
        case 2:
          _a2.sent();
          _a2.label = 3;
        case 3:
          state = iterate(state);
          return [3, 1];
        case 4:
          return [2];
      }
    });
  }
  return defer_1$1.defer(scheduler ? function() {
    return scheduleIterable_1.scheduleIterable(gen(), scheduler);
  } : gen);
}
generate$1.generate = generate;
var iif$1 = {};
Object.defineProperty(iif$1, "__esModule", { value: true });
iif$1.iif = void 0;
var defer_1 = defer$1;
function iif(condition, trueResult, falseResult) {
  return defer_1.defer(function() {
    return condition() ? trueResult : falseResult;
  });
}
iif$1.iif = iif;
var interval$1 = {};
var timer$1 = {};
Object.defineProperty(timer$1, "__esModule", { value: true });
timer$1.timer = void 0;
var Observable_1$7 = Observable$1;
var async_1$a = async;
var isScheduler_1 = isScheduler$1;
var isDate_1$1 = isDate;
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async_1$a.async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler_1.isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable_1$7.Observable(function(subscriber) {
    var due = isDate_1$1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
timer$1.timer = timer;
Object.defineProperty(interval$1, "__esModule", { value: true });
interval$1.interval = void 0;
var async_1$9 = async;
var timer_1$5 = timer$1;
function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }
  if (scheduler === void 0) {
    scheduler = async_1$9.asyncScheduler;
  }
  if (period < 0) {
    period = 0;
  }
  return timer_1$5.timer(period, period, scheduler);
}
interval$1.interval = interval;
var merge$3 = {};
Object.defineProperty(merge$3, "__esModule", { value: true });
merge$3.merge = void 0;
var mergeAll_1$1 = mergeAll$1;
var innerFrom_1$v = innerFrom$1;
var empty_1$6 = empty;
var args_1$8 = args;
var from_1$3 = from$1;
function merge$2() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var scheduler = args_1$8.popScheduler(args2);
  var concurrent = args_1$8.popNumber(args2, Infinity);
  var sources = args2;
  return !sources.length ? empty_1$6.EMPTY : sources.length === 1 ? innerFrom_1$v.innerFrom(sources[0]) : mergeAll_1$1.mergeAll(concurrent)(from_1$3.from(sources, scheduler));
}
merge$3.merge = merge$2;
var never = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.never = exports.NEVER = void 0;
  var Observable_12 = Observable$1;
  var noop_12 = noop$1;
  exports.NEVER = new Observable_12.Observable(noop_12.noop);
  function never2() {
    return exports.NEVER;
  }
  exports.never = never2;
})(never);
var onErrorResumeNext$1 = {};
var argsOrArgArray$1 = {};
Object.defineProperty(argsOrArgArray$1, "__esModule", { value: true });
argsOrArgArray$1.argsOrArgArray = void 0;
var isArray = Array.isArray;
function argsOrArgArray(args2) {
  return args2.length === 1 && isArray(args2[0]) ? args2[0] : args2;
}
argsOrArgArray$1.argsOrArgArray = argsOrArgArray;
Object.defineProperty(onErrorResumeNext$1, "__esModule", { value: true });
onErrorResumeNext$1.onErrorResumeNext = void 0;
var Observable_1$6 = Observable$1;
var argsOrArgArray_1$6 = argsOrArgArray$1;
var OperatorSubscriber_1$O = OperatorSubscriber$1;
var noop_1$c = noop$1;
var innerFrom_1$u = innerFrom$1;
function onErrorResumeNext() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray_1$6.argsOrArgArray(sources);
  return new Observable_1$6.Observable(function(subscriber) {
    var sourceIndex = 0;
    var subscribeNext = function() {
      if (sourceIndex < nextSources.length) {
        var nextSource = void 0;
        try {
          nextSource = innerFrom_1$u.innerFrom(nextSources[sourceIndex++]);
        } catch (err) {
          subscribeNext();
          return;
        }
        var innerSubscriber = new OperatorSubscriber_1$O.OperatorSubscriber(subscriber, void 0, noop_1$c.noop, noop_1$c.noop);
        nextSource.subscribe(innerSubscriber);
        innerSubscriber.add(subscribeNext);
      } else {
        subscriber.complete();
      }
    };
    subscribeNext();
  });
}
onErrorResumeNext$1.onErrorResumeNext = onErrorResumeNext;
var pairs$1 = {};
Object.defineProperty(pairs$1, "__esModule", { value: true });
pairs$1.pairs = void 0;
var from_1$2 = from$1;
function pairs(obj, scheduler) {
  return from_1$2.from(Object.entries(obj), scheduler);
}
pairs$1.pairs = pairs;
var partition$3 = {};
var not$1 = {};
Object.defineProperty(not$1, "__esModule", { value: true });
not$1.not = void 0;
function not(pred, thisArg) {
  return function(value, index) {
    return !pred.call(thisArg, value, index);
  };
}
not$1.not = not;
var filter$1 = {};
Object.defineProperty(filter$1, "__esModule", { value: true });
filter$1.filter = void 0;
var lift_1$_ = lift;
var OperatorSubscriber_1$N = OperatorSubscriber$1;
function filter(predicate, thisArg) {
  return lift_1$_.operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(OperatorSubscriber_1$N.createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
filter$1.filter = filter;
Object.defineProperty(partition$3, "__esModule", { value: true });
partition$3.partition = void 0;
var not_1$1 = not$1;
var filter_1$5 = filter$1;
var innerFrom_1$t = innerFrom$1;
function partition$2(source, predicate, thisArg) {
  return [filter_1$5.filter(predicate, thisArg)(innerFrom_1$t.innerFrom(source)), filter_1$5.filter(not_1$1.not(predicate, thisArg))(innerFrom_1$t.innerFrom(source))];
}
partition$3.partition = partition$2;
var race$3 = {};
Object.defineProperty(race$3, "__esModule", { value: true });
race$3.raceInit = race$3.race = void 0;
var Observable_1$5 = Observable$1;
var innerFrom_1$s = innerFrom$1;
var argsOrArgArray_1$5 = argsOrArgArray$1;
var OperatorSubscriber_1$M = OperatorSubscriber$1;
function race$2() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  sources = argsOrArgArray_1$5.argsOrArgArray(sources);
  return sources.length === 1 ? innerFrom_1$s.innerFrom(sources[0]) : new Observable_1$5.Observable(raceInit(sources));
}
race$3.race = race$2;
function raceInit(sources) {
  return function(subscriber) {
    var subscriptions = [];
    var _loop_1 = function(i2) {
      subscriptions.push(innerFrom_1$s.innerFrom(sources[i2]).subscribe(OperatorSubscriber_1$M.createOperatorSubscriber(subscriber, function(value) {
        if (subscriptions) {
          for (var s2 = 0; s2 < subscriptions.length; s2++) {
            s2 !== i2 && subscriptions[s2].unsubscribe();
          }
          subscriptions = null;
        }
        subscriber.next(value);
      })));
    };
    for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
      _loop_1(i);
    }
  };
}
race$3.raceInit = raceInit;
var range$1 = {};
Object.defineProperty(range$1, "__esModule", { value: true });
range$1.range = void 0;
var Observable_1$4 = Observable$1;
var empty_1$5 = empty;
function range(start, count2, scheduler) {
  if (count2 == null) {
    count2 = start;
    start = 0;
  }
  if (count2 <= 0) {
    return empty_1$5.EMPTY;
  }
  var end = count2 + start;
  return new Observable_1$4.Observable(scheduler ? function(subscriber) {
    var n = start;
    return scheduler.schedule(function() {
      if (n < end) {
        subscriber.next(n++);
        this.schedule();
      } else {
        subscriber.complete();
      }
    });
  } : function(subscriber) {
    var n = start;
    while (n < end && !subscriber.closed) {
      subscriber.next(n++);
    }
    subscriber.complete();
  });
}
range$1.range = range;
var using$1 = {};
Object.defineProperty(using$1, "__esModule", { value: true });
using$1.using = void 0;
var Observable_1$3 = Observable$1;
var innerFrom_1$r = innerFrom$1;
var empty_1$4 = empty;
function using(resourceFactory, observableFactory) {
  return new Observable_1$3.Observable(function(subscriber) {
    var resource = resourceFactory();
    var result = observableFactory(resource);
    var source = result ? innerFrom_1$r.innerFrom(result) : empty_1$4.EMPTY;
    source.subscribe(subscriber);
    return function() {
      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}
using$1.using = using;
var zip$3 = {};
var __read$e = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$e = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(zip$3, "__esModule", { value: true });
zip$3.zip = void 0;
var Observable_1$2 = Observable$1;
var innerFrom_1$q = innerFrom$1;
var argsOrArgArray_1$4 = argsOrArgArray$1;
var empty_1$3 = empty;
var OperatorSubscriber_1$L = OperatorSubscriber$1;
var args_1$7 = args;
function zip$2() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var resultSelector = args_1$7.popResultSelector(args2);
  var sources = argsOrArgArray_1$4.argsOrArgArray(args2);
  return sources.length ? new Observable_1$2.Observable(function(subscriber) {
    var buffers = sources.map(function() {
      return [];
    });
    var completed = sources.map(function() {
      return false;
    });
    subscriber.add(function() {
      buffers = completed = null;
    });
    var _loop_1 = function(sourceIndex2) {
      innerFrom_1$q.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1$L.createOperatorSubscriber(subscriber, function(value) {
        buffers[sourceIndex2].push(value);
        if (buffers.every(function(buffer2) {
          return buffer2.length;
        })) {
          var result = buffers.map(function(buffer2) {
            return buffer2.shift();
          });
          subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray$e([], __read$e(result))) : result);
          if (buffers.some(function(buffer2, i) {
            return !buffer2.length && completed[i];
          })) {
            subscriber.complete();
          }
        }
      }, function() {
        completed[sourceIndex2] = true;
        !buffers[sourceIndex2].length && subscriber.complete();
      }));
    };
    for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
      _loop_1(sourceIndex);
    }
    return function() {
      buffers = completed = null;
    };
  }) : empty_1$3.EMPTY;
}
zip$3.zip = zip$2;
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
var audit$1 = {};
Object.defineProperty(audit$1, "__esModule", { value: true });
audit$1.audit = void 0;
var lift_1$Z = lift;
var innerFrom_1$p = innerFrom$1;
var OperatorSubscriber_1$K = OperatorSubscriber$1;
function audit(durationSelector) {
  return lift_1$Z.operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;
    var isComplete = false;
    var endDuration = function() {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
      isComplete && subscriber.complete();
    };
    var cleanupDuration = function() {
      durationSubscriber = null;
      isComplete && subscriber.complete();
    };
    source.subscribe(OperatorSubscriber_1$K.createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      lastValue = value;
      if (!durationSubscriber) {
        innerFrom_1$p.innerFrom(durationSelector(value)).subscribe(durationSubscriber = OperatorSubscriber_1$K.createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
      }
    }, function() {
      isComplete = true;
      (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
    }));
  });
}
audit$1.audit = audit;
var auditTime$1 = {};
Object.defineProperty(auditTime$1, "__esModule", { value: true });
auditTime$1.auditTime = void 0;
var async_1$8 = async;
var audit_1 = audit$1;
var timer_1$4 = timer$1;
function auditTime(duration, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1$8.asyncScheduler;
  }
  return audit_1.audit(function() {
    return timer_1$4.timer(duration, scheduler);
  });
}
auditTime$1.auditTime = auditTime;
var buffer$1 = {};
Object.defineProperty(buffer$1, "__esModule", { value: true });
buffer$1.buffer = void 0;
var lift_1$Y = lift;
var noop_1$b = noop$1;
var OperatorSubscriber_1$J = OperatorSubscriber$1;
var innerFrom_1$o = innerFrom$1;
function buffer(closingNotifier) {
  return lift_1$Y.operate(function(source, subscriber) {
    var currentBuffer = [];
    source.subscribe(OperatorSubscriber_1$J.createOperatorSubscriber(subscriber, function(value) {
      return currentBuffer.push(value);
    }, function() {
      subscriber.next(currentBuffer);
      subscriber.complete();
    }));
    innerFrom_1$o.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1$J.createOperatorSubscriber(subscriber, function() {
      var b = currentBuffer;
      currentBuffer = [];
      subscriber.next(b);
    }, noop_1$b.noop));
    return function() {
      currentBuffer = null;
    };
  });
}
buffer$1.buffer = buffer;
var bufferCount$1 = {};
var __values$5 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferCount$1, "__esModule", { value: true });
bufferCount$1.bufferCount = void 0;
var lift_1$X = lift;
var OperatorSubscriber_1$I = OperatorSubscriber$1;
var arrRemove_1$4 = arrRemove$1;
function bufferCount(bufferSize, startBufferEvery) {
  if (startBufferEvery === void 0) {
    startBufferEvery = null;
  }
  startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
  return lift_1$X.operate(function(source, subscriber) {
    var buffers = [];
    var count2 = 0;
    source.subscribe(OperatorSubscriber_1$I.createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a, e_2, _b;
      var toEmit = null;
      if (count2++ % startBufferEvery === 0) {
        buffers.push([]);
      }
      try {
        for (var buffers_1 = __values$5(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer2 = buffers_1_1.value;
          buffer2.push(value);
          if (bufferSize <= buffer2.length) {
            toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
            toEmit.push(buffer2);
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      if (toEmit) {
        try {
          for (var toEmit_1 = __values$5(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
            var buffer2 = toEmit_1_1.value;
            arrRemove_1$4.arrRemove(buffers, buffer2);
            subscriber.next(buffer2);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
    }, function() {
      var e_3, _a;
      try {
        for (var buffers_2 = __values$5(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
          var buffer2 = buffers_2_1.value;
          subscriber.next(buffer2);
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
      subscriber.complete();
    }, void 0, function() {
      buffers = null;
    }));
  });
}
bufferCount$1.bufferCount = bufferCount;
var bufferTime$1 = {};
var __values$4 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferTime$1, "__esModule", { value: true });
bufferTime$1.bufferTime = void 0;
var Subscription_1$3 = Subscription$1;
var lift_1$W = lift;
var OperatorSubscriber_1$H = OperatorSubscriber$1;
var arrRemove_1$3 = arrRemove$1;
var async_1$7 = async;
var args_1$6 = args;
var executeSchedule_1$1 = executeSchedule$1;
function bufferTime(bufferTimeSpan) {
  var _a, _b;
  var otherArgs = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }
  var scheduler = (_a = args_1$6.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1$7.asyncScheduler;
  var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxBufferSize = otherArgs[1] || Infinity;
  return lift_1$W.operate(function(source, subscriber) {
    var bufferRecords = [];
    var restartOnEmit = false;
    var emit = function(record) {
      var buffer2 = record.buffer, subs = record.subs;
      subs.unsubscribe();
      arrRemove_1$3.arrRemove(bufferRecords, record);
      subscriber.next(buffer2);
      restartOnEmit && startBuffer();
    };
    var startBuffer = function() {
      if (bufferRecords) {
        var subs = new Subscription_1$3.Subscription();
        subscriber.add(subs);
        var buffer2 = [];
        var record_1 = {
          buffer: buffer2,
          subs
        };
        bufferRecords.push(record_1);
        executeSchedule_1$1.executeSchedule(subs, scheduler, function() {
          return emit(record_1);
        }, bufferTimeSpan);
      }
    };
    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
      executeSchedule_1$1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
    } else {
      restartOnEmit = true;
    }
    startBuffer();
    var bufferTimeSubscriber = OperatorSubscriber_1$H.createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a2;
      var recordsCopy = bufferRecords.slice();
      try {
        for (var recordsCopy_1 = __values$4(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
          var record = recordsCopy_1_1.value;
          var buffer2 = record.buffer;
          buffer2.push(value);
          maxBufferSize <= buffer2.length && emit(record);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
        subscriber.next(bufferRecords.shift().buffer);
      }
      bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
      subscriber.complete();
      subscriber.unsubscribe();
    }, void 0, function() {
      return bufferRecords = null;
    });
    source.subscribe(bufferTimeSubscriber);
  });
}
bufferTime$1.bufferTime = bufferTime;
var bufferToggle$1 = {};
var __values$3 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferToggle$1, "__esModule", { value: true });
bufferToggle$1.bufferToggle = void 0;
var Subscription_1$2 = Subscription$1;
var lift_1$V = lift;
var innerFrom_1$n = innerFrom$1;
var OperatorSubscriber_1$G = OperatorSubscriber$1;
var noop_1$a = noop$1;
var arrRemove_1$2 = arrRemove$1;
function bufferToggle(openings, closingSelector) {
  return lift_1$V.operate(function(source, subscriber) {
    var buffers = [];
    innerFrom_1$n.innerFrom(openings).subscribe(OperatorSubscriber_1$G.createOperatorSubscriber(subscriber, function(openValue) {
      var buffer2 = [];
      buffers.push(buffer2);
      var closingSubscription = new Subscription_1$2.Subscription();
      var emitBuffer = function() {
        arrRemove_1$2.arrRemove(buffers, buffer2);
        subscriber.next(buffer2);
        closingSubscription.unsubscribe();
      };
      closingSubscription.add(innerFrom_1$n.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1$G.createOperatorSubscriber(subscriber, emitBuffer, noop_1$a.noop)));
    }, noop_1$a.noop));
    source.subscribe(OperatorSubscriber_1$G.createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      try {
        for (var buffers_1 = __values$3(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer2 = buffers_1_1.value;
          buffer2.push(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (buffers.length > 0) {
        subscriber.next(buffers.shift());
      }
      subscriber.complete();
    }));
  });
}
bufferToggle$1.bufferToggle = bufferToggle;
var bufferWhen$1 = {};
Object.defineProperty(bufferWhen$1, "__esModule", { value: true });
bufferWhen$1.bufferWhen = void 0;
var lift_1$U = lift;
var noop_1$9 = noop$1;
var OperatorSubscriber_1$F = OperatorSubscriber$1;
var innerFrom_1$m = innerFrom$1;
function bufferWhen(closingSelector) {
  return lift_1$U.operate(function(source, subscriber) {
    var buffer2 = null;
    var closingSubscriber = null;
    var openBuffer = function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      var b = buffer2;
      buffer2 = [];
      b && subscriber.next(b);
      innerFrom_1$m.innerFrom(closingSelector()).subscribe(closingSubscriber = OperatorSubscriber_1$F.createOperatorSubscriber(subscriber, openBuffer, noop_1$9.noop));
    };
    openBuffer();
    source.subscribe(OperatorSubscriber_1$F.createOperatorSubscriber(subscriber, function(value) {
      return buffer2 === null || buffer2 === void 0 ? void 0 : buffer2.push(value);
    }, function() {
      buffer2 && subscriber.next(buffer2);
      subscriber.complete();
    }, void 0, function() {
      return buffer2 = closingSubscriber = null;
    }));
  });
}
bufferWhen$1.bufferWhen = bufferWhen;
var catchError$1 = {};
Object.defineProperty(catchError$1, "__esModule", { value: true });
catchError$1.catchError = void 0;
var innerFrom_1$l = innerFrom$1;
var OperatorSubscriber_1$E = OperatorSubscriber$1;
var lift_1$T = lift;
function catchError(selector) {
  return lift_1$T.operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(OperatorSubscriber_1$E.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom_1$l.innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
catchError$1.catchError = catchError;
var combineAll = {};
var combineLatestAll$1 = {};
var joinAllInternals$1 = {};
var toArray$1 = {};
var reduce$1 = {};
var scanInternals$1 = {};
Object.defineProperty(scanInternals$1, "__esModule", { value: true });
scanInternals$1.scanInternals = void 0;
var OperatorSubscriber_1$D = OperatorSubscriber$1;
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
  return function(source, subscriber) {
    var hasState = hasSeed;
    var state = seed;
    var index = 0;
    source.subscribe(OperatorSubscriber_1$D.createOperatorSubscriber(subscriber, function(value) {
      var i = index++;
      state = hasState ? accumulator(state, value, i) : (hasState = true, value);
      emitOnNext && subscriber.next(state);
    }, emitBeforeComplete && function() {
      hasState && subscriber.next(state);
      subscriber.complete();
    }));
  };
}
scanInternals$1.scanInternals = scanInternals;
Object.defineProperty(reduce$1, "__esModule", { value: true });
reduce$1.reduce = void 0;
var scanInternals_1$1 = scanInternals$1;
var lift_1$S = lift;
function reduce(accumulator, seed) {
  return lift_1$S.operate(scanInternals_1$1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
reduce$1.reduce = reduce;
Object.defineProperty(toArray$1, "__esModule", { value: true });
toArray$1.toArray = void 0;
var reduce_1$3 = reduce$1;
var lift_1$R = lift;
var arrReducer = function(arr, value) {
  return arr.push(value), arr;
};
function toArray() {
  return lift_1$R.operate(function(source, subscriber) {
    reduce_1$3.reduce(arrReducer, [])(source).subscribe(subscriber);
  });
}
toArray$1.toArray = toArray;
Object.defineProperty(joinAllInternals$1, "__esModule", { value: true });
joinAllInternals$1.joinAllInternals = void 0;
var identity_1$a = identity$1;
var mapOneOrManyArgs_1$1 = mapOneOrManyArgs$1;
var pipe_1$1 = pipe$1;
var mergeMap_1$4 = mergeMap$1;
var toArray_1 = toArray$1;
function joinAllInternals(joinFn, project) {
  return pipe_1$1.pipe(toArray_1.toArray(), mergeMap_1$4.mergeMap(function(sources) {
    return joinFn(sources);
  }), project ? mapOneOrManyArgs_1$1.mapOneOrManyArgs(project) : identity_1$a.identity);
}
joinAllInternals$1.joinAllInternals = joinAllInternals;
Object.defineProperty(combineLatestAll$1, "__esModule", { value: true });
combineLatestAll$1.combineLatestAll = void 0;
var combineLatest_1$2 = combineLatest$3;
var joinAllInternals_1$1 = joinAllInternals$1;
function combineLatestAll(project) {
  return joinAllInternals_1$1.joinAllInternals(combineLatest_1$2.combineLatest, project);
}
combineLatestAll$1.combineLatestAll = combineLatestAll;
Object.defineProperty(combineAll, "__esModule", { value: true });
combineAll.combineAll = void 0;
var combineLatestAll_1 = combineLatestAll$1;
combineAll.combineAll = combineLatestAll_1.combineLatestAll;
var combineLatestWith$1 = {};
var combineLatest$1 = {};
var __read$d = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$d = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(combineLatest$1, "__esModule", { value: true });
combineLatest$1.combineLatest = void 0;
var combineLatest_1$1 = combineLatest$3;
var lift_1$Q = lift;
var argsOrArgArray_1$3 = argsOrArgArray$1;
var mapOneOrManyArgs_1 = mapOneOrManyArgs$1;
var pipe_1 = pipe$1;
var args_1$5 = args;
function combineLatest() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var resultSelector = args_1$5.popResultSelector(args2);
  return resultSelector ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray$d([], __read$d(args2))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : lift_1$Q.operate(function(source, subscriber) {
    combineLatest_1$1.combineLatestInit(__spreadArray$d([source], __read$d(argsOrArgArray_1$3.argsOrArgArray(args2))))(subscriber);
  });
}
combineLatest$1.combineLatest = combineLatest;
var __read$c = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$c = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(combineLatestWith$1, "__esModule", { value: true });
combineLatestWith$1.combineLatestWith = void 0;
var combineLatest_1 = combineLatest$1;
function combineLatestWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return combineLatest_1.combineLatest.apply(void 0, __spreadArray$c([], __read$c(otherSources)));
}
combineLatestWith$1.combineLatestWith = combineLatestWith;
var concatMap$1 = {};
Object.defineProperty(concatMap$1, "__esModule", { value: true });
concatMap$1.concatMap = void 0;
var mergeMap_1$3 = mergeMap$1;
var isFunction_1$8 = isFunction$1;
function concatMap(project, resultSelector) {
  return isFunction_1$8.isFunction(resultSelector) ? mergeMap_1$3.mergeMap(project, resultSelector, 1) : mergeMap_1$3.mergeMap(project, 1);
}
concatMap$1.concatMap = concatMap;
var concatMapTo$1 = {};
Object.defineProperty(concatMapTo$1, "__esModule", { value: true });
concatMapTo$1.concatMapTo = void 0;
var concatMap_1 = concatMap$1;
var isFunction_1$7 = isFunction$1;
function concatMapTo(innerObservable, resultSelector) {
  return isFunction_1$7.isFunction(resultSelector) ? concatMap_1.concatMap(function() {
    return innerObservable;
  }, resultSelector) : concatMap_1.concatMap(function() {
    return innerObservable;
  });
}
concatMapTo$1.concatMapTo = concatMapTo;
var concatWith$1 = {};
var concat$1 = {};
var __read$b = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$b = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(concat$1, "__esModule", { value: true });
concat$1.concat = void 0;
var lift_1$P = lift;
var concatAll_1 = concatAll$1;
var args_1$4 = args;
var from_1$1 = from$1;
function concat() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var scheduler = args_1$4.popScheduler(args2);
  return lift_1$P.operate(function(source, subscriber) {
    concatAll_1.concatAll()(from_1$1.from(__spreadArray$b([source], __read$b(args2)), scheduler)).subscribe(subscriber);
  });
}
concat$1.concat = concat;
var __read$a = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$a = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(concatWith$1, "__esModule", { value: true });
concatWith$1.concatWith = void 0;
var concat_1$3 = concat$1;
function concatWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return concat_1$3.concat.apply(void 0, __spreadArray$a([], __read$a(otherSources)));
}
concatWith$1.concatWith = concatWith;
var connect$1 = {};
var fromSubscribable$1 = {};
Object.defineProperty(fromSubscribable$1, "__esModule", { value: true });
fromSubscribable$1.fromSubscribable = void 0;
var Observable_1$1 = Observable$1;
function fromSubscribable(subscribable) {
  return new Observable_1$1.Observable(function(subscriber) {
    return subscribable.subscribe(subscriber);
  });
}
fromSubscribable$1.fromSubscribable = fromSubscribable;
Object.defineProperty(connect$1, "__esModule", { value: true });
connect$1.connect = void 0;
var Subject_1$a = Subject$1;
var innerFrom_1$k = innerFrom$1;
var lift_1$O = lift;
var fromSubscribable_1 = fromSubscribable$1;
var DEFAULT_CONFIG = {
  connector: function() {
    return new Subject_1$a.Subject();
  }
};
function connect(selector, config2) {
  if (config2 === void 0) {
    config2 = DEFAULT_CONFIG;
  }
  var connector = config2.connector;
  return lift_1$O.operate(function(source, subscriber) {
    var subject = connector();
    innerFrom_1$k.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
    subscriber.add(source.subscribe(subject));
  });
}
connect$1.connect = connect;
var count$1 = {};
Object.defineProperty(count$1, "__esModule", { value: true });
count$1.count = void 0;
var reduce_1$2 = reduce$1;
function count(predicate) {
  return reduce_1$2.reduce(function(total, value, i) {
    return !predicate || predicate(value, i) ? total + 1 : total;
  }, 0);
}
count$1.count = count;
var debounce$1 = {};
Object.defineProperty(debounce$1, "__esModule", { value: true });
debounce$1.debounce = void 0;
var lift_1$N = lift;
var noop_1$8 = noop$1;
var OperatorSubscriber_1$C = OperatorSubscriber$1;
var innerFrom_1$j = innerFrom$1;
function debounce(durationSelector) {
  return lift_1$N.operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;
    var emit = function() {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    source.subscribe(OperatorSubscriber_1$C.createOperatorSubscriber(subscriber, function(value) {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      hasValue = true;
      lastValue = value;
      durationSubscriber = OperatorSubscriber_1$C.createOperatorSubscriber(subscriber, emit, noop_1$8.noop);
      innerFrom_1$j.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = durationSubscriber = null;
    }));
  });
}
debounce$1.debounce = debounce;
var debounceTime$1 = {};
Object.defineProperty(debounceTime$1, "__esModule", { value: true });
debounceTime$1.debounceTime = void 0;
var async_1$6 = async;
var lift_1$M = lift;
var OperatorSubscriber_1$B = OperatorSubscriber$1;
function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1$6.asyncScheduler;
  }
  return lift_1$M.operate(function(source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = function() {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe(OperatorSubscriber_1$B.createOperatorSubscriber(subscriber, function(value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = activeTask = null;
    }));
  });
}
debounceTime$1.debounceTime = debounceTime;
var defaultIfEmpty$1 = {};
Object.defineProperty(defaultIfEmpty$1, "__esModule", { value: true });
defaultIfEmpty$1.defaultIfEmpty = void 0;
var lift_1$L = lift;
var OperatorSubscriber_1$A = OperatorSubscriber$1;
function defaultIfEmpty(defaultValue) {
  return lift_1$L.operate(function(source, subscriber) {
    var hasValue = false;
    source.subscribe(OperatorSubscriber_1$A.createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      if (!hasValue) {
        subscriber.next(defaultValue);
      }
      subscriber.complete();
    }));
  });
}
defaultIfEmpty$1.defaultIfEmpty = defaultIfEmpty;
var delay$1 = {};
var delayWhen$1 = {};
var take$1 = {};
Object.defineProperty(take$1, "__esModule", { value: true });
take$1.take = void 0;
var empty_1$2 = empty;
var lift_1$K = lift;
var OperatorSubscriber_1$z = OperatorSubscriber$1;
function take(count2) {
  return count2 <= 0 ? function() {
    return empty_1$2.EMPTY;
  } : lift_1$K.operate(function(source, subscriber) {
    var seen = 0;
    source.subscribe(OperatorSubscriber_1$z.createOperatorSubscriber(subscriber, function(value) {
      if (++seen <= count2) {
        subscriber.next(value);
        if (count2 <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}
take$1.take = take;
var ignoreElements$1 = {};
Object.defineProperty(ignoreElements$1, "__esModule", { value: true });
ignoreElements$1.ignoreElements = void 0;
var lift_1$J = lift;
var OperatorSubscriber_1$y = OperatorSubscriber$1;
var noop_1$7 = noop$1;
function ignoreElements() {
  return lift_1$J.operate(function(source, subscriber) {
    source.subscribe(OperatorSubscriber_1$y.createOperatorSubscriber(subscriber, noop_1$7.noop));
  });
}
ignoreElements$1.ignoreElements = ignoreElements;
var mapTo$1 = {};
Object.defineProperty(mapTo$1, "__esModule", { value: true });
mapTo$1.mapTo = void 0;
var map_1$3 = map$1;
function mapTo(value) {
  return map_1$3.map(function() {
    return value;
  });
}
mapTo$1.mapTo = mapTo;
Object.defineProperty(delayWhen$1, "__esModule", { value: true });
delayWhen$1.delayWhen = void 0;
var concat_1$2 = concat$3;
var take_1$2 = take$1;
var ignoreElements_1 = ignoreElements$1;
var mapTo_1 = mapTo$1;
var mergeMap_1$2 = mergeMap$1;
var innerFrom_1$i = innerFrom$1;
function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function(source) {
      return concat_1$2.concat(subscriptionDelay.pipe(take_1$2.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
    };
  }
  return mergeMap_1$2.mergeMap(function(value, index) {
    return innerFrom_1$i.innerFrom(delayDurationSelector(value, index)).pipe(take_1$2.take(1), mapTo_1.mapTo(value));
  });
}
delayWhen$1.delayWhen = delayWhen;
Object.defineProperty(delay$1, "__esModule", { value: true });
delay$1.delay = void 0;
var async_1$5 = async;
var delayWhen_1 = delayWhen$1;
var timer_1$3 = timer$1;
function delay(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1$5.asyncScheduler;
  }
  var duration = timer_1$3.timer(due, scheduler);
  return delayWhen_1.delayWhen(function() {
    return duration;
  });
}
delay$1.delay = delay;
var dematerialize$1 = {};
Object.defineProperty(dematerialize$1, "__esModule", { value: true });
dematerialize$1.dematerialize = void 0;
var Notification_1$1 = Notification;
var lift_1$I = lift;
var OperatorSubscriber_1$x = OperatorSubscriber$1;
function dematerialize() {
  return lift_1$I.operate(function(source, subscriber) {
    source.subscribe(OperatorSubscriber_1$x.createOperatorSubscriber(subscriber, function(notification) {
      return Notification_1$1.observeNotification(notification, subscriber);
    }));
  });
}
dematerialize$1.dematerialize = dematerialize;
var distinct$1 = {};
Object.defineProperty(distinct$1, "__esModule", { value: true });
distinct$1.distinct = void 0;
var lift_1$H = lift;
var OperatorSubscriber_1$w = OperatorSubscriber$1;
var noop_1$6 = noop$1;
var innerFrom_1$h = innerFrom$1;
function distinct(keySelector, flushes) {
  return lift_1$H.operate(function(source, subscriber) {
    var distinctKeys = /* @__PURE__ */ new Set();
    source.subscribe(OperatorSubscriber_1$w.createOperatorSubscriber(subscriber, function(value) {
      var key = keySelector ? keySelector(value) : value;
      if (!distinctKeys.has(key)) {
        distinctKeys.add(key);
        subscriber.next(value);
      }
    }));
    flushes && innerFrom_1$h.innerFrom(flushes).subscribe(OperatorSubscriber_1$w.createOperatorSubscriber(subscriber, function() {
      return distinctKeys.clear();
    }, noop_1$6.noop));
  });
}
distinct$1.distinct = distinct;
var distinctUntilChanged$1 = {};
Object.defineProperty(distinctUntilChanged$1, "__esModule", { value: true });
distinctUntilChanged$1.distinctUntilChanged = void 0;
var identity_1$9 = identity$1;
var lift_1$G = lift;
var OperatorSubscriber_1$v = OperatorSubscriber$1;
function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = identity_1$9.identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return lift_1$G.operate(function(source, subscriber) {
    var previousKey;
    var first2 = true;
    source.subscribe(OperatorSubscriber_1$v.createOperatorSubscriber(subscriber, function(value) {
      var currentKey = keySelector(value);
      if (first2 || !comparator(previousKey, currentKey)) {
        first2 = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
distinctUntilChanged$1.distinctUntilChanged = distinctUntilChanged;
function defaultCompare(a, b) {
  return a === b;
}
var distinctUntilKeyChanged$1 = {};
Object.defineProperty(distinctUntilKeyChanged$1, "__esModule", { value: true });
distinctUntilKeyChanged$1.distinctUntilKeyChanged = void 0;
var distinctUntilChanged_1 = distinctUntilChanged$1;
function distinctUntilKeyChanged(key, compare) {
  return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}
distinctUntilKeyChanged$1.distinctUntilKeyChanged = distinctUntilKeyChanged;
var elementAt$1 = {};
var throwIfEmpty$1 = {};
Object.defineProperty(throwIfEmpty$1, "__esModule", { value: true });
throwIfEmpty$1.throwIfEmpty = void 0;
var EmptyError_1$3 = EmptyError;
var lift_1$F = lift;
var OperatorSubscriber_1$u = OperatorSubscriber$1;
function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }
  return lift_1$F.operate(function(source, subscriber) {
    var hasValue = false;
    source.subscribe(OperatorSubscriber_1$u.createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
    }));
  });
}
throwIfEmpty$1.throwIfEmpty = throwIfEmpty;
function defaultErrorFactory() {
  return new EmptyError_1$3.EmptyError();
}
Object.defineProperty(elementAt$1, "__esModule", { value: true });
elementAt$1.elementAt = void 0;
var ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError;
var filter_1$4 = filter$1;
var throwIfEmpty_1$2 = throwIfEmpty$1;
var defaultIfEmpty_1$2 = defaultIfEmpty$1;
var take_1$1 = take$1;
function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
  }
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(filter_1$4.filter(function(v, i) {
      return i === index;
    }), take_1$1.take(1), hasDefaultValue ? defaultIfEmpty_1$2.defaultIfEmpty(defaultValue) : throwIfEmpty_1$2.throwIfEmpty(function() {
      return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }));
  };
}
elementAt$1.elementAt = elementAt;
var endWith$1 = {};
var __read$9 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$9 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(endWith$1, "__esModule", { value: true });
endWith$1.endWith = void 0;
var concat_1$1 = concat$3;
var of_1 = of$1;
function endWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  return function(source) {
    return concat_1$1.concat(source, of_1.of.apply(void 0, __spreadArray$9([], __read$9(values))));
  };
}
endWith$1.endWith = endWith;
var every$1 = {};
Object.defineProperty(every$1, "__esModule", { value: true });
every$1.every = void 0;
var lift_1$E = lift;
var OperatorSubscriber_1$t = OperatorSubscriber$1;
function every(predicate, thisArg) {
  return lift_1$E.operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(OperatorSubscriber_1$t.createOperatorSubscriber(subscriber, function(value) {
      if (!predicate.call(thisArg, value, index++, source)) {
        subscriber.next(false);
        subscriber.complete();
      }
    }, function() {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
every$1.every = every;
var exhaust = {};
var exhaustAll$1 = {};
var exhaustMap$1 = {};
Object.defineProperty(exhaustMap$1, "__esModule", { value: true });
exhaustMap$1.exhaustMap = void 0;
var map_1$2 = map$1;
var innerFrom_1$g = innerFrom$1;
var lift_1$D = lift;
var OperatorSubscriber_1$s = OperatorSubscriber$1;
function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return function(source) {
      return source.pipe(exhaustMap(function(a, i) {
        return innerFrom_1$g.innerFrom(project(a, i)).pipe(map_1$2.map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }
  return lift_1$D.operate(function(source, subscriber) {
    var index = 0;
    var innerSub = null;
    var isComplete = false;
    source.subscribe(OperatorSubscriber_1$s.createOperatorSubscriber(subscriber, function(outerValue) {
      if (!innerSub) {
        innerSub = OperatorSubscriber_1$s.createOperatorSubscriber(subscriber, void 0, function() {
          innerSub = null;
          isComplete && subscriber.complete();
        });
        innerFrom_1$g.innerFrom(project(outerValue, index++)).subscribe(innerSub);
      }
    }, function() {
      isComplete = true;
      !innerSub && subscriber.complete();
    }));
  });
}
exhaustMap$1.exhaustMap = exhaustMap;
Object.defineProperty(exhaustAll$1, "__esModule", { value: true });
exhaustAll$1.exhaustAll = void 0;
var exhaustMap_1 = exhaustMap$1;
var identity_1$8 = identity$1;
function exhaustAll() {
  return exhaustMap_1.exhaustMap(identity_1$8.identity);
}
exhaustAll$1.exhaustAll = exhaustAll;
Object.defineProperty(exhaust, "__esModule", { value: true });
exhaust.exhaust = void 0;
var exhaustAll_1 = exhaustAll$1;
exhaust.exhaust = exhaustAll_1.exhaustAll;
var expand$1 = {};
Object.defineProperty(expand$1, "__esModule", { value: true });
expand$1.expand = void 0;
var lift_1$C = lift;
var mergeInternals_1$1 = mergeInternals$1;
function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
  return lift_1$C.operate(function(source, subscriber) {
    return mergeInternals_1$1.mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
  });
}
expand$1.expand = expand;
var finalize$1 = {};
Object.defineProperty(finalize$1, "__esModule", { value: true });
finalize$1.finalize = void 0;
var lift_1$B = lift;
function finalize(callback) {
  return lift_1$B.operate(function(source, subscriber) {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}
finalize$1.finalize = finalize;
var find$1 = {};
Object.defineProperty(find$1, "__esModule", { value: true });
find$1.createFind = find$1.find = void 0;
var lift_1$A = lift;
var OperatorSubscriber_1$r = OperatorSubscriber$1;
function find(predicate, thisArg) {
  return lift_1$A.operate(createFind(predicate, thisArg, "value"));
}
find$1.find = find;
function createFind(predicate, thisArg, emit) {
  var findIndex2 = emit === "index";
  return function(source, subscriber) {
    var index = 0;
    source.subscribe(OperatorSubscriber_1$r.createOperatorSubscriber(subscriber, function(value) {
      var i = index++;
      if (predicate.call(thisArg, value, i, source)) {
        subscriber.next(findIndex2 ? i : value);
        subscriber.complete();
      }
    }, function() {
      subscriber.next(findIndex2 ? -1 : void 0);
      subscriber.complete();
    }));
  };
}
find$1.createFind = createFind;
var findIndex$1 = {};
Object.defineProperty(findIndex$1, "__esModule", { value: true });
findIndex$1.findIndex = void 0;
var lift_1$z = lift;
var find_1 = find$1;
function findIndex(predicate, thisArg) {
  return lift_1$z.operate(find_1.createFind(predicate, thisArg, "index"));
}
findIndex$1.findIndex = findIndex;
var first$1 = {};
Object.defineProperty(first$1, "__esModule", { value: true });
first$1.first = void 0;
var EmptyError_1$2 = EmptyError;
var filter_1$3 = filter$1;
var take_1 = take$1;
var defaultIfEmpty_1$1 = defaultIfEmpty$1;
var throwIfEmpty_1$1 = throwIfEmpty$1;
var identity_1$7 = identity$1;
function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(predicate ? filter_1$3.filter(function(v, i) {
      return predicate(v, i, source);
    }) : identity_1$7.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1$1.defaultIfEmpty(defaultValue) : throwIfEmpty_1$1.throwIfEmpty(function() {
      return new EmptyError_1$2.EmptyError();
    }));
  };
}
first$1.first = first;
var groupBy$1 = {};
Object.defineProperty(groupBy$1, "__esModule", { value: true });
groupBy$1.groupBy = void 0;
var Observable_1 = Observable$1;
var innerFrom_1$f = innerFrom$1;
var Subject_1$9 = Subject$1;
var lift_1$y = lift;
var OperatorSubscriber_1$q = OperatorSubscriber$1;
function groupBy(keySelector, elementOrOptions, duration, connector) {
  return lift_1$y.operate(function(source, subscriber) {
    var element;
    if (!elementOrOptions || typeof elementOrOptions === "function") {
      element = elementOrOptions;
    } else {
      duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
    }
    var groups = /* @__PURE__ */ new Map();
    var notify = function(cb) {
      groups.forEach(cb);
      cb(subscriber);
    };
    var handleError = function(err) {
      return notify(function(consumer) {
        return consumer.error(err);
      });
    };
    var activeGroups = 0;
    var teardownAttempted = false;
    var groupBySourceSubscriber = new OperatorSubscriber_1$q.OperatorSubscriber(subscriber, function(value) {
      try {
        var key_1 = keySelector(value);
        var group_1 = groups.get(key_1);
        if (!group_1) {
          groups.set(key_1, group_1 = connector ? connector() : new Subject_1$9.Subject());
          var grouped = createGroupedObservable(key_1, group_1);
          subscriber.next(grouped);
          if (duration) {
            var durationSubscriber_1 = OperatorSubscriber_1$q.createOperatorSubscriber(group_1, function() {
              group_1.complete();
              durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
            }, void 0, void 0, function() {
              return groups.delete(key_1);
            });
            groupBySourceSubscriber.add(innerFrom_1$f.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
          }
        }
        group_1.next(element ? element(value) : value);
      } catch (err) {
        handleError(err);
      }
    }, function() {
      return notify(function(consumer) {
        return consumer.complete();
      });
    }, handleError, function() {
      return groups.clear();
    }, function() {
      teardownAttempted = true;
      return activeGroups === 0;
    });
    source.subscribe(groupBySourceSubscriber);
    function createGroupedObservable(key, groupSubject) {
      var result = new Observable_1.Observable(function(groupSubscriber) {
        activeGroups++;
        var innerSub = groupSubject.subscribe(groupSubscriber);
        return function() {
          innerSub.unsubscribe();
          --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
        };
      });
      result.key = key;
      return result;
    }
  });
}
groupBy$1.groupBy = groupBy;
var isEmpty$1 = {};
Object.defineProperty(isEmpty$1, "__esModule", { value: true });
isEmpty$1.isEmpty = void 0;
var lift_1$x = lift;
var OperatorSubscriber_1$p = OperatorSubscriber$1;
function isEmpty() {
  return lift_1$x.operate(function(source, subscriber) {
    source.subscribe(OperatorSubscriber_1$p.createOperatorSubscriber(subscriber, function() {
      subscriber.next(false);
      subscriber.complete();
    }, function() {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
isEmpty$1.isEmpty = isEmpty;
var last$1 = {};
var takeLast$1 = {};
var __values$2 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(takeLast$1, "__esModule", { value: true });
takeLast$1.takeLast = void 0;
var empty_1$1 = empty;
var lift_1$w = lift;
var OperatorSubscriber_1$o = OperatorSubscriber$1;
function takeLast(count2) {
  return count2 <= 0 ? function() {
    return empty_1$1.EMPTY;
  } : lift_1$w.operate(function(source, subscriber) {
    var buffer2 = [];
    source.subscribe(OperatorSubscriber_1$o.createOperatorSubscriber(subscriber, function(value) {
      buffer2.push(value);
      count2 < buffer2.length && buffer2.shift();
    }, function() {
      var e_1, _a;
      try {
        for (var buffer_1 = __values$2(buffer2), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
          var value = buffer_1_1.value;
          subscriber.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      subscriber.complete();
    }, void 0, function() {
      buffer2 = null;
    }));
  });
}
takeLast$1.takeLast = takeLast;
Object.defineProperty(last$1, "__esModule", { value: true });
last$1.last = void 0;
var EmptyError_1$1 = EmptyError;
var filter_1$2 = filter$1;
var takeLast_1 = takeLast$1;
var throwIfEmpty_1 = throwIfEmpty$1;
var defaultIfEmpty_1 = defaultIfEmpty$1;
var identity_1$6 = identity$1;
function last(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(predicate ? filter_1$2.filter(function(v, i) {
      return predicate(v, i, source);
    }) : identity_1$6.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
      return new EmptyError_1$1.EmptyError();
    }));
  };
}
last$1.last = last;
var materialize$1 = {};
Object.defineProperty(materialize$1, "__esModule", { value: true });
materialize$1.materialize = void 0;
var Notification_1 = Notification;
var lift_1$v = lift;
var OperatorSubscriber_1$n = OperatorSubscriber$1;
function materialize() {
  return lift_1$v.operate(function(source, subscriber) {
    source.subscribe(OperatorSubscriber_1$n.createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(Notification_1.Notification.createNext(value));
    }, function() {
      subscriber.next(Notification_1.Notification.createComplete());
      subscriber.complete();
    }, function(err) {
      subscriber.next(Notification_1.Notification.createError(err));
      subscriber.complete();
    }));
  });
}
materialize$1.materialize = materialize;
var max$1 = {};
Object.defineProperty(max$1, "__esModule", { value: true });
max$1.max = void 0;
var reduce_1$1 = reduce$1;
var isFunction_1$6 = isFunction$1;
function max(comparer) {
  return reduce_1$1.reduce(isFunction_1$6.isFunction(comparer) ? function(x, y) {
    return comparer(x, y) > 0 ? x : y;
  } : function(x, y) {
    return x > y ? x : y;
  });
}
max$1.max = max;
var flatMap = {};
Object.defineProperty(flatMap, "__esModule", { value: true });
flatMap.flatMap = void 0;
var mergeMap_1$1 = mergeMap$1;
flatMap.flatMap = mergeMap_1$1.mergeMap;
var mergeMapTo$1 = {};
Object.defineProperty(mergeMapTo$1, "__esModule", { value: true });
mergeMapTo$1.mergeMapTo = void 0;
var mergeMap_1 = mergeMap$1;
var isFunction_1$5 = isFunction$1;
function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction_1$5.isFunction(resultSelector)) {
    return mergeMap_1.mergeMap(function() {
      return innerObservable;
    }, resultSelector, concurrent);
  }
  if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return mergeMap_1.mergeMap(function() {
    return innerObservable;
  }, concurrent);
}
mergeMapTo$1.mergeMapTo = mergeMapTo;
var mergeScan$1 = {};
Object.defineProperty(mergeScan$1, "__esModule", { value: true });
mergeScan$1.mergeScan = void 0;
var lift_1$u = lift;
var mergeInternals_1 = mergeInternals$1;
function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return lift_1$u.operate(function(source, subscriber) {
    var state = seed;
    return mergeInternals_1.mergeInternals(source, subscriber, function(value, index) {
      return accumulator(state, value, index);
    }, concurrent, function(value) {
      state = value;
    }, false, void 0, function() {
      return state = null;
    });
  });
}
mergeScan$1.mergeScan = mergeScan;
var mergeWith$1 = {};
var merge$1 = {};
var __read$8 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$8 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(merge$1, "__esModule", { value: true });
merge$1.merge = void 0;
var lift_1$t = lift;
var argsOrArgArray_1$2 = argsOrArgArray$1;
var mergeAll_1 = mergeAll$1;
var args_1$3 = args;
var from_1 = from$1;
function merge() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  var scheduler = args_1$3.popScheduler(args2);
  var concurrent = args_1$3.popNumber(args2, Infinity);
  args2 = argsOrArgArray_1$2.argsOrArgArray(args2);
  return lift_1$t.operate(function(source, subscriber) {
    mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray$8([source], __read$8(args2)), scheduler)).subscribe(subscriber);
  });
}
merge$1.merge = merge;
var __read$7 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$7 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(mergeWith$1, "__esModule", { value: true });
mergeWith$1.mergeWith = void 0;
var merge_1 = merge$1;
function mergeWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return merge_1.merge.apply(void 0, __spreadArray$7([], __read$7(otherSources)));
}
mergeWith$1.mergeWith = mergeWith;
var min$1 = {};
Object.defineProperty(min$1, "__esModule", { value: true });
min$1.min = void 0;
var reduce_1 = reduce$1;
var isFunction_1$4 = isFunction$1;
function min(comparer) {
  return reduce_1.reduce(isFunction_1$4.isFunction(comparer) ? function(x, y) {
    return comparer(x, y) < 0 ? x : y;
  } : function(x, y) {
    return x < y ? x : y;
  });
}
min$1.min = min;
var multicast$1 = {};
Object.defineProperty(multicast$1, "__esModule", { value: true });
multicast$1.multicast = void 0;
var ConnectableObservable_1$2 = ConnectableObservable$1;
var isFunction_1$3 = isFunction$1;
var connect_1$1 = connect$1;
function multicast(subjectOrSubjectFactory, selector) {
  var subjectFactory = isFunction_1$3.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
    return subjectOrSubjectFactory;
  };
  if (isFunction_1$3.isFunction(selector)) {
    return connect_1$1.connect(selector, {
      connector: subjectFactory
    });
  }
  return function(source) {
    return new ConnectableObservable_1$2.ConnectableObservable(source, subjectFactory);
  };
}
multicast$1.multicast = multicast;
var onErrorResumeNextWith$1 = {};
var __read$6 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$6 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(onErrorResumeNextWith$1, "__esModule", { value: true });
onErrorResumeNextWith$1.onErrorResumeNext = onErrorResumeNextWith$1.onErrorResumeNextWith = void 0;
var argsOrArgArray_1$1 = argsOrArgArray$1;
var onErrorResumeNext_1 = onErrorResumeNext$1;
function onErrorResumeNextWith() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray_1$1.argsOrArgArray(sources);
  return function(source) {
    return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray$6([source], __read$6(nextSources)));
  };
}
onErrorResumeNextWith$1.onErrorResumeNextWith = onErrorResumeNextWith;
onErrorResumeNextWith$1.onErrorResumeNext = onErrorResumeNextWith;
var pairwise$1 = {};
Object.defineProperty(pairwise$1, "__esModule", { value: true });
pairwise$1.pairwise = void 0;
var lift_1$s = lift;
var OperatorSubscriber_1$m = OperatorSubscriber$1;
function pairwise() {
  return lift_1$s.operate(function(source, subscriber) {
    var prev;
    var hasPrev = false;
    source.subscribe(OperatorSubscriber_1$m.createOperatorSubscriber(subscriber, function(value) {
      var p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}
pairwise$1.pairwise = pairwise;
var pluck$1 = {};
Object.defineProperty(pluck$1, "__esModule", { value: true });
pluck$1.pluck = void 0;
var map_1$1 = map$1;
function pluck() {
  var properties = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i] = arguments[_i];
  }
  var length = properties.length;
  if (length === 0) {
    throw new Error("list of properties cannot be empty.");
  }
  return map_1$1.map(function(x) {
    var currentProp = x;
    for (var i = 0; i < length; i++) {
      var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
      if (typeof p !== "undefined") {
        currentProp = p;
      } else {
        return void 0;
      }
    }
    return currentProp;
  });
}
pluck$1.pluck = pluck;
var publish$1 = {};
Object.defineProperty(publish$1, "__esModule", { value: true });
publish$1.publish = void 0;
var Subject_1$8 = Subject$1;
var multicast_1$1 = multicast$1;
var connect_1 = connect$1;
function publish(selector) {
  return selector ? function(source) {
    return connect_1.connect(selector)(source);
  } : function(source) {
    return multicast_1$1.multicast(new Subject_1$8.Subject())(source);
  };
}
publish$1.publish = publish;
var publishBehavior$1 = {};
Object.defineProperty(publishBehavior$1, "__esModule", { value: true });
publishBehavior$1.publishBehavior = void 0;
var BehaviorSubject_1 = BehaviorSubject$1;
var ConnectableObservable_1$1 = ConnectableObservable$1;
function publishBehavior(initialValue) {
  return function(source) {
    var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
    return new ConnectableObservable_1$1.ConnectableObservable(source, function() {
      return subject;
    });
  };
}
publishBehavior$1.publishBehavior = publishBehavior;
var publishLast$1 = {};
Object.defineProperty(publishLast$1, "__esModule", { value: true });
publishLast$1.publishLast = void 0;
var AsyncSubject_1 = AsyncSubject$1;
var ConnectableObservable_1 = ConnectableObservable$1;
function publishLast() {
  return function(source) {
    var subject = new AsyncSubject_1.AsyncSubject();
    return new ConnectableObservable_1.ConnectableObservable(source, function() {
      return subject;
    });
  };
}
publishLast$1.publishLast = publishLast;
var publishReplay$1 = {};
Object.defineProperty(publishReplay$1, "__esModule", { value: true });
publishReplay$1.publishReplay = void 0;
var ReplaySubject_1$1 = ReplaySubject$1;
var multicast_1 = multicast$1;
var isFunction_1$2 = isFunction$1;
function publishReplay(bufferSize, windowTime2, selectorOrScheduler, timestampProvider) {
  if (selectorOrScheduler && !isFunction_1$2.isFunction(selectorOrScheduler)) {
    timestampProvider = selectorOrScheduler;
  }
  var selector = isFunction_1$2.isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
  return function(source) {
    return multicast_1.multicast(new ReplaySubject_1$1.ReplaySubject(bufferSize, windowTime2, timestampProvider), selector)(source);
  };
}
publishReplay$1.publishReplay = publishReplay;
var raceWith$1 = {};
var __read$5 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$5 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(raceWith$1, "__esModule", { value: true });
raceWith$1.raceWith = void 0;
var race_1 = race$3;
var lift_1$r = lift;
var identity_1$5 = identity$1;
function raceWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return !otherSources.length ? identity_1$5.identity : lift_1$r.operate(function(source, subscriber) {
    race_1.raceInit(__spreadArray$5([source], __read$5(otherSources)))(subscriber);
  });
}
raceWith$1.raceWith = raceWith;
var repeat$1 = {};
Object.defineProperty(repeat$1, "__esModule", { value: true });
repeat$1.repeat = void 0;
var empty_1 = empty;
var lift_1$q = lift;
var OperatorSubscriber_1$l = OperatorSubscriber$1;
var innerFrom_1$e = innerFrom$1;
var timer_1$2 = timer$1;
function repeat(countOrConfig) {
  var _a;
  var count2 = Infinity;
  var delay2;
  if (countOrConfig != null) {
    if (typeof countOrConfig === "object") {
      _a = countOrConfig.count, count2 = _a === void 0 ? Infinity : _a, delay2 = countOrConfig.delay;
    } else {
      count2 = countOrConfig;
    }
  }
  return count2 <= 0 ? function() {
    return empty_1.EMPTY;
  } : lift_1$q.operate(function(source, subscriber) {
    var soFar = 0;
    var sourceSub;
    var resubscribe = function() {
      sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
      sourceSub = null;
      if (delay2 != null) {
        var notifier = typeof delay2 === "number" ? timer_1$2.timer(delay2) : innerFrom_1$e.innerFrom(delay2(soFar));
        var notifierSubscriber_1 = OperatorSubscriber_1$l.createOperatorSubscriber(subscriber, function() {
          notifierSubscriber_1.unsubscribe();
          subscribeToSource();
        });
        notifier.subscribe(notifierSubscriber_1);
      } else {
        subscribeToSource();
      }
    };
    var subscribeToSource = function() {
      var syncUnsub = false;
      sourceSub = source.subscribe(OperatorSubscriber_1$l.createOperatorSubscriber(subscriber, void 0, function() {
        if (++soFar < count2) {
          if (sourceSub) {
            resubscribe();
          } else {
            syncUnsub = true;
          }
        } else {
          subscriber.complete();
        }
      }));
      if (syncUnsub) {
        resubscribe();
      }
    };
    subscribeToSource();
  });
}
repeat$1.repeat = repeat;
var repeatWhen$1 = {};
Object.defineProperty(repeatWhen$1, "__esModule", { value: true });
repeatWhen$1.repeatWhen = void 0;
var innerFrom_1$d = innerFrom$1;
var Subject_1$7 = Subject$1;
var lift_1$p = lift;
var OperatorSubscriber_1$k = OperatorSubscriber$1;
function repeatWhen(notifier) {
  return lift_1$p.operate(function(source, subscriber) {
    var innerSub;
    var syncResub = false;
    var completions$;
    var isNotifierComplete = false;
    var isMainComplete = false;
    var checkComplete = function() {
      return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
    };
    var getCompletionSubject = function() {
      if (!completions$) {
        completions$ = new Subject_1$7.Subject();
        innerFrom_1$d.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1$k.createOperatorSubscriber(subscriber, function() {
          if (innerSub) {
            subscribeForRepeatWhen();
          } else {
            syncResub = true;
          }
        }, function() {
          isNotifierComplete = true;
          checkComplete();
        }));
      }
      return completions$;
    };
    var subscribeForRepeatWhen = function() {
      isMainComplete = false;
      innerSub = source.subscribe(OperatorSubscriber_1$k.createOperatorSubscriber(subscriber, void 0, function() {
        isMainComplete = true;
        !checkComplete() && getCompletionSubject().next();
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRepeatWhen();
      }
    };
    subscribeForRepeatWhen();
  });
}
repeatWhen$1.repeatWhen = repeatWhen;
var retry$1 = {};
Object.defineProperty(retry$1, "__esModule", { value: true });
retry$1.retry = void 0;
var lift_1$o = lift;
var OperatorSubscriber_1$j = OperatorSubscriber$1;
var identity_1$4 = identity$1;
var timer_1$1 = timer$1;
var innerFrom_1$c = innerFrom$1;
function retry(configOrCount) {
  if (configOrCount === void 0) {
    configOrCount = Infinity;
  }
  var config2;
  if (configOrCount && typeof configOrCount === "object") {
    config2 = configOrCount;
  } else {
    config2 = {
      count: configOrCount
    };
  }
  var _a = config2.count, count2 = _a === void 0 ? Infinity : _a, delay2 = config2.delay, _b = config2.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
  return count2 <= 0 ? identity_1$4.identity : lift_1$o.operate(function(source, subscriber) {
    var soFar = 0;
    var innerSub;
    var subscribeForRetry = function() {
      var syncUnsub = false;
      innerSub = source.subscribe(OperatorSubscriber_1$j.createOperatorSubscriber(subscriber, function(value) {
        if (resetOnSuccess) {
          soFar = 0;
        }
        subscriber.next(value);
      }, void 0, function(err) {
        if (soFar++ < count2) {
          var resub_1 = function() {
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            } else {
              syncUnsub = true;
            }
          };
          if (delay2 != null) {
            var notifier = typeof delay2 === "number" ? timer_1$1.timer(delay2) : innerFrom_1$c.innerFrom(delay2(err, soFar));
            var notifierSubscriber_1 = OperatorSubscriber_1$j.createOperatorSubscriber(subscriber, function() {
              notifierSubscriber_1.unsubscribe();
              resub_1();
            }, function() {
              subscriber.complete();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            resub_1();
          }
        } else {
          subscriber.error(err);
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRetry();
      }
    };
    subscribeForRetry();
  });
}
retry$1.retry = retry;
var retryWhen$1 = {};
Object.defineProperty(retryWhen$1, "__esModule", { value: true });
retryWhen$1.retryWhen = void 0;
var innerFrom_1$b = innerFrom$1;
var Subject_1$6 = Subject$1;
var lift_1$n = lift;
var OperatorSubscriber_1$i = OperatorSubscriber$1;
function retryWhen(notifier) {
  return lift_1$n.operate(function(source, subscriber) {
    var innerSub;
    var syncResub = false;
    var errors$;
    var subscribeForRetryWhen = function() {
      innerSub = source.subscribe(OperatorSubscriber_1$i.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
        if (!errors$) {
          errors$ = new Subject_1$6.Subject();
          innerFrom_1$b.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1$i.createOperatorSubscriber(subscriber, function() {
            return innerSub ? subscribeForRetryWhen() : syncResub = true;
          }));
        }
        if (errors$) {
          errors$.next(err);
        }
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRetryWhen();
      }
    };
    subscribeForRetryWhen();
  });
}
retryWhen$1.retryWhen = retryWhen;
var sample$1 = {};
Object.defineProperty(sample$1, "__esModule", { value: true });
sample$1.sample = void 0;
var innerFrom_1$a = innerFrom$1;
var lift_1$m = lift;
var noop_1$5 = noop$1;
var OperatorSubscriber_1$h = OperatorSubscriber$1;
function sample(notifier) {
  return lift_1$m.operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    source.subscribe(OperatorSubscriber_1$h.createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      lastValue = value;
    }));
    innerFrom_1$a.innerFrom(notifier).subscribe(OperatorSubscriber_1$h.createOperatorSubscriber(subscriber, function() {
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, noop_1$5.noop));
  });
}
sample$1.sample = sample;
var sampleTime$1 = {};
Object.defineProperty(sampleTime$1, "__esModule", { value: true });
sampleTime$1.sampleTime = void 0;
var async_1$4 = async;
var sample_1 = sample$1;
var interval_1 = interval$1;
function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1$4.asyncScheduler;
  }
  return sample_1.sample(interval_1.interval(period, scheduler));
}
sampleTime$1.sampleTime = sampleTime;
var scan$1 = {};
Object.defineProperty(scan$1, "__esModule", { value: true });
scan$1.scan = void 0;
var lift_1$l = lift;
var scanInternals_1 = scanInternals$1;
function scan(accumulator, seed) {
  return lift_1$l.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
}
scan$1.scan = scan;
var sequenceEqual$1 = {};
Object.defineProperty(sequenceEqual$1, "__esModule", { value: true });
sequenceEqual$1.sequenceEqual = void 0;
var lift_1$k = lift;
var OperatorSubscriber_1$g = OperatorSubscriber$1;
var innerFrom_1$9 = innerFrom$1;
function sequenceEqual(compareTo, comparator) {
  if (comparator === void 0) {
    comparator = function(a, b) {
      return a === b;
    };
  }
  return lift_1$k.operate(function(source, subscriber) {
    var aState = createState();
    var bState = createState();
    var emit = function(isEqual) {
      subscriber.next(isEqual);
      subscriber.complete();
    };
    var createSubscriber = function(selfState, otherState) {
      var sequenceEqualSubscriber = OperatorSubscriber_1$g.createOperatorSubscriber(subscriber, function(a) {
        var buffer2 = otherState.buffer, complete = otherState.complete;
        if (buffer2.length === 0) {
          complete ? emit(false) : selfState.buffer.push(a);
        } else {
          !comparator(a, buffer2.shift()) && emit(false);
        }
      }, function() {
        selfState.complete = true;
        var complete = otherState.complete, buffer2 = otherState.buffer;
        complete && emit(buffer2.length === 0);
        sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
      });
      return sequenceEqualSubscriber;
    };
    source.subscribe(createSubscriber(aState, bState));
    innerFrom_1$9.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
  });
}
sequenceEqual$1.sequenceEqual = sequenceEqual;
function createState() {
  return {
    buffer: [],
    complete: false
  };
}
var share$1 = {};
var __read$4 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$4 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(share$1, "__esModule", { value: true });
share$1.share = void 0;
var innerFrom_1$8 = innerFrom$1;
var Subject_1$5 = Subject$1;
var Subscriber_1 = Subscriber;
var lift_1$j = lift;
function share(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.connector, connector = _a === void 0 ? function() {
    return new Subject_1$5.Subject();
  } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
  return function(wrapperSource) {
    var connection;
    var resetConnection;
    var subject;
    var refCount2 = 0;
    var hasCompleted = false;
    var hasErrored = false;
    var cancelReset = function() {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    };
    var reset = function() {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    };
    var resetAndUnsubscribe = function() {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return lift_1$j.operate(function(source, subscriber) {
      refCount2++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function() {
        refCount2--;
        if (refCount2 === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount2 > 0) {
        connection = new Subscriber_1.SafeSubscriber({
          next: function(value) {
            return dest.next(value);
          },
          error: function(err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: function() {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        innerFrom_1$8.innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
share$1.share = share;
function handleReset(reset, on) {
  var args2 = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args2[_i - 2] = arguments[_i];
  }
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  var onSubscriber = new Subscriber_1.SafeSubscriber({
    next: function() {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return innerFrom_1$8.innerFrom(on.apply(void 0, __spreadArray$4([], __read$4(args2)))).subscribe(onSubscriber);
}
var shareReplay$1 = {};
Object.defineProperty(shareReplay$1, "__esModule", { value: true });
shareReplay$1.shareReplay = void 0;
var ReplaySubject_1 = ReplaySubject$1;
var share_1 = share$1;
function shareReplay(configOrBufferSize, windowTime2, scheduler) {
  var _a, _b, _c;
  var bufferSize;
  var refCount2 = false;
  if (configOrBufferSize && typeof configOrBufferSize === "object") {
    _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime2 = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount2 = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }
  return share_1.share({
    connector: function() {
      return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime2, scheduler);
    },
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount2
  });
}
shareReplay$1.shareReplay = shareReplay;
var single$1 = {};
Object.defineProperty(single$1, "__esModule", { value: true });
single$1.single = void 0;
var EmptyError_1 = EmptyError;
var SequenceError_1 = SequenceError;
var NotFoundError_1 = NotFoundError;
var lift_1$i = lift;
var OperatorSubscriber_1$f = OperatorSubscriber$1;
function single(predicate) {
  return lift_1$i.operate(function(source, subscriber) {
    var hasValue = false;
    var singleValue;
    var seenValue = false;
    var index = 0;
    source.subscribe(OperatorSubscriber_1$f.createOperatorSubscriber(subscriber, function(value) {
      seenValue = true;
      if (!predicate || predicate(value, index++, source)) {
        hasValue && subscriber.error(new SequenceError_1.SequenceError("Too many matching values"));
        hasValue = true;
        singleValue = value;
      }
    }, function() {
      if (hasValue) {
        subscriber.next(singleValue);
        subscriber.complete();
      } else {
        subscriber.error(seenValue ? new NotFoundError_1.NotFoundError("No matching values") : new EmptyError_1.EmptyError());
      }
    }));
  });
}
single$1.single = single;
var skip$1 = {};
Object.defineProperty(skip$1, "__esModule", { value: true });
skip$1.skip = void 0;
var filter_1$1 = filter$1;
function skip(count2) {
  return filter_1$1.filter(function(_2, index) {
    return count2 <= index;
  });
}
skip$1.skip = skip;
var skipLast$1 = {};
Object.defineProperty(skipLast$1, "__esModule", { value: true });
skipLast$1.skipLast = void 0;
var identity_1$3 = identity$1;
var lift_1$h = lift;
var OperatorSubscriber_1$e = OperatorSubscriber$1;
function skipLast(skipCount) {
  return skipCount <= 0 ? identity_1$3.identity : lift_1$h.operate(function(source, subscriber) {
    var ring = new Array(skipCount);
    var seen = 0;
    source.subscribe(OperatorSubscriber_1$e.createOperatorSubscriber(subscriber, function(value) {
      var valueIndex = seen++;
      if (valueIndex < skipCount) {
        ring[valueIndex] = value;
      } else {
        var index = valueIndex % skipCount;
        var oldValue = ring[index];
        ring[index] = value;
        subscriber.next(oldValue);
      }
    }));
    return function() {
      ring = null;
    };
  });
}
skipLast$1.skipLast = skipLast;
var skipUntil$1 = {};
Object.defineProperty(skipUntil$1, "__esModule", { value: true });
skipUntil$1.skipUntil = void 0;
var lift_1$g = lift;
var OperatorSubscriber_1$d = OperatorSubscriber$1;
var innerFrom_1$7 = innerFrom$1;
var noop_1$4 = noop$1;
function skipUntil(notifier) {
  return lift_1$g.operate(function(source, subscriber) {
    var taking = false;
    var skipSubscriber = OperatorSubscriber_1$d.createOperatorSubscriber(subscriber, function() {
      skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
      taking = true;
    }, noop_1$4.noop);
    innerFrom_1$7.innerFrom(notifier).subscribe(skipSubscriber);
    source.subscribe(OperatorSubscriber_1$d.createOperatorSubscriber(subscriber, function(value) {
      return taking && subscriber.next(value);
    }));
  });
}
skipUntil$1.skipUntil = skipUntil;
var skipWhile$1 = {};
Object.defineProperty(skipWhile$1, "__esModule", { value: true });
skipWhile$1.skipWhile = void 0;
var lift_1$f = lift;
var OperatorSubscriber_1$c = OperatorSubscriber$1;
function skipWhile(predicate) {
  return lift_1$f.operate(function(source, subscriber) {
    var taking = false;
    var index = 0;
    source.subscribe(OperatorSubscriber_1$c.createOperatorSubscriber(subscriber, function(value) {
      return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
    }));
  });
}
skipWhile$1.skipWhile = skipWhile;
var startWith$1 = {};
Object.defineProperty(startWith$1, "__esModule", { value: true });
startWith$1.startWith = void 0;
var concat_1 = concat$3;
var args_1$2 = args;
var lift_1$e = lift;
function startWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  var scheduler = args_1$2.popScheduler(values);
  return lift_1$e.operate(function(source, subscriber) {
    (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
  });
}
startWith$1.startWith = startWith;
var switchAll$1 = {};
var switchMap$1 = {};
Object.defineProperty(switchMap$1, "__esModule", { value: true });
switchMap$1.switchMap = void 0;
var innerFrom_1$6 = innerFrom$1;
var lift_1$d = lift;
var OperatorSubscriber_1$b = OperatorSubscriber$1;
function switchMap(project, resultSelector) {
  return lift_1$d.operate(function(source, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      return isComplete && !innerSubscriber && subscriber.complete();
    };
    source.subscribe(OperatorSubscriber_1$b.createOperatorSubscriber(subscriber, function(value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      innerFrom_1$6.innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = OperatorSubscriber_1$b.createOperatorSubscriber(subscriber, function(innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function() {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function() {
      isComplete = true;
      checkComplete();
    }));
  });
}
switchMap$1.switchMap = switchMap;
Object.defineProperty(switchAll$1, "__esModule", { value: true });
switchAll$1.switchAll = void 0;
var switchMap_1$2 = switchMap$1;
var identity_1$2 = identity$1;
function switchAll() {
  return switchMap_1$2.switchMap(identity_1$2.identity);
}
switchAll$1.switchAll = switchAll;
var switchMapTo$1 = {};
Object.defineProperty(switchMapTo$1, "__esModule", { value: true });
switchMapTo$1.switchMapTo = void 0;
var switchMap_1$1 = switchMap$1;
var isFunction_1$1 = isFunction$1;
function switchMapTo(innerObservable, resultSelector) {
  return isFunction_1$1.isFunction(resultSelector) ? switchMap_1$1.switchMap(function() {
    return innerObservable;
  }, resultSelector) : switchMap_1$1.switchMap(function() {
    return innerObservable;
  });
}
switchMapTo$1.switchMapTo = switchMapTo;
var switchScan$1 = {};
Object.defineProperty(switchScan$1, "__esModule", { value: true });
switchScan$1.switchScan = void 0;
var switchMap_1 = switchMap$1;
var lift_1$c = lift;
function switchScan(accumulator, seed) {
  return lift_1$c.operate(function(source, subscriber) {
    var state = seed;
    switchMap_1.switchMap(function(value, index) {
      return accumulator(state, value, index);
    }, function(_2, innerValue) {
      return state = innerValue, innerValue;
    })(source).subscribe(subscriber);
    return function() {
      state = null;
    };
  });
}
switchScan$1.switchScan = switchScan;
var takeUntil$1 = {};
Object.defineProperty(takeUntil$1, "__esModule", { value: true });
takeUntil$1.takeUntil = void 0;
var lift_1$b = lift;
var OperatorSubscriber_1$a = OperatorSubscriber$1;
var innerFrom_1$5 = innerFrom$1;
var noop_1$3 = noop$1;
function takeUntil(notifier) {
  return lift_1$b.operate(function(source, subscriber) {
    innerFrom_1$5.innerFrom(notifier).subscribe(OperatorSubscriber_1$a.createOperatorSubscriber(subscriber, function() {
      return subscriber.complete();
    }, noop_1$3.noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}
takeUntil$1.takeUntil = takeUntil;
var takeWhile$1 = {};
Object.defineProperty(takeWhile$1, "__esModule", { value: true });
takeWhile$1.takeWhile = void 0;
var lift_1$a = lift;
var OperatorSubscriber_1$9 = OperatorSubscriber$1;
function takeWhile(predicate, inclusive) {
  if (inclusive === void 0) {
    inclusive = false;
  }
  return lift_1$a.operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(OperatorSubscriber_1$9.createOperatorSubscriber(subscriber, function(value) {
      var result = predicate(value, index++);
      (result || inclusive) && subscriber.next(value);
      !result && subscriber.complete();
    }));
  });
}
takeWhile$1.takeWhile = takeWhile;
var tap$1 = {};
Object.defineProperty(tap$1, "__esModule", { value: true });
tap$1.tap = void 0;
var isFunction_1 = isFunction$1;
var lift_1$9 = lift;
var OperatorSubscriber_1$8 = OperatorSubscriber$1;
var identity_1$1 = identity$1;
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? lift_1$9.operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(OperatorSubscriber_1$8.createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity_1$1.identity;
}
tap$1.tap = tap;
var throttle$1 = {};
Object.defineProperty(throttle$1, "__esModule", { value: true });
throttle$1.throttle = void 0;
var lift_1$8 = lift;
var OperatorSubscriber_1$7 = OperatorSubscriber$1;
var innerFrom_1$4 = innerFrom$1;
function throttle(durationSelector, config2) {
  return lift_1$8.operate(function(source, subscriber) {
    var _a = config2 !== null && config2 !== void 0 ? config2 : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
    var hasValue = false;
    var sendValue = null;
    var throttled = null;
    var isComplete = false;
    var endThrottling = function() {
      throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
      throttled = null;
      if (trailing) {
        send();
        isComplete && subscriber.complete();
      }
    };
    var cleanupThrottling = function() {
      throttled = null;
      isComplete && subscriber.complete();
    };
    var startThrottle = function(value) {
      return throttled = innerFrom_1$4.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1$7.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
    };
    var send = function() {
      if (hasValue) {
        hasValue = false;
        var value = sendValue;
        sendValue = null;
        subscriber.next(value);
        !isComplete && startThrottle(value);
      }
    };
    source.subscribe(OperatorSubscriber_1$7.createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      sendValue = value;
      !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
    }, function() {
      isComplete = true;
      !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
    }));
  });
}
throttle$1.throttle = throttle;
var throttleTime$1 = {};
Object.defineProperty(throttleTime$1, "__esModule", { value: true });
throttleTime$1.throttleTime = void 0;
var async_1$3 = async;
var throttle_1 = throttle$1;
var timer_1 = timer$1;
function throttleTime(duration, scheduler, config2) {
  if (scheduler === void 0) {
    scheduler = async_1$3.asyncScheduler;
  }
  var duration$ = timer_1.timer(duration, scheduler);
  return throttle_1.throttle(function() {
    return duration$;
  }, config2);
}
throttleTime$1.throttleTime = throttleTime;
var timeInterval$1 = {};
Object.defineProperty(timeInterval$1, "__esModule", { value: true });
timeInterval$1.TimeInterval = timeInterval$1.timeInterval = void 0;
var async_1$2 = async;
var lift_1$7 = lift;
var OperatorSubscriber_1$6 = OperatorSubscriber$1;
function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = async_1$2.asyncScheduler;
  }
  return lift_1$7.operate(function(source, subscriber) {
    var last2 = scheduler.now();
    source.subscribe(OperatorSubscriber_1$6.createOperatorSubscriber(subscriber, function(value) {
      var now = scheduler.now();
      var interval2 = now - last2;
      last2 = now;
      subscriber.next(new TimeInterval(value, interval2));
    }));
  });
}
timeInterval$1.timeInterval = timeInterval;
var TimeInterval = /* @__PURE__ */ function() {
  function TimeInterval2(value, interval2) {
    this.value = value;
    this.interval = interval2;
  }
  return TimeInterval2;
}();
timeInterval$1.TimeInterval = TimeInterval;
var timeoutWith$1 = {};
Object.defineProperty(timeoutWith$1, "__esModule", { value: true });
timeoutWith$1.timeoutWith = void 0;
var async_1$1 = async;
var isDate_1 = isDate;
var timeout_1 = timeout;
function timeoutWith(due, withObservable, scheduler) {
  var first2;
  var each;
  var _with;
  scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1$1.async;
  if (isDate_1.isValidDate(due)) {
    first2 = due;
  } else if (typeof due === "number") {
    each = due;
  }
  if (withObservable) {
    _with = function() {
      return withObservable;
    };
  } else {
    throw new TypeError("No observable provided to switch to");
  }
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return timeout_1.timeout({
    first: first2,
    each,
    scheduler,
    with: _with
  });
}
timeoutWith$1.timeoutWith = timeoutWith;
var timestamp$1 = {};
Object.defineProperty(timestamp$1, "__esModule", { value: true });
timestamp$1.timestamp = void 0;
var dateTimestampProvider_1 = dateTimestampProvider;
var map_1 = map$1;
function timestamp(timestampProvider) {
  if (timestampProvider === void 0) {
    timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
  }
  return map_1.map(function(value) {
    return { value, timestamp: timestampProvider.now() };
  });
}
timestamp$1.timestamp = timestamp;
var window$1 = {};
Object.defineProperty(window$1, "__esModule", { value: true });
window$1.window = void 0;
var Subject_1$4 = Subject$1;
var lift_1$6 = lift;
var OperatorSubscriber_1$5 = OperatorSubscriber$1;
var noop_1$2 = noop$1;
var innerFrom_1$3 = innerFrom$1;
function window(windowBoundaries) {
  return lift_1$6.operate(function(source, subscriber) {
    var windowSubject = new Subject_1$4.Subject();
    subscriber.next(windowSubject.asObservable());
    var errorHandler = function(err) {
      windowSubject.error(err);
      subscriber.error(err);
    };
    source.subscribe(OperatorSubscriber_1$5.createOperatorSubscriber(subscriber, function(value) {
      return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
    }, function() {
      windowSubject.complete();
      subscriber.complete();
    }, errorHandler));
    innerFrom_1$3.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1$5.createOperatorSubscriber(subscriber, function() {
      windowSubject.complete();
      subscriber.next(windowSubject = new Subject_1$4.Subject());
    }, noop_1$2.noop, errorHandler));
    return function() {
      windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
      windowSubject = null;
    };
  });
}
window$1.window = window;
var windowCount$1 = {};
var __values$1 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(windowCount$1, "__esModule", { value: true });
windowCount$1.windowCount = void 0;
var Subject_1$3 = Subject$1;
var lift_1$5 = lift;
var OperatorSubscriber_1$4 = OperatorSubscriber$1;
function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }
  var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
  return lift_1$5.operate(function(source, subscriber) {
    var windows = [new Subject_1$3.Subject()];
    var count2 = 0;
    subscriber.next(windows[0].asObservable());
    source.subscribe(OperatorSubscriber_1$4.createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      try {
        for (var windows_1 = __values$1(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
          var window_1 = windows_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      var c2 = count2 - windowSize + 1;
      if (c2 >= 0 && c2 % startEvery === 0) {
        windows.shift().complete();
      }
      if (++count2 % startEvery === 0) {
        var window_2 = new Subject_1$3.Subject();
        windows.push(window_2);
        subscriber.next(window_2.asObservable());
      }
    }, function() {
      while (windows.length > 0) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, function(err) {
      while (windows.length > 0) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    }, function() {
      windows = null;
    }));
  });
}
windowCount$1.windowCount = windowCount;
var windowTime$1 = {};
Object.defineProperty(windowTime$1, "__esModule", { value: true });
windowTime$1.windowTime = void 0;
var Subject_1$2 = Subject$1;
var async_1 = async;
var Subscription_1$1 = Subscription$1;
var lift_1$4 = lift;
var OperatorSubscriber_1$3 = OperatorSubscriber$1;
var arrRemove_1$1 = arrRemove$1;
var args_1$1 = args;
var executeSchedule_1 = executeSchedule$1;
function windowTime(windowTimeSpan) {
  var _a, _b;
  var otherArgs = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }
  var scheduler = (_a = args_1$1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
  var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxWindowSize = otherArgs[1] || Infinity;
  return lift_1$4.operate(function(source, subscriber) {
    var windowRecords = [];
    var restartOnClose = false;
    var closeWindow = function(record) {
      var window2 = record.window, subs = record.subs;
      window2.complete();
      subs.unsubscribe();
      arrRemove_1$1.arrRemove(windowRecords, record);
      restartOnClose && startWindow();
    };
    var startWindow = function() {
      if (windowRecords) {
        var subs = new Subscription_1$1.Subscription();
        subscriber.add(subs);
        var window_1 = new Subject_1$2.Subject();
        var record_1 = {
          window: window_1,
          subs,
          seen: 0
        };
        windowRecords.push(record_1);
        subscriber.next(window_1.asObservable());
        executeSchedule_1.executeSchedule(subs, scheduler, function() {
          return closeWindow(record_1);
        }, windowTimeSpan);
      }
    };
    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
    } else {
      restartOnClose = true;
    }
    startWindow();
    var loop = function(cb) {
      return windowRecords.slice().forEach(cb);
    };
    var terminate = function(cb) {
      loop(function(_a2) {
        var window2 = _a2.window;
        return cb(window2);
      });
      cb(subscriber);
      subscriber.unsubscribe();
    };
    source.subscribe(OperatorSubscriber_1$3.createOperatorSubscriber(subscriber, function(value) {
      loop(function(record) {
        record.window.next(value);
        maxWindowSize <= ++record.seen && closeWindow(record);
      });
    }, function() {
      return terminate(function(consumer) {
        return consumer.complete();
      });
    }, function(err) {
      return terminate(function(consumer) {
        return consumer.error(err);
      });
    }));
    return function() {
      windowRecords = null;
    };
  });
}
windowTime$1.windowTime = windowTime;
var windowToggle$1 = {};
var __values = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(windowToggle$1, "__esModule", { value: true });
windowToggle$1.windowToggle = void 0;
var Subject_1$1 = Subject$1;
var Subscription_1 = Subscription$1;
var lift_1$3 = lift;
var innerFrom_1$2 = innerFrom$1;
var OperatorSubscriber_1$2 = OperatorSubscriber$1;
var noop_1$1 = noop$1;
var arrRemove_1 = arrRemove$1;
function windowToggle(openings, closingSelector) {
  return lift_1$3.operate(function(source, subscriber) {
    var windows = [];
    var handleError = function(err) {
      while (0 < windows.length) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    };
    innerFrom_1$2.innerFrom(openings).subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, function(openValue) {
      var window2 = new Subject_1$1.Subject();
      windows.push(window2);
      var closingSubscription = new Subscription_1.Subscription();
      var closeWindow = function() {
        arrRemove_1.arrRemove(windows, window2);
        window2.complete();
        closingSubscription.unsubscribe();
      };
      var closingNotifier;
      try {
        closingNotifier = innerFrom_1$2.innerFrom(closingSelector(openValue));
      } catch (err) {
        handleError(err);
        return;
      }
      subscriber.next(window2.asObservable());
      closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, closeWindow, noop_1$1.noop, handleError)));
    }, noop_1$1.noop));
    source.subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      var windowsCopy = windows.slice();
      try {
        for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
          var window_1 = windowsCopy_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (0 < windows.length) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, handleError, function() {
      while (0 < windows.length) {
        windows.shift().unsubscribe();
      }
    }));
  });
}
windowToggle$1.windowToggle = windowToggle;
var windowWhen$1 = {};
Object.defineProperty(windowWhen$1, "__esModule", { value: true });
windowWhen$1.windowWhen = void 0;
var Subject_1 = Subject$1;
var lift_1$2 = lift;
var OperatorSubscriber_1$1 = OperatorSubscriber$1;
var innerFrom_1$1 = innerFrom$1;
function windowWhen(closingSelector) {
  return lift_1$2.operate(function(source, subscriber) {
    var window2;
    var closingSubscriber;
    var handleError = function(err) {
      window2.error(err);
      subscriber.error(err);
    };
    var openWindow = function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 === null || window2 === void 0 ? void 0 : window2.complete();
      window2 = new Subject_1.Subject();
      subscriber.next(window2.asObservable());
      var closingNotifier;
      try {
        closingNotifier = innerFrom_1$1.innerFrom(closingSelector());
      } catch (err) {
        handleError(err);
        return;
      }
      closingNotifier.subscribe(closingSubscriber = OperatorSubscriber_1$1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
    };
    openWindow();
    source.subscribe(OperatorSubscriber_1$1.createOperatorSubscriber(subscriber, function(value) {
      return window2.next(value);
    }, function() {
      window2.complete();
      subscriber.complete();
    }, handleError, function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 = null;
    }));
  });
}
windowWhen$1.windowWhen = windowWhen;
var withLatestFrom$1 = {};
var __read$3 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$3 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(withLatestFrom$1, "__esModule", { value: true });
withLatestFrom$1.withLatestFrom = void 0;
var lift_1$1 = lift;
var OperatorSubscriber_1 = OperatorSubscriber$1;
var innerFrom_1 = innerFrom$1;
var identity_1 = identity$1;
var noop_1 = noop$1;
var args_1 = args;
function withLatestFrom() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  var project = args_1.popResultSelector(inputs);
  return lift_1$1.operate(function(source, subscriber) {
    var len = inputs.length;
    var otherValues = new Array(len);
    var hasValue = inputs.map(function() {
      return false;
    });
    var ready = false;
    var _loop_1 = function(i2) {
      innerFrom_1.innerFrom(inputs[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        otherValues[i2] = value;
        if (!ready && !hasValue[i2]) {
          hasValue[i2] = true;
          (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
        }
      }, noop_1.noop));
    };
    for (var i = 0; i < len; i++) {
      _loop_1(i);
    }
    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
      if (ready) {
        var values = __spreadArray$3([value], __read$3(otherValues));
        subscriber.next(project ? project.apply(void 0, __spreadArray$3([], __read$3(values))) : values);
      }
    }));
  });
}
withLatestFrom$1.withLatestFrom = withLatestFrom;
var zipAll$1 = {};
Object.defineProperty(zipAll$1, "__esModule", { value: true });
zipAll$1.zipAll = void 0;
var zip_1$2 = zip$3;
var joinAllInternals_1 = joinAllInternals$1;
function zipAll(project) {
  return joinAllInternals_1.joinAllInternals(zip_1$2.zip, project);
}
zipAll$1.zipAll = zipAll;
var zipWith$1 = {};
var zip$1 = {};
var __read$2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$2 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(zip$1, "__esModule", { value: true });
zip$1.zip = void 0;
var zip_1$1 = zip$3;
var lift_1 = lift;
function zip() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return lift_1.operate(function(source, subscriber) {
    zip_1$1.zip.apply(void 0, __spreadArray$2([source], __read$2(sources))).subscribe(subscriber);
  });
}
zip$1.zip = zip;
var __read$1 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$1 = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(zipWith$1, "__esModule", { value: true });
zipWith$1.zipWith = void 0;
var zip_1 = zip$1;
function zipWith() {
  var otherInputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherInputs[_i] = arguments[_i];
  }
  return zip_1.zip.apply(void 0, __spreadArray$1([], __read$1(otherInputs)));
}
zipWith$1.zipWith = zipWith;
(function(exports) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding2(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
  exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
  exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
  exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
  var Observable_12 = Observable$1;
  Object.defineProperty(exports, "Observable", { enumerable: true, get: function() {
    return Observable_12.Observable;
  } });
  var ConnectableObservable_12 = ConnectableObservable$1;
  Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function() {
    return ConnectableObservable_12.ConnectableObservable;
  } });
  var observable_12 = observable;
  Object.defineProperty(exports, "observable", { enumerable: true, get: function() {
    return observable_12.observable;
  } });
  var animationFrames_1 = animationFrames$1;
  Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function() {
    return animationFrames_1.animationFrames;
  } });
  var Subject_12 = Subject$1;
  Object.defineProperty(exports, "Subject", { enumerable: true, get: function() {
    return Subject_12.Subject;
  } });
  var BehaviorSubject_12 = BehaviorSubject$1;
  Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function() {
    return BehaviorSubject_12.BehaviorSubject;
  } });
  var ReplaySubject_12 = ReplaySubject$1;
  Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function() {
    return ReplaySubject_12.ReplaySubject;
  } });
  var AsyncSubject_12 = AsyncSubject$1;
  Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function() {
    return AsyncSubject_12.AsyncSubject;
  } });
  var asap_1 = asap;
  Object.defineProperty(exports, "asap", { enumerable: true, get: function() {
    return asap_1.asap;
  } });
  Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function() {
    return asap_1.asapScheduler;
  } });
  var async_12 = async;
  Object.defineProperty(exports, "async", { enumerable: true, get: function() {
    return async_12.async;
  } });
  Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function() {
    return async_12.asyncScheduler;
  } });
  var queue_1 = queue;
  Object.defineProperty(exports, "queue", { enumerable: true, get: function() {
    return queue_1.queue;
  } });
  Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function() {
    return queue_1.queueScheduler;
  } });
  var animationFrame_1 = animationFrame;
  Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function() {
    return animationFrame_1.animationFrame;
  } });
  Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function() {
    return animationFrame_1.animationFrameScheduler;
  } });
  var VirtualTimeScheduler_1 = VirtualTimeScheduler$1;
  Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function() {
    return VirtualTimeScheduler_1.VirtualTimeScheduler;
  } });
  Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function() {
    return VirtualTimeScheduler_1.VirtualAction;
  } });
  var Scheduler_12 = Scheduler$1;
  Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function() {
    return Scheduler_12.Scheduler;
  } });
  var Subscription_12 = Subscription$1;
  Object.defineProperty(exports, "Subscription", { enumerable: true, get: function() {
    return Subscription_12.Subscription;
  } });
  var Subscriber_12 = Subscriber;
  Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function() {
    return Subscriber_12.Subscriber;
  } });
  var Notification_12 = Notification;
  Object.defineProperty(exports, "Notification", { enumerable: true, get: function() {
    return Notification_12.Notification;
  } });
  Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function() {
    return Notification_12.NotificationKind;
  } });
  var pipe_12 = pipe$1;
  Object.defineProperty(exports, "pipe", { enumerable: true, get: function() {
    return pipe_12.pipe;
  } });
  var noop_12 = noop$1;
  Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
    return noop_12.noop;
  } });
  var identity_12 = identity$1;
  Object.defineProperty(exports, "identity", { enumerable: true, get: function() {
    return identity_12.identity;
  } });
  var isObservable_1 = isObservable$1;
  Object.defineProperty(exports, "isObservable", { enumerable: true, get: function() {
    return isObservable_1.isObservable;
  } });
  var lastValueFrom_1 = lastValueFrom$1;
  Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function() {
    return lastValueFrom_1.lastValueFrom;
  } });
  var firstValueFrom_1 = firstValueFrom$1;
  Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function() {
    return firstValueFrom_1.firstValueFrom;
  } });
  var ArgumentOutOfRangeError_12 = ArgumentOutOfRangeError;
  Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function() {
    return ArgumentOutOfRangeError_12.ArgumentOutOfRangeError;
  } });
  var EmptyError_12 = EmptyError;
  Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function() {
    return EmptyError_12.EmptyError;
  } });
  var NotFoundError_12 = NotFoundError;
  Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
    return NotFoundError_12.NotFoundError;
  } });
  var ObjectUnsubscribedError_12 = ObjectUnsubscribedError;
  Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function() {
    return ObjectUnsubscribedError_12.ObjectUnsubscribedError;
  } });
  var SequenceError_12 = SequenceError;
  Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function() {
    return SequenceError_12.SequenceError;
  } });
  var timeout_12 = timeout;
  Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
    return timeout_12.TimeoutError;
  } });
  var UnsubscriptionError_12 = UnsubscriptionError;
  Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function() {
    return UnsubscriptionError_12.UnsubscriptionError;
  } });
  var bindCallback_1 = bindCallback$1;
  Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function() {
    return bindCallback_1.bindCallback;
  } });
  var bindNodeCallback_1 = bindNodeCallback$1;
  Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function() {
    return bindNodeCallback_1.bindNodeCallback;
  } });
  var combineLatest_12 = combineLatest$3;
  Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function() {
    return combineLatest_12.combineLatest;
  } });
  var concat_12 = concat$3;
  Object.defineProperty(exports, "concat", { enumerable: true, get: function() {
    return concat_12.concat;
  } });
  var connectable_1 = connectable$1;
  Object.defineProperty(exports, "connectable", { enumerable: true, get: function() {
    return connectable_1.connectable;
  } });
  var defer_12 = defer$1;
  Object.defineProperty(exports, "defer", { enumerable: true, get: function() {
    return defer_12.defer;
  } });
  var empty_12 = empty;
  Object.defineProperty(exports, "empty", { enumerable: true, get: function() {
    return empty_12.empty;
  } });
  var forkJoin_1 = forkJoin$1;
  Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function() {
    return forkJoin_1.forkJoin;
  } });
  var from_12 = from$1;
  Object.defineProperty(exports, "from", { enumerable: true, get: function() {
    return from_12.from;
  } });
  var fromEvent_1 = fromEvent$1;
  Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function() {
    return fromEvent_1.fromEvent;
  } });
  var fromEventPattern_1 = fromEventPattern$1;
  Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function() {
    return fromEventPattern_1.fromEventPattern;
  } });
  var generate_1 = generate$1;
  Object.defineProperty(exports, "generate", { enumerable: true, get: function() {
    return generate_1.generate;
  } });
  var iif_1 = iif$1;
  Object.defineProperty(exports, "iif", { enumerable: true, get: function() {
    return iif_1.iif;
  } });
  var interval_12 = interval$1;
  Object.defineProperty(exports, "interval", { enumerable: true, get: function() {
    return interval_12.interval;
  } });
  var merge_12 = merge$3;
  Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
    return merge_12.merge;
  } });
  var never_1 = never;
  Object.defineProperty(exports, "never", { enumerable: true, get: function() {
    return never_1.never;
  } });
  var of_12 = of$1;
  Object.defineProperty(exports, "of", { enumerable: true, get: function() {
    return of_12.of;
  } });
  var onErrorResumeNext_12 = onErrorResumeNext$1;
  Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function() {
    return onErrorResumeNext_12.onErrorResumeNext;
  } });
  var pairs_1 = pairs$1;
  Object.defineProperty(exports, "pairs", { enumerable: true, get: function() {
    return pairs_1.pairs;
  } });
  var partition_1 = partition$3;
  Object.defineProperty(exports, "partition", { enumerable: true, get: function() {
    return partition_1.partition;
  } });
  var race_12 = race$3;
  Object.defineProperty(exports, "race", { enumerable: true, get: function() {
    return race_12.race;
  } });
  var range_1 = range$1;
  Object.defineProperty(exports, "range", { enumerable: true, get: function() {
    return range_1.range;
  } });
  var throwError_1 = throwError$1;
  Object.defineProperty(exports, "throwError", { enumerable: true, get: function() {
    return throwError_1.throwError;
  } });
  var timer_12 = timer$1;
  Object.defineProperty(exports, "timer", { enumerable: true, get: function() {
    return timer_12.timer;
  } });
  var using_1 = using$1;
  Object.defineProperty(exports, "using", { enumerable: true, get: function() {
    return using_1.using;
  } });
  var zip_12 = zip$3;
  Object.defineProperty(exports, "zip", { enumerable: true, get: function() {
    return zip_12.zip;
  } });
  var scheduled_12 = scheduled$1;
  Object.defineProperty(exports, "scheduled", { enumerable: true, get: function() {
    return scheduled_12.scheduled;
  } });
  var empty_2 = empty;
  Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function() {
    return empty_2.EMPTY;
  } });
  var never_2 = never;
  Object.defineProperty(exports, "NEVER", { enumerable: true, get: function() {
    return never_2.NEVER;
  } });
  __exportStar(types, exports);
  var config_12 = config;
  Object.defineProperty(exports, "config", { enumerable: true, get: function() {
    return config_12.config;
  } });
  var audit_12 = audit$1;
  Object.defineProperty(exports, "audit", { enumerable: true, get: function() {
    return audit_12.audit;
  } });
  var auditTime_1 = auditTime$1;
  Object.defineProperty(exports, "auditTime", { enumerable: true, get: function() {
    return auditTime_1.auditTime;
  } });
  var buffer_1 = buffer$1;
  Object.defineProperty(exports, "buffer", { enumerable: true, get: function() {
    return buffer_1.buffer;
  } });
  var bufferCount_1 = bufferCount$1;
  Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function() {
    return bufferCount_1.bufferCount;
  } });
  var bufferTime_1 = bufferTime$1;
  Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function() {
    return bufferTime_1.bufferTime;
  } });
  var bufferToggle_1 = bufferToggle$1;
  Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function() {
    return bufferToggle_1.bufferToggle;
  } });
  var bufferWhen_1 = bufferWhen$1;
  Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function() {
    return bufferWhen_1.bufferWhen;
  } });
  var catchError_1 = catchError$1;
  Object.defineProperty(exports, "catchError", { enumerable: true, get: function() {
    return catchError_1.catchError;
  } });
  var combineAll_1 = combineAll;
  Object.defineProperty(exports, "combineAll", { enumerable: true, get: function() {
    return combineAll_1.combineAll;
  } });
  var combineLatestAll_12 = combineLatestAll$1;
  Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function() {
    return combineLatestAll_12.combineLatestAll;
  } });
  var combineLatestWith_1 = combineLatestWith$1;
  Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function() {
    return combineLatestWith_1.combineLatestWith;
  } });
  var concatAll_12 = concatAll$1;
  Object.defineProperty(exports, "concatAll", { enumerable: true, get: function() {
    return concatAll_12.concatAll;
  } });
  var concatMap_12 = concatMap$1;
  Object.defineProperty(exports, "concatMap", { enumerable: true, get: function() {
    return concatMap_12.concatMap;
  } });
  var concatMapTo_1 = concatMapTo$1;
  Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function() {
    return concatMapTo_1.concatMapTo;
  } });
  var concatWith_1 = concatWith$1;
  Object.defineProperty(exports, "concatWith", { enumerable: true, get: function() {
    return concatWith_1.concatWith;
  } });
  var connect_12 = connect$1;
  Object.defineProperty(exports, "connect", { enumerable: true, get: function() {
    return connect_12.connect;
  } });
  var count_1 = count$1;
  Object.defineProperty(exports, "count", { enumerable: true, get: function() {
    return count_1.count;
  } });
  var debounce_1 = debounce$1;
  Object.defineProperty(exports, "debounce", { enumerable: true, get: function() {
    return debounce_1.debounce;
  } });
  var debounceTime_1 = debounceTime$1;
  Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function() {
    return debounceTime_1.debounceTime;
  } });
  var defaultIfEmpty_12 = defaultIfEmpty$1;
  Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function() {
    return defaultIfEmpty_12.defaultIfEmpty;
  } });
  var delay_1 = delay$1;
  Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
    return delay_1.delay;
  } });
  var delayWhen_12 = delayWhen$1;
  Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function() {
    return delayWhen_12.delayWhen;
  } });
  var dematerialize_1 = dematerialize$1;
  Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function() {
    return dematerialize_1.dematerialize;
  } });
  var distinct_1 = distinct$1;
  Object.defineProperty(exports, "distinct", { enumerable: true, get: function() {
    return distinct_1.distinct;
  } });
  var distinctUntilChanged_12 = distinctUntilChanged$1;
  Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function() {
    return distinctUntilChanged_12.distinctUntilChanged;
  } });
  var distinctUntilKeyChanged_1 = distinctUntilKeyChanged$1;
  Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function() {
    return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
  } });
  var elementAt_1 = elementAt$1;
  Object.defineProperty(exports, "elementAt", { enumerable: true, get: function() {
    return elementAt_1.elementAt;
  } });
  var endWith_1 = endWith$1;
  Object.defineProperty(exports, "endWith", { enumerable: true, get: function() {
    return endWith_1.endWith;
  } });
  var every_1 = every$1;
  Object.defineProperty(exports, "every", { enumerable: true, get: function() {
    return every_1.every;
  } });
  var exhaust_1 = exhaust;
  Object.defineProperty(exports, "exhaust", { enumerable: true, get: function() {
    return exhaust_1.exhaust;
  } });
  var exhaustAll_12 = exhaustAll$1;
  Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function() {
    return exhaustAll_12.exhaustAll;
  } });
  var exhaustMap_12 = exhaustMap$1;
  Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function() {
    return exhaustMap_12.exhaustMap;
  } });
  var expand_1 = expand$1;
  Object.defineProperty(exports, "expand", { enumerable: true, get: function() {
    return expand_1.expand;
  } });
  var filter_12 = filter$1;
  Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
    return filter_12.filter;
  } });
  var finalize_1 = finalize$1;
  Object.defineProperty(exports, "finalize", { enumerable: true, get: function() {
    return finalize_1.finalize;
  } });
  var find_12 = find$1;
  Object.defineProperty(exports, "find", { enumerable: true, get: function() {
    return find_12.find;
  } });
  var findIndex_1 = findIndex$1;
  Object.defineProperty(exports, "findIndex", { enumerable: true, get: function() {
    return findIndex_1.findIndex;
  } });
  var first_1 = first$1;
  Object.defineProperty(exports, "first", { enumerable: true, get: function() {
    return first_1.first;
  } });
  var groupBy_1 = groupBy$1;
  Object.defineProperty(exports, "groupBy", { enumerable: true, get: function() {
    return groupBy_1.groupBy;
  } });
  var ignoreElements_12 = ignoreElements$1;
  Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function() {
    return ignoreElements_12.ignoreElements;
  } });
  var isEmpty_1 = isEmpty$1;
  Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function() {
    return isEmpty_1.isEmpty;
  } });
  var last_1 = last$1;
  Object.defineProperty(exports, "last", { enumerable: true, get: function() {
    return last_1.last;
  } });
  var map_12 = map$1;
  Object.defineProperty(exports, "map", { enumerable: true, get: function() {
    return map_12.map;
  } });
  var mapTo_12 = mapTo$1;
  Object.defineProperty(exports, "mapTo", { enumerable: true, get: function() {
    return mapTo_12.mapTo;
  } });
  var materialize_1 = materialize$1;
  Object.defineProperty(exports, "materialize", { enumerable: true, get: function() {
    return materialize_1.materialize;
  } });
  var max_1 = max$1;
  Object.defineProperty(exports, "max", { enumerable: true, get: function() {
    return max_1.max;
  } });
  var mergeAll_12 = mergeAll$1;
  Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function() {
    return mergeAll_12.mergeAll;
  } });
  var flatMap_1 = flatMap;
  Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
    return flatMap_1.flatMap;
  } });
  var mergeMap_12 = mergeMap$1;
  Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function() {
    return mergeMap_12.mergeMap;
  } });
  var mergeMapTo_1 = mergeMapTo$1;
  Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function() {
    return mergeMapTo_1.mergeMapTo;
  } });
  var mergeScan_1 = mergeScan$1;
  Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function() {
    return mergeScan_1.mergeScan;
  } });
  var mergeWith_1 = mergeWith$1;
  Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function() {
    return mergeWith_1.mergeWith;
  } });
  var min_1 = min$1;
  Object.defineProperty(exports, "min", { enumerable: true, get: function() {
    return min_1.min;
  } });
  var multicast_12 = multicast$1;
  Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
    return multicast_12.multicast;
  } });
  var observeOn_12 = observeOn$1;
  Object.defineProperty(exports, "observeOn", { enumerable: true, get: function() {
    return observeOn_12.observeOn;
  } });
  var onErrorResumeNextWith_1 = onErrorResumeNextWith$1;
  Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function() {
    return onErrorResumeNextWith_1.onErrorResumeNextWith;
  } });
  var pairwise_1 = pairwise$1;
  Object.defineProperty(exports, "pairwise", { enumerable: true, get: function() {
    return pairwise_1.pairwise;
  } });
  var pluck_1 = pluck$1;
  Object.defineProperty(exports, "pluck", { enumerable: true, get: function() {
    return pluck_1.pluck;
  } });
  var publish_1 = publish$1;
  Object.defineProperty(exports, "publish", { enumerable: true, get: function() {
    return publish_1.publish;
  } });
  var publishBehavior_1 = publishBehavior$1;
  Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function() {
    return publishBehavior_1.publishBehavior;
  } });
  var publishLast_1 = publishLast$1;
  Object.defineProperty(exports, "publishLast", { enumerable: true, get: function() {
    return publishLast_1.publishLast;
  } });
  var publishReplay_1 = publishReplay$1;
  Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function() {
    return publishReplay_1.publishReplay;
  } });
  var raceWith_12 = raceWith$1;
  Object.defineProperty(exports, "raceWith", { enumerable: true, get: function() {
    return raceWith_12.raceWith;
  } });
  var reduce_12 = reduce$1;
  Object.defineProperty(exports, "reduce", { enumerable: true, get: function() {
    return reduce_12.reduce;
  } });
  var repeat_1 = repeat$1;
  Object.defineProperty(exports, "repeat", { enumerable: true, get: function() {
    return repeat_1.repeat;
  } });
  var repeatWhen_1 = repeatWhen$1;
  Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function() {
    return repeatWhen_1.repeatWhen;
  } });
  var retry_1 = retry$1;
  Object.defineProperty(exports, "retry", { enumerable: true, get: function() {
    return retry_1.retry;
  } });
  var retryWhen_1 = retryWhen$1;
  Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function() {
    return retryWhen_1.retryWhen;
  } });
  var refCount_12 = refCount$1;
  Object.defineProperty(exports, "refCount", { enumerable: true, get: function() {
    return refCount_12.refCount;
  } });
  var sample_12 = sample$1;
  Object.defineProperty(exports, "sample", { enumerable: true, get: function() {
    return sample_12.sample;
  } });
  var sampleTime_1 = sampleTime$1;
  Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function() {
    return sampleTime_1.sampleTime;
  } });
  var scan_1 = scan$1;
  Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
    return scan_1.scan;
  } });
  var sequenceEqual_1 = sequenceEqual$1;
  Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function() {
    return sequenceEqual_1.sequenceEqual;
  } });
  var share_12 = share$1;
  Object.defineProperty(exports, "share", { enumerable: true, get: function() {
    return share_12.share;
  } });
  var shareReplay_1 = shareReplay$1;
  Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function() {
    return shareReplay_1.shareReplay;
  } });
  var single_1 = single$1;
  Object.defineProperty(exports, "single", { enumerable: true, get: function() {
    return single_1.single;
  } });
  var skip_1 = skip$1;
  Object.defineProperty(exports, "skip", { enumerable: true, get: function() {
    return skip_1.skip;
  } });
  var skipLast_1 = skipLast$1;
  Object.defineProperty(exports, "skipLast", { enumerable: true, get: function() {
    return skipLast_1.skipLast;
  } });
  var skipUntil_1 = skipUntil$1;
  Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function() {
    return skipUntil_1.skipUntil;
  } });
  var skipWhile_1 = skipWhile$1;
  Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function() {
    return skipWhile_1.skipWhile;
  } });
  var startWith_1 = startWith$1;
  Object.defineProperty(exports, "startWith", { enumerable: true, get: function() {
    return startWith_1.startWith;
  } });
  var subscribeOn_12 = subscribeOn$1;
  Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function() {
    return subscribeOn_12.subscribeOn;
  } });
  var switchAll_1 = switchAll$1;
  Object.defineProperty(exports, "switchAll", { enumerable: true, get: function() {
    return switchAll_1.switchAll;
  } });
  var switchMap_12 = switchMap$1;
  Object.defineProperty(exports, "switchMap", { enumerable: true, get: function() {
    return switchMap_12.switchMap;
  } });
  var switchMapTo_1 = switchMapTo$1;
  Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function() {
    return switchMapTo_1.switchMapTo;
  } });
  var switchScan_1 = switchScan$1;
  Object.defineProperty(exports, "switchScan", { enumerable: true, get: function() {
    return switchScan_1.switchScan;
  } });
  var take_12 = take$1;
  Object.defineProperty(exports, "take", { enumerable: true, get: function() {
    return take_12.take;
  } });
  var takeLast_12 = takeLast$1;
  Object.defineProperty(exports, "takeLast", { enumerable: true, get: function() {
    return takeLast_12.takeLast;
  } });
  var takeUntil_1 = takeUntil$1;
  Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function() {
    return takeUntil_1.takeUntil;
  } });
  var takeWhile_1 = takeWhile$1;
  Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function() {
    return takeWhile_1.takeWhile;
  } });
  var tap_1 = tap$1;
  Object.defineProperty(exports, "tap", { enumerable: true, get: function() {
    return tap_1.tap;
  } });
  var throttle_12 = throttle$1;
  Object.defineProperty(exports, "throttle", { enumerable: true, get: function() {
    return throttle_12.throttle;
  } });
  var throttleTime_1 = throttleTime$1;
  Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function() {
    return throttleTime_1.throttleTime;
  } });
  var throwIfEmpty_12 = throwIfEmpty$1;
  Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function() {
    return throwIfEmpty_12.throwIfEmpty;
  } });
  var timeInterval_1 = timeInterval$1;
  Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function() {
    return timeInterval_1.timeInterval;
  } });
  var timeout_2 = timeout;
  Object.defineProperty(exports, "timeout", { enumerable: true, get: function() {
    return timeout_2.timeout;
  } });
  var timeoutWith_1 = timeoutWith$1;
  Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function() {
    return timeoutWith_1.timeoutWith;
  } });
  var timestamp_1 = timestamp$1;
  Object.defineProperty(exports, "timestamp", { enumerable: true, get: function() {
    return timestamp_1.timestamp;
  } });
  var toArray_12 = toArray$1;
  Object.defineProperty(exports, "toArray", { enumerable: true, get: function() {
    return toArray_12.toArray;
  } });
  var window_1 = window$1;
  Object.defineProperty(exports, "window", { enumerable: true, get: function() {
    return window_1.window;
  } });
  var windowCount_1 = windowCount$1;
  Object.defineProperty(exports, "windowCount", { enumerable: true, get: function() {
    return windowCount_1.windowCount;
  } });
  var windowTime_1 = windowTime$1;
  Object.defineProperty(exports, "windowTime", { enumerable: true, get: function() {
    return windowTime_1.windowTime;
  } });
  var windowToggle_1 = windowToggle$1;
  Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function() {
    return windowToggle_1.windowToggle;
  } });
  var windowWhen_1 = windowWhen$1;
  Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function() {
    return windowWhen_1.windowWhen;
  } });
  var withLatestFrom_1 = withLatestFrom$1;
  Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function() {
    return withLatestFrom_1.withLatestFrom;
  } });
  var zipAll_1 = zipAll$1;
  Object.defineProperty(exports, "zipAll", { enumerable: true, get: function() {
    return zipAll_1.zipAll;
  } });
  var zipWith_1 = zipWith$1;
  Object.defineProperty(exports, "zipWith", { enumerable: true, get: function() {
    return zipWith_1.zipWith;
  } });
})(cjs);
var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t) {
  let e = JSON.stringify(t);
  return `${u}${Array.from(e).map((r) => {
    let n = r.charCodeAt(0);
    if (n > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);
    return Array.from(n.toString(4).padStart(4, "0")).map((o) => String.fromCodePoint(c[o])).join("");
  }).join("")}`;
}
function I(t) {
  return !Number.isNaN(Number(t)) || /[a-z]/i.test(t) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t) ? false : !!Date.parse(t);
}
function T(t) {
  try {
    new URL(t, t.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return false;
  }
  return true;
}
function C(t, e, r = "auto") {
  return r === true || r === "auto" && (I(t) || T(t)) ? t : `${t}${E(e)}`;
}
Object.fromEntries(Object.entries(c).map((t) => t.reverse()));
Object.fromEntries(Object.entries(s).map((t) => t.reverse()));
var S = `${Object.values(s).map((t) => `\\u{${t.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t) {
  var e;
  return { cleaned: t.replace(f, ""), encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || "" };
}
function O(t) {
  return t && JSON.parse(_(JSON.stringify(t)).cleaned);
}
function stegaClean(result) {
  return O(result);
}
var operators = {};
var partition$1 = {};
Object.defineProperty(partition$1, "__esModule", { value: true });
partition$1.partition = void 0;
var not_1 = not$1;
var filter_1 = filter$1;
function partition(predicate, thisArg) {
  return function(source) {
    return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
  };
}
partition$1.partition = partition;
var race$1 = {};
var __read = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2) {
  for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
    to[j] = from2[i];
  return to;
};
Object.defineProperty(race$1, "__esModule", { value: true });
race$1.race = void 0;
var argsOrArgArray_1 = argsOrArgArray$1;
var raceWith_1 = raceWith$1;
function race() {
  var args2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args2[_i] = arguments[_i];
  }
  return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args2))));
}
race$1.race = race;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
  exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
  exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
  var audit_12 = audit$1;
  Object.defineProperty(exports, "audit", { enumerable: true, get: function() {
    return audit_12.audit;
  } });
  var auditTime_1 = auditTime$1;
  Object.defineProperty(exports, "auditTime", { enumerable: true, get: function() {
    return auditTime_1.auditTime;
  } });
  var buffer_1 = buffer$1;
  Object.defineProperty(exports, "buffer", { enumerable: true, get: function() {
    return buffer_1.buffer;
  } });
  var bufferCount_1 = bufferCount$1;
  Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function() {
    return bufferCount_1.bufferCount;
  } });
  var bufferTime_1 = bufferTime$1;
  Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function() {
    return bufferTime_1.bufferTime;
  } });
  var bufferToggle_1 = bufferToggle$1;
  Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function() {
    return bufferToggle_1.bufferToggle;
  } });
  var bufferWhen_1 = bufferWhen$1;
  Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function() {
    return bufferWhen_1.bufferWhen;
  } });
  var catchError_1 = catchError$1;
  Object.defineProperty(exports, "catchError", { enumerable: true, get: function() {
    return catchError_1.catchError;
  } });
  var combineAll_1 = combineAll;
  Object.defineProperty(exports, "combineAll", { enumerable: true, get: function() {
    return combineAll_1.combineAll;
  } });
  var combineLatestAll_12 = combineLatestAll$1;
  Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function() {
    return combineLatestAll_12.combineLatestAll;
  } });
  var combineLatest_12 = combineLatest$1;
  Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function() {
    return combineLatest_12.combineLatest;
  } });
  var combineLatestWith_1 = combineLatestWith$1;
  Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function() {
    return combineLatestWith_1.combineLatestWith;
  } });
  var concat_12 = concat$1;
  Object.defineProperty(exports, "concat", { enumerable: true, get: function() {
    return concat_12.concat;
  } });
  var concatAll_12 = concatAll$1;
  Object.defineProperty(exports, "concatAll", { enumerable: true, get: function() {
    return concatAll_12.concatAll;
  } });
  var concatMap_12 = concatMap$1;
  Object.defineProperty(exports, "concatMap", { enumerable: true, get: function() {
    return concatMap_12.concatMap;
  } });
  var concatMapTo_1 = concatMapTo$1;
  Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function() {
    return concatMapTo_1.concatMapTo;
  } });
  var concatWith_1 = concatWith$1;
  Object.defineProperty(exports, "concatWith", { enumerable: true, get: function() {
    return concatWith_1.concatWith;
  } });
  var connect_12 = connect$1;
  Object.defineProperty(exports, "connect", { enumerable: true, get: function() {
    return connect_12.connect;
  } });
  var count_1 = count$1;
  Object.defineProperty(exports, "count", { enumerable: true, get: function() {
    return count_1.count;
  } });
  var debounce_1 = debounce$1;
  Object.defineProperty(exports, "debounce", { enumerable: true, get: function() {
    return debounce_1.debounce;
  } });
  var debounceTime_1 = debounceTime$1;
  Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function() {
    return debounceTime_1.debounceTime;
  } });
  var defaultIfEmpty_12 = defaultIfEmpty$1;
  Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function() {
    return defaultIfEmpty_12.defaultIfEmpty;
  } });
  var delay_1 = delay$1;
  Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
    return delay_1.delay;
  } });
  var delayWhen_12 = delayWhen$1;
  Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function() {
    return delayWhen_12.delayWhen;
  } });
  var dematerialize_1 = dematerialize$1;
  Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function() {
    return dematerialize_1.dematerialize;
  } });
  var distinct_1 = distinct$1;
  Object.defineProperty(exports, "distinct", { enumerable: true, get: function() {
    return distinct_1.distinct;
  } });
  var distinctUntilChanged_12 = distinctUntilChanged$1;
  Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function() {
    return distinctUntilChanged_12.distinctUntilChanged;
  } });
  var distinctUntilKeyChanged_1 = distinctUntilKeyChanged$1;
  Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function() {
    return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
  } });
  var elementAt_1 = elementAt$1;
  Object.defineProperty(exports, "elementAt", { enumerable: true, get: function() {
    return elementAt_1.elementAt;
  } });
  var endWith_1 = endWith$1;
  Object.defineProperty(exports, "endWith", { enumerable: true, get: function() {
    return endWith_1.endWith;
  } });
  var every_1 = every$1;
  Object.defineProperty(exports, "every", { enumerable: true, get: function() {
    return every_1.every;
  } });
  var exhaust_1 = exhaust;
  Object.defineProperty(exports, "exhaust", { enumerable: true, get: function() {
    return exhaust_1.exhaust;
  } });
  var exhaustAll_12 = exhaustAll$1;
  Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function() {
    return exhaustAll_12.exhaustAll;
  } });
  var exhaustMap_12 = exhaustMap$1;
  Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function() {
    return exhaustMap_12.exhaustMap;
  } });
  var expand_1 = expand$1;
  Object.defineProperty(exports, "expand", { enumerable: true, get: function() {
    return expand_1.expand;
  } });
  var filter_12 = filter$1;
  Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
    return filter_12.filter;
  } });
  var finalize_1 = finalize$1;
  Object.defineProperty(exports, "finalize", { enumerable: true, get: function() {
    return finalize_1.finalize;
  } });
  var find_12 = find$1;
  Object.defineProperty(exports, "find", { enumerable: true, get: function() {
    return find_12.find;
  } });
  var findIndex_1 = findIndex$1;
  Object.defineProperty(exports, "findIndex", { enumerable: true, get: function() {
    return findIndex_1.findIndex;
  } });
  var first_1 = first$1;
  Object.defineProperty(exports, "first", { enumerable: true, get: function() {
    return first_1.first;
  } });
  var groupBy_1 = groupBy$1;
  Object.defineProperty(exports, "groupBy", { enumerable: true, get: function() {
    return groupBy_1.groupBy;
  } });
  var ignoreElements_12 = ignoreElements$1;
  Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function() {
    return ignoreElements_12.ignoreElements;
  } });
  var isEmpty_1 = isEmpty$1;
  Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function() {
    return isEmpty_1.isEmpty;
  } });
  var last_1 = last$1;
  Object.defineProperty(exports, "last", { enumerable: true, get: function() {
    return last_1.last;
  } });
  var map_12 = map$1;
  Object.defineProperty(exports, "map", { enumerable: true, get: function() {
    return map_12.map;
  } });
  var mapTo_12 = mapTo$1;
  Object.defineProperty(exports, "mapTo", { enumerable: true, get: function() {
    return mapTo_12.mapTo;
  } });
  var materialize_1 = materialize$1;
  Object.defineProperty(exports, "materialize", { enumerable: true, get: function() {
    return materialize_1.materialize;
  } });
  var max_1 = max$1;
  Object.defineProperty(exports, "max", { enumerable: true, get: function() {
    return max_1.max;
  } });
  var merge_12 = merge$1;
  Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
    return merge_12.merge;
  } });
  var mergeAll_12 = mergeAll$1;
  Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function() {
    return mergeAll_12.mergeAll;
  } });
  var flatMap_1 = flatMap;
  Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
    return flatMap_1.flatMap;
  } });
  var mergeMap_12 = mergeMap$1;
  Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function() {
    return mergeMap_12.mergeMap;
  } });
  var mergeMapTo_1 = mergeMapTo$1;
  Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function() {
    return mergeMapTo_1.mergeMapTo;
  } });
  var mergeScan_1 = mergeScan$1;
  Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function() {
    return mergeScan_1.mergeScan;
  } });
  var mergeWith_1 = mergeWith$1;
  Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function() {
    return mergeWith_1.mergeWith;
  } });
  var min_1 = min$1;
  Object.defineProperty(exports, "min", { enumerable: true, get: function() {
    return min_1.min;
  } });
  var multicast_12 = multicast$1;
  Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
    return multicast_12.multicast;
  } });
  var observeOn_12 = observeOn$1;
  Object.defineProperty(exports, "observeOn", { enumerable: true, get: function() {
    return observeOn_12.observeOn;
  } });
  var onErrorResumeNextWith_1 = onErrorResumeNextWith$1;
  Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function() {
    return onErrorResumeNextWith_1.onErrorResumeNext;
  } });
  var pairwise_1 = pairwise$1;
  Object.defineProperty(exports, "pairwise", { enumerable: true, get: function() {
    return pairwise_1.pairwise;
  } });
  var partition_1 = partition$1;
  Object.defineProperty(exports, "partition", { enumerable: true, get: function() {
    return partition_1.partition;
  } });
  var pluck_1 = pluck$1;
  Object.defineProperty(exports, "pluck", { enumerable: true, get: function() {
    return pluck_1.pluck;
  } });
  var publish_1 = publish$1;
  Object.defineProperty(exports, "publish", { enumerable: true, get: function() {
    return publish_1.publish;
  } });
  var publishBehavior_1 = publishBehavior$1;
  Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function() {
    return publishBehavior_1.publishBehavior;
  } });
  var publishLast_1 = publishLast$1;
  Object.defineProperty(exports, "publishLast", { enumerable: true, get: function() {
    return publishLast_1.publishLast;
  } });
  var publishReplay_1 = publishReplay$1;
  Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function() {
    return publishReplay_1.publishReplay;
  } });
  var race_12 = race$1;
  Object.defineProperty(exports, "race", { enumerable: true, get: function() {
    return race_12.race;
  } });
  var raceWith_12 = raceWith$1;
  Object.defineProperty(exports, "raceWith", { enumerable: true, get: function() {
    return raceWith_12.raceWith;
  } });
  var reduce_12 = reduce$1;
  Object.defineProperty(exports, "reduce", { enumerable: true, get: function() {
    return reduce_12.reduce;
  } });
  var repeat_1 = repeat$1;
  Object.defineProperty(exports, "repeat", { enumerable: true, get: function() {
    return repeat_1.repeat;
  } });
  var repeatWhen_1 = repeatWhen$1;
  Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function() {
    return repeatWhen_1.repeatWhen;
  } });
  var retry_1 = retry$1;
  Object.defineProperty(exports, "retry", { enumerable: true, get: function() {
    return retry_1.retry;
  } });
  var retryWhen_1 = retryWhen$1;
  Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function() {
    return retryWhen_1.retryWhen;
  } });
  var refCount_12 = refCount$1;
  Object.defineProperty(exports, "refCount", { enumerable: true, get: function() {
    return refCount_12.refCount;
  } });
  var sample_12 = sample$1;
  Object.defineProperty(exports, "sample", { enumerable: true, get: function() {
    return sample_12.sample;
  } });
  var sampleTime_1 = sampleTime$1;
  Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function() {
    return sampleTime_1.sampleTime;
  } });
  var scan_1 = scan$1;
  Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
    return scan_1.scan;
  } });
  var sequenceEqual_1 = sequenceEqual$1;
  Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function() {
    return sequenceEqual_1.sequenceEqual;
  } });
  var share_12 = share$1;
  Object.defineProperty(exports, "share", { enumerable: true, get: function() {
    return share_12.share;
  } });
  var shareReplay_1 = shareReplay$1;
  Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function() {
    return shareReplay_1.shareReplay;
  } });
  var single_1 = single$1;
  Object.defineProperty(exports, "single", { enumerable: true, get: function() {
    return single_1.single;
  } });
  var skip_1 = skip$1;
  Object.defineProperty(exports, "skip", { enumerable: true, get: function() {
    return skip_1.skip;
  } });
  var skipLast_1 = skipLast$1;
  Object.defineProperty(exports, "skipLast", { enumerable: true, get: function() {
    return skipLast_1.skipLast;
  } });
  var skipUntil_1 = skipUntil$1;
  Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function() {
    return skipUntil_1.skipUntil;
  } });
  var skipWhile_1 = skipWhile$1;
  Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function() {
    return skipWhile_1.skipWhile;
  } });
  var startWith_1 = startWith$1;
  Object.defineProperty(exports, "startWith", { enumerable: true, get: function() {
    return startWith_1.startWith;
  } });
  var subscribeOn_12 = subscribeOn$1;
  Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function() {
    return subscribeOn_12.subscribeOn;
  } });
  var switchAll_1 = switchAll$1;
  Object.defineProperty(exports, "switchAll", { enumerable: true, get: function() {
    return switchAll_1.switchAll;
  } });
  var switchMap_12 = switchMap$1;
  Object.defineProperty(exports, "switchMap", { enumerable: true, get: function() {
    return switchMap_12.switchMap;
  } });
  var switchMapTo_1 = switchMapTo$1;
  Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function() {
    return switchMapTo_1.switchMapTo;
  } });
  var switchScan_1 = switchScan$1;
  Object.defineProperty(exports, "switchScan", { enumerable: true, get: function() {
    return switchScan_1.switchScan;
  } });
  var take_12 = take$1;
  Object.defineProperty(exports, "take", { enumerable: true, get: function() {
    return take_12.take;
  } });
  var takeLast_12 = takeLast$1;
  Object.defineProperty(exports, "takeLast", { enumerable: true, get: function() {
    return takeLast_12.takeLast;
  } });
  var takeUntil_1 = takeUntil$1;
  Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function() {
    return takeUntil_1.takeUntil;
  } });
  var takeWhile_1 = takeWhile$1;
  Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function() {
    return takeWhile_1.takeWhile;
  } });
  var tap_1 = tap$1;
  Object.defineProperty(exports, "tap", { enumerable: true, get: function() {
    return tap_1.tap;
  } });
  var throttle_12 = throttle$1;
  Object.defineProperty(exports, "throttle", { enumerable: true, get: function() {
    return throttle_12.throttle;
  } });
  var throttleTime_1 = throttleTime$1;
  Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function() {
    return throttleTime_1.throttleTime;
  } });
  var throwIfEmpty_12 = throwIfEmpty$1;
  Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function() {
    return throwIfEmpty_12.throwIfEmpty;
  } });
  var timeInterval_1 = timeInterval$1;
  Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function() {
    return timeInterval_1.timeInterval;
  } });
  var timeout_12 = timeout;
  Object.defineProperty(exports, "timeout", { enumerable: true, get: function() {
    return timeout_12.timeout;
  } });
  var timeoutWith_1 = timeoutWith$1;
  Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function() {
    return timeoutWith_1.timeoutWith;
  } });
  var timestamp_1 = timestamp$1;
  Object.defineProperty(exports, "timestamp", { enumerable: true, get: function() {
    return timestamp_1.timestamp;
  } });
  var toArray_12 = toArray$1;
  Object.defineProperty(exports, "toArray", { enumerable: true, get: function() {
    return toArray_12.toArray;
  } });
  var window_1 = window$1;
  Object.defineProperty(exports, "window", { enumerable: true, get: function() {
    return window_1.window;
  } });
  var windowCount_1 = windowCount$1;
  Object.defineProperty(exports, "windowCount", { enumerable: true, get: function() {
    return windowCount_1.windowCount;
  } });
  var windowTime_1 = windowTime$1;
  Object.defineProperty(exports, "windowTime", { enumerable: true, get: function() {
    return windowTime_1.windowTime;
  } });
  var windowToggle_1 = windowToggle$1;
  Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function() {
    return windowToggle_1.windowToggle;
  } });
  var windowWhen_1 = windowWhen$1;
  Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function() {
    return windowWhen_1.windowWhen;
  } });
  var withLatestFrom_1 = withLatestFrom$1;
  Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function() {
    return withLatestFrom_1.withLatestFrom;
  } });
  var zip_12 = zip$1;
  Object.defineProperty(exports, "zip", { enumerable: true, get: function() {
    return zip_12.zip;
  } });
  var zipAll_1 = zipAll$1;
  Object.defineProperty(exports, "zipAll", { enumerable: true, get: function() {
    return zipAll_1.zipAll;
  } });
  var zipWith_1 = zipWith$1;
  Object.defineProperty(exports, "zipWith", { enumerable: true, get: function() {
    return zipWith_1.zipWith;
  } });
})(operators);
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"], VALID_INSERT_LOCATIONS = ["before", "after", "replace"], dataset = (name2) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name2))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
}, validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config2) => {
  if (!config2.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config2.dataset || "";
}, requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args2) => (didCall || (returnValue = fn(...args2), didCall = true), returnValue);
}
const createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args2) => console.warn(message.join(" "), ...args2))
), printCdnAndWithCredentialsWarning = createWarningPrinter([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
};
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
const VALID_PERSPECTIVE = /^[a-z0-9_]+$/i;
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
  const invalid = (Array.isArray(perspective) ? perspective : [perspective]).filter(
    (perspectiveName) => typeof perspectiveName != "string" || !VALID_PERSPECTIVE.test(perspectiveName)
  );
  if (invalid.length > 0) {
    const formatted = invalid.map((v) => JSON.stringify(v));
    throw new TypeError(
      `Invalid API perspective value${invalid.length === 1 ? "" : "s"}: ${formatted.join(", ")}, expected \`published\`, \`drafts\`, \`raw\` or a release identifier string`
    );
  }
}
const initConfig = (config2, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config2,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config2.stega == "boolean" ? { enabled: config2.stega } : config2.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname;
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return newConfig.useProjectHostname ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
class ClientError extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    __publicField(this, "response");
    __publicField(this, "statusCode", 400);
    __publicField(this, "responseBody");
    __publicField(this, "details");
    Object.assign(this, props);
  }
}
class ServerError extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    __publicField(this, "response");
    __publicField(this, "statusCode", 500);
    __publicField(this, "responseBody");
    __publicField(this, "details");
    Object.assign(this, props);
  }
}
function extractErrorProps(res) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (body.error && body.message)
    return props.message = `${body.error} - ${body.message}`, props;
  if (isMutationError(body) || isActionError(body)) {
    const allItems = body.error.items || [], items = allItems.slice(0, 5).map((item) => {
      var _a;
      return (_a = item.error) == null ? void 0 : _a.description;
    }).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > 5 && (itemsStr += `
...and ${allItems.length - 5} more`), props.message = `${body.error.description}${itemsStr}`, props.details = body.error, props;
  }
  return body.error && body.error.description ? (props.message = body.error.description, props.details = body.error, props) : (props.message = body.error || body.message || httpErrorMessage(res), props);
}
function isMutationError(body) {
  return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "mutationError" && typeof body.error.description == "string";
}
function isActionError(body) {
  return isPlainObject(body) && isPlainObject(body.error) && body.error.type === "actionError" && typeof body.error.description == "string";
}
function isPlainObject(obj) {
  return typeof obj == "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
  const statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
class CorsOriginError extends Error {
  constructor({ projectId: projectId2 }) {
    super("CorsOriginError");
    __publicField(this, "projectId");
    __publicField(this, "addOriginUrl");
    this.name = "CorsOriginError", this.projectId = projectId2;
    const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
    this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
  }
}
const httpError = {
  onResponse: (res) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res);
    return res;
  }
};
function printWarnings() {
  const seen = {};
  return {
    onResponse: (res) => {
      const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [warn];
      for (const msg of warnings)
        !msg || seen[msg] || (seen[msg] = true, console.warn(msg));
      return res;
    }
  };
}
function defineHttpRequest(envMiddleware) {
  return getIt([
    retry$2({ shouldRetry }),
    ...envMiddleware,
    printWarnings(),
    jsonRequest(),
    jsonResponse(),
    progress(),
    httpError,
    observable$1({ implementation: cjs.Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0) return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery) && isRetriableResponse ? true : retry$2.shouldRetry(err, attempt, options);
}
class ConnectionFailedError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "ConnectionFailedError");
  }
}
class DisconnectError extends Error {
  constructor(message, reason, options = {}) {
    super(message, options);
    __publicField(this, "name", "DisconnectError");
    __publicField(this, "reason");
    this.reason = reason;
  }
}
class ChannelError extends Error {
  constructor(message, data) {
    super(message);
    __publicField(this, "name", "ChannelError");
    __publicField(this, "data");
    this.data = data;
  }
}
class MessageError extends Error {
  constructor(message, data, options = {}) {
    super(message, options);
    __publicField(this, "name", "MessageError");
    __publicField(this, "data");
    this.data = data;
  }
}
class MessageParseError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "MessageParseError");
  }
}
const REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return cjs.defer(() => {
    const es = initEventSource();
    return cjs.isObservable(es) ? es : cjs.of(es);
  }).pipe(cjs.mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new cjs.Observable((observer) => {
    const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
    function onError(evt) {
      if ("data" in evt) {
        const [parseError, event] = parseEvent(evt);
        observer.error(
          parseError ? new MessageParseError("Unable to parse EventSource error message", { cause: event }) : new MessageError((event == null ? void 0 : event.data).message, event)
        );
        return;
      }
      es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({ type: "reconnect" });
    }
    function onOpen() {
      observer.next({ type: "open" });
    }
    function onMessage(message) {
      var _a;
      const [parseError, event] = parseEvent(message);
      if (parseError) {
        observer.error(
          new MessageParseError("Unable to parse EventSource message", { cause: parseError })
        );
        return;
      }
      if (message.type === "channelError") {
        observer.error(new ChannelError(extractErrorMessage(event == null ? void 0 : event.data), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(
          new DisconnectError(
            `Server disconnected client: ${((_a = event.data) == null ? void 0 : _a.reason) || "unknown error"}`
          )
        );
        return;
      }
      observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    const cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    const data = typeof message.data == "string" && JSON.parse(message.data);
    return [
      null,
      {
        type: message.type,
        id: message.lastEventId,
        ...isEmptyObject(data) ? {} : { data }
      }
    ];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err) {
  return err.error ? err.error.description ? err.error.description : typeof err.error == "string" ? err.error : JSON.stringify(err.error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
  for (const _2 in data)
    return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
  constructor(selection, operations = {}) {
    __publicField(this, "selection");
    __publicField(this, "operations");
    this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge2 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
const _ObservablePatch = class _ObservablePatch extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd(this, _client);
    __privateSet(this, _client, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _ObservablePatch(this.selection, { ...this.operations }, __privateGet(this, _client));
  }
  commit(options) {
    if (!__privateGet(this, _client))
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet(this, _client).mutate({ patch: this.serialize() }, opts);
  }
};
_client = new WeakMap();
let ObservablePatch = _ObservablePatch;
const _Patch = class _Patch extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd(this, _client2);
    __privateSet(this, _client2, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _Patch(this.selection, { ...this.operations }, __privateGet(this, _client2));
  }
  commit(options) {
    if (!__privateGet(this, _client2))
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet(this, _client2).mutate({ patch: this.serialize() }, opts);
  }
};
_client2 = new WeakMap();
let Patch = _Patch;
const defaultMutateOptions = { returnDocuments: false };
class BaseTransaction {
  constructor(operations = [], transactionId) {
    __publicField(this, "operations");
    __publicField(this, "trxId");
    this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
}
const _Transaction = class _Transaction extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd(this, _client3);
    __privateSet(this, _client3, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _Transaction([...this.operations], __privateGet(this, _client3), this.trxId);
  }
  commit(options) {
    if (!__privateGet(this, _client3))
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return __privateGet(this, _client3).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, __privateGet(this, _client3)));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      const patch = new Patch(patchOrDocumentId, patchOps || {}, __privateGet(this, _client3));
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client3 = new WeakMap();
let Transaction = _Transaction;
const _ObservableTransaction = class _ObservableTransaction extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd(this, _client4);
    __privateSet(this, _client4, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _ObservableTransaction([...this.operations], __privateGet(this, _client4), this.trxId);
  }
  commit(options) {
    if (!__privateGet(this, _client4))
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return __privateGet(this, _client4).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, __privateGet(this, _client4)));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client4 = new WeakMap();
let ObservableTransaction = _ObservableTransaction;
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config2, overrides = {}) {
  const headers2 = {}, token = overrides.token || config2.token;
  token && (headers2.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config2.useProjectHostname && config2.projectId && (headers2[projectHeader] = config2.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config2.token || config2.withCredentials : overrides.withCredentials), timeout2 = typeof overrides.timeout > "u" ? config2.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers2, overrides.headers || {}),
    timeout: typeof timeout2 > "u" ? 5 * 60 * 1e3 : timeout2,
    proxy: overrides.proxy || config2.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config2.fetch == "object" ? { ...config2.fetch, ...overrides.fetch } : overrides.fetch || config2.fetch
  });
}
const encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
}), isResponse = (event) => event.type === "response", getBody = (event) => event.body, indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    operators.combineLatestWith(
      cjs.from(
        import('./stegaEncodeSourceMap-D0asgDPn.mjs').then(function(n) {
          return n.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    operators.map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(operators.map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", id),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operators.filter(isResponse),
    operators.map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operators.filter(isResponse),
    operators.map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout: timeout2, token, tag, headers: headers2, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout: timeout2,
    headers: headers2,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    cacheMode,
    canUseCdn: isQuery,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    operators.filter(isResponse),
    operators.map(getBody),
    operators.map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
function _requestObservable(client, httpRequest, options) {
  const uri = options.url || options.uri, config2 = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/") === 0 : options.canUseCdn;
  let useCdn = (options.useCdn ?? config2.useCdn) && canUseCdn;
  const tag = options.tag && config2.requestTagPrefix ? [config2.requestTagPrefix, options.tag].join(".") : options.tag || config2.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/query/") === 0) {
    const resultSourceMap = options.resultSourceMap ?? config2.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspectiveOption = options.perspective || config2.perspective;
    typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query }), useCdn && options.cacheMode == "noStale" && (options.query = { cacheMode: "noStale", ...options.query });
  }
  const reqOptions = requestOptions(
    config2,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  ), request = new cjs.Observable(
    (subscriber) => httpRequest(reqOptions, config2.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  return _requestObservable(client, httpRequest, options).pipe(
    operators.filter((event) => event.type === "response"),
    operators.map((event) => event.body)
  );
}
function _getDataUrl(client, operation, path) {
  const config2 = client.config(), catalog = hasDataset(config2), baseUri = `/${operation}/${catalog}`;
  return `/data${path ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new cjs.Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  if (isDomExceptionSupported)
    return new DOMException((signal == null ? void 0 : signal.reason) ?? "The operation was aborted.", "AbortError");
  const error = new Error((signal == null ? void 0 : signal.reason) ?? "The operation was aborted.");
  return error.name = "AbortError", error;
}
class ObservableAssetsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client5);
    __privateAdd(this, _httpRequest);
    __privateSet(this, _client5, client), __privateSet(this, _httpRequest, httpRequest);
  }
  upload(assetType, body, options) {
    return _upload(__privateGet(this, _client5), __privateGet(this, _httpRequest), assetType, body, options);
  }
}
_client5 = new WeakMap();
_httpRequest = new WeakMap();
class AssetsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client6);
    __privateAdd(this, _httpRequest2);
    __privateSet(this, _client6, client), __privateSet(this, _httpRequest2, httpRequest);
  }
  upload(assetType, body, options) {
    const observable2 = _upload(__privateGet(this, _client6), __privateGet(this, _httpRequest2), assetType, body, options);
    return cjs.lastValueFrom(
      observable2.pipe(
        operators.filter((event) => event.type === "response"),
        operators.map(
          (event) => event.body.document
        )
      )
    );
  }
}
_client6 = new WeakMap();
_httpRequest2 = new WeakMap();
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const dataset2 = hasDataset(client.config()), assetEndpoint = assetType === "image" ? "images" : "files", options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: `/assets/${assetEndpoint}/${dataset2}`,
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = cjs.defer(() => import('@sanity/eventsource')).pipe(
  operators.map(({ default: EventSource2 }) => EventSource2),
  cjs.shareReplay(1)
);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(
      cjs.catchError((err, caught) => err instanceof ConnectionFailedError ? cjs.concat(cjs.of({ type: "reconnect" }), cjs.timer(1e3).pipe(cjs.mergeMap(() => caught))) : cjs.throwError(() => err))
    );
  };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "tag"
], defaultOptions = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return cjs.throwError(() => new Error("Query too large for listener"));
  const listenFor = options.events ? options.events : ["mutation"], esOptions = {};
  return (token || withCredentials) && (esOptions.withCredentials = true), token && (esOptions.headers = {
    Authorization: `Bearer ${token}`
  }), connectEventSource(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjs.of(EventSource)).pipe(operators.map((EventSource2) => new EventSource2(uri, esOptions)))
  ), listenFor).pipe(
    reconnectOnConnectionFailure(),
    operators.filter((event) => listenFor.includes(event.type)),
    operators.map(
      (event) => ({
        type: event.type,
        ..."data" in event ? event.data : {}
      })
    )
  );
}
function shareReplayLatest(configOrPredicate, config2) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config2 } : configOrPredicate
  );
}
function _shareReplayLatest(config2) {
  return (source) => {
    let latest, emitted = false;
    const { predicate, ...shareConfig } = config2, wrapped = source.pipe(
      cjs.tap((value) => {
        config2.predicate(value) && (emitted = true, latest = value);
      }),
      cjs.finalize(() => {
        emitted = false, latest = void 0;
      }),
      cjs.share(shareConfig)
    ), emitLatest = new cjs.Observable((subscriber) => {
      emitted && subscriber.next(latest), subscriber.complete();
    });
    return cjs.merge(wrapped, emitLatest);
  };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
  constructor(client) {
    __privateAdd(this, _client7);
    __privateSet(this, _client7, client);
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts = false,
    tag: _tag
  } = {}) {
    const {
      projectId: projectId2,
      apiVersion: _apiVersion,
      token,
      withCredentials,
      requestTagPrefix
    } = __privateGet(this, _client7).config(), apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    if (includeDrafts && !token && !withCredentials)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const path = _getDataUrl(__privateGet(this, _client7), "live/events"), url = new URL(__privateGet(this, _client7).getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
    const esOptions = {};
    includeDrafts && token && (esOptions.headers = {
      Authorization: `Bearer ${token}`
    }), includeDrafts && withCredentials && (esOptions.withCredentials = true);
    const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
    if (existing)
      return existing;
    const events = connectEventSource(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjs.of(EventSource)).pipe(operators.map((EventSource2) => new EventSource2(url.href, esOptions)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect"
    ]).pipe(
      reconnectOnConnectionFailure(),
      operators.map((event) => {
        if (event.type === "message") {
          const { data, ...rest } = event;
          return { ...rest, tags: data.tags };
        }
        return event;
      })
    ), checkCors = fetchObservable(url, {
      method: "OPTIONS",
      mode: "cors",
      credentials: esOptions.withCredentials ? "include" : "omit",
      headers: esOptions.headers
    }).pipe(
      cjs.mergeMap(() => cjs.EMPTY),
      cjs.catchError(() => {
        throw new CorsOriginError({ projectId: projectId2 });
      })
    ), observable2 = cjs.concat(checkCors, events).pipe(
      operators.finalize(() => eventsCache.delete(key)),
      shareReplayLatest({
        predicate: (event) => event.type === "welcome"
      })
    );
    return eventsCache.set(key, observable2), observable2;
  }
}
_client7 = new WeakMap();
function fetchObservable(url, init) {
  return new cjs.Observable((observer) => {
    const controller = new AbortController(), signal = controller.signal;
    return fetch(url, { ...init, signal: controller.signal }).then(
      (response) => {
        observer.next(response), observer.complete();
      },
      (err) => {
        signal.aborted || observer.error(err);
      }
    ), () => controller.abort();
  });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client8);
    __privateAdd(this, _httpRequest3);
    __privateSet(this, _client8, client), __privateSet(this, _httpRequest3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name2, options) {
    return _modify(__privateGet(this, _client8), __privateGet(this, _httpRequest3), "PUT", name2, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name2, options) {
    return _modify(__privateGet(this, _client8), __privateGet(this, _httpRequest3), "PATCH", name2, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name2) {
    return _modify(__privateGet(this, _client8), __privateGet(this, _httpRequest3), "DELETE", name2);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(__privateGet(this, _client8), __privateGet(this, _httpRequest3), {
      uri: "/datasets",
      tag: null
    });
  }
}
_client8 = new WeakMap();
_httpRequest3 = new WeakMap();
class DatasetsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client9);
    __privateAdd(this, _httpRequest4);
    __privateSet(this, _client9, client), __privateSet(this, _httpRequest4, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name2, options) {
    return cjs.lastValueFrom(
      _modify(__privateGet(this, _client9), __privateGet(this, _httpRequest4), "PUT", name2, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name2, options) {
    return cjs.lastValueFrom(
      _modify(__privateGet(this, _client9), __privateGet(this, _httpRequest4), "PATCH", name2, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name2) {
    return cjs.lastValueFrom(_modify(__privateGet(this, _client9), __privateGet(this, _httpRequest4), "DELETE", name2));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return cjs.lastValueFrom(
      _request(__privateGet(this, _client9), __privateGet(this, _httpRequest4), { uri: "/datasets", tag: null })
    );
  }
}
_client9 = new WeakMap();
_httpRequest4 = new WeakMap();
function _modify(client, httpRequest, method, name2, options) {
  return dataset(name2), _request(client, httpRequest, {
    method,
    uri: `/datasets/${name2}`,
    body: options,
    tag: null
  });
}
class ObservableProjectsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client10);
    __privateAdd(this, _httpRequest5);
    __privateSet(this, _client10, client), __privateSet(this, _httpRequest5, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return _request(__privateGet(this, _client10), __privateGet(this, _httpRequest5), { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return _request(__privateGet(this, _client10), __privateGet(this, _httpRequest5), { uri: `/projects/${projectId2}` });
  }
}
_client10 = new WeakMap();
_httpRequest5 = new WeakMap();
class ProjectsClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client11);
    __privateAdd(this, _httpRequest6);
    __privateSet(this, _client11, client), __privateSet(this, _httpRequest6, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return cjs.lastValueFrom(_request(__privateGet(this, _client11), __privateGet(this, _httpRequest6), { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return cjs.lastValueFrom(
      _request(__privateGet(this, _client11), __privateGet(this, _httpRequest6), { uri: `/projects/${projectId2}` })
    );
  }
}
_client11 = new WeakMap();
_httpRequest6 = new WeakMap();
class ObservableUsersClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client12);
    __privateAdd(this, _httpRequest7);
    __privateSet(this, _client12, client), __privateSet(this, _httpRequest7, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      __privateGet(this, _client12),
      __privateGet(this, _httpRequest7),
      { uri: `/users/${id}` }
    );
  }
}
_client12 = new WeakMap();
_httpRequest7 = new WeakMap();
class UsersClient {
  constructor(client, httpRequest) {
    __privateAdd(this, _client13);
    __privateAdd(this, _httpRequest8);
    __privateSet(this, _client13, client), __privateSet(this, _httpRequest8, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return cjs.lastValueFrom(
      _request(__privateGet(this, _client13), __privateGet(this, _httpRequest8), {
        uri: `/users/${id}`
      })
    );
  }
}
_client13 = new WeakMap();
_httpRequest8 = new WeakMap();
const _ObservableSanityClient = class _ObservableSanityClient {
  constructor(httpRequest, config2 = defaultConfig) {
    __publicField(this, "assets");
    __publicField(this, "datasets");
    __publicField(this, "live");
    __publicField(this, "projects");
    __publicField(this, "users");
    /**
     * Private properties
     */
    __privateAdd(this, _clientConfig);
    __privateAdd(this, _httpRequest9);
    /**
     * Instance properties
     */
    __publicField(this, "listen", _listen);
    this.config(config2), __privateSet(this, _httpRequest9, httpRequest), this.assets = new ObservableAssetsClient(this, __privateGet(this, _httpRequest9)), this.datasets = new ObservableDatasetsClient(this, __privateGet(this, _httpRequest9)), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, __privateGet(this, _httpRequest9)), this.users = new ObservableUsersClient(this, __privateGet(this, _httpRequest9));
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _ObservableSanityClient(__privateGet(this, _httpRequest9), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...__privateGet(this, _clientConfig) };
    if (__privateGet(this, _clientConfig) && __privateGet(this, _clientConfig).allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return __privateSet(this, _clientConfig, initConfig(newConfig, __privateGet(this, _clientConfig) || {})), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new _ObservableSanityClient(__privateGet(this, _httpRequest9), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof (newConfig == null ? void 0 : newConfig.stega) == "boolean" ? { enabled: newConfig.stega } : (newConfig == null ? void 0 : newConfig.stega) || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      __privateGet(this, _httpRequest9),
      __privateGet(this, _clientConfig).stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, __privateGet(this, _httpRequest9), id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, __privateGet(this, _httpRequest9), ids, options);
  }
  create(document, options) {
    return _create(this, __privateGet(this, _httpRequest9), document, "create", options);
  }
  createIfNotExists(document, options) {
    return _createIfNotExists(this, __privateGet(this, _httpRequest9), document, options);
  }
  createOrReplace(document, options) {
    return _createOrReplace(this, __privateGet(this, _httpRequest9), document, options);
  }
  delete(selection, options) {
    return _delete(this, __privateGet(this, _httpRequest9), selection, options);
  }
  mutate(operations, options) {
    return _mutate(this, __privateGet(this, _httpRequest9), operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, __privateGet(this, _httpRequest9), operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, __privateGet(this, _httpRequest9), options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig = new WeakMap();
_httpRequest9 = new WeakMap();
let ObservableSanityClient = _ObservableSanityClient;
const _SanityClient = class _SanityClient {
  constructor(httpRequest, config2 = defaultConfig) {
    __publicField(this, "assets");
    __publicField(this, "datasets");
    __publicField(this, "live");
    __publicField(this, "projects");
    __publicField(this, "users");
    /**
     * Observable version of the Sanity client, with the same configuration as the promise-based one
     */
    __publicField(this, "observable");
    /**
     * Private properties
     */
    __privateAdd(this, _clientConfig2);
    __privateAdd(this, _httpRequest10);
    /**
     * Instance properties
     */
    __publicField(this, "listen", _listen);
    this.config(config2), __privateSet(this, _httpRequest10, httpRequest), this.assets = new AssetsClient(this, __privateGet(this, _httpRequest10)), this.datasets = new DatasetsClient(this, __privateGet(this, _httpRequest10)), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, __privateGet(this, _httpRequest10)), this.users = new UsersClient(this, __privateGet(this, _httpRequest10)), this.observable = new ObservableSanityClient(httpRequest, config2);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _SanityClient(__privateGet(this, _httpRequest10), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...__privateGet(this, _clientConfig2) };
    if (__privateGet(this, _clientConfig2) && __privateGet(this, _clientConfig2).allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), __privateSet(this, _clientConfig2, initConfig(newConfig, __privateGet(this, _clientConfig2) || {})), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new _SanityClient(__privateGet(this, _httpRequest10), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof (newConfig == null ? void 0 : newConfig.stega) == "boolean" ? { enabled: newConfig.stega } : (newConfig == null ? void 0 : newConfig.stega) || {}
      }
    });
  }
  fetch(query, params, options) {
    return cjs.lastValueFrom(
      _fetch(
        this,
        __privateGet(this, _httpRequest10),
        __privateGet(this, _clientConfig2).stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return cjs.lastValueFrom(_getDocument(this, __privateGet(this, _httpRequest10), id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return cjs.lastValueFrom(_getDocuments(this, __privateGet(this, _httpRequest10), ids, options));
  }
  create(document, options) {
    return cjs.lastValueFrom(
      _create(this, __privateGet(this, _httpRequest10), document, "create", options)
    );
  }
  createIfNotExists(document, options) {
    return cjs.lastValueFrom(
      _createIfNotExists(this, __privateGet(this, _httpRequest10), document, options)
    );
  }
  createOrReplace(document, options) {
    return cjs.lastValueFrom(
      _createOrReplace(this, __privateGet(this, _httpRequest10), document, options)
    );
  }
  delete(selection, options) {
    return cjs.lastValueFrom(_delete(this, __privateGet(this, _httpRequest10), selection, options));
  }
  mutate(operations, options) {
    return cjs.lastValueFrom(_mutate(this, __privateGet(this, _httpRequest10), operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return cjs.lastValueFrom(_action(this, __privateGet(this, _httpRequest10), operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return cjs.lastValueFrom(_request(this, __privateGet(this, _httpRequest10), options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return cjs.lastValueFrom(_dataRequest(this, __privateGet(this, _httpRequest10), endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig2 = new WeakMap();
_httpRequest10 = new WeakMap();
let SanityClient = _SanityClient;
function defineCreateClientExports(envMiddleware, ClassConstructor) {
  return { requester: defineHttpRequest(envMiddleware), createClient: (config2) => {
    const clientRequester = defineHttpRequest(envMiddleware);
    return new ClassConstructor(
      (options, requester2) => (requester2 || clientRequester)({
        maxRedirects: 0,
        maxRetries: config2.maxRetries,
        retryDelay: config2.retryDelay,
        ...options
      }),
      config2
    );
  } };
}
var name = "@sanity/client", version = "6.28.3";
const middleware = [
  debug({ verbose: true, namespace: "sanity:client" }),
  headers({ "User-Agent": `${name} ${version}` }),
  // Enable keep-alive, and in addition limit the number of sockets that can be opened.
  // This avoids opening too many connections to the server if someone tries to execute
  // a bunch of requests in parallel. It's recommended to have a concurrency limit
  // at a "higher limit" (i.e. you shouldn't actually execute hundreds of requests in parallel),
  // and this is mainly to minimize the impact for the network and server.
  //
  // We're currently matching the same defaults as browsers:
  // https://stackoverflow.com/questions/26003756/is-there-a-limit-practical-or-otherwise-to-the-number-of-web-sockets-a-page-op
  agent({
    keepAlive: true,
    maxSockets: 30,
    maxTotalSockets: 256
  })
], exp = defineCreateClientExports(middleware, SanityClient), createClient = exp.createClient;
var builder = {};
var urlForImage = {};
var parseAssetId$1 = {};
Object.defineProperty(parseAssetId$1, "__esModule", { value: true });
var example = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
function parseAssetId(ref2) {
  var _a = ref2.split("-"), id = _a[1], dimensionString = _a[2], format = _a[3];
  if (!id || !dimensionString || !format) {
    throw new Error("Malformed asset _ref '".concat(ref2, `'. Expected an id like "`).concat(example, '".'));
  }
  var _b = dimensionString.split("x"), imgWidthStr = _b[0], imgHeightStr = _b[1];
  var width = +imgWidthStr;
  var height = +imgHeightStr;
  var isValidAssetId = isFinite(width) && isFinite(height);
  if (!isValidAssetId) {
    throw new Error("Malformed asset _ref '".concat(ref2, `'. Expected an id like "`).concat(example, '".'));
  }
  return { id, width, height, format };
}
parseAssetId$1.default = parseAssetId;
var parseSource$1 = {};
var __assign$1 = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t[p] = s2[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
Object.defineProperty(parseSource$1, "__esModule", { value: true });
var isRef = function(src) {
  var source = src;
  return source ? typeof source._ref === "string" : false;
};
var isAsset = function(src) {
  var source = src;
  return source ? typeof source._id === "string" : false;
};
var isAssetStub = function(src) {
  var source = src;
  return source && source.asset ? typeof source.asset.url === "string" : false;
};
function parseSource(source) {
  if (!source) {
    return null;
  }
  var image;
  if (typeof source === "string" && isUrl(source)) {
    image = {
      asset: { _ref: urlToId(source) }
    };
  } else if (typeof source === "string") {
    image = {
      asset: { _ref: source }
    };
  } else if (isRef(source)) {
    image = {
      asset: source
    };
  } else if (isAsset(source)) {
    image = {
      asset: {
        _ref: source._id || ""
      }
    };
  } else if (isAssetStub(source)) {
    image = {
      asset: {
        _ref: urlToId(source.asset.url)
      }
    };
  } else if (typeof source.asset === "object") {
    image = __assign$1({}, source);
  } else {
    return null;
  }
  var img = source;
  if (img.crop) {
    image.crop = img.crop;
  }
  if (img.hotspot) {
    image.hotspot = img.hotspot;
  }
  return applyDefaults(image);
}
parseSource$1.default = parseSource;
function isUrl(url) {
  return /^https?:\/\//.test("".concat(url));
}
function urlToId(url) {
  var parts = url.split("/").slice(-1);
  return "image-".concat(parts[0]).replace(/\.([a-z]+)$/, "-$1");
}
function applyDefaults(image) {
  if (image.crop && image.hotspot) {
    return image;
  }
  var result = __assign$1({}, image);
  if (!result.crop) {
    result.crop = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    };
  }
  if (!result.hotspot) {
    result.hotspot = {
      x: 0.5,
      y: 0.5,
      height: 1,
      width: 1
    };
  }
  return result;
}
(function(exports) {
  var __assign2 = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign2 = Object.assign || function(t) {
      for (var s2, i = 1, n = arguments.length; i < n; i++) {
        s2 = arguments[i];
        for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
      }
      return t;
    };
    return __assign2.apply(this, arguments);
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.parseSource = exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = void 0;
  var parseAssetId_1 = __importDefault2(parseAssetId$1);
  var parseSource_1 = __importDefault2(parseSource$1);
  exports.parseSource = parseSource_1.default;
  exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = [
    ["width", "w"],
    ["height", "h"],
    ["format", "fm"],
    ["download", "dl"],
    ["blur", "blur"],
    ["sharpen", "sharp"],
    ["invert", "invert"],
    ["orientation", "or"],
    ["minHeight", "min-h"],
    ["maxHeight", "max-h"],
    ["minWidth", "min-w"],
    ["maxWidth", "max-w"],
    ["quality", "q"],
    ["fit", "fit"],
    ["crop", "crop"],
    ["saturation", "sat"],
    ["auto", "auto"],
    ["dpr", "dpr"],
    ["pad", "pad"],
    ["frame", "frame"]
  ];
  function urlForImage2(options) {
    var spec = __assign2({}, options || {});
    var source = spec.source;
    delete spec.source;
    var image = (0, parseSource_1.default)(source);
    if (!image) {
      throw new Error("Unable to resolve image URL from source (".concat(JSON.stringify(source), ")"));
    }
    var id = image.asset._ref || image.asset._id || "";
    var asset = (0, parseAssetId_1.default)(id);
    var cropLeft = Math.round(image.crop.left * asset.width);
    var cropTop = Math.round(image.crop.top * asset.height);
    var crop = {
      left: cropLeft,
      top: cropTop,
      width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
      height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop)
    };
    var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
    var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
    var hotSpotCenterX = image.hotspot.x * asset.width;
    var hotSpotCenterY = image.hotspot.y * asset.height;
    var hotspot = {
      left: hotSpotCenterX - hotSpotHorizontalRadius,
      top: hotSpotCenterY - hotSpotVerticalRadius,
      right: hotSpotCenterX + hotSpotHorizontalRadius,
      bottom: hotSpotCenterY + hotSpotVerticalRadius
    };
    if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
      spec = __assign2(__assign2({}, spec), fit({ crop, hotspot }, spec));
    }
    return specToImageUrl(__assign2(__assign2({}, spec), { asset }));
  }
  exports.default = urlForImage2;
  function specToImageUrl(spec) {
    var cdnUrl = (spec.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, "");
    var vanityStub = spec.vanityName ? "/".concat(spec.vanityName) : "";
    var filename = "".concat(spec.asset.id, "-").concat(spec.asset.width, "x").concat(spec.asset.height, ".").concat(spec.asset.format).concat(vanityStub);
    var baseUrl = "".concat(cdnUrl, "/images/").concat(spec.projectId, "/").concat(spec.dataset, "/").concat(filename);
    var params = [];
    if (spec.rect) {
      var _a = spec.rect, left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
      var isEffectiveCrop = left !== 0 || top_1 !== 0 || height !== spec.asset.height || width !== spec.asset.width;
      if (isEffectiveCrop) {
        params.push("rect=".concat(left, ",").concat(top_1, ",").concat(width, ",").concat(height));
      }
    }
    if (spec.bg) {
      params.push("bg=".concat(spec.bg));
    }
    if (spec.focalPoint) {
      params.push("fp-x=".concat(spec.focalPoint.x));
      params.push("fp-y=".concat(spec.focalPoint.y));
    }
    var flip = [spec.flipHorizontal && "h", spec.flipVertical && "v"].filter(Boolean).join("");
    if (flip) {
      params.push("flip=".concat(flip));
    }
    exports.SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function(mapping) {
      var specName = mapping[0], param = mapping[1];
      if (typeof spec[specName] !== "undefined") {
        params.push("".concat(param, "=").concat(encodeURIComponent(spec[specName])));
      } else if (typeof spec[param] !== "undefined") {
        params.push("".concat(param, "=").concat(encodeURIComponent(spec[param])));
      }
    });
    if (params.length === 0) {
      return baseUrl;
    }
    return "".concat(baseUrl, "?").concat(params.join("&"));
  }
  function fit(source, spec) {
    var cropRect;
    var imgWidth = spec.width;
    var imgHeight = spec.height;
    if (!(imgWidth && imgHeight)) {
      return { width: imgWidth, height: imgHeight, rect: source.crop };
    }
    var crop = source.crop;
    var hotspot = source.hotspot;
    var desiredAspectRatio = imgWidth / imgHeight;
    var cropAspectRatio = crop.width / crop.height;
    if (cropAspectRatio > desiredAspectRatio) {
      var height = Math.round(crop.height);
      var width = Math.round(height * desiredAspectRatio);
      var top_2 = Math.max(0, Math.round(crop.top));
      var hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
      var left = Math.max(0, Math.round(hotspotXCenter - width / 2));
      if (left < crop.left) {
        left = crop.left;
      } else if (left + width > crop.left + crop.width) {
        left = crop.left + crop.width - width;
      }
      cropRect = { left, top: top_2, width, height };
    } else {
      var width = crop.width;
      var height = Math.round(width / desiredAspectRatio);
      var left = Math.max(0, Math.round(crop.left));
      var hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);
      var top_3 = Math.max(0, Math.round(hotspotYCenter - height / 2));
      if (top_3 < crop.top) {
        top_3 = crop.top;
      } else if (top_3 + height > crop.top + crop.height) {
        top_3 = crop.top + crop.height - height;
      }
      cropRect = { left, top: top_3, width, height };
    }
    return {
      width: imgWidth,
      height: imgHeight,
      rect: cropRect
    };
  }
})(urlForImage);
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s2, i = 1, n = arguments.length; i < n; i++) {
      s2 = arguments[i];
      for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p))
        t[p] = s2[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(builder, "__esModule", { value: true });
builder.ImageUrlBuilder = void 0;
var urlForImage_1 = __importStar(urlForImage);
var validFits = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"];
var validCrops = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"];
var validAutoModes = ["format"];
function isSanityModernClientLike(client) {
  return client && "config" in client ? typeof client.config === "function" : false;
}
function isSanityClientLike(client) {
  return client && "clientConfig" in client ? typeof client.clientConfig === "object" : false;
}
function rewriteSpecName(key) {
  var specs = urlForImage_1.SPEC_NAME_TO_URL_NAME_MAPPINGS;
  for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
    var entry2 = specs_1[_i];
    var specName = entry2[0], param = entry2[1];
    if (key === specName || key === param) {
      return specName;
    }
  }
  return key;
}
function urlBuilder(options) {
  if (isSanityModernClientLike(options)) {
    var _a = options.config(), apiUrl = _a.apiHost, projectId2 = _a.projectId, dataset2 = _a.dataset;
    var apiHost = apiUrl || "https://api.sanity.io";
    return new ImageUrlBuilder(null, {
      baseUrl: apiHost.replace(/^https:\/\/api\./, "https://cdn."),
      projectId: projectId2,
      dataset: dataset2
    });
  }
  if (isSanityClientLike(options)) {
    var _b = options.clientConfig, apiUrl = _b.apiHost, projectId2 = _b.projectId, dataset2 = _b.dataset;
    var apiHost = apiUrl || "https://api.sanity.io";
    return new ImageUrlBuilder(null, {
      baseUrl: apiHost.replace(/^https:\/\/api\./, "https://cdn."),
      projectId: projectId2,
      dataset: dataset2
    });
  }
  return new ImageUrlBuilder(null, options || {});
}
builder.default = urlBuilder;
var ImageUrlBuilder = (
  /** @class */
  function() {
    function ImageUrlBuilder2(parent, options) {
      this.options = parent ? __assign(__assign({}, parent.options || {}), options || {}) : __assign({}, options || {});
    }
    ImageUrlBuilder2.prototype.withOptions = function(options) {
      var baseUrl = options.baseUrl || this.options.baseUrl;
      var newOptions = { baseUrl };
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          var specKey = rewriteSpecName(key);
          newOptions[specKey] = options[key];
        }
      }
      return new ImageUrlBuilder2(this, __assign({ baseUrl }, newOptions));
    };
    ImageUrlBuilder2.prototype.image = function(source) {
      return this.withOptions({ source });
    };
    ImageUrlBuilder2.prototype.dataset = function(dataset2) {
      return this.withOptions({ dataset: dataset2 });
    };
    ImageUrlBuilder2.prototype.projectId = function(projectId2) {
      return this.withOptions({ projectId: projectId2 });
    };
    ImageUrlBuilder2.prototype.bg = function(bg) {
      return this.withOptions({ bg });
    };
    ImageUrlBuilder2.prototype.dpr = function(dpr) {
      return this.withOptions(dpr && dpr !== 1 ? { dpr } : {});
    };
    ImageUrlBuilder2.prototype.width = function(width) {
      return this.withOptions({ width });
    };
    ImageUrlBuilder2.prototype.height = function(height) {
      return this.withOptions({ height });
    };
    ImageUrlBuilder2.prototype.focalPoint = function(x, y) {
      return this.withOptions({ focalPoint: { x, y } });
    };
    ImageUrlBuilder2.prototype.maxWidth = function(maxWidth) {
      return this.withOptions({ maxWidth });
    };
    ImageUrlBuilder2.prototype.minWidth = function(minWidth) {
      return this.withOptions({ minWidth });
    };
    ImageUrlBuilder2.prototype.maxHeight = function(maxHeight) {
      return this.withOptions({ maxHeight });
    };
    ImageUrlBuilder2.prototype.minHeight = function(minHeight) {
      return this.withOptions({ minHeight });
    };
    ImageUrlBuilder2.prototype.size = function(width, height) {
      return this.withOptions({ width, height });
    };
    ImageUrlBuilder2.prototype.blur = function(blur) {
      return this.withOptions({ blur });
    };
    ImageUrlBuilder2.prototype.sharpen = function(sharpen) {
      return this.withOptions({ sharpen });
    };
    ImageUrlBuilder2.prototype.rect = function(left, top, width, height) {
      return this.withOptions({ rect: { left, top, width, height } });
    };
    ImageUrlBuilder2.prototype.format = function(format) {
      return this.withOptions({ format });
    };
    ImageUrlBuilder2.prototype.invert = function(invert) {
      return this.withOptions({ invert });
    };
    ImageUrlBuilder2.prototype.orientation = function(orientation) {
      return this.withOptions({ orientation });
    };
    ImageUrlBuilder2.prototype.quality = function(quality) {
      return this.withOptions({ quality });
    };
    ImageUrlBuilder2.prototype.forceDownload = function(download) {
      return this.withOptions({ download });
    };
    ImageUrlBuilder2.prototype.flipHorizontal = function() {
      return this.withOptions({ flipHorizontal: true });
    };
    ImageUrlBuilder2.prototype.flipVertical = function() {
      return this.withOptions({ flipVertical: true });
    };
    ImageUrlBuilder2.prototype.ignoreImageParams = function() {
      return this.withOptions({ ignoreImageParams: true });
    };
    ImageUrlBuilder2.prototype.fit = function(value) {
      if (validFits.indexOf(value) === -1) {
        throw new Error('Invalid fit mode "'.concat(value, '"'));
      }
      return this.withOptions({ fit: value });
    };
    ImageUrlBuilder2.prototype.crop = function(value) {
      if (validCrops.indexOf(value) === -1) {
        throw new Error('Invalid crop mode "'.concat(value, '"'));
      }
      return this.withOptions({ crop: value });
    };
    ImageUrlBuilder2.prototype.saturation = function(saturation) {
      return this.withOptions({ saturation });
    };
    ImageUrlBuilder2.prototype.auto = function(value) {
      if (validAutoModes.indexOf(value) === -1) {
        throw new Error('Invalid auto mode "'.concat(value, '"'));
      }
      return this.withOptions({ auto: value });
    };
    ImageUrlBuilder2.prototype.pad = function(pad) {
      return this.withOptions({ pad });
    };
    ImageUrlBuilder2.prototype.vanityName = function(value) {
      return this.withOptions({ vanityName: value });
    };
    ImageUrlBuilder2.prototype.frame = function(frame) {
      if (frame !== 1) {
        throw new Error('Invalid frame value "'.concat(frame, '"'));
      }
      return this.withOptions({ frame });
    };
    ImageUrlBuilder2.prototype.url = function() {
      return (0, urlForImage_1.default)(this.options);
    };
    ImageUrlBuilder2.prototype.toString = function() {
      return this.url();
    };
    return ImageUrlBuilder2;
  }()
);
builder.ImageUrlBuilder = ImageUrlBuilder;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
var builder_1 = __importDefault(builder);
var node = builder_1.default;
const imageUrlBuilder = /* @__PURE__ */ getDefaultExportFromCjs(node);
const sanity_pDTw8KhLta = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const sanityClient = createClient({
    projectId: "c1m9ouc7",
    // Your project ID
    dataset: "production",
    // Dataset name
    apiVersion: "2023-01-01",
    // Use the latest version
    useCdn: true
    // Enable CDN for faster response times
  });
  const builder2 = imageUrlBuilder(sanityClient);
  const urlFor = (source) => source ? builder2.image(source) : null;
  nuxtApp.provide("sanityClient", sanityClient);
  nuxtApp.provide("urlFor", urlFor);
});
const prerender_server_LXx1wM9sKF = /* @__PURE__ */ defineNuxtPlugin(async () => {
  {
    return;
  }
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  sanity_pDTw8KhLta,
  prerender_server_LXx1wM9sKF
];
const useSiteNavigationSchema = () => {
  const baseUrl = "https://knowbots.ca";
  const createSiteNavigationSchema = (navigationItems = [], options = {}) => {
    const {
      name: name2 = "Knowbots Main Navigation",
      description = "Primary site navigation for Knowbots website"
    } = options;
    const formattedItems = navigationItems.map((item) => {
      const url = item.url.startsWith("http") ? item.url : `${baseUrl}${item.url.startsWith("/") ? item.url : `/${item.url}`}`;
      return {
        "@type": "SiteNavigationElement",
        "name": item.name,
        "url": url
      };
    });
    const schema = {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "name": name2,
      "description": description,
      "potentialAction": formattedItems.map((item) => ({
        "@type": "ViewAction",
        "target": item.url,
        "name": item.name
      }))
    };
    return schema;
  };
  const generateSchemaScript = (schema) => {
    if (!schema) return "";
    return `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
  };
  return {
    createSiteNavigationSchema,
    generateSchemaScript
  };
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
  __name: "TopNavigation",
  __ssrInlineRender: true,
  props: {
    isHeroSection: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const isScrolled = ref(false);
    const isMenuOpen = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const headerBackgroundClass = computed(() => {
      if (props.isHeroSection) {
        return isScrolled.value ? "bg-white shadow-md" : "bg-transparent";
      } else {
        return "bg-white shadow-md";
      }
    });
    const textColorClass = computed(() => {
      if (props.isHeroSection) {
        return isScrolled.value ? "text-darkNavy" : "text-white";
      } else {
        return "text-darkNavy";
      }
    });
    const logoTextClass = computed(() => textColorClass.value);
    const navTextClass = computed(() => textColorClass.value);
    const ctaButtonClass = computed(() => {
      if (props.isHeroSection) {
        return isScrolled.value ? "bg-burntOrangeDark text-white hover:bg-jasperOrange" : "bg-white text-darkNavy hover:bg-jasperOrange hover:text-white";
      } else {
        return "bg-burntOrangeDark text-white hover:bg-jasperOrange";
      }
    });
    const navHoverClass = computed(() => {
      return "hover:text-burntOrange";
    });
    const hamburgerIconColorClass = computed(() => {
      if (props.isHeroSection && !isScrolled.value) {
        return "text-white";
      } else {
        return "text-black";
      }
    });
    const { createSiteNavigationSchema } = useSiteNavigationSchema();
    const navigationItems = [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/" },
      { name: "About Us", url: "/about/" },
      { name: "Blog", url: "/blog/" },
      { name: "Contact", url: "/contact/" }
    ];
    const navigationSchema = createSiteNavigationSchema(navigationItems, {
      name: "Knowbots Main Navigation",
      description: "Main navigation menu for Knowbots website"
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(navigationSchema)
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [
          "fixed w-full top-0 z-50 transition-all duration-300",
          headerBackgroundClass.value
        ]
      }, _attrs))} data-v-f05a315a><div class="bg-transparent" data-v-f05a315a><nav class="flex items-center justify-between py-2 sm:py-4 w-full max-w-screen-lg mx-auto px-8 lg:px-4 xl:px-0" data-v-f05a315a><div class="text-xl sm:text-2xl font-bold font-body" data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["hover:text-burntOrange cursor-pointer", logoTextClass.value]
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Knowbots `);
          } else {
            return [
              createTextVNode(" Knowbots ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="sm:hidden focus:outline-none"${ssrRenderAttr("aria-expanded", isMenuOpen.value.toString())} aria-label="Toggle navigation menu" data-v-f05a315a><svg class="${ssrRenderClass([
        "w-6 h-6",
        hamburgerIconColorClass.value,
        "transition-colors duration-200 ease-in-out"
      ])}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f05a315a>`);
      if (!isMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-f05a315a></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-f05a315a></path>`);
      }
      _push(`</svg></button><ul class="hidden sm:flex space-x-6 font-sans" data-v-f05a315a><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services/",
        class: ["font-body transition-colors cursor-pointer", [navTextClass.value, navHoverClass.value]]
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Services `);
          } else {
            return [
              createTextVNode(" Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/",
        class: ["font-body transition-colors cursor-pointer", [navTextClass.value, navHoverClass.value]]
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About Us `);
          } else {
            return [
              createTextVNode(" About Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog/",
        class: ["font-body transition-colors cursor-pointer", [navTextClass.value, navHoverClass.value]]
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Blog `);
          } else {
            return [
              createTextVNode(" Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="hidden sm:block" data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contact/" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([ctaButtonClass.value, "ml-6 font-body font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform"])}" data-v-f05a315a${_scopeId}> Get In Touch </button>`);
          } else {
            return [
              createVNode("button", {
                class: ["ml-6 font-body font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform", ctaButtonClass.value]
              }, " Get In Touch ", 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(isMenuOpen.value ? null : { display: "none" })}" role="dialog" aria-modal="true" data-v-f05a315a><div class="absolute inset-0 bg-black opacity-50" aria-hidden="true" data-v-f05a315a></div><div class="${ssrRenderClass([isMenuOpen.value ? "translate-x-0" : "translate-x-full", "absolute top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform"])}" data-v-f05a315a><nav class="h-full flex flex-col py-4 px-6" data-v-f05a315a><div class="flex justify-end" data-v-f05a315a><button class="focus:outline-none" aria-label="Close navigation menu" data-v-f05a315a><svg class="${ssrRenderClass([
        "w-6 h-6",
        hamburgerIconColorClass.value,
        "transition-colors duration-200 ease-in-out"
      ])}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f05a315a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-f05a315a></path></svg></button></div><ul class="flex flex-col space-y-4 mt-8 font-sans" data-v-f05a315a><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services/",
        class: "font-body text-darkNavy",
        onClick: toggleMenu
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Services `);
          } else {
            return [
              createTextVNode(" Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about/",
        class: "font-body text-darkNavy",
        onClick: toggleMenu
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About Us `);
          } else {
            return [
              createTextVNode(" About Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog/",
        class: "font-body text-darkNavy",
        onClick: toggleMenu
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Blog `);
          } else {
            return [
              createTextVNode(" Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-f05a315a>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contact/" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="w-full mt-4 font-body font-bold py-2 px-4 rounded-lg shadow-md bg-burntOrangeDark text-white" data-v-f05a315a${_scopeId}> Get In Touch </button>`);
          } else {
            return [
              createVNode("button", {
                class: "w-full mt-4 font-body font-bold py-2 px-4 rounded-lg shadow-md bg-burntOrangeDark text-white",
                onClick: toggleMenu
              }, " Get In Touch ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></div></div></header>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/TopNavigation.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f05a315a"]]);
const TopNavigation = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray$3(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _sfc_main$3 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-deepPurple text-offWhite pt-10 pb-10" }, _attrs))} data-v-7f7fea81><div class="max-w-screen-lg px-8 lg:px-0 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" data-v-7f7fea81><div data-v-7f7fea81><h3 class="text-2xl font-bold mb-4 font-heading" data-v-7f7fea81>Knowbots</h3><p data-v-7f7fea81> Explore the future of digital marketing with Knowbots. </p></div><div data-v-7f7fea81><h4 class="text-xl font-semibold mb-4 font-heading" data-v-7f7fea81>Quick Links</h4><ul class="space-y-2" data-v-7f7fea81><li data-v-7f7fea81><a href="/" class="font-body hover:text-burntOrange transition-colors cursor-pointer" data-v-7f7fea81> Home </a></li><li data-v-7f7fea81><a href="/services/" class="font-body hover:text-burntOrange transition-colors cursor-pointer" data-v-7f7fea81> Services </a></li><li data-v-7f7fea81><a href="/about/" class="font-body hover:text-burntOrange transition-colors cursor-pointer" data-v-7f7fea81> About </a></li><li data-v-7f7fea81><a href="/blog/" class="font-body hover:text-burntOrange transition-colors cursor-pointer" data-v-7f7fea81> Blog </a></li></ul></div><div data-v-7f7fea81><h4 class="text-xl font-semibold mb-4" data-v-7f7fea81>Connect with Us</h4><div class="flex space-x-4" data-v-7f7fea81><a href="#" class="hover:text-softOrange transition-colors" data-v-7f7fea81><i class="fa-brands fa-bluesky" data-v-7f7fea81></i></a><a href="#" class="hover:text-softOrange transition-colors" data-v-7f7fea81><i class="fab fa-linkedin fa-lg" data-v-7f7fea81></i></a><a href="#" class="hover:text-softOrange transition-colors" data-v-7f7fea81><i class="fab fa-github fa-lg" data-v-7f7fea81></i></a></div></div></div><div class="mt-8 text-center border-t border-gray-700 pt-4" data-v-7f7fea81><p class="font-heading" data-v-7f7fea81>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Knowbots. All rights reserved.</p></div></footer>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7f7fea81"]]);
const Footer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_2
}, Symbol.toStringTag, { value: "Module" }));
const useOrganizationSchema = () => {
  const baseUrl = "https://knowbots.ca";
  const createOrganizationSchema = (options = {}) => {
    const {
      organizationType = "ProfessionalService",
      // Other options: 'LocalBusiness', 'Corporation', etc.
      name: name2 = "Knowbots",
      description = "AI and digital marketing solutions for businesses",
      foundingDate = "2018",
      // Update to your actual founding year
      logoPath = "/logo.png",
      socialProfiles = [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/knowbots-marketing/" }
        // Add more social profiles as needed
        // { platform: 'Twitter', url: 'https://twitter.com/knowbots' },
        // { platform: 'Facebook', url: 'https://facebook.com/knowbots' },
        // { platform: 'Instagram', url: 'https://instagram.com/knowbots' },
      ],
      address = {
        streetAddress: "",
        // Your street address
        addressLocality: "Waterloo",
        // Your city
        addressRegion: "ON",
        // Your state/province
        postalCode: "",
        // Your postal/zip code
        addressCountry: "CA"
        // Your country code
      }
    } = options;
    const schema = {
      "@context": "https://schema.org",
      "@type": organizationType,
      "name": name2,
      "url": baseUrl,
      "logo": `${baseUrl}${logoPath}`,
      "description": description
    };
    if (foundingDate) {
      schema.foundingDate = foundingDate;
    }
    if (address && (address.streetAddress || address.addressLocality)) {
      schema.address = {
        "@type": "PostalAddress",
        ...address
      };
    }
    if (socialProfiles && socialProfiles.length > 0) {
      schema.sameAs = socialProfiles.map((profile) => profile.url).filter(Boolean);
    }
    return schema;
  };
  const generateSchemaScript = (schema) => {
    if (!schema) return "";
    return `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
  };
  return {
    createOrganizationSchema,
    generateSchemaScript
  };
};
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const isHeroSection = computed(() => route.meta.isHeroSection ?? false);
    const { createOrganizationSchema } = useOrganizationSchema();
    const organizationSchema = createOrganizationSchema({
      organizationType: "ProfessionalService",
      name: "Knowbots",
      description: "AI and digital marketing solutions for businesses",
      foundingDate: "2018",
      // Update this to your actual founding year
      logoPath: "/logo.png",
      socialProfiles: [
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/knowbots-marketing/" },
        { platform: "Website", url: "https://www.knowbots.ca" }
        // Add any other social profiles you have
      ],
      address: {
        addressLocality: "Waterloo",
        // Your city
        addressRegion: "ON",
        // Your province
        addressCountry: "CA"
      }
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(organizationSchema)
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TopNavigation = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      const _component_Footer = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TopNavigation, { isHeroSection: isHeroSection.value }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-DwcPC0R4.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-DPw4l7eZ.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { C, _export_sfc as _, __nuxt_component_0$1 as a, useRuntimeConfig as b, useSeoMeta as c, useNuxtApp as d, entry$1 as default, asyncDataDefaults as e, createError as f, useRoute as g, useHead as u };
//# sourceMappingURL=server.mjs.map
