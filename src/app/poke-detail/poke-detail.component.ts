import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { PokeAPIService } from '../services/pokeapi.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {
  pokeDetail: Pokemon[];

  constructor(private pokeApiService: PokeAPIService, private route: ActivatedRoute, private router: Router) {
    this.pokeDetail = new Array();
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const id = <number>data['id'];
      if (id !== null) {
        this.pokeApiService.getPokemonById(id)
          .subscribe((dataPokemon: Pokemon) => {
            this.pokeDetail.push(new Pokemon(dataPokemon));
            this.pokeApiService.getPokemonSpeciesById(id)
              .subscribe((dataSpecies: any) => {
                this.pokeApiService.getPokemonDetailByURL(dataSpecies.evolution_chain.url)
                  .subscribe((dataEvolution: any) => {
                    // Buscamos la primera evolución
                    if (dataEvolution.chain.evolves_to.length > 0) {
                      this.pokeApiService.getPokemonByName(dataEvolution.chain.evolves_to[0].species.name)
                        .subscribe((dataPokemonFirstEvolution: Pokemon) => {
                          const pokeIndex = this.pokeDetail.findIndex((el) => el.id == dataPokemonFirstEvolution.id);
                          if (pokeIndex === -1) {
                            this.pokeDetail.push(new Pokemon(dataPokemonFirstEvolution));
                          };
                          // Buscamos la segunda evolución
                          if (dataEvolution.chain.evolves_to[0].evolves_to.length > 0) {
                            this.pokeApiService.getPokemonByName(dataEvolution.chain.evolves_to[0].evolves_to[0].species.name)
                              .subscribe((dataPokemonSecondEvolution: Pokemon) => {
                                const pokeIndex = this.pokeDetail.findIndex((el) => el.id == dataPokemonSecondEvolution.id);
                                if (pokeIndex === -1) {
                                  this.pokeDetail.push(new Pokemon(dataPokemonSecondEvolution));
                                };
                              });
                          }
                        });
                    }
                  });
              });
          });
      }
    })
  }

  navigateToPokeList(): void {
    this.router.navigate(['/list']);
  }

}
