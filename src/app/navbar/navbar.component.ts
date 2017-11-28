import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavbarComponent{
  
  constructor(private router: Router, private authService: AuthenticationService) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = user.username;
  }

  currentUser: string;

  isLoggedIn(){
    
    if(this.authService.isLoggedIn()){
       return true; 
    }
      
    return false;
  }
}