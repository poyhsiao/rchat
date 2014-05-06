module.exports = {
  /**
   * Generate a unique id, number, hex, or binary
   * @param  {[string]} opt ['dec', 'hex', 'bin', 'oct'], may refer to https://github.com/T-PWK/biguint-format
   * @return {[string, number, hex, binary]}     depends on opt, opt default is dex
   */
  getUID: function (opt) {
    var flakeIdGen = require('flake-idgen'),
      biguint = require('biguint-format'),
      gen = new flakeIdGen,
      option = opt || 'dec';

    return biguint(gen.next(), option);
  }
};
