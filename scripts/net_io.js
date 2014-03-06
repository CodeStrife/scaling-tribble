/*
 *
 *  All client-server functionality goes here.
 *
 */

  //    INIT: Socket
  var socket = io.connect(window.location.hostname);
 
  //    BUTTON: Autocomplete
  $("#autocomplete").click( function() {
    console.log('Bought autocomplete');
    boughtAutoComplete();
  });
  
  //    BUTTON: Code generator
    $("#codegenerator").click( function() {
    console.log('Bought code generator');
	boughtCodeGenerator();
  });

  //	SEND code lines to server
  var lastLines = lines;
  function sendLines() {
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