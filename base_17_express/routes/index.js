/**
 * Created by easterCat on 2017/9/25.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('hello, express');
});

module.exports = router;