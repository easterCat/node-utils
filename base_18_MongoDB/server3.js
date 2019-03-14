/**
 * Created by easterCat on 2017/9/12.
 */
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
    console.log('hello world');
    response.send('hello world');
});

const server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});