import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesService } from 'ngx-flash-messages';
//import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
   
  constructor(private authService:AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    //console.log('Username :: ' + this.username);
    const user = {
      username : this.username, 
      password : this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      //console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        /* this.flashMessage.show('You are now logged in', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 4000, // Default is 3000
        }); */
        this.router.navigate(['dashboard']);

      }else{
        this.flashMessage.show(data.msg, {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        });
        this.router.navigate(['login']);
      }
    });
  }
}
