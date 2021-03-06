import { Component, OnInit } from '@angular/core';
import { Armor, Category } from '../../../common/interfaces/saint-seiya';
import { Router } from '@angular/router';
import { SaintSeiyaDataService } from '../../../common/core/services/saint-seiya-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-add-armor',
  templateUrl: './admin-add-armor.component.html',
  styleUrls: ['./admin-add-armor.component.css']
})
export class AdminAddArmorComponent implements OnInit {
  armor: Armor;
  allCategories: Observable<Category[]>;

  constructor(private router: Router,
              private service: SaintSeiyaDataService) {}

  ngOnInit(): void {
    this.initNewArmor();
    this.allCategories = this.service.allCategories;
  }

  private initNewArmor() {
    this.armor = { id: 0, name: '', category: null, strengths: [], versions: [] };
  }

  close() {
    this.router.navigate(['/admin']);
  }

  addArmor() {
    this.service.addArmor(this.armor).subscribe((newArmor: Armor) => {
      this.close();
    });
  }
}
