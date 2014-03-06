/*
 *
 *  Player io goes here.
 *
 */
 
 var Cgame = new Game("C");
 var JavaGame = new Game("Java");
 var game = JavaGame;
 var addCode = game.makeCode;
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
    $('#code').append(addCode(1));
    updateScroll();
}

function changeLanguage(language){
    if(language === "C"){
        console.log("changing to C");
        game = Cgame;
    } else if(language === "Java"){
        console.log("changing to Java");
        game = JavaGame;
    }
    addCode = game.makeCode;
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