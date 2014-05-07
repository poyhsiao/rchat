/**
 * mongo / mongoose initial processor
 * @return {void}   no special return value but event toggle
 */
module.exports = function () {
  var mongoose = require('mongoose'),
    db;

  require(conf.path.model + '/model')(mongoose);

  mongoose.connect(conf.mongodb.uri, conf.mongodb.options);

  db = mongoose.connection;

  db.on('connecting', function () {
    console.info('connection to Mongodb');
  });

  db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });

  db.on('connected', function () {
    console.info('MongoDB connected!');
    evt.emit('mongo');
  });

  db.once('open', function () {
    console.info('MongoDB connection opened!');
  });

  db.on('reconnected', function () {
    console.info('MongoDB reconnected!');
  });

  db.on('disconnected', function () {
    console.info('MongoDB disconnected!');
    mongoose.connect(conf.mongodb.uri, conf.mongodb.options);
  });
};
