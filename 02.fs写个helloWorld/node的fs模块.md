## fs 模块

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
| 重命名文件 | fs.rename(oldPath, newPath, callback)          | fs.renameSync(oldPath, newPath)          |
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

此时可以使用 try...catch 进行错误捕获了

```
try {
  await write(path.join(__dirname, "/user.txt"), decodeData);
  response.end();
} catch (err) {
  console.log(err);
  response.end();
}
```

为什么有同步方法了,还是要先将回调用 promise 包装后再用 async/await 将其转为同步呢?await 会阻塞 async 异步函数，但是并没有阻塞主线程,async 本质上还是异步执行,只是看起来像是一个同步执行,我们可以继续并行执行,而同步方法 sync 则不能并行执行.

### 追加内容 appendFile 和 appendFileSync

将数据追加(在最后接着写入)到文件,如果文件尚不存在则创建该文件.data 可以是字符串或 Buffer.buffer 内容是十六进制信息的 ASCII 码

和 writeFile 不同是,writeFile 也是将内容写入文件,也是文件不存在就创建,但是文件存在的话,writeFile 写入的内容会直接覆盖原有内容,而 appendFile 是追加内容.所以新建内容还是 writeFile 比较好.

修改 file.js

```
  append: function(filename, data, options) {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, data, options, err =>
        err === null ? resolve(filename) : reject(err)
      );
    });
  }
```

修改 app.js

```
let { write, append } = require("./file.js");

......
 "/append": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      await append(
        path.join(__dirname, "/user.txt"),
        "我要向世界发出hello world"
      );
      response.end();
    },
```

打开 user.txt 就发现文件的内容是 "username=我是好人&password=123456&remark=今天我要做一件事情我要向世界发出 hello world"

### 删除文件 fs.unlink 和 fs.unlinkSync

修改 file.js

```
  remove: function(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, err => (err === null ? resolve(path) : reject(err)));
    });
  }
```

修改 app.js

```
    "/append": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      await remove(path.join(__dirname, "/user.txt"));
      await append(
        path.join(__dirname, "/user.txt"),
        "我要向世界发出hello world"
      );
      response.end();
    },
```

这样 user.txt 中内容只有"我要向世界发出 hello world"了,可以看出来是删除文件后重新写入的

### 文件重命名 fs.rename()

还是修改 file.js

```
  rename: function(oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, err =>
        err === null ? resolve([oldPath, newPath]) : reject(err)
      );
    });
  }
```

然后再 app.js 中执行

```
 await rename(
        path.join(__dirname, "/user.txt"),
        path.join(__dirname, "/new_name.txt")
      );
```

### 文件夹操作 mkdir,rmdir,readdir

mkdir 接受三个参数，第一个是目录名，第二个是权限值，第三个是回调函数
readdir 方法用于读取目录，返回一个所包含的文件和子目录的数组
rmdir 接收一个 path 参数用于删除文件夹

新建 dir.js

```
let fs = require("fs");

module.exports = {
  mkdir: function(path, options) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, options, err =>
        err === null ? resolve(path) : reject(err)
      );
    });
  },
  readdir: function(path, options) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, options, (err, files) =>
        err === null ? resolve(files) : reject(err)
      );
    });
  },
  rmdir: function(path) {
    return new Promise((resolve, reject) => {
      fs.rmdir(path, err => (err === null ? resolve(path) : reject(err)));
    });
  }
```

还是在 app.js 中调用

```
    "/dir": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });

      ["图片", "文件", "书籍", "视频"].forEach(async item => {
        await mkdir(path.join(__dirname, `/${item}`));
        await write(
          path.join(__dirname, `/${item}/${item}.txt`),
          "我还是要向世界发出hello world"
        );
        console.log("我在里面");
      });
      console.log("我在外面");
      response.end();
    },
```

文件夹此时创建成功了,控制台也会输入"我在外面,我在里面,我在里面,我在里面,我在里面".

在使用同步写一次

```
"/dir": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });

      ["图片", "文件", "书籍", "视频"].forEach(async item => {
        fs.mkdirSync(path.join(__dirname, `/${item}`));
        fs.writeFileSync(
          path.join(__dirname, `/${item}/${item}.txt`),
          "我还是要向世界发出hello world"
        );
        console.log("我在里面");
      });
      console.log("我在外面");
      response.end();
    },
```

然后控制台输出是"我在里面,我在里面,我在里面,我在里面,我在外面",async/await 的同步终究是个异步,只是在代码块中执行像同步

![01](https://github.com/easterCat/node-utils/blob/master/02.fs%E5%86%99%E4%B8%AAhelloWorld/img/01.png?raw=true)

### 文件夹操作 readdir

```
    "/file": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      let dir_path = process.cwd();
      let files = await readdir(dir_path);

      let str = `<ul>${files
        .map(item => {
          return `<li><a href="/${item}">${item}</a></li>`;
        })
        .join("")}</ul>`;
      response.write(str);
      response.end();
    },
```

![02](https://github.com/easterCat/node-utils/blob/master/02.fs%E5%86%99%E4%B8%AAhelloWorld/img/02.png?raw=true)

### 文件夹操作 rmdir

空文件夹直接删除

```
    "/clear": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      ["图片", "文件", "书籍", "视频"].forEach(async item => {
        await rmdir(path.join(__dirname, `/${item}`));
      });
      response.end();
    },
```

不为空的文件夹是无法直接删除的,删除的是文件而不是文件夹也会报错.

## Docs

[Node.js fs 文档](http://nodejs.cn/api/fs.html)
[fs 模块](http://javascript.ruanyifeng.com/nodejs/fs.html#)
[nodejs-fs](http://www.runoob.com/nodejs/nodejs-fs.html)
[fs-extra](https://www.npmjs.com/package/fs-extra)
