var http = require("http");
var Layer = require("./layer");
var Route = require("./route");

function Router() {
  this.stack = [];
}

http.METHODS.forEach(function(method) {
  method = method.toLowerCase();
  Router.prototype[method] = function(path, fn) {
    var route = this.route(path);
    route[method].call(route, fn);

    return this;
  };
});

Router.prototype.route = function route(path) {
  var route = new Route(path);
  var layer = new Layer(path, function(req, res) {
    route.dispatch(req, res);
  });
  layer.route = route;
  this.stack.push(layer);
  return route;
};

Router.prototype.handle = function(req, res) {
  var self = this;
  var method = req.method;
  var url = req.url;
  var len = self.stack.length;

  for (var i = 1; i < len; i++) {
    if (
      self.stack[i].match(url) &&
      self.stack[i].route &&
      self.stack[i].route.handle_method(method)
    ) {
      return self.stack[i].handle_request(req, res);
    }
  }

  return self.stack[0].handle_request(req, res);
};

module.exports = Router;
