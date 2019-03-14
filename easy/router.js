/**
 * Created by easterCat on 2017/8/22.
 */

function route(handle, pathname, response, request) {
    console.log(`About route a request on ${pathname}`);
    //将处理函数关联数组赋值
    let func = handle[pathname];
    if (typeof func === 'function') {
        return func(response, request, pathname);
    } else {
        console.log(`No request handler has be found for ${pathname}`);
        response.writeHead(404, {'Content-type': 'text/plain'});
        response.write(`404 not found`);
        response.end(`server running at port 3333`);
    }
}

exports.route = route;