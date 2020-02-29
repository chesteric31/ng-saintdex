import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Armor, Category} from "../../common/interfaces/saint-seiya";
import {SaintSeiyaService} from "../../saintseiya/list/saint-seiya.service";

@Component({
  selector: 'app-admin-armor',
  templateUrl: './admin-armor.component.html',
  styleUrls: ['./admin-armor.component.css']
})
export class AdminArmorComponent implements OnInit {

  private _armors$ = new BehaviorSubject<Armor[]>([]);
  armor: Armor;
  @Input() categories: Category[];

  constructor(private service: SaintSeiyaService) { }

  ngOnInit(): void {
    this.loadInitialArmors();
    this.initNewArmor();
  }

  private loadInitialArmors() {
    this.service.allArmors
      .subscribe(
        (allArmors: Armor[]) => {
          this._armors$.next(allArmors);
        }
      );
  }

  addArmor() {
    this.service.addArmor(this.armor).subscribe((newArmor: Armor) => {
      this._armors$.value.push(newArmor);
      this._armors$.next(this._armors$.value);
      this.initNewArmor();
    });
  }

  private initNewArmor() {
    this.armor = {id: 0, name: "", category: null, strengths: [], versions: []};
  }

  get armors(): Observable<Armor[]> {
    return this._armors$.asObservable();
  }

  deleteArmor(id: number) {
    this.service.deleteArmor(id).subscribe((result) => {
      let armors: Armor[] = this._armors$.getValue();
      let index = armors.findIndex((armor) => armor.id === id);
      armors.splice(index, 1);
      this._armors$.next(armors);
    });
  }
}
