var express = require('express');
var router = express.Router();

var display = require("../controllers/DisplayController.js");
/* GET users listing. */

// Create employee
// router.get('/create', display.create);

// Save employee
router.post('/save', display.save);

// Get single employee by id
router.post('/vote/:id', display.voteForOneDisplay);

router.get('/vote', display.show);

router.get('/leaderboard', display.leaderboard);

router.get('/submitted/:name', function(req, res) {
  res.render("../views/submitted", {name: req.params.name});
});

router.post('/clear', display.clear);

router.get('/admin', display.admin);

router.get('/delete/:id', display.delete);

router.post('/saveEdit', display.saveEdit);

router.get('/edit/:id', display.edit);


module.exports = router;
