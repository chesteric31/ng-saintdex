import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../../security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navOpen = false;
  login: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticationConfirmedSource$.subscribe(confirmation => {
      this.login = this.authService.getLogin();
    });
  }

  @HostListener('window:keyup', ['$event'])
  outerClick(event) {
    if (event.keyCode === 27 && this.navOpen === true) {
      this.navOpen = false;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
