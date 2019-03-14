/**
 * Created by easterCat on 2017/10/25.
 */
module.exports = {
    createUser,
    verifyUser,
    findUserById,
    findUsers,
    update
};
const fs = require('fs');
const UserModel = require('../schema/user.schema');

//查找user并验证
function verifyUser(data) {
    let user = {
        username: data.username,
        password: data.password,
    };

    return UserModel
        .findOne(user)
        .exec();
}

//注册一个账号
function createUser(data) {
    let user = {
        username: data.username,
        password: data.password,
        avatar: data.avatar,
        description: data.description,
        uploadDate: new Date()
    };

    return _existUser(data.username)
        .then(exist => {
            if (exist && exist.length) throw {
                code: 2,
                message: 'user exist'
            };
            return UserModel
                .create(user);
        });

}
//注册用户时判断用户是否存在
function _existUser(name) {
    return UserModel
        .find({username: name})
        .exec();
}

//通过id查找user
function findUserById(id) {
    return UserModel
        .findById(id)
        .exec();
}

//查找所有的user
function findUsers() {
    return UserModel
        .find()
        .exec();
}

function update(data) {
    return UserModel
        .findOneAndUpdate({_id: data.id}, data, {new: true})
        .exec();
}