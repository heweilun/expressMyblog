var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const ENV = process.env.NODE_ENV//环境变量


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'Hikvision_1#01#',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,//过期时间
  },
  store: sessionStore
}))
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const writeLogStream = fs.createWriteStream(path.join(__dirname, 'logs','access.log'), {flags: 'a'})
app.use(
  ENV !== "production"?
  logger('dev'):
  logger('combined', {
    //线上环境
    stream: writeLogStream
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
