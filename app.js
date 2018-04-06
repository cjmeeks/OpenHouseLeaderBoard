var express = require('express');
var http = require('http');
var path = require('path');

const PORT = 3001;

var prevLeaderBoardRank = 0;

//mongo
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://group:ksu12345@ds213209.mlab.com:13209/openhouseleaderboard')
  .then(() =>  console.log('MongoDB connection succesful'))
  .catch((err) => console.error(err));

  
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var displays = require('./routes/displays');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//our routes
app.use('/', displays);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(PORT, function() {
	console.log("Server listening on port " + PORT);
});

/* Leaderboard content functions. */

/* If the next display in the leaderboard has the same
   number of votes as the previous, make the ranking
   reflect the tie. */
app.locals.getRank = function(orderIndex, displayArr){
  var curLeaderBoardRank = orderIndex;

  if(orderIndex > 1){
    if (displayArr[i-1].votes == displayArr[i-2].votes){
      curLeaderBoardRank = prevLeaderBoardRank;
    }    
  }
  prevLeaderBoardRank = curLeaderBoardRank;

  return curLeaderBoardRank;
}

app.use(express.static('public'));

app.locals.getTrophyImage = function(rank, index, displayArr){
  /* Trophies */
	switch(rank){
    case 1:
      return "/images/trophies/trophy_gold";
      
    case 2:
      return "/images/trophies/trophy_silver";

    case 3:
      return "/images/trophies/trophy_bronze";

    default:
      return function(index, displayArr){
        if(index==displayArr.length){
          //future code for adding poop emoji?
          return;
        }
      };
  }
}

module.exports = app;
