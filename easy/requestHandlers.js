/**
 * Created by easterCat on 2017/8/22.
 */
const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const baseUrl = __dirname;
const mine = require('./mine').types;

function init(response, req, pathname) {
    let absolutePath = __dirname + pathname;
    let realPath = path.join("dist", pathname);
    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            console.log(baseUrl);
            fs.readFile(`./dist/index.html`, "binary", function (err, file) {
                if (err) {
                    throw err;
                } else {
                    console.log()
                    let contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}

function start(response, request) {
    console.log("Request handler 'start' was called.");

    let body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    let form = new formidable.IncomingForm();
    form.uploadDir = `${baseUrl}`;//上传文件的保存路径
    form.keepExtensions = true;//保存扩展名
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        if (error) {
            throw error;
        }
        fs.renameSync(files.upload.path, `${baseUrl}/test.jpg`);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile(`${baseUrl}/test.jpg`, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/jpg"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.init = init;
exports.start = start;
exports.upload = upload;
exports.show = show;