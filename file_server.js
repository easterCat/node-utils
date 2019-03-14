const fs = require("fs"),
    url = require("url"),
    path = require("path"),
    http = require("http");

let root = path.resolve(process.argv[2] || ".");
console.log(`static root dir ${root}`);

let server = http.createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    let filepath = path.join(root, pathname);
    console.log(`pathname is ${pathname}`);
    console.log(`filepath is ${filepath}`);
    fs.stat(filepath, function(err, stats) {
        if (!err && stats.isFile()) {
            console.log(`200 ${request.url}`);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log(`404 ${request.url}`);
            response.writeHead(404);
            response.end(`404 not found`);
        }
    });
});

server.listen(4444);
console.log(`server is running at http://127.0.0.1:4444`);
