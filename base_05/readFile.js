/**
 * Created by easterCat on 2017/9/6.
 */

let http = require('http');
let openFile = require('../base_05/openFile.js');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    if (request.url !== '/favicon.ico') {
        console.log('访问');
        response.write('hello');
        // openFile.readFile(`E:/easterCat_nodejs/base_05/a.txt`);
        openFile.readfileSync(`E:/easterCat_nodejs/base_05/a.txt`);
        response.end('end');
    }
}).listen(3456);

console.log(`server running at http://127.0.0.1:3456`);
