/**
 * Created by easterCat on 2017/10/19.
 */

const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
//连接数据库
mongoose.connect(config.mongodb);
const db = mongoose.connection;

// 连接成功
db.on('connected', () => console.log('Mongoose connection open to ' + config.mongodb));

// 连接异常
db.on('error', (err) => console.log('Mongoose connection error: ' + err));

//连接断开
db.on('disconnected', () => console.log('Mongoose connection disconnected'));

module.exports = mongoose;