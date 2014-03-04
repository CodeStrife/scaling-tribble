var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var counter = 0;

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('scripts'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/blaa', function (req, res) {
  res.sendfile(__dirname + '/blaa.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('button click', function (data) {
    console.log("Tööt, received: %j", data);
  });
  // 	Receive lines from client.
  socket.on('sendLines', function(data) {
    counter = counter + data;
  });

  function sendCounter() {
    //	counter++;
    io.sockets.emit('counter', counter);
  }
  setInterval(sendCounter, 1000);


  socket.on('close', function() {
    console.log('a client closed');
  });
});


server.listen(process.env.PORT || 3000);
