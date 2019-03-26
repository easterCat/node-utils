window.onload = function() {
  let path =
    "http://127.0.0.1:9527/mrw/%E5%B0%8F%E6%B2%AB%E7%90%B3%E3%80%8A%E8%8B%8F%E6%A2%85%E5%B2%9B%E6%97%85%E6%8B%8D%E5%86%99%E7%9C%9F%E3%80%8B%20[%E8%8A%B1%E3%81%AE%E9%A2%9CHuaYan]%20Vol.057%20%E5%86%99%E7%9C%9F%E9%9B%86/%E5%B0%8F%E6%B2%AB%E7%90%B3%E3%80%8A%E8%8B%8F%E6%A2%85%E5%B2%9B%E6%97%85%E6%8B%8D%E5%86%99%E7%9C%9F%E3%80%8B%20[%E8%8A%B1%E3%81%AE%E9%A2%9CHuaYan]%20Vol.057%20%E5%86%99%E7%9C%9F%E9%9B%86_image";

  let suffix = ".jpg";
  let content = document.createElement("div");
  let body = document.getElementsByTagName("body")[0];
  content.setAttribute("class", "content");

  for (let i = 0; i < 56; i++) {
    let item = document.createElement("img");
    item.setAttribute("src", `${path}${i}${suffix}`);
    content.appendChild(item);
  }

  body.appendChild(content);
};
