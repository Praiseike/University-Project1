module.exports = {
  alreadyin: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();//normal process continues
    } else {
      res.redirect('/login')
    }
  },


  hidelogin: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      return next()
    }
  }
}



