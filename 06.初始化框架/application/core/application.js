var http = require('http');

var application = {
  listen: function() {
    var server = http.createServer(function(req, res) {});
    return server.listen.apply(server, arguments);
  }
};

module.exports = application;
