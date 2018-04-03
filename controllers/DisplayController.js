var mongoose = require("mongoose");

var Display = require("../models/Display");

var displayController = {};

displayController.show = function(req, res) {
    Display.find({}).exec(function (err, displays) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/vote", {displays: displays});
      }
    });
  };

displayController.leaderboard = function(req, res) {
  Display.find({}).exec(function (err, displays) {
    if (err) {
      console.log("Error:", err);
    }
    else {
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

  module.exports = displayController;