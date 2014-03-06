/*
 *
 *  All client-server functionality goes here.
 *
 */
 
 var game = new Game("C");
 var addCode = game.makeCode;
 var playerCode = game.playerCode;
 var codeGenIntervalID;
 
  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
 
  //    BUTTON: Autocomplete
  $("#autocomplete").click( function() {
    console.log('Bought autocomplete');
	game.buyAutoComplete();       //  boughtAutoComplete();
  });
  
  //    BUTTON: Code generator
    $("#codegenerator").click( function() {
    console.log('Bought code generator');
	game.buyCodeGenerator();       //  boughtCodeGenerator();
	if(!codeGenIntervalID){
        codeGenIntervalID = setInterval(botCode, 1000);
        console.log("Interval set");
    } else {
        console.log("clearing interval and setting a new one");
        clearInterval(codeGenIntervalID);
        codeGenIntervalID = setInterval(botCode, 1000/game.getCodeGeneratorLines());
        console.log("interval set at: " + 1000/game.getCodeGeneratorLines());
    }});
  
function botCode(){
    $('#code').append(addCode(1));
    updateScroll();
}

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

  function updateCounter(a) {
    $("#lines_total").empty();
    $("#lines_total").append(a);
  }
  
  $( document ).keydown( function (event) { 
    console.log("button pressed");
    $('#code').append(playerCode());
    updateScroll();
  });