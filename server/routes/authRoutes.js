const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const { hashPassword, issueJWT } = require('../config/utils');
const isAuth = require('../authMiddleware').isAuth;
const isAdmin = require('../authMiddleware').isAdmin;
const mongoose = require('mongoose');
const Multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();

const uploader = new Multer({
  storage: multerS3({
    s3: s3,
    bucket: 'poc-ironhack',
    acl: 'public-read',
    key: function (req, files, cb) {
      cb(null, Date.now().toString());
    },
  }),
}).single('profile');

router.patch('/profile', isAuth, uploader, async (req, res, next) => {
  console.log(req.file);
  console.log(req.file.location);
  console.log(req.user);
  let user = req.user;
  // let existingUser = await User.findOne({ id: req.user.id });
  user.imageUrl = req.file.location;
  await user.save();
  console.log(user);
  return res.status(200).json({
    success: true,
    user,
  });
});
const makeLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json({
        success: false,
        error: req.error,
      });
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
router.get('/protected-next-level', isAdmin, (req, res, next) => {
  return res.status(200).json({
    success: true,
    description: 'You are a google account. Magic is here ✨',
    image: 'https://magomagomago.s3-us-west-2.amazonaws.com/admin.png',
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

      await newUser.save();
      next();
    } catch (err) {
      return res.status(500).json({ success: false, msg: err });
    }
  },
  makeLogin
);
router.post(
  '/login/google',
  passport.authenticate('google-token'),
  async (req, res) => {
    if (req.error) {
      return res.status(401).json({
        success: false,
        user: null,
      });
    } else {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    }
  }
);

module.exports = router;
