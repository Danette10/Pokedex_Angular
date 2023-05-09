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
    });
  }
}
