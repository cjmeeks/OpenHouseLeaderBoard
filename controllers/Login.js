var mongoose = require("mongoose");

var User = require("../models/User");

// var display = require("../controllers/DisplayController.js");

var loginController = {};

loginController.authenticateAdmin = function(req, res, next) {
  if (req.session && req.session.username){
    return next();
  }
  else{
    console.log("logging out");
    return res.redirect('/auth/logout');
  }
};

loginController.getLogin = function(req,res){
  res.render("../views/login");
};

loginController.loginUser = function(req,res){
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    console.log("trying to login2");
    res.send('login failed');    
  } else if(req.body.username === "admin" || req.body.password === "passwrd") {
    req.session.username = "admin";
    res.redirect("../admin");
  }
  else{
    res.send('no bueno');
  }
};

loginController.logout = function(req,res){
  req.session.destroy();
  res.redirect("/auth/login");
};


module.exports = loginController;



