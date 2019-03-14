/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
    if (request.url !== "/favicon.ico") {
      response.write("<b>hello world</>");
      response.write("</br>");
      response.end("<i>你好,世界</i>");
    }
  })
  .listen(8888);

console.log("server running at http://127.0.0.1:8888/");
