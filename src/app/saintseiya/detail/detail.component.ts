import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';

import { Pokemon } from './../../common/interfaces/pokemon';
import { PokemonDataService } from './../../common/core/services/pokemon-data.service';

@Component({
  selector: 'app-saintseiya-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  pokemon: Observable<Pokemon>;

  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemon = this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        mergeMap(params => this.pokemonDataService.pokemon.pipe(map(pokemon => pokemon.find(p => p.id === +params.id)))),
        tap(pokemon => this.title.setTitle(`Pokémon #${pokemon.id} ${pokemon.name}`))
      );
  }

  ngOnDestroy() {
    this.title.setTitle('Search for Armors');
  }

  next() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId === 1 ? 151 : paramId - 1;
    this.router.navigateByUrl(`/saintseiya/${id}`);
  }

  previous() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId < 151 ? paramId + 1 : 1;
    this.router.navigateByUrl(`/saintseiya/${id}`);
  }

  close() {
    this.router.navigateByUrl('/saintseiya');
  }
}
