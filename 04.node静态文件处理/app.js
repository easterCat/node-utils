/**
 * Created by easterCat on 2017/9/6.
 */

let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let Extend = require('./Extend');
let xz = new Extend(1, 2);
let { getMime } = require('./utils/mime');
let { stat } = require('./utils/file');
let public_path = path.join(__dirname, '/views/');
let static_path = path.join(__dirname, '/static/');

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    pathname = decodeURI(pathname);
    if (pathname !== '/favicon.ico') {
      if (path.extname(pathname) === '') {
        router(pathname)(request, response);
      } else {
        assets(pathname)(request, response);
      }
    } else {
      response.end();
    }
  })
  .listen(9529);
console.log('server running at http://127.0.0.1:9529/');

function router(p) {
  let router = {
    '/': (request, response) => {
      readFile(response, path.join(__dirname, '/views/index.html'), 'text/html;charset=utf-8');
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

function assets(p) {
  let ext = path.extname(p);
  ext = ext ? ext.slice(1) : 'unknown';
  let contentType = getMime(ext);
  contentType += ';charset=utf-8';
  let filePath;

  if (/image/.test(contentType)) {
    filePath = path.join(static_path, p);
  } else {
    filePath = path.join(public_path, p);
  }

  return async function(request, response) {
    try {
      let stats = await stat(filePath);
      if (stats && stats.isFile()) {
        readFile(response, filePath, contentType);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

function readFile(response, filePath, contentType) {
  response.writeHead(200, { 'content-type': contentType });
  let stream = fs.createReadStream(filePath);
  stream.on('error', function() {
    response.writeHead(500, { 'content-type': contentType });
    response.end('<h1>500 Server Error</h1>');
  });
  stream.pipe(response);
}
