var express  = require('express'),
    app      = express(),
    http     = require('http').Server(app),
    io       = require('socket.io')(http);

app.use(express.static(__dirname+'/'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log("server started on port 3000");
});

io.on('connection', function(socket) {
  console.log("Socket is "+ socket + " Socket ID is "+ socket.id);
  socket.on('message', function(from, message) {
    io.emit('message', from, message);
  });
  socket.on('notifyTyping', function(from) {
    io.emit('notifyTyping',from);
  });
});
