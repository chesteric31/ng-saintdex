import { Component, OnInit, HostListener } from '@angular/core';
import {AuthService} from '../../../../security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navOpen = false;
  username: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.user().subscribe(principal => {
        this.username = principal['name'];
      }, error => {
        if (error.status == 401) {
          alert('Unauthorized!');
        }
      })
    }
  }

  @HostListener('window:keyup', ['$event'])
  outerClick(event) {
    if (event.keyCode === 27 && this.navOpen === true) {
      this.navOpen = false;
    }
  }

  logout() {
    sessionStorage.setItem('token', '');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
