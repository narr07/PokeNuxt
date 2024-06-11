import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { page = 1, searchQuery = '', selectedType = '' } = getQuery(event)
  const limit = 30
  const offset = (Number(page) - 1) * limit

  try {
    const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getPokemons($offset: Int, $limit: Int, $searchQuery: String, $selectedType: String) {
            pokemon_v2_pokemon(offset: $offset, limit: $limit, where: {
              name: {_ilike: $searchQuery},
              pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_ilike: $selectedType}}}
            }) {
              id
              name
              base_experience
              pokemon_v2_pokemonsprites {
                sprites
              }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                  name
                }
              }
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
            }
            pokemon_v2_pokemon_aggregate {
              aggregate {
                count
              }
            }
          }
        `,
        variables: {
          offset,
          limit,
          searchQuery: `%${searchQuery}%`,
          selectedType: selectedType ? `%${selectedType}%` : '%%',
        },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      console.error(data.errors)
      throw new Error('Failed to fetch pokemons data')
    }

    const totalPokemons = data.data.pokemon_v2_pokemon_aggregate.aggregate.count
    const lastPage = Math.ceil(totalPokemons / limit)

    return {
      pokemons: data.data.pokemon_v2_pokemon,
      lastPage,
    }
  }
  catch (error) {
    console.error('Error fetching Pokémon data:', error)
    throw new Error('Failed to fetch Pokémon data')
  }
})
