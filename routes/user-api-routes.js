// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/users", function(req, res) {
    // var query = {};
    // if (req.query.name) {
    //   query.Name = req.query.name;
    // }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Users.findAll({
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  app.get("/#", function(req, res){
    console.log(req.body)
  })
  // Get route for retrieving a single user
  app.get("/api/users/:name", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Users.findOne({
      where: {
        name: req.params.name
      },
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // POST route for saving a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // DELETE route for deleting users
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // PUT route for updating posts
  app.put("/api/users", function(req, res) {
    db.Users.update(
      req.body,
      {
        where: {
          name: req.body.name
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
