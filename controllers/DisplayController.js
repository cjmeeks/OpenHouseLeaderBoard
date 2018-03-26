var mongoose = require("mongoose");

var Display = require("../models/Display");

var displayController = {};

displayController.list = function(req, res) {
    Display.find({}).exec(function (err, displays) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/displays/index", {displays: displays});
      }
    });
  };

displayController.show = function(req, res) {
    Display.find({}).exec(function (err, displays) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(displays);
        res.render("../views/vote", {displays: displays});
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
            res.redirect("/");
          }
        });
      }
    });
  };

  // employeeController.edit = function(req, res) {
  //   Display.findOne({_id: req.params.id}).exec(function (err, employee) {
  //     if (err) {
  //       console.log("Error:", err);
  //     }
  //     else {
  //       res.render("../views/employees/edit", {employee: employee});
  //     }
  //   });
  // };

  // employeeController.update = function(req, res) {
  //   Display.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
  //     if (err) {
  //       console.log(err);
  //       res.render("../views/employees/edit", {employee: req.body});
  //     }
  //     res.redirect("/employees/show/"+employee._id);
  //   });
  // };

  // employeeController.delete = function(req, res) {
  //   Display.remove({_id: req.params.id}, function(err) {
  //     if(err) {
  //       console.log(err);
  //     }
  //     else {
  //       console.log("Display deleted!");
  //       res.redirect("/employees");
  //     }
  //   });
  // };

  module.exports = displayController;