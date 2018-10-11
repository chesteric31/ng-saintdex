import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArmorVersion } from '../../common/interfaces/saint-seiya';
import { SaintSeiyaService } from './saint-seiya.service';

@Component({
  selector: 'app-saintseiya-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SaintSeiyaService]
})
export class ListComponent implements OnInit {

  armorVersions: Observable<ArmorVersion[]>;
  showGrid = true;

  constructor(
    private service: SaintSeiyaService) { }

  ngOnInit() {
    this.service.setTitle();
    this.armorVersions = this.service.allVersions;
  }

  search(term: string) {
    this.service.search(term);
  }
}
