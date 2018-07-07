var db = require("../models");
var spotify = require("../routes/html-routes")

module.exports = function(app) {

  app.get("/api/current", function(req, res) {
    // var fullUrl = req.get('Referrer')
    // console.log(fullUrl);
    db.Currents.findAll({
    }).then(function(dbCurrents) {
        res.json(dbCurrents)
        //res.render(dbCurrents)
    });
  })

  app.get("/api/current/:filter/:value", function(req, res) {
   var conditions= {};
   var filter = req.params.filter;
    conditions[filter] =req.params.value
    console.log(conditions);
    // var filterArray
    // console.log(db.Currents.rawAttributes)
    db.Currents.findAll({
      // attributes: ['rank', 'artist', 'song', 'album', 'year'],
      where: conditions
      
    }).then(function(dbCurrents) {
      res.json(dbCurrents);
    });
  });
  

  app.get("/api/spotify/:artist/:song", function(req, res){

    var artist = req.params.artist;
    var track = req.params.song;

    console.log(artist);
    console.log(track);
    

    spotify.searchTracks(track, artist, function(data) {
      res.json(data.body.tracks.items[0])
    
    });
    // spotify.searchTracks(track, artist).then((spotifyTrack) => {
    //   res.json(spotifyTrack)
    // })
  });

};