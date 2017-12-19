import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router,
              private _flashMessagesService: FlashMessagesService
            ) { }

  favourites:Object;

  ngOnInit() {
    this.authService.getFavouritesMovies().subscribe(data => {
        this.favourites = data.favourites;// depends on the api sent data.
        //console.log(this.favourites);
      },
      err => {
        console.log("There was an error ::: "+err);
        return false;
    });
  }

  onClickDelete(movie_id){
    this.authService.deleteFavourite(movie_id).subscribe(data => {
      if(data.success){
        this.favourites=null;
        this.ngOnInit();
        this._flashMessagesService.show('removed', {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        });
      }
      else{
        this._flashMessagesService.show('Could not remove', {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 1000, // Default is 3000
        });
      }
    });
    //this.router.navigate(['/favourites']);
  }
}
