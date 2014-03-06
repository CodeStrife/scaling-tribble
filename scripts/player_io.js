/*
 *
 *  Player io goes here.
 *
 */
 
 var Cgame = new Game("C");
 var JavaGame = new Game("Java");
 var game = JavaGame;
 var addBotCode = game.botCode;
 var playerCode = game.playerCode;
 var codeGenIntervalID;
 
  //    BUTTON: Autocomplete
  $("#autocomplete").click( function() {
    console.log('Bought autocomplete');
	game.buyAutoComplete();       //  boughtAutoComplete();
  });
  
  //    BUTTON: Code generator
    $("#codegenerator").click( function() {
    console.log('Bought code generator');
	game.buyCodeGenerator();       //  boughtCodeGenerator();
	syncCodeGen();
	});
  
function syncCodeGen(){
    if(game.getCodeGeneratorLines() == 0){
        clearInterval(codeGenIntervalID);
    } else if(!codeGenIntervalID){
        codeGenIntervalID = setInterval(botCode, 1000);
        console.log("Interval set");
    } else {
        console.log("clearing interval and setting a new one");
        clearInterval(codeGenIntervalID);
        codeGenIntervalID = setInterval(botCode, 1000/game.getCodeGeneratorLines());
        console.log("interval set at: " + 1000/game.getCodeGeneratorLines());
    }
}
  
function botCode(){
    $('#code').append(addBotCode());
    updateScroll();
}

  var language;
  
  //    BUTTON: Java
  $("#java").click( function() {
      console.log("herp");
    if(!language || language != "java") {
	    language = "java";
	    console.log('Switched to Java!');
	    //  Switch functionality here
	    changeLanguage("Java");
	    $("#code").empty();
	    }
  });
  
  //    BUTTON: C
  $("#c").click( function() {
    if(language != "c") {
	    language = "c";
	    console.log('Switched to C!');
	    //  Switch functionality here
	    changeLanguage("C");
	    $("#code").empty();
    }
  });

function changeLanguage(language){
    if(language === "C"){
        console.log("changing to C");
        game = Cgame;
    } else if(language === "Java"){
        console.log("changing to Java");
        game = JavaGame;
    }
    addBotCode = game.botCode;
    playerCode = game.playerCode;
    syncCodeGen();
}

function updateCounter(a) {
    $("#lines_total").empty();
    $("#lines_total").append(a);
  }
  
  $( document ).keydown( function (event) { 
    console.log("button pressed");
    $('#code').append(playerCode());
    updateScroll();
  });