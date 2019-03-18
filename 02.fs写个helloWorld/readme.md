## fs 模块与 hello world

Node.js 提供一组类似 UNIX（POSIX）标准的文件操作 API。 Node 导入文件系统模块(fs)。Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。最好使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞(重点)。对于流量较大的服务器，最好还是采用异步操作，同步操作时，只有前一个操作结束，才会开始后一个操作，如果某个操作特别耗时（常常发生在读写数据时），会导致整个程序停顿

### 常用方法

| 操作       | 异步方法                                       | 同步方法                                 |
| ---------- | ---------------------------------------------- | ---------------------------------------- |
| 打开文件   | fs.open(path, flags[, mode], callback)         | fs.openSync(path, flags[, mode])         |
| 文件信息   | fs.stat(path[, options], callback)             | fs.statSync(path[, options])             |
| 新建文件   | fs.appendFile(path, data[, options], callback) | fs.appendFileSync(path, data[, options]) |
| 写入文件   | fs.writeFile(file, data[, options], callback)  | fs.writeFileSync(file, data[, options])  |
| 读取文件   | fs.read()                                      |                                          |
| 读取文件   | fs.readFile(path[, options], callback)         | fs.readFileSync(path[, options])         |
| 关闭文件   | fs.close(fd, callback)                         | fs.closeSync(fd)                         |
| 截取文件   | fs.ftruncate(fd[, len], callback)              | fs.ftruncateSync(fd[, len])              |
| 删除文件   | fs.unlink(path, callback)                      | fs.unlinkSync(path)                      |
| 文件存在   | fs.stat() / fs.access()                        | fs.existsSync(path)                      |
| 监听文件   | fs.watchFile(filename[, options], listener)    |                                          |
| 停止监听   | fs.unwatchFile(filename[, listener])           |                                          |
| 打开大文件 | fs.createReadStream(path[, options])           |                                          |
| 写入大文件 | fs.createWriteStream(path[, options])          |                                          |
| 创建目录   | fs.mkdir(path[, options], callback)            | fs.mkdirSync(path[, options])            |
| 读取目录   | fs.readdir(path[, options], callback)          | fs.readdirSync(path[, options])          |
| 删除目录   | fs.rmdir(path, callback)                       | fs.rmdirSync(path)                       |

### form 信息创建文件

form 表单进行一个 post 提交,在浏览器打开 127.0.0.1:9527,此时输入表单信息,填写用户名/密码/备注等信息.点击提交之后会直接在当前目录下创建一个 user.txt 的文件,使用 writeFileSync()同步方法进行创建

writeFileSync()方法

```

function router(p) {
  ......
    "/": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      createForm(response);
      response.end();
    },
    "/login": (request, response) => {
      let totalData = "";
      request.on("data", data => {
        totalData += data;
      });

      request.on("end", () => {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        //username=liudehua&password=123456&remark=%E6%88%91%E6%98%AF%E5%88%98%E5%BE%B7%E5%8D%8E%2C%E6%88%91%E6%98%AF%E4%B8%80%E5%90%8D%E6%AD%8C%E6%89%8B
        //username=liudehua&password=123456&remark=我是刘德华,我是一名歌手
        let decodeData = decodeURIComponent(totalData); //解决中文乱码
        fs.writeFileSync(path.join(__dirname, "/user.txt"), decodeData);
        response.end();
      });
    },
   ......
}

function createForm(response) {
  response.write("<form method='post' action='login'>");
  response.write("<div>用户名:</div><input type='text' name='username'>");
  response.write("</br>");
  response.write("<div>密码:</div><input type='text' name='password'>");
  response.write("</br>");
  response.write(
    "<div>备注:</div><textarea rows='10' cols='30' name='remark'></textarea>"
  );
  response.write("</br>");
  response.write("<input type='submit' value='提交' />");
  response.write("</br>");
}
```

但是在 node 开发中,同步编程在使用上并没有什么优势,尤其文件读写操作使用异步更好一些

writeFile()的回调函数的形式进行文件写入

```
let decodeData = decodeURIComponent(totalData); //解决中文乱码
fs.writeFile(path.join(__dirname, "/user.txt"), decodeData, err => {
    if (err) throw err;
    response.end();
});
response.end();
```

javascript 在 es6 的之后的异步编程的形式发生了一些改变,promise 的引入让异步编程显得更加优雅

```
//创建file.js
let fs = require("fs");

module.exports = {
  write: function(filename, data, options) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, options, err =>
        err === null ? resolve(filename) : reject(err)
      );
    });
  }
};

//app.js
let decodeData = decodeURIComponent(totalData); //解决中文乱码
write(path.join(__dirname, "/user.txt"), decodeData)
    .then(res => {
    response.end();
    })
    .catch(err => {
    throw err;
    });
```

也可以使用 async/await 的方法将 promise 的异步执行转变为同步执行

```
      request.on("end", async () => {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        let decodeData = decodeURIComponent(totalData); //解决中文乱码
        await write(path.join(__dirname, "/user.txt"), decodeData);
        response.end();
      });
```

为什么有同步方法了,还是要先将回调用 promise 包装后再用 async/await 将其转为同步呢?await 会阻塞 async 异步函数，但是并没有阻塞主线程,async 本质上还是异步执行,只是看起来像是一个同步执行,我们可以继续并行执行,而同步方法 sync 则不能并行执行.

### appendFile 和 appendFileSync

异步地将数据追加到文件，如果文件尚不存在则创建该文件。 data 可以是字符串或 Buffer。

[Node.js fs 文档](http://nodejs.cn/api/fs.html)
[fs 模块](http://javascript.ruanyifeng.com/nodejs/fs.html#)
[nodejs-fs](http://www.runoob.com/nodejs/nodejs-fs.html)

