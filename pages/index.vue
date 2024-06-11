<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'

interface PokemonType {
  pokemon_v2_type: {
    name: string
  }
}

interface Pokemon {
  id: number
  name: string
  pokemon_v2_pokemonsprites: {
    sprites: string
  }[]
  pokemon_v2_pokemontypes: PokemonType[]
}

const page = ref(1)
const lastPage = ref(1)
const pokemons = ref<Pokemon[]>([])
const pending = ref(false)
const error = ref<any>(null)
const searchQuery = ref('')
const selectedType = ref('')

async function loadPokemons(reset = false) {
  pending.value = true
  if (reset) {
    pokemons.value = []
    page.value = 1
  }

  try {
    const response = await $fetch('/api/pokemons', {
      params: {
        page: page.value,
        searchQuery: searchQuery.value,
        selectedType: selectedType.value,
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

watch([searchQuery, selectedType], () => {
  loadPokemons(true)
})

onMounted(() => {
  loadPokemons()
})
</script>

<template>
  <UContainer>
    <h1>Pokémon List</h1>
    <div class="mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search Pokémon" class="border p-2 mb-2">
      <select v-model="selectedType" class="border p-2">
        <option value="">
          All Types
        </option>
        <option value="Normal">
          Normal
        </option>
        <option value="Fire">
          Fire
        </option>
        <option value="Water">
          Water
        </option>
        <option value="Electric">
          Electric
        </option>
        <option value="Grass">
          Grass
        </option>
        <option value="Ice">
          Ice
        </option>
        <option value="Fighting">
          Fighting
        </option>
        <option value="Poison">
          Poison
        </option>
        <option value="Ground">
          Ground
        </option>
        <option value="Flying">
          Flying
        </option>
        <option value="Psychic">
          Psychic
        </option>
        <option value="Bug">
          Bug
        </option>
        <option value="Rock">
          Rock
        </option>
        <option value="Ghost">
          Ghost
        </option>
        <option value="Dragon">
          Dragon
        </option>
        <option value="Dark">
          Dark
        </option>
        <option value="Steel">
          Steel
        </option>
        <option value="Fairy">
          Fairy
        </option>
      </select>
    </div>
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
