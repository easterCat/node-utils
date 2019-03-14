/**
 * Created by fuhuo on 2017/9/15.
 */
var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

/**
 * 创建用户的模型
 * @type {{name: {type: string}, password: {type: string}, avatar: {type: string}, gender: {type: string, enum: [*]}, bio: {type: string}}}
 */
var UserSchema = {
    name: {type: 'string'},
    password: {type: 'string'},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
};
exports.User = mongolass.model('User', UserSchema);
exports.User.index({name: 1}, {unique: true}).exec();// 根据用户名找到用户，用户名全局唯一

/**
 * 创建文章的模型
 * @type {{author: {type: *}, title: {type: string}, content: {type: string}, pv: {type: string}}}
 */
var PostSechema = {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
};
exports.Post = mongolass.model('Post', PostSechema);
exports.Post.index({author: 1, _id: -1}).exec();// 按创建时间降序查看用户的文章列表

/**
 * 创建留言信息的模型
 * @type {{author: {type: *}, content: {type: string}, postId: {type: *}}}
 */
var CommentSechema = {
    author: {type: Mongolass.Types.ObjectId},
    content: {type: 'string'},
    postId: {type: Mongolass.Types.ObjectId}
};
exports.Comment = mongolass.model('Comment', CommentSechema);
exports.Comment.index({postId: 1, _id: 1}).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({author: 1, _id: 1}).exec();// 通过用户 id 和留言 id 删除一个留言

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

