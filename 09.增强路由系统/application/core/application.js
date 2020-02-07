var http = require('http');
var Router = require('../router');
var methods = require('../router/method');

function Application(params) {
  this.$router = new Router();
}

Application.prototype.listen = function() {
  var self = this;
  var server = http.createServer(function(req, res) {
    self.handle(req, res);
  });

  return server.listen.apply(server, arguments);
};

Application.prototype.handle = function(req, res) {
  var self = this;
  if (!res.send) {
    res.send = function(body) {
      res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
      res.end(body);
    };
  }
  self.$router.handle(req, res);
};

methods.forEach(function(method) {
  Application.prototype[method] = function(path, fn) {
    this.$router[method].apply(this.$router, arguments);
    return this;
  };
});

module.exports = Application;
