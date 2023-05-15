import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PokemonActions from './pokemon.actions';
import {PokemonService} from "../services/pokemon.service";
import {of} from "rxjs";

@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      mergeMap(() => this.pokemonService.getDefaultPokemonList()
        .pipe(
          map(pokemons => PokemonActions.loadPokemonsSuccess({ pokemons })),
          catchError(error => of(PokemonActions.loadPokemonsFailure({ error })))
        )
      )
    );
  });

  loadPokemonById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemonById),
      mergeMap(action => this.pokemonService.getPokemonById(action.pokemonId)
        .pipe(
          map(pokemon => PokemonActions.loadPokemonByIdSuccess({ pokemon })),
          catchError(error => of(PokemonActions.loadPokemonByIdFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
