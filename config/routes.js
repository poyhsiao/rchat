var routes = {
  testlist: require(conf.path.libs + '/testlist'),
  user: require(conf.path.routes + '/user'),
  index: require(conf.path.routes + '/index')
};

module.exports = function (app) {
  /* User login page */
  app.get('/login', routes.user.login);
  app.post('/login', routes.user.checkLogin);

  /* register for a new user */
  app.get('/register', routes.user.register);
  app.post('/register', routes.user.registered);

  app.get('/request/:url?', routes.index.request);
  app.get('/', routes.testlist, routes.index.defaults);
};
