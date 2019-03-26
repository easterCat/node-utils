var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var Extend = require("../Extend");
var xz = new Extend(1, 2);
var Mime = require("../utils/mime");
var getMime = Mime.getMime;
var File = require("../utils/file");
var stat = File.stat;
var public_path = path.join(__dirname, "../views/");
var static_path = path.join(__dirname, "../static/");
var app = require("../application/k")();

app.get("*", function (req, res) {
    res.writeHead(404, {"Content-Type": "text/plain;charset=utf-8"});
    res.end("404");
});

app.get("/", function (req, res) {
    readFile(
        res,
        path.join(public_path, "/index.html"),
        "text/html;charset=utf-8"
    );
});

app.post("/", function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    res.end('post');
});

app.listen(3333, function () {
    console.log("listen at localhost:3333");
});

function readFile(response, filePath, contentType) {
    response.writeHead(200, {"content-type": contentType});
    var stream = fs.createReadStream(filePath);
    stream.on("error", function (error) {
        response.writeHead(500, {"content-type": contentType});
        response.end("<h1>500 Server Error</h1>");
    });
    stream.pipe(response);
}

