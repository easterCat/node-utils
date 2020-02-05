var http = require('http');
var Router = require('../router');

var application = {
  $router: new Router(),
  get: function(path, fn) {
    return this.$router.get(path, fn);
  },
  listen: function() {
    var self = this;
    var server = http.createServer(function(req, res) {
      if (!res.send) {
        res.send = function(body) {
          res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
          res.end(body);
        };
      }
      return self.$router.handle(req, res);
    });

    return server.listen.apply(server, arguments);
  }
};

module.exports = application;
