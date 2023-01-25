var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
  failureRedirect: '/login'
  }),
  function(req, res) {
  res.redirect('/users/' + req.user._id + '/trips');
  }
);

  
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/login');
  });
});
  
module.exports = router;