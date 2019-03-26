function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || "<anonymous>";
    this.path = path;
}

Layer.prototype.handle_request = function (req, res) {
    var fn = this.handle;
    fn && fn(req, res);
};

Layer.prototype.match = function (path) {
    return path === this.path || path === "*";
};


module.exports = Layer;
