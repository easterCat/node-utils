/**
 * Created by easterCat on 2017/9/12.
 */
var express = require("express");
var path = require("path");
var app = express();
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");

app.set("views", path.join(__dirname, "views")); // 设置存放模板文件的目录
app.set("view engine", "ejs"); // 设置模板引擎为 ejs

app.use("/", indexRouter);
app.use("/users", userRouter);

const server = app.listen(8081, () => {
    console.log("应用实例，访问地址为 http://192.168.1.1:8081");
});
