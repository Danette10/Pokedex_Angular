import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../models/pokemon.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon!: Pokemon;
  isEditing = false;
  statsForm!: FormGroup;
  types!: string | undefined;

  private minStat = 10;
  private maxStat = 100;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  modifyClicked(): void {
    if (!this.isEditing) {
      let password = prompt("Entrer votre mot de passe", "");
      if (password === "pokemon") {
        this.isEditing = true;
      } else {
        alert("Mot de passe incorrect");
      }
    }
  }

  saveClicked(): void {
    if (this.statsForm.invalid) {
      alert("Veuillez remplir correctement les champs");
      return;
    }

    if (confirm("Voulez-vous vraiment modifier les statistiques ?")) {
      this.isEditing = !this.isEditing;
      this.pokemon.stats = this.statsForm.value;
    }
  }

  cancelClicked(): void {
    if (confirm("Voulez-vous vraiment annuler les modifications ?")) {
      this.isEditing = false;
      this.initForm(this.pokemon.stats);
    }
  }

  private fetchPokemon(): void {
    // @ts-ignore
    this.route.data.subscribe((data: { pokemon: Pokemon }) => {
      this.pokemon = data.pokemon;
      this.initForm(this.pokemon.stats);
      this.setTypes();
    });
  }

  private initForm(data: any): void {
    this.statsForm = new FormGroup({
      HP: new FormControl(data.HP, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
      attack: new FormControl(data.attack, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
      defense: new FormControl(data.defense, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
      special_attack: new FormControl(data.special_attack, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
      special_defense: new FormControl(data.special_defense, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
      speed: new FormControl(data.speed, [Validators.min(this.minStat), Validators.max(this.maxStat), Validators.required]),
    });
  }

  private setTypes(): void {
    const typeNames = this.pokemon.apiTypes.map(type => type.name);
    const lastTypeName = typeNames.pop();
    this.types = typeNames.length ? `${typeNames.join(', ')} et ${lastTypeName}` : lastTypeName;
  }
}
