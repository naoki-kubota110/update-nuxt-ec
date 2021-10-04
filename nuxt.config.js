export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ec-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/sass/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vee-validate',
    '@/plugins/swiper',
    // { src: '~/plugins/vue-burger-menu', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    "@nuxtjs/vercel-builder"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-fontawesome',
  ],
  fontawesome: {
    component: 'fa',
  },
  auth: {
    redirect: {
      home: '/',
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/user/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/api/user/logout', method: 'post' },
          user: { url: '/api/user/auth', method: 'get', propertyName: 'user' },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.performance.maxAssetSize = 300000;
    },
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    transpile: ['vee-validate/dist/rules', 'tasty-burger-button'],
  },
  serverMiddleware: ['~/api/index.js'],
}
