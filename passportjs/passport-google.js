const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')


module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },

    //use async / await because of mongoose
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        'google.id': profile.id,
        'google.name': profile.displayName,
        'google.image': profile.photos[0].value,
      }

      try {
        let user = await User.findOne({ 'google.id': profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }));


  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

}

