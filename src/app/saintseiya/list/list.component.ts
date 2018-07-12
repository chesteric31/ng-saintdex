import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Pokemon } from './../../common/interfaces/pokemon';
import { SaintseiyaService } from './saintseiya.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SaintseiyaService]
})
export class ListComponent implements OnInit {
  pokemon: Observable<Pokemon[]>;
  showGrid = true;

  constructor(
    private pokemonService: SaintseiyaService) { }

  ngOnInit() {
    this.pokemonService.setTitle();
    this.pokemon = this.pokemonService.pokemon;
  }

  search(term: string) {
    this.pokemonService.search(term);
  }
}
