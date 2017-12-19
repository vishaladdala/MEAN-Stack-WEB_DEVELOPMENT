import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,
    private _flashMessagesService: FlashMessagesService) { }
  Movieid;
  movieData:Object;
  overview: String;
  title: String;

  user:Object;
  admin:Object;

  ngOnInit() {
    const url = window.location.href;
    this.Movieid = url.split(";")[1].split("=")[1];
    //console.log(this.Movieid);
    this.authService.getMovieById(this.Movieid).subscribe(data => {
      this.movieData = data;
      this.overview = data.movie.overview;
      this.title = data.movie.title;
      //console.log(this.movieData);
   },
   err => {
     console.log("There was an error ::: "+err);
     return false;
   });
  }

  onEditSubmit(){
    console.log(this.overview);
    this.authService.editMovie(this.Movieid, this.overview, this.title).subscribe(data => {
      if(data.success){
        this._flashMessagesService.show('Movie Edit success', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 4000, // Default is 3000
        });
       }else{
        this._flashMessagesService.show('Movie Edit falied', {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 4000, // Default is 3000
        });
       }
   },
   err => {
     console.log("There was an error ::: "+err);
     return false;
   });
  }

}
