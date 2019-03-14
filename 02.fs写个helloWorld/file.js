let fs = require("fs");

module.exports = {
  //异步读取
  createFile: path => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.toString());
      }
    });
    console.log("异步读取文件完毕");
  },
  readfileSync: path => {
    let data = fs.readFileSync(path, "utf-8");
    console.log(data);
    console.log("同步方法读取完毕");
  }
};
