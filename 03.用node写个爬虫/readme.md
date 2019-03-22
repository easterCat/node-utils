## 寻找爬取的目标

首先我们需要一个坚定的目标,于是找个一个比较好看一些网站,将一些信息统计一下,比如 url/tag/title/number...等信息

![1](https://github.com/easterCat/node-utils/blob/master/03.%E7%94%A8node%E5%86%99%E4%B8%AA%E7%88%AC%E8%99%AB/img/1.png?raw=true)

```
init(1, 2); //设置页数,现在是1-2页

async function init(startPage, endPage) {
  for (let i = startPage; i <= endPage; i++) {
    await getAndSaveImg(i);
  }
    .....
}
```

> 一般网站都会进行一些反爬虫处理,这时候就需要一个 ip 代理池进行 ip 伪装了.

## 网络请求

使用一个 nodejs 的模块 request,这个模块可以让 node 的 http 请求变的更加简单,同时支持 http/https 请求还可以将任何请求输出到文件流.

```
request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
```

#### 使用 request 封装个方法进行请求

新建 utils/ajax.js

```
let request = require("request");

module.exports = {
  handleRequestByPromise
};

function handleRequestByPromise(options) {
  let op = Object.assign(
    {},
    {
      url: "",
      method: "GET",
      encoding: null,
      header: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        Referer: "https://www.meituri.com"
      }
    },
    options
  );

  if (op.url === "") {
    throw new Error("请求的url地址不正确");
  }

  const promise = new Promise(function(resolve, reject) {
    request(op, (err, response, body) => {
      if (err) reject(err);

      if (response && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(`请求✿✿✿${url}✿✿✿失败`);
      }
    });
  });

  return promise;
}
```

## cheerio

[官网](https://cheerio.js.org/)

爬虫需要抓取页面上特定的信息.需要依据一些标识符去拿到想要的信息,不如 id.比如 class.cheerio 就是这么一个工具,将网站信息转化成可以直接用 jquery 的 dom 进行提取的一个模块.cheerio 的出现就是用于服务端需要对 dom 进行操作的地方.

基本使用

```
let cheerio = require('cheerio');
let $ = cheerio.load("<div id='helloworld'>hello world</div>", {ignoreWhitespace: true...})
```

options 用来进行一些特别的定制[更多](https://github.com/fb55/htmlparser2/wiki/Parser-options)

#### 选择器

基本和 jquery 一样

- \$( selector, [context], [root] )

```
$(".helloworld").text();
```

#### 属性操作

- .attr(name, value)
- .removeAtrr(name)
- .hasClass(className)
- .addClass(className)
- .remoteClass([className])

#### 遍历

- .find(selector)
- .parent()
- .next()
- .prev()
- .siblings()
- .children( selector )
- .each( function(index, element) )
- .map( function(index, element) )
- .filter( selector )
- .filter( function(index) )
- .first()
- .last()
- .eq(i)

#### 操作 DOM

- .append( content, [content, ...] )
- .prepend( content, [content, ...] )
- .after( content, [content, ...] )
- .before( content, [content, ...] )
- .remove( [selector] )
- .replaceWith( content )
- .empty()
- .html( [htmlString] )
- .text( [textString] )

#### 其他

- \$.html()
- \$('ul').text()
- .toArray()
- .clone()
- \$.root()
- \$.contains( container, contained )

在项目中使用

```
  let homeBody = await handleRequestByPromise({ url: pageImgSetUrl });
  let $ = cheerio.load(homeBody);
  let lis = $(".hezi li");
```

上面就是将获取的 html 数据通过 cheerio 转化后,可以直接使用\$符号进行类似 dom 的使用方法.特别适合前端使用

## iconv-lite

有些时候,获取到的数据是一些乱码,尤其是中文的情况.所以我们需要解决乱码的问题,iconv-lite 模块就可以解决这一问题.

```
homeBody = iconv.decode(homeBody,"GBK"); //进行gbk解码
```

如果乱码就在 cheerio.load()之前进行解码.(这次用的网站并没有乱码).原因是

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> //这里是utf-8
```

如果是 gbk 或者 gbk2312 等就需要解码了

## 爬取流程

1. 找寻目标
2. 控制台查看 dom 的信息存放或标识符(id,class,element)
3. 爬取 title,url,tag,num 等信息进行存放
4. 进行下载(如果只需要链接其实可以不下载,不过许多网站对图片外部引入有限制)
5. 入库(mysql)
6. 弄个 html 进行图片查看(简易写真集网站)

#### 初始化

还是创建一个本地服务器,异步没有使用 async 模块,而是直接使用 es6 的 async/await 语法.

```
let http = require("http");
let url = require("url");
let Extend = require("./Extend");
let xz = new Extend(1, 2);

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
      response.end();
    },
    "/xz": async (request, response) => {
      response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
      await xz.init(response);
      response.end();
    },
    "/404": (request, response) => {
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("404找不到相关文件");
    }
  };
  !Object.keys(router).includes(p) && (p = "/404");
  return router[p];
}

```

#### 分析页面

直接右键在控制台中查看就好了,看看 class,id 什么,cheerio 实现的 jquery 的 dom 相关的 api 十分强大,直接\$("")就行

#### 进行网站的分析和抓取

开始进行网站数据的分析和爬取,如果乱码就在 cheerio 操作之前进行解码就行了,这样通过一个变量将爬取的数据全部保存起来.也可以创建相应的文件夹和 txt 文件进行保存(writeFile),还可以直接在这里就将数据保存到数据库.(看心情)

```
async getAndSaveImg(page) {
    let pageImgSetUrl = ``;

    if (page === 1) {
      pageImgSetUrl = `${this.siteUrl}`;
    } else {
      pageImgSetUrl = `${this.siteUrl}${page}.html`;
    }

    let homeBody = await handleRequestByPromise({ url: pageImgSetUrl });
    let $ = cheerio.load(homeBody);
    let lis = $(".hezi li");

    for (let i = 0; i < lis.length; i++) {
      let config = {
        href: lis
          .eq(i)
          .find("a")
          .eq(0)
          .attr("href"),
        num: lis
          .eq(i)
          .find(".shuliang")
          .text(),
        title: lis
          .eq(i)
          .find(".biaoti a")
          .text()
          .replace(/\//, "")
      };

      config.childs = [];

      let num = Number(config.num.substr(0, 2));
      for (let j = 1; j <= num; j++) {
        let link = config.href.replace(
          this.collectUrl,
          "https://ii.hywly.com/a/1/"
        );
        let a_link = `${link}${j}.jpg`;
        config.childs.push(a_link);
      }
      this.all.push(config);
    }
  }
```

![3](https://github.com/easterCat/node-utils/blob/master/03.%E7%94%A8node%E5%86%99%E4%B8%AA%E7%88%AC%E8%99%AB/img/3.png?raw=true)

#### 进行图片的下载

开始进行图片的下载,并且创建相应的文件夹进行保存

```
async downloadAllImg() {
    let length = this.all.length;

    for (let index = 0; index < length; index++) {
      let childs = this.all[index].childs;
      let title = this.all[index].title;

      if (childs) {
        let c_length = childs.length;
        for (let c = 0; c < c_length; c++) {
          if (!fs.existsSync(`mrw`)) {
            fs.mkdirSync(`mrw`);
          }

          if (!fs.existsSync(`mrw/${title}`)) {
            fs.mkdirSync(`mrw/${title}`);
          }

          await super.downloadImg(
            childs[c],
            `mrw/${title}/${title}_image${c}.jpg`
          );

          console.log(
            "DownloadThumbsImg:",
            title,
            "SavePath:",
            `mrw/${title}/${title} image${c}.jpg`
          );
        }
      }
    }
  }
```

![2](https://github.com/easterCat/node-utils/blob/master/03.%E7%94%A8node%E5%86%99%E4%B8%AA%E7%88%AC%E8%99%AB/img/2.png?raw=true)
![4](https://github.com/easterCat/node-utils/blob/master/03.%E7%94%A8node%E5%86%99%E4%B8%AA%E7%88%AC%E8%99%AB/img/4.png?raw=true)

#### 下载完之后存入数据库

下载 mysql 模块进行 mysql 数据库操作

```
const fs = require("fs");
const mysql = require("mysql");
const path_dir = "D:\\data\\wwwroot\\xiezhenji.web\\static\\mrw\\";
const connection = mysql.createConnection({
  host: "xxxx",
  port: "xxxx",
  user: "xiezhenji",
  password: "iJAuzTbdrDJDswjPN6!*M*6%Ne",
  database: "xiezhenji"
});

module.exports = {
  insertImg
};

function insertImg() {
  connection.connect();

  let files = fs.readdirSync(path_dir, {
    encoding: "utf-8"
  });

  files.forEach((file, index) => {
    let cover_img_path = `/mrw/mrw_${index + 1}/image_1`;

    insert([
      "美女",
      file,
      Number(files.length),
      file,
      cover_img_path,
      `mrw/mrw_${index + 1}`,
      `mrw_${index + 1}`
    ]);
  });
}

function insert(arr) {
  let sql = `INSERT INTO photo_album_collect(tags,name,num,intro,cover_img,dir,new_name) VALUES(?,?,?,?,?,?,?)`;
  let sql_params = arr;

  connection.query(sql, sql_params, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }
    console.log("--------------------------SELECT----------------------------");
    console.log(result);
    console.log(
      "------------------------------------------------------------\n\n"
    );
  });
}
```

## Docs

- [superagent](https://www.npmjs.com/package/superagent)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [async](https://www.npmjs.com/package/async)
- [request](https://www.npmjs.com/package/request)
- [iconv-lite](https://www.npmjs.com/package/iconv-lite)
- [download](https://www.npmjs.com/package/download)
- [Node.js Request+Cheerio 实现一个小爬虫-番外篇：代理设置](https://www.jianshu.com/p/fb2ea27d8587)
- [nodejs 爬取网页出现乱码的解决方案](https://cnodejs.org/topic/5034b141f767cc9a51baf9b0)
- [Nodejs 爬取 10G 妹子套图 cheerio](https://segmentfault.com/a/1190000009735225)

  声明:仅供学习,不可用于商业用途