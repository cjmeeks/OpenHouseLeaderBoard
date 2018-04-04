var mongoose = require("mongoose");

var Display = require("../models/Display");

var displayController = {};

/* Card Data */
displayController.show = function(req, res) {
    Display.find({}).exec(function (err, displays) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        /* Sort the displays alphabetically */
        displays.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        res.render("../views/vote", {displays: displays});
      }
    });
};

/* Leaderboard Data */
displayController.leaderboard = function(req, res) {
  Display.find({}).exec(function (err, displays) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      /* Sort by number of votes */
      displays.sort(function(a, b){
        return b.votes-a.votes
      });
      res.render("../views/leaderboard", {displays: displays});
    }
  });
};

displayController.create = function(req, res) {
  res.render("../views/displays/create");
};

displayController.save = function(req, res) {
  var display = new Display(req.body);

  display.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/displays/create");
    } else {
      console.log("Successfully created an display.");
      res.redirect("/");
    }
  });
};

displayController.voteForOneDisplay = function(req, res){
  Display.findOne({_id: req.params.id}).exec(function (err, display) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      if(display.votes){
        display.votes++;
      }
      else {
        display.votes = 1;
      }
      display.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Successfully Voted an display.");
          res.redirect("/submitted/" + display.name);
        }
      });
    }
  });
};

displayController.clear = function(req, res){
  Display.find({}).exec(function (err, displays) {
    if (err) {
      console.log("Error:", err);
    }
    else {
        displays.forEach(function(display){
          display.votes = 0;
          display.save(function(err) {
            if(err) {
              console.log(err);
            }
          });
        });
        res.redirect("/leaderboard");
        }
      });
};

module.exports = displayController;