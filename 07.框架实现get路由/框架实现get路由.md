# 简易 express

## 实现 get 路由

```js
http.createServer(function(req, res) {});
```

#### 在底层

- 一个 http 请求主要包括请求行、请求头和消息体，nodejs 将常用的数据封装为 http.IncomingMessage 类，在上面的代码中 req 就是该类的一个对象。
- 每个 http 请求都会对应一个 http 响应。一个 http 响应主要包括状态行、响应头、消息体，nodejs 将常用的数据封装为 http.ServerResponse 类，在上面的代码中 res 就是该类的一个对象。
- 不仅仅是 nodejs，基本上所有的 http 服务框架都会包含 request 和 response 两个对象，分别代表着 http 的请求和响应，负责服务端和浏览器的交互。

#### 在上层

- 服务器后台代码根据 http 请求的不同，绑定不同的逻辑。在真正的 http 请求来临时，匹配这些 http 请求，执行与之对应的逻辑，这个过程就是 web 服务器基本的执行流程。
- 对于这些 http 请求的管理，有一个专有名词 —— “路由管理”，每个 http 请求就默认为一个路由，常见的路由区分策略包括 URL、HTTP 请求名词等等，但不仅仅限定这些，所有的 http 请求头上的参数其实都可以进行判断区分，例如使用 user-agent 字段判断移动端。
- 不同的框架对于路由的管理规则略有不同，但不管怎样，都需要一组管理 http 请求和业务逻辑映射的函数，测试用例中的 get 函数就是路由管理中的一个函数，主要负责添加 get 请求。

## 实现路由

一个路由的基本属性

- path 请求路径，例如：/books、/books/1。
- method 请求方法，例如：GET、POST、PUT、DELETE。
- handle 处理函数。

#### 创建一个 router 数组，负责管理所有路由映射。

```js
// cor/router/index.js
function Router() {
  this.stack = [
    {
      path: '*',
      method: '*',
      handle: function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('404');
      }
    }
  ];
}

module.exports = Router;
```

#### 修改 application 的 listen

修改 listen 函数，将 http 请求拦截逻辑改为匹配 router 路由表，如果匹配成功，执行对应的 handle 函数，否则执行 router[0].handle 函数。

```js
// core/application.js
var http = require('http');
var Router = require('../router');

var application = {
  $router: new Router(),
  listen: function() {
    var server = http.createServer(function(req, res) {
      var len = this.$router.stack.length;
      var stack = this.$router.stack;
      for (var i = 1; i < len; i++) {
        if (
          (req.url === stack[i].path || stack[i].path === '*') &&
          (req.method === stack[i].method || stack[i].method === '*')
        ) {
          return stack[i].handle && stack[i].handle(req, res);
        }
      }
      return stack[0].handle && stack[0].handle(req, res);
    });
    return server.listen.apply(server, arguments);
  },
  get: function(path, fn) {
    this.$router.stack.push({
      path: path,
      method: 'get',
      handle: fn
    });
  }
};

module.exports = application;
```

实现完之后我们想要把一些内容渲染到页面上

```js
// core/application.js
 var server = http.createServer(function(req, res) {
      if (!res.send) {
        res.send = function(body) {
          res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
          res.end(body);
        };
      }
 .......
 }
```

#### 启动服务

```js
// test/test.js

var app = require('../application/core/kiana')();
var port = 3333;

app.get('/hello', function(req, res) {
  res.send('hello world');
});

app.get('/world', function(req, res) {
  res.send('世界你好');
});

app.listen(port, function() {
  console.log('listen at localhost:' + port);
});
```

最终访问 localhost:3333/hello 和 world,查看输入的不同内容
