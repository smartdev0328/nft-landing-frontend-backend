require('./api/model/db');
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');
const helmet = require('helmet');
var filter = require('content-filter')
const rateLimit = require('express-rate-limit');

var app = express();

// view engine setup
//app.use(helmet());
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://marketplace.affyn.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();});

// var allowedOrigins = ['https://staging.affyn.com',
//                       'https://marketplace.affyn.com'];

// app.options(cors({
//   allowedHeaders: ['sessionId', 'Content-Type'],
//   exposedHeaders: ['sessionId'],
//   methods: 'GET,HEAD,PUT,POST',
//   preflightContinue: true,
//   origin: function(origin, callback){
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(cors());

app.use(bodyParser.text());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(filter({bodyMessage: 'A forbidden expression has been found in form data: '}))

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	max: 60, 
	standardHeaders: true, 
	legacyHeaders: false,
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(/^\/$/, (req, res) => {
  res.send("Welcome to the Affyn API!")
})

app.use('/api', indexRouter);
app.use('/users', usersRouter);

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
  res.json({
  message: err.message,
  error: err
});
});

module.exports = app;
