import { createAction, props } from '@ngrx/store';
import {Pokemon} from "../models/pokemon.model";

export const loadPokemons = createAction('[Pokemon] Load Pokemons');

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: any }>()
);

export const loadPokemonById = createAction(
  '[Pokemon] Load Pokemon By Id',
  props<{ pokemonId: number }>()
);

export const loadPokemonByIdSuccess = createAction(
  '[Pokemon] Load Pokemon By Id Success',
  props<{ pokemon: Pokemon }>()
);

export const loadPokemonByIdFailure = createAction(
  '[Pokemon] Load Pokemon By Id Failure',
  props<{ error: any }>()
);

