import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Armor, Category } from '../../interfaces/saint-seiya';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SaintSeiyaDataService {
  allArmors: Observable<Armor[]>;
  allCategories: Observable<Category[]>;

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('scaleHeight', '185').set('scaleWidth', '185');
    const url = environment.apiUrl + 'v2/armors/';
    this.allArmors = this.http.get<Armor[]>(url, { params });
    this.allCategories = this.http.get<Category[]>(environment.apiUrl + 'v2/categories/');
  }

  addCategory(category: Category): Observable<Category> {
    let options = this.buildOptions();
    delete category.id;
    return this.http.post<Category>(environment.apiUrl + 'v2/categories/', category, options);
  }

  deleteCategory(id: number) {
    let options = this.buildOptions();
    return this.http.delete<Category>(environment.apiUrl + 'v2/categories/' + id, options);
  }

  private buildOptions() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });

    let options = { headers: headers };
    return options;
  }

  addArmor(armor: Armor) {
    let options = this.buildOptions();
    delete armor.id;
    return this.http.post<Armor>(environment.apiUrl + 'v2/armors/', armor, options);
  }

  deleteArmor(id: number) {
    let options = this.buildOptions();
    return this.http.delete<Armor>(environment.apiUrl + 'v2/armors/' + id, options);
  }
}
