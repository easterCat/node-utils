/**
 * Created by easterCat on 2017/9/14.
 */
const express = require('express');
const router = express.Router();

router.get('/register', function (req, res) {
    res.render('reg/reg', {
        title: '注册',
    });
});

module.exports = router;