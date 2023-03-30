/*
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-display-default-pokemon',
  templateUrl: './display-default-pokemon.component.html',
  styleUrls: ['./display-default-pokemon.component.css']
})
export class DisplayDefaultPokemonComponent implements OnInit {
  tablePokemon: any[] = [];
  pokemon: { defaultPokemon: number, id: number, name: string, image: string} = {
    defaultPokemon: 30,
    id: 0,
    name: '',
    image: ''
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.getPokemon();

/!*    this.http
      .get<{ id: number, name: string, image: string }[]>(`https://pokebuildapi.fr/api/v1/pokemon/limit/${this.pokemon.defaultPokemon}`)
      .subscribe((data: { id: number, name: string, image: string }[]) => {
        this.tablePokemon = data.map(p => [p.id, p.name, p.image]);
      });*!/

  }

  getPokemon() {
    this.http
      .get<{ id: number, name: string, image: string }>(`https://pokebuildapi.fr/api/v1/pokemon/limit/${this.pokemon.defaultPokemon}`)
      .subscribe((data: { id: number, name: string, image: string }) => {
        this.pokemon.id = data.id;
        this.pokemon.name = data.name;
        this.pokemon.image = data.image;
        console.log(this.pokemon);
      });
  }



}
*/

import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-display-default-pokemon',
  templateUrl: './display-default-pokemon.component.html',
  styleUrls: ['./display-default-pokemon.component.css']
})
export class DisplayDefaultPokemonComponent implements OnInit {
  tablePokemon: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon() {
    this.pokemonService.getDefaultPokemonList().subscribe((data: Pokemon[]) => {
      this.tablePokemon = data;
      console.log(this.tablePokemon);
    });
  }
}
