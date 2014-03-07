var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var javaCounter = 0;
var cCounter = 0;
var javaLastSecond = 0;
var cLastSecond = 0;

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
    if(data.language === "java"){
        javaCounter += data.lines;
    } else {
        cCounter += data.lines;
    }
  });

  function sendCounter() {
    var javaPerSecond = javaCounter - javaLastSecond;
    var cPerSecond = cCounter - cLastSecond;
    io.sockets.emit('counter', {
        java : javaCounter,
        c : cCounter,
        JPS : javaPerSecond,
        CPS : cPerSecond
    });
    javaLastSecond = javaCounter;
    cLastSecond = cCounter;
    console.log(javaPerSecond + cPerSecond);
  }
  setInterval(sendCounter, 1000);


  socket.on('close', function() {
    console.log('a client closed');
  });
});


server.listen(process.env.PORT || 3000);
