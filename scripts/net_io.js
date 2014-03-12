  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
  
    //	SEND code lines to server
  var lastLines = game.getLines();
  var localLPScap = 100;
  var globalJavaLPSCap = 200;
  var globalCLPScap = 200;
  var chart = new BarChart(localLPScap,"#lpm",30,80);
  var javachart = new BarChart(globalJavaLPSCap,"#globaljava",15,80);
  var cchart = new BarChart(globalCLPScap,"#globalc",15,80);
  var sendLinesID = setInterval(sendLines, 1000);
  var globalJava = 0;
  var globalc = 0;
  var totalJava;
  var totalc;
  var globalJPS = 0;
  var globalCPS = 0;
  
  var codeFile;
  
  var javaFile;
  var cFile;
  
  Array.prototype.max = function() {        //  Augment arrays with max value function.
    return Math.max.apply(null, this);
    };
  
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
      totalJava = data.java;
      totalc = data.c;
      globalJPS = data.JPS;
      globalCPS = data.CPS;
      
    updateCounter(data.java, data.JPS, data.c, data.CPS);
    updatePlayerCount(data.players);
  });
  
  socket.on('codeFile', function(data) {
      if(data) {
          console.log("Received code file from server!");
      }
      else {
        console.log("Error when receiving code file from server \n");
      }
      javaFile = data.java.toString();
      cFile = data.c.toString();
  });
  
  
  function requestCodeFile() {
      console.log("Requesting code file from server");
      socket.emit('requestCodeFile', {});
  }