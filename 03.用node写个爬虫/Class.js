/**
 * Created by easterCat on 2017/9/6.
 */

let fs = require("fs");
let { handleRequestByPromise } = require("./utils/ajax");

class Par {
  constructor() {
    this.siteUrl = "https://www.meituri.com/zhongguo/";
    this.collectUrl = "https://www.meituri.com/a/"; //  25396/
    this.imageUrl = "https://ii.hywly.com/a/1/25396/40.jpg"; //https://ii.hywly.com/a/1/25373/1.jpg
  }

  async downloadImg(url, dest) {
    let res = await handleRequestByPromise({ url });
    fs.writeFileSync(dest, res, {
      encoding: "binary"
    });
  }
}

module.exports = Par;
