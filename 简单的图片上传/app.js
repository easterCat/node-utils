/**
 * Created by easterCat on 2017/8/22.
 */

const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

let handle = {};

//路由列表
handle['/'] = requestHandlers.init;
handle['/index'] = requestHandlers.init;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.start(router.route, handle);
