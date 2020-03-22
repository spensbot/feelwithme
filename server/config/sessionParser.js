var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var config = require('../config');

const sessionParser = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24*5,
    secure: config.secureCookies,
    sameSite: "none"
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})

module.exports = sessionParser