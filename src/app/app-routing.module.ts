import {NgModule} from "@angular/core";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";
import {RouterModule, Routes} from "@angular/router";
import {DisplayDefaultPokemonComponent} from "./display-default-pokemon/display-default-pokemon.component";

const routes: Routes = [

  {
    path: 'pokemon-details/:id', component: PokemonDetailsComponent
  },
  {
    path: '', component: DisplayDefaultPokemonComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
