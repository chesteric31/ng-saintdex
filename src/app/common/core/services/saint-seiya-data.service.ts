import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Armor} from '../../interfaces/saint-seiya';
import {environment} from '../../../../environments/environment';

@Injectable()
export class SaintSeiyaDataService {

  allArmors: Observable<Armor[]>;

  constructor(private http: HttpClient) {
    const params = new HttpParams().set('scaleHeight', '185').set('scaleWidth', '185');
    console.log('env', environment);

    const url = environment.apiUrl;//'https://ksams.herokuapp.com/api/v2/armors/';
    //const devUrl ='http://localhost:8081/api/v2/armors/';
    this.allArmors = this.http.get<Armor[]>(url, {params});
  }

}
