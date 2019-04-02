import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthService} from '../security/auth.service';

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

  constructor(private title: Title,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.title.setTitle('Login Saintdex');
    sessionStorage.setItem('token', '');
    this.model = new Login();
  }

  close() {
    this.router.navigateByUrl('/saintseiya');
  }

  login() {
    this.authService.login(this.model).subscribe((login: Login) => {
      if (login) {
        sessionStorage.setItem('token', btoa(login.username + ':' + login.password + ':' + login.roles));
        this.router.navigate(['']);
      } else {
        alert('Authentication failed!');
      }
    });
  }
}
