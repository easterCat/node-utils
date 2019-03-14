/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      router(pathname)(request, response);
    }
  })
  .listen(8888, "localhost");

function router(path) {
  let router = {
    "/": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      response.end("你好,世界");
    },
    "/login": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end("登录");
    },
    "/register": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end("注册");
    },
    "/404": (request, response) => {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404找不到相关文件");
    }
  };

  !Object.keys(router).includes(path) && (path = "/404");

  return router[path];
}

function createForm(response) {
  response.write("用户名:<input type='text' name='username'>");
  response.write("</br>");
  response.write("密码:<input type='text' name='password'>");
  response.write("</br>");
}
