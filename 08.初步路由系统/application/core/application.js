var http = require('http');
var Router = require('../router');

var application = {
  _router: new Router(),
  get: function(path, fn) {
    return this._router.get(path, fn);
  },
  listen: function() {
    var self = this;

    var server = http.createServer(function(req, res) {
      return self._router.handle(req, res);
    });

    return server.listen.apply(server, arguments);
  }
};

module.exports = application;
