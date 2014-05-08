module.exports = {
  /**
   * User login page (only for display)
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Boolean || Object}        Will return false if no data available or render page
   */
  login: function (req, res, next) {
    res.render("login", {
      s: res,
      d: req
    });
  },

  checkLogin: function (req, res, next) {
    res.redirect(301, '/');
  },

  /**
   * Sign-in processor
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Boolean || Object}        Will return false if signin fail or render page to default
   */
  signin: function (req, res, next) {

  },

  /**
   * Social login / check login
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Object}        Will return to default page or login page if fail
   */
  social: function (req, res, next) {

  },

  /**
   * Only work for social login(OAuth / OpenID )
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {type}        Will return to login page if fail or redirect to default page
   */
  socialCallback: function (req, res, next) {

  },

  /**
   * Register display page for local account register
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Object}        Will reload page if fail or redirect vaildate page
   */
  register: function (req, res, next) {
    var mongoose = require('mongoose'),
      userModel = mongoose.model('user');

    userModel.find({
      username: 'kimhsiao'
    }, function (err, dat) {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.render('register', {
      r: res,
      d: req
    });
  },

  /**
   * Process register information and register
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Object}        Only process register information will return default page when success or go back to register display page
   */
  registered: function (req, res, next) {
    var mongoose = require('mongoose'),
      userSchema = mongoose.model('user'),
      keys = ['username', 'nickname', 'password', 'gender', 'birthdate'],
      rest = null,
      that = this;

    rest = util._.difference(keys, util._.keys(req.body));

    util.flow.exec(
      function () {
        if (util._.isArray(rest)) {
          if (rest.length > 0) { /* some data is insufficient */
            console.error('cannot tell the upload data');
            return that.register(req, res, next); /* return back to register page */
          } else {
            this();
          }
        } else {
          /* some error occured */
          console.error('Register data is not correct');
          return that.register(req, res, next); /* return back to register page */
        }
      },

      function () { /* check if username or nickname is existed in db */
        var me = this;
        checkAccount([{
          'username': req.body.username
        }, {
          'nickname': req.body.nickname
        }], function (o) {
          if (false === o) {
            var msg = 'Username or nickname exists';
            console.log(msg);
            req['errorMSG'] = [{
              message: msg
            }];
          }
        });
        this();
      },

      function () {
        if (util._.has(req, 'errorMSG')) {
          return this();
        } else {
          console.dir(rest);
          var obj = {}; /* clean object for store */
          keys.forEach(function (v, k) {
            console.log(v);
            obj[v] = req.body[v];
          });

          var user = new userSchema(obj);
          user.save(function (err) {
            if (err) {
              console.log('fail to add new user');
              cosnole.error(err);
            }
          });
          this();
        }
      },

      function () {
        if (util._.has(req, 'errorMSG')) {
          module.exports.register(req, res);
        } else {
          res.redirect('/');
        }
      }
    );
  },

  /**
   * Logout user will redirect back to login page or default page
   * @param  {Object}   req  Request object
   * @param  {Object}   res  Response object
   * @param  {Function} next Callback function
   * @return {Object}        Will redirect to login page or default page
   */
  logout: function (req, res, next) {

  }
};

/**
 * Check if account/nickname is exist in db
 * @param  {Array}   account {username/nickname: value}
 * @param  {Function} next    callback function, and if the parameter is true then the account is available
 * @return {Function}         will return callback function
 */
function checkAccount(account, next) {
  var mongoose = require('mongoose'),
    userModel = mongoose.model('user');
  if (util._.isArray(account)) {
    if (account > 1) {
      cond = userModel.findOne({
        "$or": account
      });
    } else {
      cond = userModel.findOne(account[0]);
    }

    cond.exec(function (err, dat) {
      if (err) {
        console.error(err);
        return next(false);
      }
      if (null !== dat) {
        return next(false);
      } else {
        return next(true);
      }
    });
  } else {
    return next(false);
  }
}
