import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Observable, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';

import {Armor, ArmorVersion} from '../../common/interfaces/saint-seiya';
import {SaintSeiyaDataService} from '../../common/core/services/saint-seiya-data.service';

@Injectable()
export class SaintSeiyaService {

  readonly allArmors: Observable<Armor[]>;
  private searchTerm = new Subject<string>();

  constructor(
    private title: Title,
    private service: SaintSeiyaDataService
  ) {
    this.allArmors = this.service.allArmors.pipe(
      switchMap(armor => this.searchTerm.pipe(
        map(term => this.filter(armor, term)),
        startWith(armor)
      ))
    );
  }

  setTitle() {
    // this.title.setTitle('Search for Armors');
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  private filter(armors: Armor[], value: string) {
    return armors.filter(p => value ? p.name.toLowerCase().includes(value.toLowerCase()) : armors);
  }
}
