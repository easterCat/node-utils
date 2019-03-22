/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");
let qs = require("querystring");
let path = require("path");
let process = require("process");
let fs = require("fs");
let { write, append, remove, rename } = require("./file.js");
let { mkdir, readdir, rmdir } = require("./dir.js");
let xz = require("./Extend");

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      router(pathname)(request, response);
    }
  })
  .listen(9527);

console.log("server running at http://127.0.0.1:9527/");

function router(p) {
  let router = {
    "/": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      response.end();
    },
    "/xz": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      xz.init();
      response.end();
    },
    "/404": (request, response) => {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404找不到相关文件");
    }
  };

  !Object.keys(router).includes(p) && (p = "/404");
  return router[p];
}
