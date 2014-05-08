/**
 * express setting
 * @param  {object} app     express app object
 * @param  {object} express express(connect) object
 * @return {void}           no special return value but basic setting
 */
module.exports = function (app, express) {
  var mongoStore = require('connect-mongo')(express.session);
  // all environments
  app.set('port', process.env.PORT || conf.port);
  app.set('views', conf.path.views);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.cookieParser(conf.key.cookie));
  app.use(express.session({ /* session parser */
    store: new mongoStore({
      url: conf.mongodb.uri,
      //stringify: false,
      expires: new Date(Date.now() + conf.timeout),
      stringify: false,
      // maxAge: conf.timeout,
      autoRemoveExpiredSession: true,
      auto_reconnect: true
    }),
    secret: conf.key.session,
    key: '_sid',
    cookie: {
      maxAge: conf.timeout
    }
  }));
  app.use(express.csrf());
  app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.locals.csrf = token;
    res.header('X-CSRF-Token', token); /* add csrf feature in response header */
    next();
  });
  app.use(function (req, res, next) {
    res.header('x-powered-by', ''); /* remove express x-power-by header */
    next();
  })
  app.use(app.router);
  app.use(express.static(conf.path.static));

  /* development only */
  if ('development' == app.get('env')) {
    app.locals.pretty = true;
    app.set('view cache', false);
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  }

  /* production */
  if ('production' === app.get('env')) {
    app.use(express.logger());
  }
}
