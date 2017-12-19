import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  constructor(private authService: AuthService, 
              private router: Router,
              private _flashMessagesService: FlashMessagesService) { }
  Movieid;
  movieData:Object;
  review: String;
  rating: Number;

  user:Object;
  admin:Object;

  ngOnInit() {
    //
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
    const url = window.location.href;
    this.Movieid = url.split(";")[1].split("=")[1];
    //console.log(this.Movieid);
    this.authService.getMovieById(this.Movieid).subscribe(data => {
      this.movieData = data;
      //console.log(this.movieData);
   },
   err => {
     console.log("There was an error ::: "+err);
     return false;
   });
  }

  onClickAddToFavs(){
    console.log(this.Movieid);
    this.authService.postFavouritesMovie(this.Movieid).subscribe(data => {////
      if(data.success){
        this._flashMessagesService.show('Added to Favourites', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 4000, // Default is 3000
        });
       }else{
        this._flashMessagesService.show('Already in your favourites', {
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

  onClickDelete(){
    this.authService.deleteMovie(this.Movieid).subscribe(data => {
      if(data.success){
        //this.favourites=null;
        //this.ngOnInit();
        /* this._flashMessagesService.show('removed', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        }); */
        this.router.navigate(['/dashboard']);
      }
      else{
        /* this._flashMessagesService.show('Could not remove', {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        }); */
      }
    });
  }

  onClickEdit(){
    this.router.navigate(['/addmovie',{id: this.Movieid}]);
  }

  onReviewSubmit(){
    console.log(this.review + " == for == " + this.Movieid);
    this.authService.postReview(this.review, this.Movieid, this.rating).subscribe(data => {////
      if(data.success){
        this._flashMessagesService.show('Review posted', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 4000, // Default is 3000
        });
        //this.favourites=null;
        this.review = null;
        this.rating = null;
        this.ngOnInit();
       }else{
        this._flashMessagesService.show('Something went wrong at server. Please try again', {
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
