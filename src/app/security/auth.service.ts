import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Login} from '../login/login.component';
import {empty} from 'rxjs/internal/Observer';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthenticated() {
    const item = sessionStorage.getItem('token');
    return item != null && item != '';
  }

  hasRole(role: string) {
    if (this.isAuthenticated()) {
      const item = sessionStorage.getItem('token');
      const credentials = atob(item).split(':');
      if (credentials && credentials.length > 0) {
        const roles = credentials[2].split(',');
        return roles.indexOf(role) > -1;
      }
    }
    return false;
  }

  login(login: Login): Observable<Login> {
    const url = environment.apiUrl + 'login/';
    return this.http.post<Login>(url, {username: login.username, password: login.password});
  }

  user() {
    if (this.isAuthenticated()) {
    const url = environment.apiUrl + 'login/user/';
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    let options = { headers: headers };
    console.log('ee', options);
    return this.http.post<Login>(url, {}, options);
    } else {
      return of(empty);
    }
  }
}
