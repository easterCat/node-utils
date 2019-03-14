/**
 * Created by easterCat on 2017/10/19.
 */
module.exports = {
    createArticle,
    getAllArticles,
    getOneArticleById,
    delOneArticleById,
    getAllArticlesCount,
    increasePV
};

const ArticleModel = require('../schema/article.schema');

//创建一篇文章
function createArticle(data = {}) {
    const {title, content} = data;

    if (!title) throw new Error('title is null');
    if (!content) throw new Error('content is null');

    let article = {
        title: title,
        content: content,
        createDate: new Date(),
        checkinTime: new Date(),
    };

    return ArticleModel
        .queryOne({title})
        .then(result => {
            //如果查找到的数据存在，就直接返回
            if (result) return result;
            return ArticleModel.add(article);
        });
}

//获取查询分页的文章
function getAllArticles(filter) {
    filter.where = filter.where || {};
    return ArticleModel.applyFilter(filter);
}

//通过id获取一篇文章
function getOneArticleById(article_id) {
    return ArticleModel.queryById(article_id);
}

//通过id删除一篇文章
function delOneArticleById(id) {
    return ArticleModel.removeById(id);
}

//获取所有的数据总数
function getAllArticlesCount() {
    return ArticleModel.getCount();
}

function increasePV(id) {
    return ArticleModel.updateById(id, {$inc: {pv: 1}});
}
