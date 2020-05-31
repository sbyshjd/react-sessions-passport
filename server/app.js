require('dotenv').config();
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const User = require('./models/user');

const session = require('express-session');

const connection = require('./config/database');
const MongoStore = require('connect-mongo')(session);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  // collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    ttl: 24 * 60 * 60, // 1 day,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
require('./config/passport')(passport);
app.use(passport.initialize());

app.use(passport.session());

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};
app.use(cors(corsOption));

const authRoutes = require('./routes/authRoutes');
app.use('/api/', authRoutes);
module.exports = app;
