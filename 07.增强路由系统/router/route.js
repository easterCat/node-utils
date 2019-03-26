/**
 * @Author : easterCat
 * @Date : 2019/3/26
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/26
 */

var http = require("http");
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


//'get','post','put','head','delete','options','trace','copy','lock','mkcol','move','purge','propfind','proppatch','unlock','report','mkactivity','checkout','merge','m-search','notify','subscribe','unsubscribe','patch','search','connect'
http.METHODS.forEach(function (method) {
    method = method.toLowerCase();
    Route.prototype[method] = function (fn) {
        var layer = new Layer('/', fn);
        layer.method = method;

        this.methods[method] = true;
        this.stack.push(layer);

        return this;
    };
});

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
