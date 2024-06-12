<script setup lang="ts">
import { computed, ref } from 'vue'
import SvgoHp from '@/assets/icons/hp.svg'
import SvgoAttack from '@/assets/icons/attack.svg'
import SvgoDefense from '@/assets/icons/defend.svg'
import SvgoSpecialAttack from '@/assets/icons/special-attack.svg'
import SvgoSpecialDefense from '@/assets/icons/special-defend.svg'
import SvgoSpeed from '@/assets/icons/speed.svg'

import SvgoBug from '@/assets/icons/bug.svg'
import SvgoDark from '@/assets/icons/dark.svg'
import SvgoDragon from '@/assets/icons/dragon.svg'
import SvgoElectric from '@/assets/icons/electric.svg'
import SvgoFairy from '@/assets/icons/fairy.svg'
import SvgoFight from '@/assets/icons/fight.svg'
import SvgoFire from '@/assets/icons/fire.svg'
import SvgoFlying from '@/assets/icons/flying.svg'
import SvgoGhost from '@/assets/icons/ghost.svg'
import SvgoGrass from '@/assets/icons/grass.svg'
import SvgoGround from '@/assets/icons/ground.svg'
import SvgoIce from '@/assets/icons/ice.svg'
import SvgoNormal from '@/assets/icons/normal.svg'
import SvgoPoison from '@/assets/icons/poison.svg'
import SvgoPsychic from '@/assets/icons/psychic.svg'
import SvgoRock from '@/assets/icons/rock.svg'
import SvgoSteel from '@/assets/icons/steel.svg'
import SvgoWater from '@/assets/icons/water.svg'

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

const statIconMap: Record<string, any> = {
  'hp': SvgoHp,
  'attack': SvgoAttack,
  'defense': SvgoDefense,
  'special-attack': SvgoSpecialAttack,
  'special-defense': SvgoSpecialDefense,
  'speed': SvgoSpeed,
}
const typeIconMap: Record<string, any> = {
  bug: SvgoBug,
  dark: SvgoDark,
  dragon: SvgoDragon,
  electric: SvgoElectric,
  fairy: SvgoFairy,
  fighting: SvgoFight,
  fire: SvgoFire,
  flying: SvgoFlying,
  ghost: SvgoGhost,
  grass: SvgoGrass,
  ground: SvgoGround,
  ice: SvgoIce,
  normal: SvgoNormal,
  poison: SvgoPoison,
  psychic: SvgoPsychic,
  rock: SvgoRock,
  steel: SvgoSteel,
  water: SvgoWater,
}
const colorMap: Record<string, string> = {
  bug: 'green-500',
  dark: 'gray-800',
  dragon: 'indigo-400',
  electric: 'yellow-400',
  fairy: 'pink-400',
  fighting: 'red-700',
  fire: 'red-500',
  flying: 'sky-300',
  ghost: 'purple-700',
  grass: 'green-400',
  ground: 'yellow-800',
  ice: 'cyan-300',
  normal: 'gray-500',
  poison: 'purple-500',
  psychic: 'pink-500',
  rock: 'yellow-700',
  steel: 'gray-600',
  water: 'blue-500',
}

const isLoaded = ref(false)
</script>

<template>
  <UCard
    :ui="
      {
        base: 'hover:scale-[.98]   duration-150',
        ring: 'ring-1 hover:ring-primary-300 ring-gray-200 dark:ring-primary-900',
        rounded: 'rounded-lg ',
        shadow: 'shadow hover:shadow-lg',
        footer: {

          padding: 'py-4',
        },
        body: {
          padding: 'py-4',
          base: 'bgPage'
        },
      }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="font-bold uppercase text-center">
          {{ pokemon.name }}
        </h2>
        <div>
          <div class="flex space-x-2">
            <div v-for="type in pokemon.pokemon_v2_pokemontypes" :key="type.pokemon_v2_type.name">
              <UTooltip :popper="{ arrow: true }" :text="type.pokemon_v2_type.name">
                <div class="flex items-center p-1 aspect-square w-8 h-8 ring-1 ring-gray-300 dark:ring-gray-800 justify-center  rounded" :class="[`bg-${colorMap[type.pokemon_v2_type.name]}`]">
                  <component :is="typeIconMap[type.pokemon_v2_type.name]" v-if="isLoaded" class="text-2xl text-gray-950 inline-block" />
                  <USkeleton v-else class="w-6 h-6" />
                </div>
              </UTooltip>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="items-center relative flex justify-center">
      <div class="absolute p-1 rounded shadow  bg-white aspect-square right-0  -top-2">
        <div v-if="isLoaded" class="flex items-center justify-center text-sm space-x-1 dark:text-zinc-800">
          <div>
            {{ totalStats }}
          </div>
          <SvgoTotal class="text-xl " />
        </div>
        <USkeleton v-else class="w-20 h-6" />
      </div>
      <div class="flex absolute space-y-3 flex-col w-full justify-center">
        <div v-for="stat in pokemon.pokemon_v2_pokemonstats" :key="stat.pokemon_v2_stat.name">
          <UTooltip v-if="isLoaded" :popper="{ arrow: true }" :text="stat.pokemon_v2_stat.name">
            <UChip size="xl" :text="stat.base_stat">
              <UButton padded size="xs" color="gray" variant="solid" square>
                <component :is="statIconMap[stat.pokemon_v2_stat.name]" v-if="isLoaded" class="text-xl " />
                <USkeleton v-else class="w-6 h-6" />
              </UButton>
            </UChip>
          </UTooltip>
          <USkeleton v-else class="w-20 h-6" />
        </div>
      </div>
      <div class="pt-6 pl-10">
        <NuxtImg
          v-if="spriteUrl"
          v-show="isLoaded"
          :src="spriteUrl"
          :alt="pokemon.name"
          :title="pokemon.name"
          format="webp"
          height="500"
          sizes="100vw sm:100vw md:100vw lg:100px"
          width="500"
          :placeholder="[100, 60, 35, 5]"
          @load="isLoaded = true"
        />
        <div>
          <USkeleton v-show="!isLoaded" class="w-60 h-60" />
        </div>
      </div>
    </div>

    <template #footer>
      <div
        class="flex flex-wrap w-full justify-end space-x-2 "
      >
        <div
          v-for="ability in pokemon.pokemon_v2_pokemonabilities"
          :key="ability.pokemon_v2_ability.name"
        >
          <UBadge v-if="isLoaded">
            <span class="capitalize">
              {{ ability.pokemon_v2_ability.name }}
            </span>
          </UBadge>
          <USkeleton v-else class="w-20 h-6" />
        </div>
      </div>
    </template>
  </UCard>
</template>
