var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const User = require('./models/Users')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


require('./db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser())
app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: false,
  })
)

passport.use(
  new LocalStrategy((username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return cb(err)
      }
      if (!user) {
        return cb(null, false)
      }
      if (bcrypt.compareSync(password, user.password)) {
        console.log('pass:',user)
        return cb(null, user)
      }
      return cb(null, false)
    })
  })
)

passport.serializeUser((user, cb) => {
  console.log('serializeUser:',user.username)
  cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
  console.log('deserializeUser')
  User.findById(id, (err, id) => {
    if (err) {
      return cb(err)
    }
    cb(null, id)
  })
})

app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
