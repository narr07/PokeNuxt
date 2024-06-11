<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'

interface Pokemon {
  id: number
  name: string
  pokemon_v2_pokemonsprites: {
    sprites: string
  }[]
}

const page = ref(1)
const lastPage = ref(1)
const pokemons = ref<Pokemon[]>([])
const pending = ref(false)
const error = ref<any>(null)

async function loadPokemons() {
  pending.value = true

  try {
    const response = await $fetch('/api/pokemons', {
      params: {
        page: page.value,
      },
    })

    appendPokemons(response.pokemons)
    lastPage.value = response.lastPage
  }
  catch (err) {
    error.value = err
  }
  finally {
    pending.value = false
  }
}

function appendPokemons(newPokemons: Pokemon[]) {
  newPokemons.forEach((pokemon) => {
    pokemons.value.push(pokemon)
  })
}

function loadMore() {
  if (page.value < lastPage.value) {
    page.value++
    loadPokemons()
  }
}

onMounted(() => {
  loadPokemons()
})
</script>

<template>
  <UContainer>
    <h1>Pokémon List</h1>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-2">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div v-if="pending">
      Loading...
    </div>
    <button v-if="!pending && page < lastPage" @click="loadMore">
      Load More
    </button>
  </UContainer>
</template>
