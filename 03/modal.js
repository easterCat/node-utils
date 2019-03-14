/**
 * Created by easterCat on 2017/9/6.
 */
let http = require("http");
let Teacher = require("./Teacher.js");

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    if (request.url !== "/favicon.ico") {
        //清除第2此访问
        teacher = new Teacher(1, "乐达", 32);
        teacher.teach(response);
        teacher.enter();
        response.end("over");
    }
}).listen(1234);

console.log("server running at http://127.0.0.1:1234");
