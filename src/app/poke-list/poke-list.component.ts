import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { PokeAPIService } from '../services/pokeapi.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
  pokeList: Pokemon[];
  searchIsEnabled: boolean;
  searchText: string;

  constructor(private pokeApiService: PokeAPIService, private router: Router) {
    this.pokeList = new Array();
    this.searchIsEnabled = false;
    this.searchText = "";
  }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.pokeApiService.getPokemonList()
      .subscribe((data) => {
        this.pokeList = [];
        for (let i = 0; i < data.results.length; i++) {
          this.pokeApiService.getPokemonByName(data.results[i].name)
            .subscribe((data: Pokemon) => {
              this.pokeList.push(new Pokemon(data));
            });
        };
        // this.sortPokemonList();
      });
  }

  sortPokemonList(): void {
    // this.pokeList.sort((a, b) => a.id - b.id);
    const numbers = [4, 2, 5, 1, 3];
    this.pokeList.sort(function(a, b) {
      return a.id - b.id;
    });
    console.log(this.pokeList);
  }

  searchPokemon(name: string): void {
    if (this.searchText.length !== 0)  {
      this.searchIsEnabled = true;
      this.pokeApiService.getPokemonByName(name)
      .subscribe((data) => {
        this.pokeList = [];
      if (data.length !== 0) {
        this.pokeList.push(new Pokemon(data));
      }
    });
  }
}

  checkSearch(): void {
    if (this.searchIsEnabled && this.searchText.length === 0) {
      this.loadPokemonList();
      this.searchIsEnabled = false;
    }
  }

  navigateToPokeDetail(pokemon: Pokemon): void {
    this.router.navigate(['/detail', pokemon.id]);
  }


}



