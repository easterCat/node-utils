/**
 * Created by easterCat on 2017/9/11.
 */
let http = require("http");
let url = require("url");
let router = require("./router");
http.createServer(function(request, response) {
    if (request.url !== "/favicon.ico") {
        pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, ""); //替换掉前面的/
        try {
            router[pathname](request, response);
        } catch (err) {
            console.log("出错=" + err);
            response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            response.write(err);
            response.end("");
        }
        console.log("server执行完毕");
    }
}).listen(4455);
console.log("Server running at http://127.0.0.1:4455/");
