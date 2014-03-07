  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
  
    //	SEND code lines to server
  var lastLines = game.getLines();
  var chart = new BarChart(100,"#lpm");
  var javachart = new BarChart(1000,"#globaljava");
  var cchart = new BarChart(1000,"#globalc");
  var sendLinesID = setInterval(sendLines, 1000);
  var globalJava = 0;
  var globalc = 0;
  
  function sendLines() {
    var lines = game.getLines() - lastLines;

    socket.emit('sendLines', {
        language : language,
        lines : lines
    });          //  lines - lastLines
    
    chart.update(lines);                      //  Only counts java for now!
    javachart.update(globalJava);
    console.log("Globaljava:" + globalJava);
    cchart.update(globalc);
    
    globalJava = 0;
    globalc = 0;
    
    lastLines = game.getLines();
  }
  

  //	RECEIVE total code lines from server
  socket.on('counter', function(data) {
      console.log("updating");
      console.log("globaljava from server:" + data.JPS);
      globalJava += data.JPS;
      globalc += data.CPS;
    updateCounter(data.java, data.c);
  });