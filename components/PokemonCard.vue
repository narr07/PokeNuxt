<script setup lang="ts">
import { computed } from 'vue'

interface PokemonType {
  pokemon_v2_type: {
    name: string
  }
}

interface PokemonAbility {
  pokemon_v2_ability: {
    name: string
  }
}

interface PokemonStat {
  base_stat: number
  pokemon_v2_stat: {
    name: string
  }
}

interface Pokemon {
  id: number
  name: string
  base_experience: number
  pokemon_v2_pokemonsprites: {
    sprites: {
      other: {
        'official-artwork': {
          front_default: string
        }
      }
    }
  }[]
  pokemon_v2_pokemontypes: PokemonType[]
  pokemon_v2_pokemonabilities: PokemonAbility[]
  pokemon_v2_pokemonstats: PokemonStat[]
}

const props = defineProps<{
  pokemon: Pokemon
}>()

const spriteUrl = computed(() => {
  if (props.pokemon.pokemon_v2_pokemonsprites.length > 0) {
    const spriteData = props.pokemon.pokemon_v2_pokemonsprites[0].sprites
    // Menggunakan gambar dari official artwork
    return spriteData.other['official-artwork'].front_default
  }
  return ''
})

const totalStats = computed(() => {
  return props.pokemon.pokemon_v2_pokemonstats.reduce((sum, stat) => sum + stat.base_stat, 0)
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex flex-col">
        <h2 class="font-bold capitalize text-center">
          {{ pokemon.name }}
        </h2>
        <div>
          <p>{{ pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type.name).join(', ') }}</p>
        </div>
      </div>
    </template>
    <NuxtImg v-if="spriteUrl" :src="spriteUrl" :alt="pokemon.name" />
    <p v-else>
      No Image Available
    </p>

    <p>Base Experience: {{ pokemon.base_experience }}</p>

    <p>Abilities: {{ pokemon.pokemon_v2_pokemonabilities.map(ability => ability.pokemon_v2_ability.name).join(', ') }}</p>
    <p>Stats:</p>
    <ul>
      <li v-for="stat in pokemon.pokemon_v2_pokemonstats" :key="stat.pokemon_v2_stat.name">
        {{ stat.pokemon_v2_stat.name }}: {{ stat.base_stat }}
      </li>
    </ul>
    <p>Total Stats: {{ totalStats }}</p>
  </UCard>
</template>
