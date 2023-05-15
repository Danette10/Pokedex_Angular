import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import {Pokemon} from "../models/pokemon.model";

export const pokemonFeatureKey = 'pokemon';

export interface State {
  pokemons: Pokemon[];
  error: any;
}

export const initialState: State = {
  pokemons: [],
  error: null
};




export const reducer = createReducer(
  initialState,

  on(PokemonActions.loadPokemonsSuccess, (state, action) => {
    return {
      ...state,
      pokemons: action.pokemons
    };
  }),

  on(PokemonActions.loadPokemonsFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  on(PokemonActions.loadPokemonByIdSuccess, (state, action) => {
    return { ...state, pokemons: [...state.pokemons, action.pokemon] };
  }),

  on(PokemonActions.loadPokemonByIdFailure, (state, action) => {
    return { ...state, error: action.error };
  })

);
