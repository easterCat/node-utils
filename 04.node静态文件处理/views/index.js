window.onload = function() {
  let path =
    'http://127.0.0.1:9529/mrw/《加藤惠校服》 [轻兰映画] Grand.013 写真集/《加藤惠校服》 [轻兰映画] Grand.013 写真集_image';

  let suffix = '.jpg';
  let content = document.createElement('div');
  let body = document.getElementsByTagName('body')[0];
  content.setAttribute('class', 'content');

  for (let i = 0; i < 56; i++) {
    const item = document.createElement('img');
    const src = `${path}${i}${suffix}`;
    item.setAttribute('src', src);
    content.appendChild(item);
  }

  body.appendChild(content);
};
