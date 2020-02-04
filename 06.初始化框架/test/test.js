var app = require('../application/core/kiana')();

var hostname = '127.0.0.1';
var port = 3333;

app.listen(3333, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});
