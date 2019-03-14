/**
 * Created by easterCat on 2017/9/25.
 */

var config = {
    port: 3022,
    session: {
        secret: 'user',
        key: 'user',
        maxAge: '2592000000'
    },
    mongodb: 'mongodb://easterCat:123456@ds062448.mlab.com:62448/mydatabase'
};

module.exports = config;
