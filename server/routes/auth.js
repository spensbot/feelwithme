var express = require('express')
var router = express.Router()
var passport = require('passport')
//CUSTOM
var config = require('../config')

//Here we direct the user to spotify, and tell spotify what information we want to access.
router.get('/spotify', passport.authenticate('spotify', {
    scope: ['user-top-read']
}));

//If the user logs in, spotify will redirect them to this callback url.
//At this point, we have an api access token for the user, and the user is stored in req.session.
//A cookie is also created and sent to the user for future authorization
router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect(config.appUrl)
    }
);

//Disables the persistant user session created by passport.
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect(config.appUrl);
});

module.exports = router;