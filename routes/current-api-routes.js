var db = require("../models");
var spotify = require("../routes/html-routes")

module.exports = function(app) {

  app.get("/api/current", function(req, res) {
    db.Currents.findAll({
    }).then(function(dbCurrents) {
        res.json(dbCurrents)
    });
  })

  app.get("/api/current/:filter/:value", function(req, res) {
   var conditions= {};
   var filter = req.params.filter;
    conditions[filter] =req.params.value
    db.Currents.findAll({
      where: conditions
      
    }).then(function(dbCurrents) {
      res.json(dbCurrents);
    });
  });
  

  app.get("/api/spotify/:artist/:song", function(req, res){

    var artist = req.params.artist;
    var track = req.params.song;
    

    spotify.searchTracks(track, artist, function(data) {
      res.json(data.body.tracks.items[0])
    
    });
  });

};