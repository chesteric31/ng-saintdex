import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Armor } from '../../common/interfaces/saint-seiya';
import { SaintSeiyaService } from '../../saintseiya/list/saint-seiya.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-armor',
  templateUrl: './admin-armor.component.html',
  styleUrls: ['./admin-armor.component.css']
})
export class AdminArmorComponent implements OnInit {
  private _armors$ = new BehaviorSubject<Armor[]>([]);

  constructor(private service: SaintSeiyaService,
              private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.loadInitialArmors();
      }
    });
    this.loadInitialArmors();
  }

  private loadInitialArmors() {
    this.service.allArmors.subscribe((allArmors: Armor[]) => {
      this._armors$.next(allArmors);
    });
  }

  get armors(): Observable<Armor[]> {
    return this._armors$.asObservable();
  }

  deleteArmor(id: number) {
    this.service.deleteArmor(id).subscribe(result => {
      let armors: Armor[] = this._armors$.getValue();
      let index = armors.findIndex(armor => armor.id === id);
      armors.splice(index, 1);
      this._armors$.next(armors);
    });
  }
}
