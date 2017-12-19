const mongoose = require('mongoose');
const config = require('../config/database');


//movie schema
var favouriteSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        required: true
    },
    movie_id:{
      type: Number,
      required: true
    },
    active: Boolean
});

const Favourites = module.exports = mongoose.model('favourites', favouriteSchema);


module.exports.getFavourites = function(username,callback) {
    var one = 1;
    const query = {user_id: username, 
                    active: true };
    Favourites.find(query,{movie_id:1,_id:0}, callback);
    
};

module.exports.insertFavourite = function(newFav, callback) {
    const query = {user_id: newFav.user_id,
                    movie_id:  newFav.movie_id,
                    active: true };
    Favourites.find(query, (err, docs) => {
        if (docs.length){
            callback(false);
        }else{
            newFav.save(function(err){
                callback(true);
            });
        }
    });
};

module.exports.deleteFavs = function(delFav, callback){
    var conditions = {
            movie_id: delFav.movie_id,
            user_id:  delFav.user_id,
            active: true
        }
        ,update = { active: false }
        ,options = {};

    Favourites.update(conditions, update, options, callback);
}

