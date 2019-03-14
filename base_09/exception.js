/**
 * Created by easterCat on 2017/9/11.
 */
module.exports = {
  expfun: function(flag) {
    if (flag === 0) {
      throw "我是例外";
    }
    return "success";
  }
};
