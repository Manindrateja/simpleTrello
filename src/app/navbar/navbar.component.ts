import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent{
  
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  isLoggedIn(){
    if(this.authService.isLoggedIn())
      return true;
    return false;
  }

  goHome() {
    this.router.navigate(['']);
  }

  goSearch() {
    this.router.navigate(['search']);
  }
}