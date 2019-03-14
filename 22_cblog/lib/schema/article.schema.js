/**
 * Created by easterCat on 2017/10/19.
 */
const _ = require('lodash');
const mongoose = require('../db');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;
const {bindMethods} = require('../../utils/index');

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required !']
    },  //标题
    content: {
        type: String,
        required: [true, 'content is required !']
    }, //内容
    createDate: {
        type: Date
    }, //创建时间
    checkinTime: {
        type: Date
    },
    pv: {
        type: Number
    }//文章访问次数
});

function allKeys() {
    //_.keys将对象的可枚举属性返回到一个数组里
    //返回一个新数组将相同数值排除，也就是排除__v属性
    return _.without(_.keys(ArticleSchema.paths), '__v');
}

ArticleSchema.methods.view = function () {
    //根据选择的属性值返回一个新的对象
    return _.pick(this, allKeys());
};

const ArticleModel = bindMethods(mongoose.model('Article', ArticleSchema));//将Schema发布为Model

module.exports = ArticleModel;