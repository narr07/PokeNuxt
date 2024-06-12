<script setup lang="ts">
htmlAttrs: {
    lang: 'en'
  },
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://pokemonuxt.vercel.app/',
    },
  ],
})

useSeoMeta({
  title: 'PokemoNuxt',
  description: 'Home page of the Pokemon Nuxt app',
  ogTitle: 'Home',
  ogDescription: 'Home page of the Pokemon Nuxt app',
  ogType: 'website',
  themeColor: '#000000',
  ogUrl: 'https://pokemonuxt.vercel.app/',
  twitterTitle: 'Home',
  twitterDescription: 'Home page of the Pokemon Nuxt app',

})
defineOgImageComponent('Nuxt', {
  headline: 'Nuxt Pokemon Web App',
  title: 'Pokemon Nuxt',
  description: 'List all Pokemon with Nuxt',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
