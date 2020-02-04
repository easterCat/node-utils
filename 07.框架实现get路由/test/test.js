var app = require('../application/core/kiana')();
var port = 3333;

app.get('/hello', function(req, res) {
  res.send('hello world');
});

app.get('/world', function(req, res) {
  res.send('世界你好');
});

app.listen(port, function() {
  console.log('listen at localhost:' + port);
});
