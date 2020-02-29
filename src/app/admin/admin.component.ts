import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Category} from "../common/interfaces/saint-seiya";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categories: Category[];

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Administer NG-Saintdex');
  }

  onCategoriesChanged(categories: Category[]) {
    this.categories = categories;
  }
}
