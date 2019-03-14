/**
 * Created by easterCat on 2017/9/11.
 */

let http = require('http');
let url = require('url');
let router = require('./router.js');

http.createServer((request, response) => {
    if (request.url !== "/favicon.ico") {
        pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');
        console.log(pathname);
        router[pathname](request, response);
    }
}).listen(3333);
console.log('http:127.0.0.1:3333');