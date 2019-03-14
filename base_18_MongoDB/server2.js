/**
 * Created by easterCat on 2017/9/12.
 */
const express = require('express');
const app = express();

app.get('/', (request, response) => {
    console.log('这是主页get请求');
    response.send('hello get');
});

app.post('/', (request, response) => {
    console.log('这是主页post请求');
    response.send('hello post');
});

app.get('/del_user', (request, response) => {
    console.log('/del_user响应delete请求');
    response.send('删除')
});

app.get('/list_user', (request, response) => {
    console.log('/list_user这是用户列表');
    response.send('列表');
});

app.get('/abcd', (request, response) => {
    console.log('这是正则的列表');
    response.send('正则');
});

const server = app.listen(6789, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('http://%s:%s', host, port);
});