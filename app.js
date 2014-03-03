var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var counter = 0;

app.use(express.static('public'));
app.use(express.static('scripts'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('button click', function (data) {
    console.log("Tööt, received: %j", data);
  });


  //	Broadcast counter value every 2 seconds.
  // 	http://stackoverflow.com/questions/9914816/what-is-an-example-of-the-simplest-possible-socket-io-example
  function sendCounter() {
    io.sockets.emit('counter', counter);
  }
  setInterval(sendCounter, 4000);


  socket.on('close', function() {
    console.log('a client closed');
  });
});


server.listen(3000);
