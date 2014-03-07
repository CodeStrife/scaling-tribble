/********************************
 *                              *
 *      Player IO goes here     *
 *                              *
 ********************************/
 
 var Cgame = new Game("c");
 var JavaGame = new Game("java");
 var game = JavaGame;
 var addBotCode = game.botCode;
 var playerCode = game.playerCode;
 var codeGenIntervalID;
 var language = "java";
 
 
 /* BUTTONS */
 
/*  //    BUTTON: Autocomplete
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
	
  //    BUTTON: Efficiency
    $("#efficiency").click( function() {
    console.log('Bought code generator');
	game.buyEfficiency();       //  boughtCodeGenerator();
	syncCodeGen();
	});
	*/
  
  //    BUTTON: Java
  $("#java").click( function() {
      console.log("herp");
    if(!language || language != "java") {
	    language = "java";
	    console.log('Switched to Java!');
	    changeLanguage("java");
	    updateAmounts();
	    $("#code").html("//   CODE HERE<br><br>");
	    }
  });
  
  //    BUTTON: C
  $("#c").click( function() {
    if(language != "c") {
	    language = "c";
	    console.log('Switched to C!');
	    changeLanguage("c");
	    updateAmounts();
	    $("#code").html("/*   CODE HERE   */<br><br>");
    }
  });
  
 /*** END BUTTONS ***/
 
  //    Buy & upgrade amounts
  
  $("#autocomplete").click( function() {
      game.buyAutoComplete();
      $("#autocompleteAmount").html(game.getCodePerCharacter()-1);
  });
  $("#codegenerator").click( function() {
      game.buyCodeGenerator();
      $("#codegeneratorAmount").html(game.getCodeGeneratorLines());
  });
  $("#efficiency").click( function() {
      game.buyEfficiency();
      $("#efficiencyAmount").html(game.getCodeGeneratorEfficiency());
  });
  $("#temp").click( function() {
      $("#tempAmount").html(d);
  });
  
  function updateAmounts() {
      $("#autocompleteAmount").html(game.getCodePerCharacter()-1);
      $("#codegeneratorAmount").html(game.getCodeGeneratorLines());
      $("#efficiencyAmount").html(game.getCodeGeneratorEfficiency());
  }
  
  
  
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

//  Change game language
function changeLanguage(language){
    if(language === "c"){
        console.log("changing to C");
        game = Cgame;
    } else if(language === "java"){
        console.log("changing to Java");
        game = JavaGame;
    }
    lastLines = game.getLines();
    addBotCode = game.botCode;
    playerCode = game.playerCode;
    syncCodeGen();
    
}

//  Update line counter div
function updateCounter(a,b) {
    $("#total_java").html("JAVA: ");
    $("#total_java").append(a);
    $("#total_c").html("C: ");
    $("#total_c").append(b);
}
  
$( document ).keydown( function (event) {
    $('#code').append(playerCode());
    updateScroll();
});