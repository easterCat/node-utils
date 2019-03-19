/**
 * Created by easterCat on 2017/8/21.
 */
const koa = require("../koa-master");
const app = new koa();

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello, koa2!</h1>";
});

app.listen(3333);
console.log(`app use at post 3333`);
