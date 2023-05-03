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
    return this.http.get<Pokemon[]>(`${this.apiBaseUrl}/pokemon/limit/30`)
  }
}
