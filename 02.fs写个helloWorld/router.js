/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");
let qs = require("querystring");

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      router(pathname)(request, response);
    }
  })
  .listen(9527);

console.log("server running at http://127.0.0.1:9527/");

function router(path) {
  let router = {
    "/": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end();
    },
    "/login": (request, response) => {
      let totalData = "";
      request.on("data", data => {
        totalData += data;
      });

      request.on("end", () => {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        //username=liudehua&password=123456&remark=%E6%88%91%E6%98%AF%E5%88%98%E5%BE%B7%E5%8D%8E%2C%E6%88%91%E6%98%AF%E4%B8%80%E5%90%8D%E6%AD%8C%E6%89%8B
        //username=liudehua&password=123456&remark=我是刘德华,我是一名歌手
        let decodeData = decodeURIComponent(totalData); //解决中文乱码用的
        let parseData = qs.parse(decodeData);
        response.write(parseData);
        response.write("</br>");
        response.write(decodeData);
        response.end();
      });
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
  response.write("<form method='post' action='login'>");
  response.write("<div>用户名:</div><input type='text' name='username'>");
  response.write("</br>");
  response.write("<div>密码:</div><input type='text' name='password'>");
  response.write("</br>");
  response.write(
    "<div>备注:</div><textarea rows='10' cols='30' name='remark'></textarea>"
  );
  response.write("</br>");
  response.write("<input type='submit' value='提交' />");
  response.write("</br>");
}
