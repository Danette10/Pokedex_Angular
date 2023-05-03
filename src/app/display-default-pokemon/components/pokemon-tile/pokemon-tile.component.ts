import {Component, Input} from '@angular/core';
import {Pokemon} from "../../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-tile',
  templateUrl: './pokemon-tile.component.html',
  styleUrls: ['./pokemon-tile.component.css']
})
export class PokemonTileComponent {

    // @ts-ignore
  @Input('pokemon') pokemon: Pokemon;

  constructor() { }

}
