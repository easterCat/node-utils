/**
 * Created by easterCat on 2017/9/6.
 * 调用外部函数
 */

let http = require("http");
let otherfun = require("./otherFun.js");

http.createServer((request, response) => {
    response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
    if (request.url !== "/favicon.ico") {
        // otherfun.controller(request, response);
        // otherfun.call(request, response);
        //-------用字符串调用对应的函数---
        otherfun["controller"](request, response);
        otherfun["call"](request, response);
    }
}).listen(9999);
console.log("server running at http://127.0.0.1:9999/");
