import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PokeAPIService } from './services/pokeapi.service';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokeListComponent,
    PokeDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokeAPIService], // Aquí hay que poner todos los servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
