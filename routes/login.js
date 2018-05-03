var express = require('express');
var router = express.Router();

var login = require("../controllers/Login.js");

router.get('/login', login.getLogin);

router.post('/login', login.loginUser);

router.get('/logout', login.logout);


module.exports = router;