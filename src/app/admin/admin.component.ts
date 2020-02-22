import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SaintSeiyaService} from "../saintseiya/list/saint-seiya.service";
import {Observable} from "rxjs";
import {Category} from "../common/interfaces/saint-seiya";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categories: Observable<Category[]>;

  category: Category;

  constructor(private title: Title,
              private service: SaintSeiyaService) { }

  ngOnInit() {
    this.title.setTitle('Administer NG-Saintdex');
    this.categories = this.service.allCategories;
    this.category = {id: 0, name: ""};
  }

  async addCategory() {
    await this.service.addCategory(this.category).toPromise();
  }
}
