var mongoose = require( 'mongoose' );
const config = require('../config/database');

var genresSchema = new mongoose.Schema({
    id: Number,
    name: String
  });

const Genre = module.exports = mongoose.model('genres', genresSchema);

module.exports.getGenre = function( id ,callback) {
    const query = {id : id}
    Genre.findOne(query, callback);
};


module.exports.getAllGenre = function(callback){
    Genre.find({}, callback);
}