/**
 * Created by easterCat on 2017/9/6.
 */
let url = require("url");
let router = require('./router');
let http = require("http");

const port = 3333;

http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {"Content-type": "text/html;charset=utf8"});

    if (request.url !== "/favicon.ico") {
        let pathname = url.parse(request.url).pathname;

        console.log(pathname);

        pathname = pathname.replace(/\//, "");

        if (router[pathname]) {
            router[pathname](request, response);
        } else {
            response.end("\r\n没有找到该接口", "utf-8");
        }
    }
}).listen(port);

console.log(`本地服务器创建成功=>localhost:${port}`);


