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

 var codediv = document.getElementById('code');


 /* BUTTONS */

  $("#autocomplete").click( function() {
      game.buyAutoComplete();
      updateAmounts();
  });
  $("#codegenerator").click( function() {
      game.buyCodeGenerator();
      syncCodeGen();
      updateAmounts();
  });
  $("#efficiency").click( function() {
      game.buyEfficiency();
	  syncCodeGen();
      updateAmounts();

  });
  $("#temp").click( function() {
      $("#tempAmount").html(d);
  });

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

  //    BUTTON: Load
  $("#load").click( function() {
      game.loadGame();
      updateAmounts();
  });

  //    BUTTON: Save
  $("#save").click( function() {
      game.saveGame();
      updateAmounts();
  });
  
  //    BUTTON: Truncate
  $("#truncate").click( function() {
      truncate();
  });

 /*** END BUTTONS ***/

  function updateAmounts() {
      $("#autocompleteAmount").html(game.getCodePerCharacter()-1);
      $("#codegeneratorAmount").html(game.getCodeGeneratorLines());
      $("#efficiencyAmount").html(game.getCodeGeneratorEfficiency()-1);

      $("#autocompletePrice").html(game.getAutoCompletePrice());
      $("#codegeneratorPrice").html(game.getCodeGeneratorPrice());
      $("#efficiencyPrice").html(game.getEfficiencyPrice());

      updateSpendableLines();
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
    updateSpendableLines();
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

function updateSpendableLines() {
    $("#spendableLines").html("<span class=\"bold\">L: </span>" + game.getSpendableLines());
}

//    Keep code DIV scrolled to bottom.
function updateScroll() {
    codediv.scrollTop = codediv.scrollHeight;
}

function truncate() {
    //  EXPERIMENTAL! Truncate code div length to 36 rows.
    var lines = $('li', code);
    var trunc = lines.slice(lines.length - 41);             //  This also cuts out whitespace ie. empty lines
    console.log("Truncating code!");
    $("#code").html(trunc);
}

$( document ).keydown( function (event) {
    var text = playerCode();
    
    //  If incoming line is a ready line
    if(text.slice(0,4) == "<li>") {
        truncate();
    }
    
    
    $('#code').append(text);
    
    updateSpendableLines();
    updateScroll();
});

$(document).ready( function() {
    requestCodeFile();
    updateAmounts();
});





