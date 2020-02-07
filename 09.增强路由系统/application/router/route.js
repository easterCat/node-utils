/**
 * @Author : easterCat
 * @Date : 2019/3/26
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/26
 */

var Layer = require('./layer');
var methods = require('./method');

function Route(path) {
  this.path = path;
  this.stack = [];
  this.methods = {};
}

Route.prototype.handle_method = function(method) {
  var name = method.toLowerCase();
  return !!this.methods[name];
};

methods.forEach(function(method) {
  Route.prototype[method] = function(fn) {
    var layer = new Layer(this.path, fn);
    layer.method = method;
    this.methods[method] = true;
    this.stack.push(layer);
    return this;
  };
});

Route.prototype.dispatch = function(req, res) {
  var self = this;
  var stack = self.stack;
  var method = req.method.toLowerCase();
  var len = stack.length;
  for (var i = 0; i < len; i++) {
    if (method === stack[i].method) {
      return stack[i].handle_request(req, res);
    }
  }
};

module.exports = Route;
