var express = require('express'),
    wsio = require('websocket.io');

var app = express.createServer();
var ws = wsio.attach(app);

app.use(express.static('public'));

var position = {},
    total = 0;
ws.on('connection', function (socket) {
    socket.id = ++total;

    socket.send(JSON.stringify(position));

    socket.on('message', function (msg) {
        try {
            var pos = JSON.parse(msg);
        } catch (e) {
            return 0;
        }
        position[socket.id] = pos;
        broadcast(JSON.stringify({
            type: 'position',
            pos: pos,
            id: socket.id
        }));
    });

    socket.on('close', function () {
        delete position[socket.id];
        broadcast(JSON.stringify({
            type: 'disconnect',
            id: socket.id
        }));
    });

    //广播，遍历所有用户并且逐个发消息
    function broadcast(msg) {
        for (var i = 0; i < ws.clients.length; i++) {
            if (ws.clients[i] && socket.io !== ws.clients[i].id) {
                ws.clients[i].send(msg);
            }
        }
    }
});

app.listen(3000, function () {
    console.log('localhost:3000');
});