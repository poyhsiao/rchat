var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

module.exports = {
  /* default server running port number */
  port: 20088,

  /* upload file / post file size */
  upload_limit: '10mb',

  /* all the pathes */
  path: {
    root: rootPath,
    views: rootPath + '/views',
    routes: rootPath + '/routes',
    'static': rootPath + '/public',
    libs: rootPath + '/libs',
    model: rootPath + '/model'
  },
  routes: __dirname + '/routes',

  /* express setting */
  express: __dirname + '/express',

  /* socket.io setting */
  socketio: __dirname + '/socket.io',

  /* mongodb / mongoose default setting */
  mongodb: {
    uri: 'mongodb://localhost:27017/realtime_match',
    options: {
      server: {
        /* connection pool */
        pollSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 500,
        auto_reconnect: true,
      },
    }
  },

  /* all the keys for cookie / session and others */
  key: {
    cookie: 'AS93zE',
    session: 'Va0Rpr'
  },

  /* live time for session */
  /* 1 hr */
  timeout: 60 * 60 * 1000
};
