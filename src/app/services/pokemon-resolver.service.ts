import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PokemonService } from "./pokemon.service";
import {Pokemon} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonResolverService implements Resolve<Pokemon> {

  constructor(
    private pokemonService: PokemonService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pokemon> {
    const id = route.paramMap.get('id');
    // @ts-ignore
    return this.pokemonService.getPokemonById(+id);
  }
}
