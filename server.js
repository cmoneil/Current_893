// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotify = require("spotify-web-api-node");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8888;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
//app.use(express.static("public"));

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/current-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/playlist-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main",
 partialsDir  : [  __dirname + '/views/partials'], 
 helpers:{json: function (context){
   return JSON.stringify(context);
 }}
}));
//Handlebars.registerPartial('burgerBlock', partial)
app.set("view engine", "handlebars");


var order = ["current", "user", "playlist"]
db.sequelize.sync(order, { force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
