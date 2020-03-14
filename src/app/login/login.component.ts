import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { HttpResponse } from '@angular/common/http';

export class Login {
  username: string;
  password: string;
  roles: Array<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: Login;

  constructor(private title: Title, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.title.setTitle('Login Saintdex');
    this.clearStorage();
    this.model = new Login();
  }

  private clearStorage() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
  }

  close() {
    this.router.navigateByUrl('/saintseiya');
  }

  login() {
    this.authService.login(this.model).subscribe(
      (response: HttpResponse<Login>) => {
        if (response) {
          let headers = response.headers;
          const jwtToken = headers
            .get('authorization')
            .replace('Bearer', '')
            .trim();
          sessionStorage.setItem('token', jwtToken);
          sessionStorage.setItem('roles', headers.get('roles'));
          sessionStorage.setItem('username', this.model.username);
          this.authService.confirmAuthentication('confirm');
          this.router.navigate(['']);
        } else {
          alert('Authentication failed!');
        }
      },
      error => console.error(error)
    );
  }
}
