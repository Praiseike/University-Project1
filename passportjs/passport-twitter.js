const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User')

module.exports = function (passport) {

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
    function (req, token, tokenSecret, profile, done) {

      // asynchronous
      process.nextTick(function () {

        // check if the user is already logged in
        if (!req.user) {

          User.findOne({ 'twitter.id': profile.id }, function (err, user) {
            if (err)
              return done(err);

            if (user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.twitter.token) {
                newUser.facebook.id = profile.id;
                user.twitter.token = token;
                user.twitter.image = profile.photos[0].value
                user.twitter.name = profile.displayName;

                user.save(function (err) {
                  if (err)
                    return done(err);

                  return done(null, user);
                });
              }

              return done(null, user); // user found, return that user
            } else {
              // if there is no user, create them
              var newUser = new User();

              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.image = profile.photos[0].value
              newUser.twitter.name = profile.displayName;

              newUser.save(function (err) {
                if (err)
                  return done(err);

                return done(null, newUser);
              });
            }
          });

        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session

          user.twitter.id = profile.id;
          user.twitter.token = token;
          user.twitter.image = profile.photos[0].value
          user.twitter.name = profile.displayName;

          user.save(function (err) {
            if (err)
              return done(err);

            return done(null, user);
          });
        }

      });

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