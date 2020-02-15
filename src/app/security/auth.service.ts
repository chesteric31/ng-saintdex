import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Login} from '../login/login.component';

@Injectable()
export class AuthService {

  private authenticationConfirmedSource = new Subject<string>();
  authenticationConfirmedSource$ = this.authenticationConfirmedSource.asObservable();

  constructor(private http: HttpClient) {
  }

  confirmAuthentication(confirmation: string) {
    this.authenticationConfirmedSource.next(confirmation);
  }

  isAuthenticated() {
    const item = sessionStorage.getItem('token');
    return item != null && item != '';
  }

  hasRole(role: string) {
    if (this.isAuthenticated()) {
      const roles = sessionStorage.getItem('roles');
      if (roles && roles.length > 0) {
        return roles.indexOf(role) > -1;
      }
    }
    return false;
  }

  login(login: Login): Observable<HttpResponse<Login>> {
    const url = environment.apiUrl + 'login';
    let form = new FormData();
    form.append('username', login.username);
    form.append('password', login.password);
    return this.http.post<Login>(url, form, { observe: 'response' });
  }

  user(): Observable<Login> {
    const url = environment.apiUrl + 'login/user/';
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    let options = {headers: headers};
    return this.http.post<Login>(url, {}, options);
  }

  getLogin() {
    let login: string;
    const username = sessionStorage.getItem('username');
    if (username) {
      login = username;
    }
    return login;
  }
}
