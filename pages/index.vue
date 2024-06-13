<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFetch } from 'nuxt/app'
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
const searchQuery = ref('')
const selectedType = ref('')
const isLoading = ref(false) // Tambahkan properti isLoading

const types = [
  '',
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
]

const displaySelectedType = computed(() => {
  return selectedType.value === '' ? 'All Types' : selectedType.value
})

async function loadPokemons(reset = false) {
  isLoading.value = true // Set isLoading to true when loading starts
  if (reset) {
    pokemons.value = []
    page.value = 1
  }

  const { data, error } = await useFetch('/api/pokemons', {
    params: {
      page: page.value,
      searchQuery: searchQuery.value,
      selectedType: selectedType.value,
    },
  })

  if (error.value) {
    console.error(error.value)
    isLoading.value = false // Set isLoading to false if there is an error
    return
  }

  appendPokemons(data.value.pokemons)
  lastPage.value = data.value.lastPage
  isLoading.value = false // Set isLoading to false when loading is complete
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

// Load initial data
loadPokemons()

function clearSearchQuery() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="bgCard">
    <nav class="fixed top-0 mx-auto w-full z-50">
      <UCard
        :ui="{
          body: {
            base: ' max-w-6xl mx-auto',
            background: '',
            padding: 'px-2 py-2 sm:p-3',
          },
          rounded: 'rounded-none',
        }"
      >
        <div class="flex justify-between items-center   ">
          <div>
            <UButtonGroup size="sm" orientation="horizontal">
              <UInput
                v-model="searchQuery" type="text"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="gray"
              />
              <UButton
                icon="i-heroicons-x-mark-16-solid" color="gray"
                @click="clearSearchQuery"
              />
            </UButtonGroup>
          </div>
          <div class="flex items-center pl-2 space-x-2">
            <USelectMenu v-model="selectedType" color="gray" :options="types" option-attribute="name">
              <template #label>
                <span class="truncate">  {{ displaySelectedType }}</span>
              </template>

              <template #option="{ option: selectedType }">
                <span class="truncate">{{ selectedType === '' ? 'All Types' : selectedType }}</span>
              </template>
            </USelectMenu> <ColorMode />
          </div>
        </div>
      </UCard>
    </nav>
    <UContainer class="py-10">
      <div class="py-10 w-full">
        <h1 class="text-3xl font-black text-center">
          Pokémon List  ({{ pokemons.length }}) all generations
        </h1>
      </div>
      <div class="mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="200"
          :pokemon="pokemon"
        />
      </div>
      <div class="py-10 justify-center flex max-w-6xl mx-auto">
        <UButton
          v-if="page < lastPage"
          :loading="isLoading"
          @click="loadMore"
        >
          Load More
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
