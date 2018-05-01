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

  displayController.admin = function(req, res) {
    Display.find({}).exec(function (err, displays) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        displays.sort(function(a, b){
          return b.votes-a.votes
        });
        res.render("../views/admin", {displays: displays});
      }
    });
  };

  displayController.save = function(req, res) {
    var display = new Display();
    if(req.body){
      display.name = req.body.displayName;
      display.description = req.body.description;
      display.votes = 0;
      display.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Successfully created an display.");
          res.redirect("/admin");
        }
      });
    }
    else{
      res.redirect("/admin");
    }
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

  displayController.delete = function(req, res){
    Display.remove({ _id:req.params.id }, function(err){
      if(err) console.log(err);
      else{
        res.redirect("/admin");
      }
    });
  };

  displayController.edit = function(req, res){
    Display.findOne({_id: req.params.id}).exec(function (err, display) {
      if (err) {
        console.log("Error:", err);
      }
      else {
          res.render("../views/edit", {display: display});
          }
        });
  };

  displayController.saveEdit = function(req, res) {
    if(req.body){
      display.name = req.body.name;
      display.description = req.body.description;
      display.votes = req.body.votes;
      Display.update({ _id: req.params.id }, { $set: { name: req.body.name, description: req.body.description, votes: req.body.votes} }).exec();
      res.redirect("/admin");
    }
  };

  module.exports = displayController;