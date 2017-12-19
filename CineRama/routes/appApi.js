const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Movie = require('../models/movie');
const Favourite = require('../models/favourite');
const Cast = require('../models/cast');
const Genre = require('../models/genre');
const Review = require('../models/review');

//get the config from database configuration file
const config = require('../config/database');


// uncomment the passport to secure the api end point.
router.get('/movies', passport.authenticate('jwt', {session: false}),(req, res, next) => {
    Movie.getAllMovies( (err, movieData) => {
        res.json({
            movies: movieData
        });
    });
});

router.delete('/movies'  ,passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //console.log("Delete executed");
    console.log(req.query.id);
    Movie.deleteMovie(req.query.id, (err, affected) => {
        if(err){
            res.json({success: false , msg: 'Could not remove'});
        }
        res.json({success: true , msg: 'Removed movie'});
    });
});

router.post('/editMovie' ,passport.authenticate('jwt', {session: false}), (req, res, next) => {
    /* console.log("====== "+req.body.movie_id);
    console.log("====== "+req.body.title);
    console.log("====== "+req.body.overview);
    console.log(" = "+ req.user.username); */
    let movieObj = new Movie ({
        id: req.body.movie_id,
        title: req.body.title,
        overview: req.body.overview
    });
    Movie.postMovie(movieObj , (err, affected) => {
        if(err){
            res.json({success: false , msg: 'Could not edit'});
        }
        res.json({success: true , msg: 'editted'});
    });
});

router.get('/genres',passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    Genre.getAllGenre( (err, genreData) => {
        res.json({
            genres: genreData
        });
    });
});

router.get('/findMovie'/* ,passport.authenticate('jwt', {session: false}) */, (req, res, next) => {
    //console.log(" =====> "+req.query.id );
    Movie.getMovieByID(req.query.id, (err, movieData) => {
        Cast.getCast(req.query.id, (err1, castData) =>{
            Review.getReview(req.query.id, (err2, reviewData) =>{
                /*console.log({
                movie: movieData,
                cast: castData
                }); */
                res.json({
                    movie: movieData,
                    cast: castData,
                    review: reviewData
                });
            });
        });
    });
});

router.get('/searchMovie'/* ,passport.authenticate('jwt', {session: false}) */, (req, res, next) => {
    //console.log(" =====> "+req.query.id );
    Movie.getMovieByName(req.query.name, (err, movieData) => {
        res.json({
            movies: movieData
        });
    });
});


// uncomment the passport to secure the api end point.
router.get('/favourites',passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Favourite.getFavourites( req.user.username, (err, favouriteData) => {
        var favMovies = [];
        for(var i = 0 ; i < favouriteData.length ; i++){
            var movieId = favouriteData[i].movie_id;
            Movie.getMovieByID(movieId, (err, movieData)=>{
                favMovies.push(movieData);
                if(favMovies.length == favouriteData.length){
                    res.json({
                        favourites: favMovies
                    });
                }
            });
        }
    });
});

router.post('/favourites' ,passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log("add favs to = "+req.body.id);
    console.log("add to  = "+ req.user.username);
    let newFav = new Favourite({
        user_id: req.user.username,
        movie_id: req.body.id,
        active: true
    });
    Favourite.insertFavourite(newFav , (success_msg) => {
        if( !success_msg ){
            console.log('Already in your favourites');
            res.json({success: false , msg: 'Already in your favourites'});
        } else{
            console.log('Added to Favourites');
            res.json({success: true , msg: 'Added to Favourites'});
        }
    });
});

router.post('/reviews' ,passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log("Review = "+req.body.review);
    console.log("Movie = "+req.body.movie_id);
    console.log("Rating = "+req.body.rating);
    console.log("User  = "+ req.user.username);

    let review_obj = new Review ({
        user_id: req.user.username,
        movie_id: req.body.movie_id,
        review: req.body.review,
        rating: req.body.rating,
        created_date: null,
        updated_date: null
    });

    Review.postReview(review_obj , (success_msg) => {
        if( !success_msg ){
            res.json({success: false , msg: 'Something went wrong'});
        } else{
            res.json({success: true , msg: 'Added the review'});
        }
    });
    //Review.postReview(req.body.review, req.user.username)

    //res.json({success: true , msg: 'Review Posted'});
});

router.delete('/favourites'  ,passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //console.log("Delete executed");
    let delFav = new Favourite({
        user_id: req.user.username,
        movie_id: req.query.id,
        active: false
    });
    Favourite.deleteFavs(delFav, (err, affected) => {
        if(err){
            res.json({success: false , msg: 'Could not remove'});
        }
        res.json({success: true , msg: 'Removed from favourites'});
    });
    /* res.json({
       id: req.query.id
    }); */
});

module.exports = router;