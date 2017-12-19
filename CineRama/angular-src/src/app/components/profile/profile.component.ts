import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  admin:Object;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
       this.user = profile.user;
       if(profile.user.usertype == "admin"){
         this.admin = profile.user.usertype;
       }
    },
    err => {
      console.log("There was an error ::: "+err);
      return false;
    });
  }

}
