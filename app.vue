<script setup lang="ts">
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
