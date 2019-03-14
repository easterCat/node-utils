## fs 模块与 hello world

Node.js 提供一组类似 UNIX（POSIX）标准的文件操作 API。 Node 导入文件系统模块(fs)。Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。最好使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞(重点)。对于流量较大的服务器，最好还是采用异步操作，同步操作时，只有前一个操作结束，才会开始后一个操作，如果某个操作特别耗时（常常发生在读写数据时），会导致整个程序停顿

### 常用方法

| 操作       | 异步方法                                      | 同步方法                                |
| ---------- | --------------------------------------------- | --------------------------------------- |
| 打开文件   | fs.open(path, flags[, mode], callback)        | fs.openSync(path, flags[, mode])        |
| 文件信息   | fs.stat(path[, options], callback)            | fs.statSync(path[, options])            |
| 写入文件   | fs.writeFile(file, data[, options], callback) | fs.writeFileSync(file, data[, options]) |
| 读取文件   | fs.read()                                     |                                         |
| 读取文件   | fs.readFile(path[, options], callback)        | fs.readFileSync(path[, options])        |
| 关闭文件   | fs.close(fd, callback)                        | fs.closeSync(fd)                        |
| 截取文件   | fs.ftruncate(fd[, len], callback)             | fs.ftruncateSync(fd[, len])             |
| 删除文件   | fs.unlink(path, callback)                     | fs.unlinkSync(path)                     |
| 文件存在   | fs.stat() / fs.access()                       | fs.existsSync(path)                     |
| 监听文件   | fs.watchFile(filename[, options], listener)   |                                         |
| 停止监听   | fs.unwatchFile(filename[, listener])          |                                         |
| 打开大文件 | fs.createReadStream(path[, options])          |                                         |
| 写入大文件 | fs.createWriteStream(path[, options])         |                                         |
| 创建目录   | fs.mkdir(path[, options], callback)           | fs.mkdirSync(path[, options])           |
| 读取目录   | fs.readdir(path[, options], callback)         | fs.readdirSync(path[, options])         |
| 删除目录   | fs.rmdir(path, callback)                      | fs.rmdirSync(path)                      |

[Node.js fs 文档](http://nodejs.cn/api/fs.html)
[fs 模块](http://javascript.ruanyifeng.com/nodejs/fs.html#)
[nodejs-fs](http://www.runoob.com/nodejs/nodejs-fs.html)
