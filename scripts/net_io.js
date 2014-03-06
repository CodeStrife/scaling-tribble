  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
  
    //	SEND code lines to server
  var lastLines = game.getLines();
  function sendLines() {
    var lines = game.getLines();
    socket.emit('sendLines', (lines - lastLines));
    updateBarChart((lines - lastLines));
    lastLines = lines;
  }
  setInterval(sendLines, 1000);

  //	RECEIVE total code lines from server
  socket.on('counter', function(data) {
    // console.log("Counter: " + data);
    updateCounter(data);
  });