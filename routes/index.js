module.exports = {
  defaults: function (req, res, next) {
    console.dir(res);
    res.render('index', {
      d: req
    });
    // req.app.get('jade-compiled-templates')[conf.path.views]({
    //   d: req
    // });
  },

  request: function (req, res, next) {
    var url = req.params.url ? decodeURIComponent(req.params.url) : 'http://tw.yahoo.com',
      jquery = util.fs.readFileSync(conf.path['static'] + '/js/jquery.js', 'utf-8');

    util.flow.exec(
      function () {
        util.request(url, this);
      },

      function (err, resp, body) {
        if (err || 200 !== resp.statusCode) {
          console.error(err);
          console.dir(err);
          return res.send(err);
        }

        util.jsdom.env({
          html: body,
          src: [jquery],
          jar: true,
          done: this
        });
      },

      function (err, win) {
        if (err) {
          console.error(err);
          console.dir(err);
          return res.send(err);
        }

        var $ = win.$;
        console.dir($('img').attr('src'));
        res.send($('img').attr('src'));
      }
    );
  }
};
