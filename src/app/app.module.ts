import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayDefaultPokemonComponent } from './display-default-pokemon/display-default-pokemon.component';
import {HttpClientModule} from "@angular/common/http";
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    DisplayDefaultPokemonComponent,
    PokemonDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
