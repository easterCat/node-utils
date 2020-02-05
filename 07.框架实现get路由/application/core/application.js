var http = require('http');
var url = require('url');
var Router = require('../router');

var application = {
  $router: new Router(),
  listen: function() {
    var self = this;
    var server = http.createServer(function(req, res) {
      if (!res.send) {
        res.send = function(body) {
          res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
          res.end(body);
        };
      }

      var len = self.$router.stack.length;
      var stack = self.$router.stack;
      var pathname = url.parse(req.url).pathname;
      for (var i = 1; i < len; i++) {
        if (
          (pathname === stack[i].path || stack[i].path === '*') &&
          (req.method === stack[i].method || stack[i].method === '*')
        ) {
          return stack[i].handle && stack[i].handle(req, res);
        }
      }
      return stack[0].handle && stack[0].handle(req, res);
    });
    return server.listen.apply(server, arguments);
  },
  get: function(path, fn) {
    this.$router.stack.push({
      path: path,
      method: 'GET',
      handle: fn
    });
  }
};

module.exports = application;
