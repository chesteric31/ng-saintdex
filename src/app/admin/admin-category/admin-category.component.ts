import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../common/interfaces/saint-seiya';
import { SaintSeiyaService } from '../../saintseiya/list/saint-seiya.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  private _categories$ = new BehaviorSubject<Category[]>([]);
  @Output() categoriesChange = new EventEmitter();
  currentCategory: Category;
  other = {id: 0, name: ''};

  constructor(private service: SaintSeiyaService) {
  }

  ngOnInit() {
    this.loadInitialCategories();
    this.initNewCategory();
  }

  private loadInitialCategories() {
    this.service.allCategories.subscribe((allCategories: Category[]) => {
      this._categories$.next(allCategories);
      this.categoriesChange.emit(allCategories);
    });
  }

  addCategory() {
    this.service.addCategory(this.currentCategory).subscribe((newCategory: Category) => {
      this._categories$.value.push(newCategory);
      this._categories$.next(this._categories$.value);
      this.categoriesChange.emit(this._categories$.value);
      this.initNewCategory();
    });
  }

  private initNewCategory() {
    this.currentCategory = { id: 0, name: '' };
  }

  get categories(): Observable<Category[]> {
    return this._categories$.asObservable();
  }

  deleteCategory(id: number) {
    this.service.deleteCategory(id).subscribe(result => {
      let categories: Category[] = this._categories$.getValue();
      let index = categories.findIndex(category => category.id === id);
      categories.splice(index, 1);
      this._categories$.next(categories);
      this.categoriesChange.emit(categories);
    });
  }

  async editCategory(id: number) {
    const x = await this.service.getCategory(id).toPromise();
    this.other = {id: x.id, name: x.name};
  }

  changeCategory($event: any) {
    console.log('b', $event)
  }

}
