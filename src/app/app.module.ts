import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DisplayDefaultPokemonComponent } from './display-default-pokemon/display-default-pokemon.component';
import {HttpClientModule} from "@angular/common/http";
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import {AppRoutingModule} from "./app-routing.module";
import { PokemonTileComponent } from './display-default-pokemon/components/pokemon-tile/pokemon-tile.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    DisplayDefaultPokemonComponent,
    PokemonDetailsComponent,
    PokemonTileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
