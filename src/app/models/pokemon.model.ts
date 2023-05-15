import {Stats} from "./stat.model";

export interface Pokemon {
  id: number
  pokedexId: number
  name: string
  image: string
  sprite: string
  slug: string
  stats: Stats
  apiTypes: ApiType[]
  apiGeneration: number
  apiResistances: ApiResistance[]
  resistanceModifyingAbilitiesForApi: any[]
  apiEvolutions: ApiEvolution[]
  apiPreEvolution: string
  apiResistancesWithAbilities: any[]
}

export interface ApiType {
  name: string
  image: string
}

export interface ApiResistance {
  name: string
  damage_multiplier: number
  damage_relation: string
}

export interface ApiEvolution {
  name: string
  pokedexId: number
}

