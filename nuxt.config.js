export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "WTFormat",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "title",
        name: "title",
        content: "WTFormat - Easy Date Formatting",
      },
      {
        hid: "description",
        name: "description",
        content:
          "WTFormat helps make date formatting easy and fun! Just enter a date with your preferred format and get back its format code.",
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "author", content: "Ross Hill" },
      {
        name: "keywords",
        content: "date formatting, time formatting, date tools",
      },
      { name: "theme-color", content: "#706edb" },

      // Open Graph / Facebook
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:url", property: "og:url", content: "https://wtformat.com" },
      {
        hid: "og:title",
        property: "og:title",
        content: "WTFormat - Easy Date Formatting",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "WTFormat helps make date formatting easy and fun! Just enter a date with your preferred format and get back its format code.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://wtformat.com/site-image.png",
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "WTFormat",
      },
      {
        hid: "og:image:width",
        property: "og:image:width",
        content: "1200",
      },
      {
        hid: "og:image:height",
        property: "og:image:height",
        content: "630",
      },

      // Twitter
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://wtformat.com",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "WTFormat - Easy Date Formatting",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "WTFormat helps make date formatting easy and fun! Just enter a date with your preferred format and get back its format code.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://wtformat.com/site-image.png",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { hid: "canonical", rel: "canonical", href: "https://wtformat.com" },
    ],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/static/main.scss",
    "~/static/milligram.css",
    "~/static/normalize.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/typescript-build", // https://go.nuxtjs.dev/typescript
    "@nuxtjs/google-fonts",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["date-fns"],
  },

  googleFonts: {
    families: {
      Roboto: true,
    },
  },
};
