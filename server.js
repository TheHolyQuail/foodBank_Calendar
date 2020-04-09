'use strict'

//adding Express and Cors
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// //lower in the doc
//mongoose.connect( require('./secrets'));

//create an instance of Express and allow 
//node to easily grab items send by 
//your view like "req.body.data"
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(cookieParser());

require('./routes/routes.js')(app);

//connect to db
mongoose.connect('mongodb+srv://wachtel:BHSbhs@cluster0-rlhoz.mongodb.net/test?retryWrites=true&w=majority')

//ok, start the server and be ready!
app.listen(3333);
console.log("Listening at localhost:3333");
