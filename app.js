var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs');

var javaCounter = 0;
var cCounter = 0;
var javaLastSecond = 0;
var cLastSecond = 0;

var javaCode;
var cCode;

var INTERVAL;
var n = 0;

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('scripts'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    n++;
    
    
  // 	Receive lines from client.
  socket.on('sendLines', function(data) {
    if(data.language === "java"){
        javaCounter += data.lines;
        javaLastSecond += data.lines;
    } else {
        cCounter += data.lines;
        cLastSecond += data.lines;
    }
  });
  
  

  //    Send code file to client on request    
  socket.on('requestCodeFile', function() {
    socket.emit('codeFile', {java: javaCode, c: cCode});
  });

  //    Send total lines and lines per second.
  function sendCounter() {
    io.sockets.emit('counter', {
        java : javaCounter,
        c : cCounter,
        JPS : calculateAverages().java,
        CPS : calculateAverages().c
    });
    console.log(n);
  }
  clearInterval(INTERVAL);
  INTERVAL = setInterval(sendCounter, 1000);

  socket.on('close', function() {
    console.log('Client closed connection');
  });
});

io.set('log level', 1);             //  Less logging in server
server.listen(process.env.PORT || 3000);


//  Read Java code file
fs.readFile('javacode.java', 'utf8', function(err, data) {
    if(!err) {
        console.log("Using Java code: " + data.toString('utf8').substring(0,25));
        javaCode = data;
    }
    else
        console.log(err);
});

//  Read C code file
fs.readFile('ccode.c', 'utf8', function(err, data) {
    if(!err) {
        console.log("Using C code: " + data.toString('utf8').substring(0,25));
        cCode = data;
    }
    else
        console.log(err);
});


function calculateAverages() {
    var ret = {java : javaLastSecond, c : cLastSecond};
    // console.log(ret);
    javaLastSecond = 0;
    cLastSecond = 0;
    return ret;
}

