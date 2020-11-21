var express = require("express");
var app = express();
var path  = require('path');
var dbfunc = require('./db-function');
var bodyParser = require('body-parser');

dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });
 
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// index route
app.get('/', (req, res) => {
    res.send('hello world');
});

var ApiConfig = {
  app: app
};

module.exports = ApiConfig;
