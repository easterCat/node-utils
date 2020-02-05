/**
 * @Author : easterCat
 * @Date : 2019/3/26
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/26
 */

var Layer = require('./layer');

function Route(path) {
  this.path = path;
  this.stack = [];
  this.methods = {};
}

Route.prototype.handle_method = function(method) {
  var name = method.toLowerCase();
  return !!this.methods[name];
};

Route.prototype.get = function(fn) {
  var layer = new Layer(this.path, fn);
  layer.method = 'get';
  this.methods['get'] = true;
  this.stack.push(layer);
  return this;
};

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
