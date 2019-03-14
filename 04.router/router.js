/**
 * Created by easterCat on 2017/9/6.
 */

let querystring = require("querystring");
let http = require("http");
const https = require('https');

module.exports = {
    login: (request, response) => {
        response.write("login");
    },
    register: (request, response) => {
        response.write("register");
    },
    get_money,
    add
};


function get_money(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {"Content-type": "text/html;charset=utf8"});
    response.write("给了你666块钱", "utf-8");
    response.end("\r\n请求结束了", "utf-8");
}

function add(request, response) {

    let post = querystring.stringify({
        oid: 40408530,
        type: 1,
        message: '安吉斯倒计时',
        plat: 1,
        jsonp: 'jsonp',
        csrf: 'af15b2a3a0e64a2ea304f885bea6bfd1',
    });

    let options = {
        hostname: "api.bilibili.com",
        method: "POST",
        path: "/x/v2/reply/add",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Content-Length": post.length,
            Origin: "https://www.bilibili.com",
            Referer: "https://www.bilibili.com/video/av40408530/?spm_id_from=333.334.b_72616e6b696e675f646f756761.1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.6788.400 QQBrowser/10.3.2843.400",
            Cookie: "LIVE_BUVID=AUTO3915443367808364; sid=cnib74gs; UM_distinctid=16791a6caa8729-0b14acda50efd2-33504275-1fa400-16791a6caa9a3f; CURRENT_FNVAL=16; buvid3=020B373C-97A4-4FCA-B8EA-3EEED06368A7155652infoc; rpdid=wdosppkkxlpw; fts=1544875242; CURRENT_QUALITY=32; stardustvideo=1; DedeUserID=4132416; DedeUserID__ckMd5=5ee126ea7781aa72; SESSDATA=73e9a848%2C1549874854%2C18b65911; bili_jct=af15b2a3a0e64a2ea304f885bea6bfd1; _dfcaptcha=e069f8b6c6316a825b2f145a7d8a5663"
        }
    };

    console.log(options);

    let proxy = https.request(options, proxy_res => {
        proxy_res.setEncoding('utf8');
        let data;
        proxy_res.on('data', (chunk) => {
            console.dir(`响应主体: ${chunk}`);
            data += chunk;
        });
        proxy_res.on('end', () => {
            console.log('响应中已无数据');
            response.end('123');
        });
    });

    proxy.on("error", e => {
        console.error(`请求遇到问题: ${e.message}`);
    });

    proxy.write(post);
    proxy.end();
}