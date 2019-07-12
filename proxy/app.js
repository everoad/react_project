var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const { decrypt } = require("./utils/token.crypt");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(function(req, res, next) {
  console.log(`URL :: ${req.url}, BODY :: ${JSON.stringify(req.body)}`);
  if (req.body.token) {
    req.body.token = decrypt(req.body.token);
  }
  if (req.body.refresh_token) {
    req.body.refresh_token = decrypt(req.body.refresh_token);
  }
  next();
});

app.use("/api", indexRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.xhr) {
    res.json(err);
  } else {
    res.render("error");
  }
});

module.exports = app;
