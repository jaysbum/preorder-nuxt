export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'uget',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/assets/css/normalize.css'  },
      { rel: 'stylesheet', href: '/assets/css/main.css'  },
      { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css'  },
      { rel: 'stylesheet', href: '/assets/css/animate.min.css'  },
      { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'  },
      { rel: 'stylesheet', href: '/assets/css/font/flaticon.css'  },
      { rel: 'stylesheet', href: '/assets/css/owl.carousel.min.css'  },
      { rel: 'stylesheet', href: '/assets/css/owl.theme.default.min.css'  },
      { rel: 'stylesheet', href: '/assets/css/meanmenu.min.css'  },
      { rel: 'stylesheet', href: '/assets/lib/custom-slider/css/nivo-slider.css'  },
      { rel: 'stylesheet', href: '/assets/lib/custom-slider/css/preview.css'  },
      { rel: 'stylesheet', href: '/assets/css/select2.min.css'  },
      { rel: 'stylesheet', href: '/assets/style.css'  },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
    ],
    script : [
      { src: '/assets/js/vendor/modernizr-2.8.3.min.js' },
      { src: '/assets/js/vendor/jquery-2.2.4.min.js' , body : true },
      { src: '/assets/js/bootstrap.min.js' , body : true },
      { src: '/assets/js/owl.carousel.min.js' , body : true },
      { src: '/assets/lib/custom-slider/js/jquery.nivo.slider.js' , body : true },
      { src: '/assets/lib/custom-slider/home.js' , body : true },
      { src: '/assets/js/jquery.meanmenu.min.js' , body : true },
      { src: '/assets/js/wow.min.js' , body : true },
      { src: '/assets/js/plugins.js' , body : true },
      { src: '/assets/js/jquery.countdown.min.js' , body : true },
      { src: '/assets/js/jquery.scrollUp.min.js' , body : true },
      { src: '/assets/js/isotope.pkgd.min.js' , body : true },
      { src: '/assets/js/main.js' , body : true }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/underscore',
    '~/plugins/paginate.js',
    '~/plugins/addresses.js',
    '~/plugins/datetimepicker.js',
    { src: '~/plugins/vue-datepicker', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  //buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-vuex-localstorage',
    'vue-sweetalert2/nuxt',
  ],

  axios: {
    baseURL: "http://128.199.249.40:1337"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  /*build: {
  },*/

  serverMiddleware: [
    { path: '/api/test', handler: '~/api/loggers.js' },
  ],

  auth: {
     strategies: {
       local: {
         endpoints: {
           login: {
           url: 'auth/local',
           method: 'post',
           propertyName: 'jwt'
         },
         user: {
           url: 'users/me',
           method: 'get',
           propertyName: false
         },
         logout: false
         }
       }
     }
  },
  publicRuntimeConfig: {
    baseImagePath : "http://128.199.249.40:1337",
    baseApiPath : "http://app.api-taobao.com"
  },
  loading: '~/components/loading.vue',

  server: {
     port: 8080, // default: 3000
     host: '0.0.0.0' // default: localhost
  }
}
