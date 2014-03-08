  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
  
    //	SEND code lines to server
  var lastLines = game.getLines();
  var localLPScap = 100;
  var globalJavaLPSCap = 1000;
  var globalCLPScap = 1000;
  var chart = new BarChart(localLPScap,"#lpm",20,80);
  var javachart = new BarChart(globalJavaLPSCap,"#globaljava",15,80);
  var cchart = new BarChart(globalCLPScap,"#globalc",15,80);
  var sendLinesID = setInterval(sendLines, 1000);
  var globalJava = 0;
  var globalc = 0;
  
  var codeFile;
  
  function sendLines() {
    var lines = game.getLines() - lastLines;

    socket.emit('sendLines', {
        language : language,
        lines : lines
    });          //  lines - lastLines

    chart.update(lines);                      //  Only counts java for now!
    if(lines > localLPScap){
        localLPScap = localLPScap * 2;
        chart.doubleHeight();
    }
    
    if(globalJava > globalJavaLPSCap){
        globalJavaLPSCap = globalJavaLPSCap * 2;
        javachart.doubleHeight();
    }
    javachart.update(globalJava);
    
    if(globalc > globalCLPScap){
        globalCLPScap = globalCLPScap * 2;
        cchart.doubleHeight();
    }
    cchart.update(globalc);
    
    globalJava = 0;
    globalc = 0;
    
    lastLines = game.getLines();
  }
  

  //	RECEIVE total code lines from server
  socket.on('counter', function(data) {
      globalJava += data.JPS;
      globalc += data.CPS;
    updateCounter(data.java, data.c);
  });
  
  socket.on('codeFile', function(data) {
      if(!data) {
          console.log("Received code file from server! \n");
          codeFile = data;
      }
      else {
        console.log("Error when receiving code file from server \n");
      }
      codeFile = data.toString();
  });
  
  
  function requestCodeFile() {
      console.log("Requesting code file from server");
      socket.emit('requestCodeFile', {});
  }