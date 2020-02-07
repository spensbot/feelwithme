var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var vars = require('../config/vars');

const sessionParser = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: vars.cookieParams,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})

module.exports = sessionParser