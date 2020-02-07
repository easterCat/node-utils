## node 静态文件处理

一般后端进行静态文件处理都是使用 Apache nginx 等静态 web 服务器,但是既然使用 node 了,就用 node 实现以下静态服务器吧.

之前弄了不少充满艺术的数据,就弄个页面进行艺术欣赏吧

app.js

```
    "/": (request, response) => {
      response.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      let stream = fs.createReadStream(
        path.join(__dirname, "/views/index.html")
      );
      stream.on("error", function() {
        response.writeHead(500, { "content-type": "text/html;charset=utf-8" });
        response.end("<h1>500 Server Error</h1>");
      });
      stream.pipe(response);
    },
```

views/index.html/index.js/index.css

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>时尚风范</title>
    <link rel="stylesheet" href="./index.css" type="text/css" />
    <script src="./index.js"></script>
  </head>
  <body>
    <div class="img-list">
      <div class="header">我是写真集</header>
    </div>
  </body>
</html>
```

![01](https://github.com/easterCat/node-utils/blob/master/04.node%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6%E5%A4%84%E7%90%86/img/01.png?raw=true)
但是打开之后什么都不能看,css 和 js 在控制台都是 404 显示.因为服务器没有写相应的代码去处理这些文件,所以接收到请求,服务器也是一脸茫然,不知道究竟要干什么.

> 所有我们要对请求的资源做出相对应的回答,那怕是个 404

添加 css 和 js 的支持

```
"/index.css": (request, response) => {
      response.writeHead(200, { "content-type": "text/css;chartset=utf-8" });
      let stream = fs.createReadStream(
        path.join(__dirname, "/views/index.css")
      );
      stream.on("error", function() {
        response.writeHead(500, { "content-type": "text/html;charset=utf-8" });
        response.end("<h1>500 Server Error</h1>");
      });
      stream.pipe(response);
    },
    "/index.js": (request, response) => {
      response.writeHead(200, {
        "content-type": "text/javasvript;chartset=utf-8"
      });
      let stream = fs.createReadStream(
        path.join(__dirname, "/views/index.js")
      );
      stream.on("error", function() {
        response.writeHead(500, { "content-type": "text/html;charset=utf-8" });
        response.end("<h1>500 Server Error</h1>");
      });
      stream.pipe(response);
    },
```

这样就正常的加载和执行 css 和 js 了,但是代码灵活性不够,重复率太高.

## 静态资源服务器

#### 区分路由

```
...
if (pathname !== "/favicon.ico") {
  if (path.extname(pathname) === "") {
    router(pathname)(request, response);
  } else {
    assets(pathname)(request, response);
  }
}
...
```

添加静态资源处理

```
function assets(p) {
  let ext = path.extname(p);
  ext = ext ? ext.slice(1) : "unknown";
  let contentType = getMime(ext);
  contentType += ";charset=utf-8";
  let filePath;

  if (/image/.test(contentType)) {
    filePath = path.join(static_path, p);
  } else {
    filePath = path.join(public_path, p);
  }

  return async function(request, response) {
    try {
      let stats = await stat(filePath);
      if (stats && stats.isFile()) {
        readFile(response, filePath, contentType);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
```

#### 我们需要根据文件类型做相应处理

对不同的文件进行不同的响应头处理

```
module.exports = {
  getMime: function(ext) {
    let mime = {
      css: "text/css",
      gif: "image/gif",
      html: "text/html",
      ico: "image/x-icon",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "text/javascript",
      json: "application/json",
      pdf: "application/pdf",
      png: "image/png",
      svg: "image/svg+xml",
      swf: "application/x-shockwave-flash",
      tiff: "image/tiff",
      txt: "text/plain",
      wav: "audio/x-wav",
      wma: "audio/x-ms-wma",
      wmv: "video/x-ms-wmv",
      xml: "text/xml"
    };
    return mime[ext] || "text/plain";
  }
};
```

#### 加载相应的静态文件

```
function readFile(response, filePath, contentType) {
  response.writeHead(200, { "content-type": contentType });
  let stream = fs.createReadStream(filePath);
  stream.on("error", function() {
    response.writeHead(500, { "content-type": contentType });
    response.end("<h1>500 Server Error</h1>");
  });
  stream.pipe(response);
}
```

#### index.js

```
window.onload = function() {
  let path =
    "http://127.0.0.1:9527/mrw/%E5%B0%8F%E6%B2%AB%E7%90%B3%E3%80%8A%E8%8B%8F%E6%A2%85%E5%B2%9B%E6%97%85%E6%8B%8D%E5%86%99%E7%9C%9F%E3%80%8B%20[%E8%8A%B1%E3%81%AE%E9%A2%9CHuaYan]%20Vol.057%20%E5%86%99%E7%9C%9F%E9%9B%86/%E5%B0%8F%E6%B2%AB%E7%90%B3%E3%80%8A%E8%8B%8F%E6%A2%85%E5%B2%9B%E6%97%85%E6%8B%8D%E5%86%99%E7%9C%9F%E3%80%8B%20[%E8%8A%B1%E3%81%AE%E9%A2%9CHuaYan]%20Vol.057%20%E5%86%99%E7%9C%9F%E9%9B%86_image";

  let suffix = ".jpg";
  let content = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  content.setAttribute("class", "content");

  for (let i = 0; i < 56; i++) {
    let item = document.createElement("img");
    item.setAttribute("src", `${path}${i}${suffix}`);
    content.appendChild(item);
  }
  body.appendChild(content);
};
```

![02](https://github.com/easterCat/node-utils/blob/master/04.node%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6%E5%A4%84%E7%90%86/img/02.png?raw=true)

当然,正常的写真集不是这样做的,而是通过数据库存储硬盘路径存放地址,然后返回给前端 url+path 的形式,路径也不会这么长.这里只是处理静态文件.

## Docs

- [node 的 mime 模块](https://www.npmjs.com/package/mime)
- [常见的 MIME 类型](https://blog.csdn.net/daily886/article/details/79068844)
- [fs 模块 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/fs.html#toc8)
- [用原生 Node 实现一个静态 web 服务器](https://blog.csdn.net/weixin_37823121/article/details/82109562)

  声明:仅供学习,不可用于商业用途
