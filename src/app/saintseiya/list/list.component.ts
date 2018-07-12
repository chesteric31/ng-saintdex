import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Pokemon } from './../../common/interfaces/pokemon';
import { SaintSeiyaService } from './saint-seiya.service';

@Component({
  selector: 'app-saintseiya-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SaintSeiyaService]
})
export class ListComponent implements OnInit {
  pokemon: Observable<Pokemon[]>;
  showGrid = true;

  constructor(
    private pokemonService: SaintSeiyaService) { }

  ngOnInit() {
    this.pokemonService.setTitle();
    this.pokemon = this.pokemonService.pokemon;
  }

  search(term: string) {
    this.pokemonService.search(term);
  }
}
