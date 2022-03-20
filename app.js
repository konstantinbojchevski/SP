require("dotenv").config({path:'.env'});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require("passport");
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pettany",
      version: "1.0.0",
      description: "Pettany REST API"
    },
    servers: [
      { url: "http://localhost:3000/api" },
      // { url: "https://pettany.herokuapp.com/api" }
    ]
  },
  apis: [
    `${__dirname}/app_api/models/Ads.js`,
    `${__dirname}/app_api/models/payments.js`,
    `${__dirname}/app_api/models/userProfiles.js`,
    `${__dirname}/app_api/models/users.js`,
    `${__dirname}/app_api/routes/index.js`,
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

require("./app_api/models/db");
require("./app_api/configuration/passport");
require("./app_server/views/helpers/hbsh.js");

// var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
var indexApi = require('./app_api/routes/index');

var app = express();

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.header("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// view engine setup
// app.set('views', path.join(__dirname, "app_server", 'views'));
app.use("/ABI", express.static(path.join(__dirname, "app_dapp", "build", "contracts")));
app.use("/web3", express.static(path.join(__dirname, "app_web3")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "@truffle", "contract", "dist")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "web3", "dist")));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());
app.use(session({secret: "Shh, its a secret!"}));

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


// app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api', indexApi);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
});

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError")
    res.status(401).json({message: err.name + ": " + err.message + "."})
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

