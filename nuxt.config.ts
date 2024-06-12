// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/apollo',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    'nuxt-svgo',
    '@nuxt/fonts',
    'nuxt-og-image',
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://beta.pokeapi.co/graphql/v1beta',
      },
    },
  },
  typescript: {
    shim: false,
  },
  image: {
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
    domains: ['raw.githubusercontent.com'],
  },
  colorMode: {
    preference: 'dark',
  },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    '/api/**': { cors: true },

  },
  hooks: {
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },
  site: {
    name: 'Pokemon Nuxt',
    description: 'Welcome to Pokemon Nuxt Web App ',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
    url: 'https://pokemonuxt.vercel.app/' || 'http://localhost:3000',
  },
})
