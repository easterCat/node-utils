/**
 * Created by easterCat on 2017/9/6.
 */

let http = require('http');
let url = require('url');
let Extend = require('./Extend');
let xz = new Extend(1, 2);

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== '/favicon.ico') {
      router(pathname)(request, response);
    }
  })
  .listen(9527);
console.log('server running at http://127.0.0.1:9527/');

function router(p) {
  let router = {
    '/': (request, response) => {
      response.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
      response.end();
    },
    '/xz': async (request, response) => {
      response.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
      await xz.init(response);
      response.end();
    },
    '/404': (request, response) => {
      response.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
      response.end('404找不到相关文件');
    }
  };
  !Object.keys(router).includes(p) && (p = '/404');
  return router[p];
}
