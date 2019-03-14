/**
 * Created by easterCat on 2017/10/26.
 */
const mongoose = require('../db');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: String
    },
    content: {
        type: String
    },
    articleid: {
        type: String
    },
    createDate: {
        type: Date
    }
});

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;