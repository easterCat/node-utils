/**
 * Created by easterCat on 2017/9/11.
 */
let optfile = require("./optfile");
let url = require("url");
let querystring = require("querystring"); //post需导入
let util = require("utils");

module.exports = {
    login: function(req, res) {
        //--------get方式接收参数----------------
        /*
         var    rdata    =    url.parse(req.url,true).query;
         console.log(rdata);
         if(rdata['email']!=undefined){
         console.log(rdata['email']);
         }
         */
        //-------post方式接收参数----------------

        let post = ""; //定义了一个post变量，用于暂存请求体的信息
        req.on("data", function(chunk) {
            //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunk;
        });
        //-------注意异步-------------
        req.on("end", function() {
            //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
            post = querystring.parse(post);
            if (post.email && post.pwd) {
                // 输出提交的数据
                res.write("网站名：" + post.email);
                res.write("<br>");
                res.write("网站 URL：" + post.pwd);
            } else {
                // 输出表单
                data = optfile.readfileSync("./views/login.html");
                res.write(data.toString());
            }
            console.log(util.inspect(post, true));
            res.end(util.inspect(post, true));
        });
    }
};
