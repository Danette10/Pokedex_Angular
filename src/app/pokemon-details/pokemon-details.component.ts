import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Pokemon} from "../models/pokemon.model";

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

  // @ts-ignore
  pokemon: Pokemon;

  isConnected = false;

  isEditing = false;

  constructor(private http: HttpClient) {

    this.pokemonId = parseInt(window.location.href.split('/pokemon-details/')[1]);

    this.http.get('https://pokebuildapi.fr/api/v1/pokemon/' + this.pokemonId).subscribe((data: any) => {
      this.pokemon = data;
      this.name = data.name;
      this.image = data.image;
      this.type = data.apiTypes[0].name;
      for (let key in data.stats) {
        this.stats.push({ key: key, value: data.stats[key] });
      }

    });
  }

  modify() {

    if(!this.isConnected) {

      let password = prompt("Entrer votre mot de passe", "");

      if (password != null && password != "") {

        if (password == "pokemon") {

          this.isEditing = true;

          this.isConnected = true;

          document.getElementById("header")!.innerHTML = "Welcome pokemon administator";

        } else {

          alert("Mot de passe incorrect");

        }

      }

    }else{

        this.isEditing = true;

    }

  }

  isAdmin(): boolean {

    return this.isConnected;

  }

  toggleEditMode() {

    if (this.isAdmin()) {

      this.isEditing = !this.isEditing;

      if (this.isEditing) {

        this.storeOriginalStats();

      }

    }

  }

  originalStats = [];

  storeOriginalStats() {

    this.originalStats = JSON.parse(JSON.stringify(this.stats));

  }

  cancelEditMode(): boolean {

    if(confirm("Voulez-vous vraiment annuler les modifications ?")) {

      this.stats = JSON.parse(JSON.stringify(this.originalStats));

      this.isEditing = false;

      return true;

    }else{

        return false;

    }

  }

}

