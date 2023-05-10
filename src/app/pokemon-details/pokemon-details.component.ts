import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from "../models/pokemon.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon!: Pokemon;
  isConnected = false;
  isEditing = false;
  statsForm!: FormGroup;

  private minStat = 10;
  private maxStat = 100;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  private fetchPokemon(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.http.get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`))
    ).subscribe((data: any) => {
      this.pokemon = data;
      this.initForm(data.stats);
    });
  }

  modify(): void {
    if (!this.isAdmin()) {
      let password = prompt("Entrer votre mot de passe", "");
      if (password === "pokemon") {
        this.isConnected = true;
      } else {
        alert("Mot de passe incorrect");
        return;
      }
    }
    this.isEditing = true;
  }

  isAdmin(): boolean {
    return this.isConnected;
  }

  toggleEditMode(): void {
    if (!this.isAdmin()) return;

    if (this.isEditing && this.statsForm.invalid) {
      alert("Veuillez remplir correctement les champs");
      return;
    }

    if (confirm("Voulez-vous vraiment modifier les statistiques ?")) {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.pokemon.stats = this.statsForm.value;
      }
    }
  }

  cancelEditMode(): void {
    if (confirm("Voulez-vous vraiment annuler les modifications ?")) {
      this.isEditing = false;
      this.initForm(this.pokemon.stats);
    }
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
}
