/********************************
 *                              *
 *      Player IO goes here     *
 *                              *
 ********************************/

 var Cgame = new Game("c");
 var JavaGame = new Game("java");
 var game = JavaGame;
 var playerCode = game.playerCode;
 var addBotCode = game.botCode;
 var codeGenIntervalID;
 var addReverseCode = game.reverseCode;
 var reverseCodeGenIntervalID;
 var spendableLinesIntervalID;
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
  
  $("#reverse").click( function() {
      game.buyReverse();
      syncCodeGen();
      updateAmounts();
  });
  

  //    BUTTON: Java
  $("#java").click( function() {
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
      JavaGame.loadGame("java");
      Cgame.loadGame("c");
      updateAmounts();
      syncCodeGen();
  });

  //    BUTTON: Save
  $("#save").click( function() {
      JavaGame.saveGame("java");
      Cgame.saveGame("c");
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
      $("#reverseAmount").html(game.getReverseEngineerLines());

      $("#autocompletePrice").html(game.getAutoCompletePrice());
      $("#codegeneratorPrice").html(game.getCodeGeneratorPrice());
      $("#efficiencyPrice").html(game.getEfficiencyPrice());
      $("#reversePrice").html(game.getReverseEngineerPrice());

      updateSpendableLines();
  }



function syncCodeGen(){
    
    //  Code generator
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
    
    //  Reverse Engineering generator
    if(game.getReverseEngineerLines() == 0) {
        clearInterval(reverseCodeGenIntervalID);
    }   else if(!reverseCodeGenIntervalID)  {
        reverseCodeGenIntervalID = setInterval(addReverseCode, 1000);
    }   else    {
        clearInterval(reverseCodeGenIntervalID);
        reverseCodeGenIntervalID = setInterval(addReverseCode, 1000/game.getReverseEngineerLines());
    }
}

function botCode(){
    var text = addBotCode();
    
    if(text.slice(0,4) == "<li>") {
        truncate();
    }
    
    $('#code').append(text);
    updateSpendableLines();
    updateScroll();
}

//  Change game language
function changeLanguage(language){
    if(language === "c"){
        game = Cgame;
    } else if(language === "java"){
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
    $("#spendableLines").html("<span class=\"bold\">SL: </span>" + game.getSpendableLines());
    $("#totalLines").html("<span class=\"bold\">TL: </span>" + game.getLines());
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
    spendableLinesIntervalID = setInterval(updateSpendableLines, 1000);
    console.log(spendableLinesIntervalID);
});





