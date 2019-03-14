/**
 * Created by easterCat on 2017/9/25.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('hello users');
});

router.get('/:name', function (req, res) {
    res.render('users', {
        name: req.params.name
    });
});

module.exports = router;
