const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../models/user');
const { verifyPassword } = require('./utils');

const customFields = {
  usernameField: 'email',
};

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(customFields, async (email, password, done) => {
      let error = null;
      let user = null;
      try {
        user = await User.findOne({ email });
        if (user) {
          const isValid = await verifyPassword(password, user.hash);

          if (!isValid) {
            error = 'email/password not valid';
            user = null;
          }
        } else {
          error = 'email/password not valid';
        }
      } catch (err) {
        error = err;
      }
      return done(error, user);
    })
  );
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { imageUrl, id, ...rest } = profile;

        let user = null;
        let error = null;
        try {
          let existingUser = await User.findOne({ providerId: id });

          if (existingUser) {
            user = existingUser;
          } else {
            const verifiedEmail =
              profile.emails.find((email) => email.verified) ||
              profile.emails[0];
            const newUser = new User({
              email: verifiedEmail.value,
              hash: null,
              name: profile.name.givenName,
              providerId: id,
              provider: 'Google',
              imageUrl,
              admin: true,
            });
            let savedUser = await newUser.save();
            user = savedUser;
          }
        } catch (err) {
          error = err;
        }
        return done(error, user);
      }
    )
  );
};
