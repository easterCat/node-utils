/**
 * Created by easterCat on 2017/10/24.
 */
module.exports = {
    contentsToMarked,
    contentToMarked
};

const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smarttpants: false
});

/**
 * @Dec 将文章内容转化为markdown形式
 * @param as[传入的所有文字]
 */
function contentsToMarked(as) {
    return as.map((a) => {
        a.content = marked(a.content);
        return a;
    });
}

/**
 * @Dec 将单个文章内容转化为markdown形式
 * @param a[传入的单独一篇文章]
 * @returns {*}
 */
function contentToMarked(a) {
    if (a) {
        a.content = marked(a.content);
    }
    return a;
}