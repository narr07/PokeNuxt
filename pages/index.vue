<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

function clearSearchQuery() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="bgPage">
    <nav class="fixed top-2 mx-auto w-full z-50">
      <UContainer>
        <UCard
          :ui="{
            body: {
              base: ' duration-150',
              background: '',
              padding: 'px-2 py-2 sm:p-3',
            },
          }"
        >
          <div class="grid grid-cols-2 gap-4 ">
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
            <div>
              <USelectMenu v-model="selectedType" color="gray" :options="types" option-attribute="name">
                <template #label>
                  <span class="truncate">  {{ displaySelectedType }}</span>
                </template>

                <template #option="{ option: selectedType }">
                  <span class="truncate">{{ selectedType === '' ? 'All Types' : selectedType }}</span>
                </template>
              </USelectMenu>
            </div>
          </div>
        </UCard>
      </UContainer>
    </nav>
    <UContainer class="py-10">
      <div class="py-10">
        <h1>Pokémon List</h1>
      </div>
      <div class="mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
        <template v-if="pending">
          <div v-for="n in 6" :key="n" class="flex flex-col space-y-2">
            <div class="flex flex-col items-center">
              <USkeleton class="w-24 h-24 rounded-full" />
              <div class="mt-2 text-center">
                <USkeleton class="h-4 w-32" />
                <USkeleton class="h-4 w-20 mt-1" />
              </div>
            </div>
            <USkeleton class="h-4 w-full mt-2" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-full mt-2" />
            <div class="flex flex-col space-y-1">
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-full" />
            </div>
          </div>
        </template>
      </div>
      <div class="py-10 justify-center flex max-w-6xl mx-auto">
        <UButton v-if="!pending && page < lastPage" label="  Load More" @click="loadMore" />
      </div>
    </UContainer>
    <div class="fixed bottom-2 left-2 z-50">
      <ColorMode />
    </div>
  </div>
</template>
