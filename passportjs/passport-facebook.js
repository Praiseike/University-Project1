const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User')


module.exports = function (passport) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos']
  },

    function (token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function () {
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
          // if the user is found, then log them in
          if (user) {
            console.log("user found")
            console.log(user)
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();
            // set all of the facebook information in our user model
            newUser.facebook.id = profile.id; // set the users facebook id                   
            newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
            newUser.facebook.name = profile.displayName// look at the passport user profile to see how names are returned
            newUser.facebook.image = profile.photos[0].value
            newUser.save(function (err) {
              if (err)
                throw err;
              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      })
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

