/**
 * Created by easterCat on 2017/8/22.
 */
const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(4444);
    console.log('server has started 4444');
}
exports.start = start;
