'use strict';

var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var leads = require('./routes/leads');

var port = process.env.PORT || 3000;

var jsonParser = bodyParser.json()

// CORS

/*app.use(function(request, response, next) {

    //setting headers fix cross-domain ajax errors
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST,  PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,UserId');
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader('Access-Control-Expose-Headers', 'Token-Expiry');
    
    if (request.method == 'OPTIONS') {
        response.sendStatus(200);
        return;
    }

    next();
});	*/

// Static Files
app.use(express.static('public'));
/*app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/public/index.html');
});*/

// Client
app.get('/', function(req, res) {
    //res.send('Working ...');
    console.log(__dirname + '/public/index.html');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// API
app.use('/leads', jsonParser, leads);

// 404
app.use("*",function(req,res){
  //res.send(404);
  res.sendFile(__dirname + '/public/index.html');
});

// Mongoose Setup
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI);

// Server
var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Working at http://%s:%s", host, port)
});