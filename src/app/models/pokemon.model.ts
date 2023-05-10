import {Stat} from "./stat.model";

export interface Pokemon {
  id: number
  pokedexId: number
  name: string
  image: string
  sprite: string
  slug: string
  type: string
  apiGeneration: number
  resistanceModifyingAbilitiesForApi: any
  apiPreEvolution: any
  stats: Stat
}
