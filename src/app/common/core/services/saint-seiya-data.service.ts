import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import {ArmorVersion} from '../../interfaces/saint-seiya';

@Injectable()
export class SaintSeiyaDataService {

  allVersions: Observable<ArmorVersion[]>;
  constructor(private http: HttpClient) {
    let params = new HttpParams().set("scaleHeight", "150").set("scaleWidth", "150");
    this.allVersions = this.http.get<ArmorVersion[]>('http://localhost:8081/api/v2/versions/', {params});
  }

}
