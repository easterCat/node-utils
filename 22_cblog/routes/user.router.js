/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const cookie = require('cookie');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logged', logged);
router.get('/logout', logout);
router.get('/authors', findAllAuthors);
router.post('/changeuser', updateUser);

const {
    createUser,
    verifyUser,
    findUserById,
    findUsers,
    update
} = require('../lib/model/user.model');

const {
    removePicture
} = require('../lib/model/file.model');

//登录
function login(req, res) {
    const {username, password} = req.method === 'POST' ? req.body : req.query;

    let user = {
        username: username,
        password: password,
    };

    return verifyUser(user)
        .then((result) => {
            _updateSession(result);
            // req.session.user = result;
            res.send(result);
        });

    function _updateSession(user) {
        req.session.username = user.username;
        req.session.password = user.password;
        req.session.user_id = user._id.toString();
    }
}


//注册一个用户
function register(req, res) {
    if (!req.body) return;
    if (!req.body.username || !req.body.password) {
        throw {
            code: 1,
            message: 'name or password is null'
        };
    }

    const {username, password, description} = req.body;

    let user = {
        username: username,
        password: password,
        description: description
    };

    //如果头像存在
    if (req.body.avatar) {
        user.avatar = req.body.avatar;
        createUser(user)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                if (err) {
                    removePicture(user.avatar);
                    res.send(err);
                }
            });
    } else {
        user.avatar = null;
        createUser(user).then((result) => {
            res.send(result);
        });
    }
}

//登录验证
function logged(req, res) {
    const {user_id, username, password} = req.session;

    let info = {
        logged: false,
        user: null
    };

    if (!username || !user_id) {
        return new Promise(() => {
            return res.send(info);
        });
    }

    return findUserById(user_id)
        .then(result => {
            info.logged = true;
            info.user = result;
            res.send(info);
        });
}

//退出账号，清空session,删除cookie
function logout(req, res) {
    //清空session
    delete req.session.username;
    delete req.session.password;
    delete req.session.user_id;
    res.sendStatus(200);
}


//查找所有的用户
function findAllAuthors(req, res) {
    findUsers()
        .then(authors => {
            res.send(authors);
        })
        .catch(err => {
            console.log(err);
        });
}

function updateUser(req, res) {
    let user = req.body;
    console.log(user);
    update(user).then((result) => {

        res.send(result);
    });
}
module.exports = router;

