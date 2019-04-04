import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../login/login.component';

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

  user(): Observable<Login> {
    const url = environment.apiUrl + 'login/user/';
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    let options = {headers: headers};
    return this.http.post<Login>(url, {}, options);
  }
}
