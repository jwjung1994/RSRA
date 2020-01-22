var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var helmet        = require('helmet');
var mongoose      = require('mongoose');
var dotenv        = require('dotenv').config();
var sessionParser = require('express-session');

var indexRouter   = require('./routes/index');
//var usersRouter   = require('./routes/users');
var inputAPT      = require('./routes/input_apt');
var settingElements = require('./routes/elements_setting');


var app = express();

//MongoDB 연결 부분
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.once('open', function() {
    // we're connected!
    console.log('mongoDB connected successfully');
});

db.on('error', function(error){
  console.log('Error on DB Connection : ' + error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');     // pug 탬플릿 설정

app.use(helmet());
app.use(logger('dev'));             //morgan
app.use(express.json());            //body-parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionParser({
  secret : 'jung',
  resave : true,
  saveUninitialized : true
}));


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/case', inputAPT);
app.use('/elements', settingElements);

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

// 서버 실행
const PORT = process.env.PORT;

app.listen(PORT, function(){
  console.log('Listening... PORT is ' + PORT);
});

//module.exports = app;
