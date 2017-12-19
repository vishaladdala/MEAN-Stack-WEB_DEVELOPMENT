var mongoose = require( 'mongoose' );
const config = require('../config/database');

var reviewsSchema = new mongoose.Schema({
    user_id: String,
    movie_id:{
      type: Number,
      required: true
    },
    review: String,
    rating: Number,
    created_date: Date,
    updated_date: Date
});

const Review = module.exports = mongoose.model('reviews', reviewsSchema);

module.exports.getReview = function( id ,callback) {
    const query = {movie_id : id}
    Review.find(query, callback);
};

module.exports.postReview = function( review_obj ,callback) {
    const query = {}
    Review.findOne(query, (err, docs) => {
            review_obj.save(function(err){
                callback(true);
            });
    });
};