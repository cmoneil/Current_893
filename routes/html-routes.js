// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
require("dotenv").config();
var keys = require('../public/assets/js/keys');
//var spotToken = require('./logic');
//var spotAccess = spotToken.setAccessToken;


var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi(keys.spotify);

// console.log(spotAccess)

var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
// =============================================================
//var path = require("path");
var access_token;
var db = require("../models")

var client_id = 'bbe424c9f5cd468884105db9c047156e'; // Your client id
var client_secret = '4dff3cc08f7f4cd8932cc54fa2038c69'; // Your secret
var redirect_uri = 'https://peaceful-everglades-78880.herokuapp.com/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

// var app = express();

// app.use(express.static(__dirname + '/public'))
//    .use(cors())
//    .use(cookieParser());

// Routes
// =============================================================
module.exports = function(app) {

 
  app.get("/", function(req, res) {
    db.Currents.findAll({
      attributes: ['rank', 'artist', 'song', 'album', 'year']
      }).then(function(dbCurrents) {
          // console.log(dbCurrents)
          res.render("index", {top893: dbCurrents})
          
      });
  });

  app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
  app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          access_token = body.access_token,
              refresh_token = body.refresh_token;
          console.log(access_token)
          spotifyApi.setAccessToken(access_token);
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
            console.log('Token 1: '+access_token)
        }
      });
    }
    console.log('Token 1: '+access_token)
  });

  
  // spotifyApi.setAccessToken(access_token);
  // console.log("access token;"+ access_token)
  
  module.exports = {
    
    searchTracks: function (track, artist, callback){  spotifyApi.searchTracks('track:'+track+' artist:'+ artist,{limit: 5})
    .then(data => callback(data), err => console.log('Something went wrong!', err))}


    
  
};
}


// module.exports = {
    
//     searchTracks: function (track, artist, callback){  spotifyApi.searchTracks('track:'+track+' artist:'+ artist,{limit: 5})
//     .then(data => callback(data), err => console.log('Something went wrong!', err))}


    
  
// };
