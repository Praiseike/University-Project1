const express = require('express')
const passport = require('passport')
const router = express.Router()


//google auth route
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

//facebook auth route
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

//twitter auth route
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

//github auth route
router.get('/github',
  passport.authenticate('github'));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });



router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})










module.exports = router
