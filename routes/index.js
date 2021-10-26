const express = require('express')
const router = express.Router()
const { alreadyin, hidelogin } = require('../middlewares/auth')
const Video = require('../models/Video')
const passport = require('passport')


//show all stories
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ status: 'public' })
      .sort({ createdAt: 'desc' })
      .lean()
    res.render('show1', {

      videos,//this is me passing the data to the view
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
});

//Get the signup route
router.get('/signup', hidelogin, (req, res) => {
  res.render('signup', {
    layout: 'login'
  })
});

//GET the login route
router.get('/login', hidelogin, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));




//GET the dashboard
router.get('/dashboard', alreadyin, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).lean()
    res.render('dashboard', {

      //this view now has access to the data from database(hence can be looped through in nthat view)
      name: req.user.google.name || req.user.facebook.name || req.user.twitter.name || req.user.github.name,
      layout: 'dashboard',
      videos
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})


module.exports = router
