/**
 * Created by easterCat on 2017/9/11.
 */


let http = require('http');
let optFile = require('./optFile');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    if (request.url !== "/favicon.ico") {
        console.log('welcome');
        optFile.readImg('C:/Users/Administrator/Desktop/u=905788449,1574547104&fm=214&gp=0.jpg', response);
        console.log('continue');
    }
}).listen(2222);
console.log('http://127.0.0.1:2222');