import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user, {headers: headers})
      .map(res => res.json()); 
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  getDashboardMovies(){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/movies', {headers: headers})
      .map(res => res.json());
  }

  getDashboardSearch(searchname){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/searchMovie?name='+searchname, {headers: headers})
      .map(res => res.json());
  }

  getMovieById(movieId){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/findMovie?id='+movieId, {headers: headers})
      .map(res => res.json());
  }

  deleteMovie(movie_id){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.delete('http://localhost:3000/api/movies?id='+movie_id, {headers: headers})
        .map(res => res.json());

  }

  editMovie(movie_id, overview, title){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.post('http://localhost:3000/api/editMovie',{ movie_id: movie_id, overview: overview , title: title}, {headers: headers})
      .map(res => res.json());
  }

  postReview(review, movie_id, rating){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    console.log(review);

    return this.http.post('http://localhost:3000/api/reviews',{ movie_id: movie_id, review: review , rating: rating}, {headers: headers})
      .map(res => res.json());

  }

  getFavouritesMovies(){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/favourites', {headers: headers})
      .map(res => res.json());
  }

  postFavouritesMovie(movie_id){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    /* return this.http.post('http://localhost:3000/api/favourites', {headers: headers})
      .map(res => res.json()); */

    return this.http.post('http://localhost:3000/api/favourites',{ id: movie_id }, {headers: headers})
      .map(res => res.json());

  }

  deleteFavourite(movie_id){
    let headers = new Headers();
    this.loadToken();
    //console.log("From auth.service.ts file: token returned is :: "+this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.delete('http://localhost:3000/api/favourites?id='+movie_id, {headers: headers})
        .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    //console.log("Token loaded by loadToken() ::: "+ this.authToken);
  }

  loggedIn(){
    //return tokenNotExpired();
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
