/**
 * Created by easterCat on 2017/10/25.
 */
const mongoose = require('../db');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required!']
    },
    password: {
        type: String,
        required: [true, 'password is required!']
    },
    avatar: {
        type: String
    },
    description: {
        type: String
    },
    createaDate: {
        type: Date
    }
});

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;