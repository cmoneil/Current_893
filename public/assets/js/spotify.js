require("dotenv").config();
var keys = require('./keys.js');
//var spotToken = require('./logic');
//var spotAccess = spotToken.setAccessToken;


var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi(keys.spotify);

// console.log(spotAccess)
spotifyApi.setAccessToken('BQA9z-zFgUf8g_CN8ZR_p-SrOTXawrrF8CQEeX7u_jVg4-za_reg396fjP59KHvgTfZ6EoDMO6x37cTqhdn8aXoxLQS8lDzyTHiNKbYN2DXro24ZKD76Apr_7FGWfYnH1DB6-4h9MTvVPQiYeHwI343WUCD4-o1K_nk&refresh_token=AQA4Kg91r82wSH1hYd2qjXE5gy2i1reHO6IYN_b0r7SaIVz6f2Aj_Q0vB2Xc2lPkY2Wv13Q48lBdX9KbUaES3TwAdZmdes74Oj0OjYfySPsQJkXPmeN5Q-TFl9Bsg7jlNOo');

module.exports = {
    
    searchTracks: function (track, artist, callback){  spotifyApi.searchTracks('track:'+track+' artist:'+ artist,{limit: 5})
    .then(data => callback(data), err => console.log('Something went wrong!', err))}


    // app.get('/login', function(req, res) {

    //     var state = generateRandomString(16);
    //     res.cookie(stateKey, state);
      
    //     // your application requests authorization
    //     var scope = 'user-read-private user-read-email';
    //     res.redirect('https://accounts.spotify.com/authorize?' +
    //       querystring.stringify({
    //         response_type: 'code',
    //         client_id: client_id,
    //         scope: scope,
    //         redirect_uri: redirect_uri,
    //         state: state
    //       }));
    //   })

    //   app.get('/callback', function(req, res) {
    
    //     // your application requests refresh and access tokens
    //     // after checking the state parameter
      
    //     var code = req.query.code || null;
    //     var state = req.query.state || null;
    //     var storedState = req.cookies ? req.cookies[stateKey] : null;
      
    //     if (state === null || state !== storedState) {
    //       res.redirect('/#' +
    //         querystring.stringify({
    //           error: 'state_mismatch'
    //         }));
    //     } else {
    //       res.clearCookie(stateKey);
    //       var authOptions = {
    //         url: 'https://accounts.spotify.com/api/token',
    //         form: {
    //           code: code,
    //           redirect_uri: redirect_uri,
    //           grant_type: 'authorization_code'
    //         },
    //         headers: {
    //           'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //         },
    //         json: true
    //       };
      
    //       request.post(authOptions, function(error, response, body) {
    //         if (!error && response.statusCode === 200) {
      
    //           access_token = body.access_token,
    //               refresh_token = body.refresh_token;
    //           console.log(access_token)
    //           var options = {
    //             url: 'https://api.spotify.com/v1/me',
    //             headers: { 'Authorization': 'Bearer ' + access_token },
    //             json: true
    //           };
      
              
    
    //           // use the access token to access the Spotify Web API
    //           request.get(options, function(error, response, body) {
    //             console.log(body);
    //           });
      
    //           // we can also pass the token to the browser to make requests from there
    //           res.redirect('/#' +
    //             querystring.stringify({
    //               access_token: access_token,
    //               refresh_token: refresh_token
    //             }));
    //         } else {
    //           res.redirect('/#' +
    //             querystring.stringify({
    //               error: 'invalid_token'
    //             }));
    //         }
    //       });
    //     }
    //   });
  
//     .then(function(data) {
//     console.log(data.body.tracks.items[0]);
//   }, function(err) {
//     console.log('Something went wrong!', err);
  
  
};