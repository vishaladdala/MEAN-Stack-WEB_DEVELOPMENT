import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesService } from 'ngx-flash-messages';
//import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
     this.authService.logout();
     /* this.flashMessage.show('You are logged out' , {
        classes: ['alert', 'alert-success'], // You can pass as many classes as you need
        timeout: 4000, // Default is 3000
      }); */
     this.router.navigate(['/login']);
     return false;
  }
}
