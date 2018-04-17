
// Requiring our models
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the notes
  app.get("/api/notes", function(req, res) {
    var query = {};
    if (req.query.UserId) {
      query.UserId = req.query.UserId;
    }
    // Here we add an "include" property to our options in our findAll query
    // set the value to an array of the models to include in a left outer join
    // db.User
    db.note.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbnote) {
      res.json(dbnote);
    });
  });

  // Get rotue for retrieving a single note
  app.get("/api/notes/:id", function(req, res) {
    //add an "include" property in our findOne query
    //set the value to an array of the models to include in a left outer join
    // db.User
    db.note.findAll({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbnote) {
      res.json(dbnote);
    });
  });

   // Get rotue for retrieving a single user's notes
  app.get("/api/usernotes/:id", function(req, res) {
    db.note.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.User]
    }).then(function(dbnote) {
      res.json(dbnote);
    });
  });

  // POST route for saving a new note
  app.post("/api/notes", function(req, res) {
    
    console.log(req.body);

    db.note.create(req.body).then(function(dbnote) {
      res.json(dbnote);
    });
  });

  // DELETE route for deleting notes
  app.delete("/api/notes/:id", function(req, res) {
    db.note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbnote) {
      res.json(dbnote);
    });
  });

  // PUT route for updating notes
  app.put("/api/notes", function(req, res) {
    db.note.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbnote) {
        res.json(dbnote);
      });
  });
};