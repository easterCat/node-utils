## node 随便爬一下

首先我们需要一个坚定的目标,于是找个一个比较好看一些网站,将一些信息统计一下,比如 url/tag/title/number...等信息

![1]()
![2]()

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

## Docs

- [superagent](https://www.npmjs.com/package/superagent)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [async](https://www.npmjs.com/package/async)
- [request](https://www.npmjs.com/package/request)
- [iconv-lite](https://www.npmjs.com/package/iconv-lite)
- [download](https://www.npmjs.com/package/download)
