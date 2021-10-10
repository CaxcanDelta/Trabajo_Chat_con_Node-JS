const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    var clientIp = socket.request.connection.remoteAddress;
    console.log(clientIp);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

/* io.sockets.on('connection', function (socket) {
  var address = socket.handshake.address;
  console.log('New connection from ' + address.address + ':' + address.port);
}); */
