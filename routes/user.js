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

    userModel.find({username: 'kimhsiao'}, function(err, dat) {
      if(err) {
        console.error(err);
        return ;
      }
      console.dir(dat);
    });

    var kim = new userModel({
      username: 'kimhsiao',
      password: '1234',
      nickname: 'Kim',
      gender: true,
      birthday: '1979/05/24'
    });

    kim.save(function (err) {
      if (err) {
        console.error(err);
        return false;
      }

      res.render('register', {
        d: req
      });
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
      userSchema = mongoose.model('user', user);
    console.dir(userSchema);
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
