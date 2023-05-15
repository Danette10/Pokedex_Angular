import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './pokemon.reducer';

// Feature selector
export const selectPokemonState = createFeatureSelector<State>('pokemon');

// Selector for the first 30 Pokemons
export const selectFirst30Pokemons = createSelector(
  selectPokemonState,
  (state: State) => state.pokemons.slice(0, 30)
);

// Selector for a Pokemon by ID
export const selectPokemonById = createSelector(
  selectPokemonState,
  (state: State, props: { id: number }) => state.pokemons.find(pokemon => pokemon.id === props.id)
);
