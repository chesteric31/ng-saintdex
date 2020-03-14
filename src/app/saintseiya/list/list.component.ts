import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Armor } from '../../common/interfaces/saint-seiya';
import { SaintSeiyaService } from './saint-seiya.service';

@Component({
  selector: 'app-saintseiya-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [SaintSeiyaService]
})
export class ListComponent implements OnInit {
  armors: Observable<Armor[]>;
  showGrid = true;

  constructor(private service: SaintSeiyaService) {}

  ngOnInit() {
    this.service.setTitle();
    this.armors = this.service.allArmors;
  }

  search(term: string) {
    this.service.search(term);
  }
}
