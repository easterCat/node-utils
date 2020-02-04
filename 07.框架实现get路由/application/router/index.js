function Router() {
  this.stack = [
    {
      path: '*',
      method: '*',
      handle: function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('404');
      }
    }
  ];
}

module.exports = Router;
