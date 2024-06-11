// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo', '@nuxt/ui', '@nuxt/image', '@nuxt/eslint', "nuxt-svgo"],
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
    // domains: ['raw.githubusercontent.com'],
  },
})