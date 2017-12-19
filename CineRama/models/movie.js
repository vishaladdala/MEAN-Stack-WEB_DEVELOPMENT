const mongoose = require('mongoose');
const config = require('../config/database');


//movie schema
var movieSchema = new mongoose.Schema({
    overview: String,
    original_language: String,
    original_title: String,
    video: Boolean,
    title: String,
    genre_ids: Array,
    poster_path: String,
    backdrop_path: String,
    release_date: String,
    vote_average: Number,
    popularity: Number,
    id:{
      type: Number,
      required: true
    },
    adult: Boolean,
    vote_count: Number,
    active: Boolean,
    image: String
});

const Movie = module.exports = mongoose.model('movies', movieSchema);


module.exports.getAllMovies = function(callback) {
    const query = {active: true}
   //Movie.find(query, callback);
    Movie.find(query).sort({'vote_average':-1}).exec(callback);
};

module.exports.getMovieByID = function(id,callback) {
    const query = { id: id}
    Movie.findOne(query, callback);
};

module.exports.getMovieByName = function(name,callback) {
    var r = new RegExp(name,'i');
    console.log(r);
    Movie.find({active: true, title: {$regex:r}}, callback);
};

module.exports.postMovie = function( Movieobj ,callback) {
    console.log(Movieobj.title);

    var conditions = {
            id: Movieobj.id
        }
        ,update = { title: Movieobj.title, overview: Movieobj.overview }
        ,options = {};

    Movie.update(conditions, update, options, callback);

    /* Review.findOne(query, (err, docs) => {
            review_obj.save(function(err){
                callback(true);
            });
    }); */
};

module.exports.deleteMovie = function(movie_id, callback){
    var conditions = {
            id: movie_id
        }
        ,update = { active: false }
        ,options = {};

        Movie.update(conditions, update, options, callback);
}
