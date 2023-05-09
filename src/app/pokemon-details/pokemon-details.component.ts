import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Pokemon} from "../models/pokemon.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Stat} from "../models/stat.model";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  name!: string;
  image!: string;
  type!: string;
  minStat = 10;
  maxStat = 100;

  // @ts-ignore
  pokemon: Pokemon;
  isConnected = false;
  isEditing = false;
  stats!: Stat;
  originalStats!: Stat;

  statsForm!: FormGroup;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.http.get(`https://pokebuildapi.fr/api/v1/pokemon/${id}`))
    ).subscribe((data: any) => {
      this.pokemon = data;
      this.name = data.name;
      this.image = data.image;
      this.type = data.apiTypes[0].name;
      this.stats = data.stats;
      this.initForm(this.stats);
    });
  }


  modify() {
    if(!this.isConnected) {
      let password = prompt("Entrer votre mot de passe", "");
      if (password != null && password != "") {
        if (password == "pokemon") {
          this.isEditing = true;
          this.isConnected = true;
          this.modifyStats(this.stats);
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

  storeOriginalStats() {
    this.originalStats = JSON.parse(JSON.stringify(this.stats));
  }

  modifyStats(data: Stat): void {
    this.stats = data;
    this.storeOriginalStats();
  }
  toggleEditMode() {
    if (this.isAdmin()) {
      if (this.isEditing) {
        if (this.statsForm.invalid) {
          alert("Veuillez remplir correctement les champs");
          return;
        }else{
          if(confirm("Voulez-vous vraiment modifier les statistiques ?")) {
            this.isEditing = !this.isEditing;
            this.modifyStats(this.stats);
            this.stats = this.statsForm.value;
          }else{
            return;
          }
        }
      }
    }
  }
  cancelEditMode(): boolean {
    if(confirm("Voulez-vous vraiment annuler les modifications ?")) {
      this.isEditing = false;
      this.modifyStats(this.originalStats);
      return true;
    }else{
        return false;
    }
  }
  private initForm(data: Stat): void {
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

