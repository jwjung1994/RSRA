var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inputDomain = require('./routes/input_domain');
var inputAPT = require('./routes/input_apt');
var results = require('./routes/results');



var app = express();

var mongodb = mongoose.connection;
mongodb.on('error', console.error);
mongodb.once('open', function(){
    console.log("connected to mongod server");
});

mongoose.connect('mongodb://localhost/RSRA');

var Cases = require('./modules/case_schema');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/domain', inputDomain);
app.use('/case', inputAPT);
app.use('/results', results);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(4065, function(){
  console.log('Listening... PORT is ' + 4065);
});

module.exports = app;
