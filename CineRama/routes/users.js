const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//get the config from database configuration file
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
    //res.send('REGISTER'); 
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        usertype: "patron",
        password: req.body.password
    });

    //call a func called adduser 
    User.addUser(newUser, (err, user) => {
        if(err){
            console.log(err + " -- During registering User-- "+newUser.name);
            res.json({success: false , msg: 'Failed to register the user'});
        } else{
            console.log(" -- User registered-- "+newUser.name);
            res.json({success: true , msg: 'User registered'});
        }
    });
});

//Authentication
router.post('/authenticate', (req, res, next) => {
    //res.send('AUTHENTICATE'); 
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json( {success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                /* const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800// i week of seconds.
                }); */

                // solution from comments section....
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        usertype: user.usertype,
                        email: user.email
                    }
                });
            } else {
                res.json({ success: false , msg: 'Wrong Password'});
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    //res.send('PROFILE'); 
    res.json({
        user: req.user
    });
});
// NOTE: use -- passport.authenticate('jwt', {session: false}) -- as second option in router functions to 
//       protect the routes for a logged in user.




module.exports = router;