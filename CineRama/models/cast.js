var mongoose = require( 'mongoose' );
const config = require('../config/database');

var castSchema = new mongoose.Schema({
    cast: Array,
    id:{
      type: Number,
      required: true
    }
});

const Cast = module.exports = mongoose.model('casts', castSchema);

module.exports.getCast = function( id ,callback) {
    const query = {id : id}
   Cast.findOne(query, callback);
};