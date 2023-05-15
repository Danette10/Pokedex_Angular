import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadPokemons, loadPokemonById} from "./state/pokemon.actions";
import {selectFirst30Pokemons, selectPokemonById} from "./state/pokemon.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(loadPokemons());
    const pokemonId = window.location.pathname.split('/').pop();
    if (pokemonId) {
      this.store.dispatch(loadPokemonById({pokemonId: Number(pokemonId)}));
      this.store.select(selectPokemonById, {id: Number(pokemonId)}).subscribe((pokemon: any) => {
        console.log("Select pokemon by ID :", pokemon);
      });

      this.store.select(selectFirst30Pokemons).subscribe(pokemons => {
        console.log("Select first 30 pokemons :", pokemons);
      });
    }
  }
}
