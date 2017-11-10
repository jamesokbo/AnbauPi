// server.js
var express    = require('express');        // call express
var app        = express();
var jwks = require('jwks-rsa');
var socketioJwt   = require("socketio-jwt");
var jwt = require("jsonwebtoken");
var mongoose   = require('mongoose');
mongoose.connect('mongodb://anbaupi:AnbauPi@ds023463.mlab.com:23463/anbaupi', {useMongoClient:true}); // connect to our database

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser, this will let us get the data from a POST
app.use(bodyParser.json());


var userHttp = require('http').Server(app);
var userIo=require('socket.io')(userHttp);
require('dotenv').config();
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}
userIo.on('connection', (socket)=>{
  require("./socketHandlers/userSocketHandler")(socket);
});
var userPort = process.env.PORT || 8080;  // set our port
userHttp.listen(userPort, function(){
  console.log('server running @ port:'+userPort);
});

var monitorHttp= require('http').Server(app);
var monitorIo= require('socket.io')(monitorHttp);
monitorIo.on('connection', (socket)=>{
  require("./socketHandlers/monitorSocketHandler");
})
var monitorPort=8081;
monitorHttp.listen(monitorPort, function(){
  console.log('server running @ port:'+monitorPort);
});
