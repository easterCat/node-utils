/**
 * Created by easterCat on 2017/9/11.
 */
let http = require('http');
let url = require('url');
let exception = require('./exception.js');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    if (request.url !== '/favicon.ico') {
        pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');
        try {
            data = exception.expfun(0);
            response.write(data);
            response.end('1');
        } catch (err) {
            console.log('error:' + err);
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            response.write(err.toString());
            response.end('');
        }
        console.log('success');
    }
}).listen(5555);
console.log('http://127.0.0.1:5555');