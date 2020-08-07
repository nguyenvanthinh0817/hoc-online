require('dotenv').config()
var createError = require('http-errors');
var express = require('express');


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var khoahocRouter = require('./routes/khoahoc');
var baihocRouter = require('./routes/baihoc');
var thanhvienRouter = require('./routes/thanhvien');
var authRouter = require('./routes/auth');


var authMiddlewave = require('./middlewaves/auth.middlewave');
var notAuthMiddlewave = require('./middlewaves/notAuth');


const { send } = require('process');

var app = express();

// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('sadfsdfsdfd'));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/auth',  authRouter);
// app.use('/users',authMiddlewave.requireAuth, usersRouter);
// app.use('/khoahoc',authMiddlewave.requireAuth, khoahocRouter);
// app.use('/baihoc',authMiddlewave.requireAuth, baihocRouter);




app.use('/', notAuthMiddlewave.requireName, indexRouter);
app.use('/auth',  authRouter);
app.use('/users',authMiddlewave.requireAuth, authMiddlewave.requireRole, usersRouter);
app.use('/khoahoc',authMiddlewave.requireAuth, authMiddlewave.requireRole, khoahocRouter);
app.use('/baihoc',authMiddlewave.requireAuth, authMiddlewave.requireRole,  baihocRouter);

app.use('/khoahoccuatoi',authMiddlewave.requireAuth, thanhvienRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404err/404')
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

module.exports = app;
