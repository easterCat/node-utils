## http 模块 与 hello world

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

### listen(port, host)

http.Server 实例的方法,为 connections 启动一个 server 监听

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

request 对象全部的绑定属性和方法,直接 console.log(request)

```
IncomingMessage {
  _readableState:
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: BufferList { head: null, tail: null, length: 0 },
     length: 0,
     pipes: null,
     pipesCount: 0,
     flowing: null,
     ended: false,
     endEmitted: false,
     reading: false,
     sync: true,
     needReadable: false,
     emittedReadable: false,
     readableListening: false,
     resumeScheduled: false,
     paused: true,
     emitClose: true,
     destroyed: false,
     defaultEncoding: 'utf8',
     awaitDrain: 0,
     readingMore: true,
     decoder: null,
     encoding: null },
  readable: true,
  .......
      Timeout {
        _called: false,
        _idleTimeout: 120000,
        _idlePrev: [Timeout],
        _idleNext: [TimersList],
        _idleStart: 108,
        _onTimeout: [Function: bound ],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(unrefed)]: true,
        [Symbol(asyncId)]: 9,
        [Symbol(triggerId)]: 8 },
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0 },
  _consuming: false,
  _dumped: false }
```

> request.url 在请求的时候会额外请求一个/favicon.ico,一般框架体系都会对这个进行处理

### response 对象

response 对象由 HTTP 服务器在内部创建,表示服务器端的 HTTP 回应。 它作为第二个参数传给 'request' 事

- writeHead: 用来写入 HTTP 回应的头信息
- end: 写入 HTTP 回应的具体内容
- write: 这会发送一块响应主体

### http 的响应

- setHeader(key, value)：指定 HTTP 头信息。
- write(str)：指定 HTTP 回应的内容。
- end()：发送 HTTP 回应。

### 处理 get 请求

get 参数在 request 的 url 属性上,通过 url.parse 将 url 转化为对象

```
http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      if(pathname==="/login"){
         response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
         response.write("我就是get");
         response.end();
      }
    }
  })
  .listen(8888, "localhost");
```

### 处理 post 请求

当客户端采用 POST 方法发送数据时，服务器端可以对 data 和 end 两个事件，设立监听函数,data 事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。end 事件则是在所有数据接收完成后触发

```
    "/login": (request, response) => {
      let totalData = "";
      request.on("data", data => {
        totalData += data;
      });

      request.on("end", () => {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        response.write(totalData); //username=liudehua&password=123456&remark=%E6%88%91%E6%98%AF%E5%88%98%E5%BE%B7%E5%8D%8E%2C%E6%88%91%E6%98%AF%E4%B8%80%E5%90%8D%E6%AD%8C%E6%89%8B
        response.end();
      });
    },
```

### 路由的简单应用

```
let http = require("http");

http
  .createServer((request, response) => {
    if (request.url !== "/favicon.ico") {
      if (request.url === "/") {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        response.end("你好,世界");
      } else if (request.url === "/login") {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        createForm(response);
        response.end("登录");
      } else if (request.url === "/register") {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        createForm(response);
        response.end("注册");
      } else {
        response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
        response.end("404找不到相关文件");
      }
    }
  })
  .listen(8888);

console.log("server running at http://127.0.0.1:8888/");

function createForm(response) {
  response.write("用户名:<input type='text' name='username'>");
  response.write("</br>");
  response.write("密码:<input type='text' name='password'>");
  response.write("</br>");
}
```

> 路由就是根据不同的选择执行不同的函数代码

### url.parse 方法

解析 URL 字符串并返回 URL 对象。如果 urlString 不是字符串，则抛出 TypeError。如果 auth 属性存在但无法解码，则抛出 URIError。

#### 语法

url.parse(urlStr, [parseQueryString], [slashesDenoteHost])

#### 参数

- urlStr:要解析的 URL 字符串
- parseQueryString:如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。 如果设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false
- slashesDenoteHost:如果设为 true，则 // 之后至下一个 / 之前的字符串会解析作为 host。 例如， //foo/bar 会解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 false。

```
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:8888',
  port: '8888',
  hostname: 'localhost',
  hash: null,
  search: '?username=liudehua&password=123456',
  query: 'username=liudehua&password=123456',
  pathname: '/login',
  path: '/login?username=liudehua&password=123456',
  href:
   'http://localhost:8888/login?username=liudehua&password=123456' }
```

#### 用处

```
//当路径为http://127.0.0.1:8888/register
console.log(pathname);// /register
console.log(request.url);// /register

//当路径为http://127.0.0.1:8888/register?username=liudehua&password=123456
console.log(pathname);// /register
console.log(request.url);// /register?username=liudehua&password=123456
```

#### 路由匹配

```
let http = require("http");
let url = require("url");

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      router(pathname)(request, response);
    }
  })
  .listen(8888, "localhost");

function router(path) {
  let router = {
    "/": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      response.end("你好,世界");
    },
    "/login": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end("登录");
    },
    "/register": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end("注册");
    },
    "/404": (request, response) => {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404找不到相关文件");
    }
  };

  !Object.keys(router).includes(path) && (path = "/404");

  return router[path];
}

function createForm(response) {
  response.write("用户名:<input type='text' name='username'>");
  response.write("</br>");
  response.write("密码:<input type='text' name='password'>");
  response.write("</br>");
}
```

之后分别输入 localhost:8888,localhost:8888/haha,localhost:8888/login,localhost:8888/register

## Docs

[Node.js http 文档](http://nodejs.cn/api/http.html)
[MDN HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
[koajs](https://github.com/koajs/koa#readme)
[koa-docs-Zh-CN](https://github.com/demopark/koa-docs-Zh-CN)
[Http 模块](http://javascript.ruanyifeng.com/nodejs/http.html)
[HTTP 消息头（HTTP headers）－常用的 HTTP 请求头与响应头](https://itbilu.com/other/relate/EJ3fKUwUx.html)
