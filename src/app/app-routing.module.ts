import {NgModule} from "@angular/core";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";
import {RouterModule, Routes} from "@angular/router";
import {DisplayDefaultPokemonComponent} from "./display-default-pokemon/display-default-pokemon.component";
import {PokemonResolverService} from "./services/pokemon-resolver.service";

const routes: Routes = [

  {
    path: 'pokemon-details/:id', component: PokemonDetailsComponent, resolve: { pokemon: PokemonResolverService }
  },
  {
    path: '', component: DisplayDefaultPokemonComponent
  },

  {
    path: '**', redirectTo: '/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PokemonResolverService]
})

export class AppRoutingModule {}
