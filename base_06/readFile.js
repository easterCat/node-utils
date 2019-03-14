/**
 * Created by easterCat on 2017/9/6.
 */

let http = require('http');
let writeFile = require('../base_06/writeFile.js');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    if (request.url !== '/favicon.ico') {
        console.log('访问');
        response.write('hello');
        writeFile.writeFile(`E:/easterCat_nodejs/base_06/a.txt`, 'hello file');
        writeFile.writeFileSync(`E:/easterCat_nodejs/base_06/a.txt`, 'hello file sync');
        response.end('end');
    }
}).listen(3456);

console.log(`server running at http://127.0.0.1:3456`);
