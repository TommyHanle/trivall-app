var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/trips',
    failureRedirect: '/login'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/login');
  });
});
  
module.exports = router;