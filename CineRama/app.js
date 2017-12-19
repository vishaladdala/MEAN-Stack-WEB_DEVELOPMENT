const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//connect to db
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database : '+ config.database);
});
//on connection error
mongoose.connection.on('error', (err) => {
    console.log('Database connection error : '+ err);
});

//express app
const app = express();

const users = require('./routes/users');
const appApi = require('./routes/appApi');// our main application api route file - appApi.js

//port number
const port = 3000;

//cors middle ware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);
app.use('/api',appApi); // route requests to appApi.js if they start with http://localhost:3000/api/- - -

//index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint'); // for time being.
});

app.listen(port, () => { // equivalent to function(){}
    console.log('sever started on port: '+port);
});