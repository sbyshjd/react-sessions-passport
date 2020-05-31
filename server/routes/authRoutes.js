const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const { hashPassword, issueJWT } = require('../config/utils');
const isAuth = require('../authMiddleware').isAuth;
const isAdmin = require('../authMiddleware').isAdmin;
const mongoose = require('mongoose');

const makeLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('user', user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        error: req.error,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    });
  })(req, res, next);
};

router.post('/login', makeLogin);

router.get('/logout', async (req, res, next) => {
  req.logout();
  return res.status(200).json({
    success: true,
    user: null,
  });
});
router.get('/protected', isAuth, (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.get('/islogged', isAuth, (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.get('/protected-admin', isAdmin, (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.post(
  '/register',
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        error: 'Incorrect email/password combination',
      });
    }

    try {
      let existingUser = await User.findOne({ email: email });
      console.log('existingUser', existingUser);
      if (existingUser) {
        return res.status(422).json({
          success: false,
          error: 'Incorrect email/password combination',
        });
      }
      const saltHash = await hashPassword(password);

      const newUser = new User({
        email: req.body.email,
        hash: saltHash,
        admin: false,
      });
      console.log('newUser', newUser);
      let user = await newUser.save();
      console.log('user', user);
      next();
    } catch (err) {
      console.log('catch', err);
      return res.status(500).json({ success: false, msg: err });
    }
  },
  makeLogin
);

module.exports = router;
