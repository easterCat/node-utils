/**
 * Created by easterCat on 2017/9/12.
 */
var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');


var app = express();

//挂载静态资源处理中间件
app.use(express.static(__dirname + "/public"));
//设置模板视图的目录
app.set("views", path.join(__dirname,'views'));
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "ejs");

// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));
// flash 中间件，用来显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/images'),// 上传头像文件目录
    keepExtensions: true// 保留后缀
}));

// 设置模板全局常量
app.locals.blog = {
    title: '博客',
    description: '这是一个博客'
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

// error page
app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    });
});

// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));
// 路由
routes(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));

if (module.parent) {
    module.exports = app;
} else {
    // 监听端口，启动程序
    var server = app.listen(config.port, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log(pkg.name + '，访问地址为 http://localhost:' + port);
    });
}
