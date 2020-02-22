import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Armor, Category} from '../../interfaces/saint-seiya';
import {environment} from '../../../../environments/environment';

@Injectable()
export class SaintSeiyaDataService {

  allArmors: Observable<Armor[]>;
  allCategories: Observable<Category[]>;

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('scaleHeight', '185').set('scaleWidth', '185');
    const url = environment.apiUrl + 'v2/armors/';
    this.allArmors = this.http.get<Armor[]>(url, {params});
    this.allCategories = this.http.get<Category[]>(environment.apiUrl + 'v2/categories/');
  }

  addCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    let options = {headers: headers};
    delete category.id
    return this.http.post<Category>(environment.apiUrl + 'v2/categories/', category, options);
  }
}
