var app = require('../application/core/kiana')();
var port = 3333;

// app.get('/home', function(req, res) {
//   res.send('hello world');
// });

// app.put('/home', function(req, res) {
//   res.send('put请求');
// });

// app.delete('/home', function(req, res) {
//   res.send('delete请求');
// });

// app.post('/home', function(req, res) {
//   res.send('post请求');
// });

app.$router
  .route('/home')
  .get(function(req, res, next) {
    res.send('hello world');
  })
  .put(function(req, res, next) {
    res.send('put请求');
  })
  .post(function(req, res, next) {
    res.send('post请求');
  })
  .delete(function(req, res, next) {
    res.send('delete请求');
  });

app.listen(port, function() {
  console.log('listen at localhost:' + port);
});
