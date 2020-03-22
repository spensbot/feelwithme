const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const User = require('../models/user');
const initializeUser = require('../utils/initializeUser');
const config = require('../config');

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  User.findById(_id, function (err, user) {
      done(err, user);
  });
});

passport.use(new SpotifyStrategy(
  {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: config.spotifyCallback
  },
  function (accessToken, refreshToken, expiresIn, profile, done) {
      User.findOne({ spotifyId: profile._json.id }, function (err, user) {
          if (err) { return done(err) }
          if (user) {
              return done(null, user)
          } else {
              let newUser = new User({})
              newUser.mapSpotifyObject(profile._json, accessToken, refreshToken, expiresIn)
              newUser.save(function (err, savedUser) {
                  if (err) { return done(err) }
                  initializeUser(savedUser).then(function(user){
                    return done(null, savedUser)
                  }).catch(function(err){
                    return done(err)
                  })
              });
          }
      })
  }
));
