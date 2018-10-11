import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';

import {ArmorVersion} from '../../common/interfaces/saint-seiya';
import {SaintSeiyaDataService} from '../../common/core/services/saint-seiya-data.service';

@Injectable()
export class SaintSeiyaService {

  readonly allVersions: Observable<ArmorVersion[]>;
  private searchTerm = new Subject<string>();

  constructor(
    private title: Title,
    private service: SaintSeiyaDataService
  ) {
    this.allVersions = this.service.allVersions.pipe(
      switchMap(armorVersion => this.searchTerm.pipe(
        map(term => this.filter(armorVersion, term)),
        startWith(armorVersion)
      ))
    );
  }

  setTitle() {
    //this.title.setTitle('Search for Armors');
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  private filter(pokemon: ArmorVersion[], value: string) {
    return pokemon.filter(p => value ? p.name.toLowerCase().includes(value.toLowerCase()) : pokemon);
  }
}
