var fs = require('fs'),
  testdir = conf.path.root + '/views/test';

module.exports = function (req, res, next) {
  fs.readdir(testdir, function (err, files) {
    if (err || !files.length) {
      console.error('test list error');
      console.dir(err);
      next();
    }
    var filename = [];
    files.forEach(function (v, k) {
      var f = v.split('.html');
      filename.push(f[0]);
    });

    req.test = {
      filename: filename,
      files: files
    };

    next();
  });
};
