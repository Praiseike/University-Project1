const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ 'github.id': profile.id });

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            'github.image': profile.photos[0].value,
            'github.name': profile.displayName,
            'github.id': profile.id,
          });

          const savedUser = await newUser.save();

          done(null, savedUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
  );
































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

