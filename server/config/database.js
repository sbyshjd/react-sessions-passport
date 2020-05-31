const mongoose = require('mongoose');

require('dotenv').config();

const devConnection = process.env.MONGODB_URI;

const connection = mongoose.createConnection(devConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

connection.on('connected', () => {
  console.log('Database connected');
});

module.exports = connection;
