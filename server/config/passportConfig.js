const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const User = require('../models/user');
const initializeUser = require('../utils/initializeUser');
const config = require('./config');

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
      callbackURL: config.spotifyApi.callbackUrl
  },
  function (accessToken, refreshToken, expiresIn, profile, done) {
    findOrCreateUser(accessToken, refreshToken, expiresIn, profile, done)
    .then(function(user){
      return user
    })
    .catch(function(err){
      console.log(err)
      return null
    })
  }
));

async function findOrCreateUser(accessToken, refreshToken, expiresIn, profile, done){
  const user = await User.findOne({ spotifyId: profile._json.id })
  if (user) return done(null, user)

  const newUser = new User({})
  console.log(newUser)
  newUser.mapSpotifyObject(profile._json, accessToken, refreshToken, expiresIn)
  console.log(newUser)
  const startTime = Date.now()
  const initializedUser = await initializeUser(newUser)
  initializedUser.initializationTime = Date.now() - startTime
  
  return await initializedUser.save()
}