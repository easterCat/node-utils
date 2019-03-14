/**
 * Created by fuhuo on 2017/9/15.
 */
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./router.signup'));
    app.use('/signin', require('./router.signin'));
    app.use('/signout', require('./router.signout'));
    app.use('/posts', require('./router.posts'));
    app.use('/personal', require('./router.personal'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};