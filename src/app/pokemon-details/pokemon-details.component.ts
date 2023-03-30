import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent {
  name!: string;
  image!: string;
  type!: string;
  pokemonId!: number;
  stats: any[] = [];

  constructor(private http: HttpClient) {

    this.pokemonId = parseInt(window.location.href.split('/pokemon-details/')[1]);

    this.http.get('https://pokebuildapi.fr/api/v1/pokemon/' + this.pokemonId).subscribe((data: any) => {
      this.name = data.name;
      this.image = data.image;
      this.type = data.apiTypes[0].name;
      for (let key in data.stats) {
        this.stats.push({ key: key, value: data.stats[key] });
      }

    });
  }

}

