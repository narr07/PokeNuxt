<script setup lang="ts">
useHead({
  titleTemplate: '%s %separator %siteName',
})
useSeoMeta({
  title: 'Home',
  description: 'Home page of the Pokemon Nuxt app',

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
