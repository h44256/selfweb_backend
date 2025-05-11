var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const isDev = process.env.NODE_ENV === 'development'; // 👈 新增這行

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 🟡 再來才是 public 資源（favicon、logo、robots.txt 之類）
app.use(express.static(path.join(__dirname, 'public')));

// 🟡 其他 Express 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// React 的靜態檔案
app.use(express.static(path.join(__dirname, 'dist')));

// React Router fallback：所有非 API 路徑都交給 React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

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
  res.status(err.status || 500).send({
    error: err.message,
    stack: isDev ? err.stack : undefined
  });
});

module.exports = app;
