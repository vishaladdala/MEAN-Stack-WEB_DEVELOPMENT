import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

constructor(private authService: AuthService, private router: Router) { }
  movies:Object;
  searchname:String;
  user:Object;
  admin:Object;
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
    
    this.authService.getDashboardMovies().subscribe(data => {
       this.movies = data.movies;
      // console.log(this.movies);
    },
    err => {
      console.log("There was an error ::: "+err);
      return false;
    });
  }

  onSearchSubmit(){
    console.log(this.searchname);
    this.authService.getDashboardSearch(this.searchname).subscribe(data => {
        this.movies = null;
        this.movies = data.movies;
        //this.ngOnInit();
      // console.log(this.movies);
    },
    err => {
      console.log("There was an error ::: "+err);
      return false;
    });
  }

  onClickDisplay(movie_id){
    this.router.navigate(['/display',{id:movie_id}]);
  }
}
