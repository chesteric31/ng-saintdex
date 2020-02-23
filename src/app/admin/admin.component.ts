import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SaintSeiyaService} from "../saintseiya/list/saint-seiya.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../common/interfaces/saint-seiya";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private _categories$ = new BehaviorSubject<Category[]>([]);
  category: Category;

  constructor(private title: Title,
              private service: SaintSeiyaService) {
  }

  ngOnInit() {
    this.title.setTitle('Administer NG-Saintdex');
    this.loadInitialCategories();
    this.category = {id: 0, name: ""};
  }

  private loadInitialCategories() {
    this.service.allCategories
      .subscribe(
        (allCategories: Category[]) => {
          this._categories$.next(allCategories);
        }
      );
  }

  addCategory() {
    this.service.addCategory(this.category).subscribe((newCategory: Category) => {
      this._categories$.value.push(newCategory);
      this._categories$.next(this._categories$.value);
      this.initNewCategory();
    });
  }

  private initNewCategory() {
    this.category = {id: 0, name: ""};
  }

  get categories(): Observable<Category[]> {
    return this._categories$.asObservable();
  }

  deleteCategory(id: number) {
    this.service.deleteCategory(id).subscribe((result) => {
      let categories: Category[] = this._categories$.getValue();
      let index = categories.findIndex((category) => category.id === id);
      categories.splice(index, 1);
      this._categories$.next(categories);
    });
  }
}
