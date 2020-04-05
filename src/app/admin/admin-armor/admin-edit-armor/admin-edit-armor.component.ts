import { Component, OnInit } from '@angular/core';
import { Armor, Category } from '../../../common/interfaces/saint-seiya';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SaintSeiyaDataService } from '../../../common/core/services/saint-seiya-data.service';

@Component({
  selector: 'app-admin-edit-armor',
  templateUrl: './admin-edit-armor.component.html',
  styleUrls: ['./admin-edit-armor.component.css']
})
export class AdminEditArmorComponent implements OnInit {

  armor$: Observable<Armor>;
  allCategories: Observable<Category[]>;

  constructor(private router: Router,
              private service: SaintSeiyaDataService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initArmor();
    this.allCategories = this.service.allCategories;
  }

  private initArmor() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.armor$ = this.service.getArmor(+params.id);
      }
    })
  }

  goBack() {
    return this.router.navigate(['/admin']);
  }

}
