## http 与 hello world

### hello world

```
let http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
    if (request.url !== "/favicon.ico") {
      response.write("<b>hello world</>");
      response.write("</br>");
      response.end("<i>你好,世界</i>");
    }
  })
  .listen(8888);

console.log("server running at http://127.0.0.1:8888/");
```

首先引入 http 模块,然后调用 http 的 createServer 方法,创建一个服务器,最后调用 listen 监听一个端口.createServer 的第一个参数是一个函数,函数中接收 request 和 response 作为两个参数.
打开浏览器输入http://127.0.0.1:8888/就可以看到hello world

### http

要使用 HTTP 服务器和客户端,必须 require('http').http 模块主要用于搭建 HTTP 服务.

### http.createServer()

createServer 直接 new 一个 http.Server 的实例，传入回调函数，然后再返回新建的 http.Server 实例

### request 对象

createServer 的文档是 http.createServer([options][, requestlistener]),request 对象是 createServer 方法中回调函数的第一个参数,自带一些属性和方法来获取客户端的请求信息和读取客户端请求的数据

- method: 客户端请求方式
- url: 请求的地址
- headers: 客户端发送的请求头信息
- httpVersion: HTTP 请求版本
- trailers: 客户端发送的 trailers 对象信息。只有 IncommingMessage 对象的 end 事件触发后才能读取到该信息。
- socket: 服务器端监听客户端请求的 socket 对象。
- data 事件： 当服务器接收到客户端发送的请求数据时触发 data 事件。
- end 事件： 当客户端发送给服务器数据执行完毕时触发 end 事件。

### response 对象

response 对象由 HTTP 服务器在内部创建,表示服务器端的 HTTP 回应。 它作为第二个参数传给 'request' 事

- writeHead: 用来写入 HTTP 回应的头信息
- end: 写入 HTTP 回应的具体内容
- write: 这会发送一块响应主体

### http 的响应

- setHeader(key, value)：指定 HTTP 头信息。
- write(str)：指定 HTTP 回应的内容。
- end()：发送 HTTP 回应。

[Node.js http 文档](http://nodejs.cn/api/http.html)
[koajs](https://github.com/koajs/koa#readme)
[koa-docs-Zh-CN](https://github.com/demopark/koa-docs-Zh-CN)
[Http 模块](http://javascript.ruanyifeng.com/nodejs/http.html)
