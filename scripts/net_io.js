  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
  
    //	SEND code lines to server
  var lastLinesJava = JavaGame.getLines();
  var lastLinesC = Cgame.getLines();
  
  function sendLines() {
    var javalines = JavaGame.getLines() - lastLinesJava;
    var clines = Cgame.getLines() - lastLinesC;
    
    socket.emit('sendLines', data = {
        java : javalines,
        c : clines
    });          //  lines - lastLines
    
    updateBarChart(javalines);                      //  Only counts java for now!
    
    lastLinesJava = JavaGame.getLines();
    lastLinesC = Cgame.getLines();
  }
  setInterval(sendLines, 1000);

  //	RECEIVE total code lines from server
  socket.on('counter', function(data) {
    console.log("Received java lines: " + data.java);
    console.log("Received c    lines: " + data.c);
    updateCounter(data.java, data.c);
  });