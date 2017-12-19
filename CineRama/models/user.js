const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//mongoose.model('<name of the model>', <the schema>);
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });//generate a random key to hash the password to be stored.
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash , (err, isMatch) => {
        if(err) throw er;
        callback(null, isMatch);
    });
}