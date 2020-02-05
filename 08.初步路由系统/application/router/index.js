var url = require('url');
var Layer = require('./layer');
var Route = require('./route');

function Router() {
  this.stack = [
    new Layer('*', function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('404');
    })
  ];
}

Router.prototype.get = function(path, fn) {
  var route = this.route(path);
  route.get(fn);
  return this;
};

Router.prototype.handle = function(req, res) {
  var len = this.stack.length;
  var stack = this.stack;
  var pathname = url.parse(req.url).pathname;
  var method = req.method;

  for (var i = 1; i < len; i++) {
    if (stack[i].match(pathname) && stack[i].route && stack[i].route.handle_method(method)) {
      return stack[i].handle_request(req, res);
    }
  }
  return stack[0].handle_request(req, res);
};

Router.prototype.route = function(path) {
  var route = new Route(path);
  var layer = new Layer(path, function(req, res) {
    route.dispatch(req, res);
  });
  layer.route = route;
  this.stack.push(layer);
  return route;
};

module.exports = Router;
