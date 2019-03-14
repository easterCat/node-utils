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
  _events:
   [Object: null prototype] { end: [Function: resetHeadersTimeoutOnReqEnd] },
  _eventsCount: 1,
  _maxListeners: undefined,
  socket:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        onread: [Function: onStreamRead],
        onconnection: null,
        _consumed: true,
        [Symbol(owner)]: [Circular] },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { head: null, tail: null, length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        paused: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      [Object: null prototype] {
        end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     timeout: 120000,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        _consumed: true,
        onIncoming: [Function: bound parserOnIncoming],
        parsingHeadersStart: 0,
        [Symbol(isReused)]: false },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: true,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header:
         'HTTP/1.1 200 OK\r\nContent-type: text/html;charset=utf-8\r\nDate: Thu, 14 Mar 2019 02:55:31 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\n',
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        statusMessage: 'OK',
        statusCode: 200,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 8,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
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
  connection:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        onread: [Function: onStreamRead],
        onconnection: null,
        _consumed: true,
        [Symbol(owner)]: [Circular] },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { head: null, tail: null, length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        paused: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      [Object: null prototype] {
        end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     timeout: 120000,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        _consumed: true,
        onIncoming: [Function: bound parserOnIncoming],
        parsingHeadersStart: 0,
        [Symbol(isReused)]: false },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: true,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header:
         'HTTP/1.1 200 OK\r\nContent-type: text/html;charset=utf-8\r\nDate: Thu, 14 Mar 2019 02:55:31 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\n',
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        statusMessage: 'OK',
        statusCode: 200,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 8,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
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
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: false,
  headers:
   { host: '127.0.0.1:8888',
     connection: 'keep-alive',
     'cache-control': 'max-age=0',
     'upgrade-insecure-requests': '1',
     'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
     accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'accept-encoding': 'gzip, deflate, br',
     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,sw;q=0.7' },
  rawHeaders:
   [ 'Host',
     '127.0.0.1:8888',
     'Connection',
     'keep-alive',
     'Cache-Control',
     'max-age=0',
     'Upgrade-Insecure-Requests',
     '1',
     'User-Agent',
     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
     'Accept',
     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'Accept-Encoding',
     'gzip, deflate, br',
     'Accept-Language',
     'zh-CN,zh;q=0.9,en;q=0.8,sw;q=0.7' ],
  trailers: {},
  rawTrailers: [],
  aborted: false,
  upgrade: false,
  url: '/',
  method: 'GET',
  statusCode: null,
  statusMessage: null,
  client:
   Socket {
     connecting: false,
     _hadError: false,
     _handle:
      TCP {
        reading: true,
        onread: [Function: onStreamRead],
        onconnection: null,
        _consumed: true,
        [Symbol(owner)]: [Circular] },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: BufferList { head: null, tail: null, length: 0 },
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        paused: false,
        emitClose: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     _events:
      [Object: null prototype] {
        end: [Array],
        drain: [Array],
        timeout: [Function: socketOnTimeout],
        data: [Function: bound socketOnData],
        error: [Function: socketOnError],
        close: [Array],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 8,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     allowHalfOpen: true,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     _server:
      Server {
        _events: [Object],
        _eventsCount: 2,
        _maxListeners: undefined,
        _connections: 2,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        headersTimeout: 40000,
        _connectionKey: '6::::8888',
        [Symbol(IncomingMessage)]: [Function],
        [Symbol(ServerResponse)]: [Function],
        [Symbol(asyncId)]: 5 },
     timeout: 120000,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: bound onParserExecute],
        _headers: [],
        _url: '',
        socket: [Circular],
        incoming: [Circular],
        outgoing: null,
        maxHeaderPairs: 2000,
        _consumed: true,
        onIncoming: [Function: bound parserOnIncoming],
        parsingHeadersStart: 0,
        [Symbol(isReused)]: false },
     on: [Function: socketOnWrap],
     _paused: false,
     _httpMessage:
      ServerResponse {
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: true,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header:
         'HTTP/1.1 200 OK\r\nContent-type: text/html;charset=utf-8\r\nDate: Thu, 14 Mar 2019 02:55:31 GMT\r\nConnection: keep-alive\r\nTransfer-Encoding: chunked\r\n\r\n',
        _onPendingData: [Function: bound updateOutgoingData],
        _sent100: false,
        _expect_continue: false,
        statusMessage: 'OK',
        statusCode: 200,
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: null },
     [Symbol(asyncId)]: 8,
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]:
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

> request.url 在请求的时候会额外请求一个/favicon.ico,不过一般框架体系都会对这个进行处理

### response 对象

response 对象由 HTTP 服务器在内部创建,表示服务器端的 HTTP 回应。 它作为第二个参数传给 'request' 事

- writeHead: 用来写入 HTTP 回应的头信息
- end: 写入 HTTP 回应的具体内容
- write: 这会发送一块响应主体

### http 的响应

- setHeader(key, value)：指定 HTTP 头信息。
- write(str)：指定 HTTP 回应的内容。
- end()：发送 HTTP 回应。

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

> 路由就是根据不同的选择执行不同的代码

[Node.js http 文档](http://nodejs.cn/api/http.html)
[koajs](https://github.com/koajs/koa#readme)
[koa-docs-Zh-CN](https://github.com/demopark/koa-docs-Zh-CN)
[Http 模块](http://javascript.ruanyifeng.com/nodejs/http.html)
