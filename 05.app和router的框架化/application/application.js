var http = require("http");
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var Extend = require("../Extend");
var xz = new Extend(1, 2);
var { getMime } = require("../utils/mime");
var { stat } = require("../utils/file");
var public_path = path.join(__dirname, "../views/");
var static_path = path.join(__dirname, "../static/");

var router = [
  {
    path: "*",
    method: "*",
    handle: function(request, response) {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404");
    }
  },
  {
    path: "/",
    method: "GET",
    handle: function(request, response) {
      readFile(
        response,
        path.join(public_path, "/index.html"),
        "text/html;charset=utf-8"
      );
    }
  },
  {
    path: "/xz",
    method: "GET",
    handle: async function(request, response) {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      await xz.init(response);
      response.end();
    }
  },
  {
    path: "/404",
    method: "GET",
    handle: function(request, response) {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404找不到相关文件");
    }
  }
];

var application = {
  get: function(path, fn) {
    router.push({
      path: path,
      method: "GET",
      handle: fn
    });
  },
  listen: function() {
    var server = http.createServer(function(req, res) {
      var len = router.length;
      for (var i = 1; i < len; i++) {
        if (
          (req.url === router[i].path || router[i].path === "*") &&
          (req.method === router[i].method || router[i].method === "*")
        ) {
          return router[i].handle && router[i].handle(req, res);
        }
      }

      return router[0].handle && router[0].handle(req, res);
    });

    return server.listen.apply(server, arguments);
  }
};

function readFile(response, filePath, contentType) {
  response.writeHead(200, { "content-type": contentType });
  let stream = fs.createReadStream(filePath);
  stream.on("error", function(error) {
    console.log(error);
    response.writeHead(500, { "content-type": contentType });
    response.end("<h1>500 Server Error</h1>");
  });
  stream.pipe(response);
}

module.exports = application;
