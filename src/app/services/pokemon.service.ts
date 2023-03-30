import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiBaseUrl = 'https://pokebuildapi.fr/api/v1';

  constructor(private http: HttpClient) {}

  getDefaultPokemonList(): Observable<Pokemon[]> {
    const defaultLimit = 30;
    const url = `${this.apiBaseUrl}/pokemon/limit/${defaultLimit}`;

    return this.http.get<any[]>(url).pipe(
      map((data) =>
        data.map((item: any) => {
          const pokemon = new Pokemon(item.id, item.name, item.image, defaultLimit);
          pokemon.id = item.id;
          pokemon.name = item.name;
          pokemon.image = item.image;
          pokemon.defaultPokemon = defaultLimit;
          return pokemon;
        })
      )
    );
  }
}
