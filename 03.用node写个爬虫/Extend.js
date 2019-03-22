/**
 * Created by easterCat on 2017/9/6.
 */

let cheerio = require("cheerio");
let fs = require("fs");
let { handleRequestByPromise } = require("./utils/ajax");
let Par = require("./Class");

class Child extends Par {
  constructor(start = 1, end = 10) {
    super();
    this.all = [];
    this.start = start; //第一页
    this.end = end; //第10页
  }

  async init(res) {
    for (let i = startPage; i <= endPage; i++) {
      await this.getAndSaveImg(i);
    }

    res.write(
      "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        '<meta charset="utf-8" />' +
        "<title>预览图集</title>" +
        "</head>" +
        this.renderCollectHtml() +
        "</html>"
    );

    this.downloadAllImg();
  }

  renderCollectHtml() {
    let dom = this.all.map(item => {
      return `<div><a>${item.href}</a><span>${item.title}</span><span>${
        item.num
      }</span><span>${item.childs}</span></div>`;
    });

    dom.unshift("<body>");
    dom.push("</body>");
    return dom.join("");
  }

  async getAndSaveImg(page) {
    let pageImgSetUrl = ``;

    if (page === 1) {
      pageImgSetUrl = `${this.siteUrl}`;
    } else {
      pageImgSetUrl = `${this.siteUrl}${page}.html`;
    }

    let homeBody = await handleRequestByPromise(pageImgSetUrl);
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
}

module.exports = Child;
