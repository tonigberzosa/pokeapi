import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() eventPokeDetail: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit(): void {
  }

  navigateToPokeDetail(pokemon: Pokemon): void {
    this.eventPokeDetail.emit(pokemon);
  }

}
