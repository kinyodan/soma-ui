require('dotenv').config()

// eslint-disable-next-line nuxt/no-cjs-in-config
const fs = require('fs')
// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path')

const ENV_DEV = true

// Development Environment
// let port = 3000
let host = 'localhost'
let https = false

// Production Environment
if (ENV_DEV === false) {
  // port = 3000 // make sure this port is open on your server you can do that via WHM or talk to you hosting company
  // eslint-disable-next-line no-unused-vars
  host = 'wankimani.ac.ke'
  // eslint-disable-next-line no-unused-vars
  https = {
    key: fs.readFileSync(
      path.resolve(__dirname, './../../ssl/keys/<ssl-key-file-name>.key')
    ),
    cert: fs.readFileSync(
      path.resolve(__dirname, './../../ssl/certs/<ssl-crt-file-name>.crt')
    ),
  }
}
export default {
  debug: true,
  ssr: true,
  target: 'server',

  server: {
    host: '0.0.0.0',
    // port,
    timing: false,
  },
  static: {
    prefix: false,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dapply-ui',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: "google-signin-client_id", content:"YOUR_CLIENT_ID.apps.googleusercontent.com"}
      ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'path/to/font-awesome/css/font-awesome.min.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Nunito',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap',
      },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/615cd18d3e.js',
        type: 'text/javascript',
        defer: true,
        body: true,
        rel: 'dns-prefetch',
      },
      {
        src: 'https://apis.google.com/js/platform.js',
        type: 'text/javascript',
        defer: true,
        body: true,
        rel: 'dns-prefetch',
      },
    ],
  },
  loading: { color: '#fff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/scss/main.scss'],
  router: {
    middleware: 'auth',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    // { src: '@/plugins/phone-input'},
    // { src: '~/plugins/vee-validate.js', ssr: true },
    {src: '~/plugins/Vuelidate'}
// { mode: 'client', src: '~/plugins/FullCalendarVue' },
    // { src: '~/plugins/vuelidate' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // ['@nuxtjs/fontawesome']
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv'
  ],
  //
  // fontawesome: {
  //   icons:{
  //     solid:true,
  //     brands:true
  //   }
  // },

  env: {
    // APIURL: process.env.APIURL || 'https://dapply-api.herokuapp.com/api/v1',
    APIURL: process.env.APIURL || 'http://localhost:3002/api/v1',
    MAIN_LOGO: process.env.MAIN_LOGO || "https://res.cloudinary.com/selae-learning/image/upload/r_16/v1664910072/wankimani/Indigo_White_Modern_Minimal_Typographic_Business_Brand_Identity_Logo_4_aikzkb.png"

    // MAIN_LOGO: process.env.MAIN_LOGO || "https://res.cloudinary.com/selae-learning/image/upload/r_21/v1664904564/wankimani/Indigo_White_Modern_Minimal_Typographic_Business_Brand_Identity_Logo_3_ew2c2h.png"
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { materialDesignIcons: false }],
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ['vee-validate']
  },
}
