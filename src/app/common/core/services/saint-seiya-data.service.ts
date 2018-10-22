import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Armor} from '../../interfaces/saint-seiya';

@Injectable()
export class SaintSeiyaDataService {

  allArmors: Observable<Armor[]>;

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('scaleHeight', '185').set('scaleWidth', '185');

    const url = 'https://ksams.herokuapp.com/api/v2/armors/';
    this.allArmors = this.http.get<Armor[]>(url, {params});
  }

}
