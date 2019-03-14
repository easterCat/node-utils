/**
 * Created by easterCat on 2017/9/28.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check');

var UserModel = require('../models/model.users');


//GET /personal?author=<id>进入个人信息页面
router.get('/', function (req, res, next) {
    var authorId = req.query.author;


    UserModel.getUserById(authorId)
        .then(function (data) {
            console.log('personal', data);

            res.render('personal', {
                personal: data
            });
        })
        .catch(next);
});


module.exports = router;