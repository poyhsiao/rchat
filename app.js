/**
 * Module dependencies.
 */

var express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  events = require('events').EventEmitter;

global.conf = require(__dirname + '/config/config');

global.util = {
  path: require('path'),
  flow: require('flow'),
  _: require('underscore'),
  request: require('request'),
  jsdom: require('jsdom'),
  fs: require('fs'),
  df: require('dateformat'),
  misc: require(conf.path.libs + '/misc')
};

global.evt = new events();

/* express setting */
require(conf.express)(app, express);

/* routing setting */
require(conf.routes)(app);

/* initial mongo / mongoose object */
require(conf.path.model + '/mongo')();

evt.once('mongo', function () {
  /* socket.io */
  require(conf.socketio)(io);
  console.info('socket.io is running...');

  server.listen(conf.port);
  console.info('server is running on port ' + conf.port + '...');
});
