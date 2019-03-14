const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/myblog';

const connect = {
    open: (callback) => {
        MongoClient.connect(DB_CONN_STR, function (err, db) {
            callback(err, db);
        });
    }
};

module.exports = connect;