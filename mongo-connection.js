const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/spotify';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error',
console.log('error'));
db.once('open', () => {
  console.log('connected to mongodb');
});

module.exports = db;
