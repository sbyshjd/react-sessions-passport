const mongoose = require('mongoose');
const connection = require('../config/database');
const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  providerId: String,
  provider: String,
  name: String,
  imageUrl: String,
  admin: Boolean,
});
const User = connection.model('User', UserSchema);
module.exports = User;
