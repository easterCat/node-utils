/**
 * Created by easterCat on 2017/10/26.
 */
module.exports = {
    createComment,
    getCommentsById,
    delCommentById,
    delCommentsById
};

const CommentModel = require('../schema/comment.schema');

//创建一个留言
function createComment(comment) {
    return CommentModel
        .create(comment);
}

//通过文章id查找留言
function getCommentsById(articleid) {
    return CommentModel
        .find({articleid: articleid})
        .sort({_id: 1})
        .exec();
}

//通过文章id删除留言
function delCommentsById(articleid) {
    return CommentModel
        .remove({articleid: articleid})
        .exec();
}

//通过留言id删除留言
function delCommentById(commentid) {
    return CommentModel
        .findByIdAndRemove(commentid)
        .exec();
}

function getCommentCount(articleid) {
    return CommentModel
        .count({articleid: articleid})
        .exec();
}