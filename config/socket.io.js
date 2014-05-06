/**
 * Socket.io configuration
 * @param  {object} io socket.io object
 * @return {void}      No spcecial return but controller of socket.io
 */
module.exports = function (io) {
  io.set('log level', 1);
  io.set('browser client minification', true);
  io.set('browser client etag', true);
  io.sockets.on('connection', function (socket) {
    socket.emit('news', {
      hello: 'world'
    });
    socket.on('my other event', function (dat) {
      console.dir(dat);
    });

    socket.on('newtext', function (dat) {
      console.info('newtext broadcast: ');
      console.dir(dat);
      socket.broadcast.emit('newtext', dat);
    });
  });
};
