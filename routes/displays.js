var express = require('express');
var router = express.Router();

var display = require("../controllers/DisplayController.js");
/* GET users listing. */
router.get('/', display.list);

// Create employee
router.get('/create', display.create);

// Save employee
router.post('/save', display.save);

// Get single employee by id
router.post('/vote/:id', display.voteForOneDisplay);

router.get('/vote', display.show);

router.get('/leaderboard', function(req, res) {
    res.render('leaderboard');
  });

// // Edit employee
// router.get('/edit/:id', employee.edit);

// // Edit update
// router.post('/update/:id', employee.update);

// // Edit update
// router.post('/delete/:id', employee.delete);

module.exports = router;
