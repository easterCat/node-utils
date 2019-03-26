var http = require("http");
var Router = require("../router");


function Application() {
    this._router = new Router();
}

Application.prototype.listen = function (port, callback) {
    var self = this;
    var server = http.createServer(function (req, res) {
        self.handle(req, res);
    });
    return server.listen.apply(server, arguments);
};

Application.prototype.handle = function (req, res) {
    this._router.handle(req, res);
};

http.METHODS.forEach(function (method) {
    method = method.toLowerCase();
    Application.prototype[method] = function (path, fn) {
        this._router[method].apply(this._router, arguments);
        return this;
    };
});

module.exports = Application;
