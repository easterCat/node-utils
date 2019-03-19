/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");
let qs = require("querystring");
let path = require("path");
let process = require("process");
let fs = require("fs");
let { write, append, remove, rename } = require("./file.js");
let { mkdir, readdir, rmdir } = require("./dir.js");

http
  .createServer((request, response) => {
    let pathname = url.parse(request.url).pathname;
    if (pathname !== "/favicon.ico") {
      router(pathname)(request, response);
    }
  })
  .listen(9527);

console.log("server running at http://127.0.0.1:9527/");

function router(p) {
  let router = {
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

      request.on("end", async () => {
        response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
        //username=liudehua&password=123456&remark=%E6%88%91%E6%98%AF%E5%88%98%E5%BE%B7%E5%8D%8E%2C%E6%88%91%E6%98%AF%E4%B8%80%E5%90%8D%E6%AD%8C%E6%89%8B
        //username=liudehua&password=123456&remark=我是刘德华,我是一名歌手
        let decodeData = decodeURIComponent(totalData); //解决中文乱码
        try {
          await write(path.join(__dirname, "/user.txt"), decodeData);
          response.end();
        } catch (err) {
          console.log(err);
          response.end();
        }
      });
    },
    "/append": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      await remove(path.join(__dirname, "/user.txt"));
      await append(
        path.join(__dirname, "/user.txt"),
        "我要向世界发出hello world"
      );
      await rename(
        path.join(__dirname, "/user.txt"),
        path.join(__dirname, "/new_name.txt")
      );
      response.end();
    },
    "/dir": (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });

      // ["图片", "文件", "书籍", "视频"].forEach(async item => {
      //   await mkdir(path.join(__dirname, `/${item}`));
      //   await write(
      //     path.join(__dirname, `/${item}/${item}.txt`),
      //     "我还是要向世界发出hello world"
      //   );
      //   console.log("我在里面");
      // });
      // console.log("我在外面");

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
    "/clear": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      ["图片", "文件", "书籍", "视频"].forEach(async item => {
        await rmdir(path.join(__dirname, `/${item}`));
      });
      response.end();
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

  !Object.keys(router).includes(p) && (p = "/404");

  return router[p];
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
