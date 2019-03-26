/**
 * @Author : easterCat
 * @Date : 2019/3/26
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/26
 */

var Layer = require("./layer");

function Route(path) {
    this.path = path;
    this.stack = [];
    this.methods = {};
}

Route.prototype.handle_method = function (method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
};

Route.prototype.get = function (fn) {
    var layer = new Layer('/', fn);
    layer.method = "get";
    this.methods['get'] = true;
    this.stack.push(layer);
    return this;
};

Route.prototype.dispatch = function (req, res) {
    var self = this;
    var method = req.method.toLowerCase();
    var len = self.stack.length;
    for (var i = 0; i < len; i++) {
        if (method === self.stack[i].method) {
            return self.stack[i].handle_request(req, res);
        }
    }
};

module.exports = Route;
