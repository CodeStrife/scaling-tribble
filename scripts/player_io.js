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
 var saveGameIntervalID;
 var language = "java";
 var canPress = true;

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
	    // console.log('Switched to Java!');
	    changeLanguage("java");
	    updateAmounts();
	    $("#code").html("<li>//   CODE HERE</li><li><br></li><li><br></li>");
	    }
  });

  //    BUTTON: C
  $("#c").click( function() {
    if(language != "c") {
	    language = "c";
	    // console.log('Switched to C!');
	    changeLanguage("c");
	    updateAmounts();
	    $("#code").html("<li>/*   CODE HERE   */</li><li><br></li><li><br></li>");
    }
  });

  //    BUTTON: Load
  $("#load").click( function() {
      JavaGame.loadGame("java");
      Cgame.loadGame("c");
      updateAmounts(true);
      syncCodeGen();
      clearInterval(saveGameIntervalID);
      setTimeout(function() {
          console.log("Starting to save");
          saveGameIntervalID = setInterval(saveGames, 30000);         //  Autosave every 30s.
      }, 30000);
      
      popup("LOADED");
  });

  //    BUTTON: Save
  $("#save").click( function() {
      saveGames();
      updateAmounts();
      clearInterval(saveGameIntervalID);
      saveGameIntervalID = setInterval(saveGames, 30000);         //  Autosave every 30s.
      
      popup("SAVED");
  });
  
  //    BUTTON: Truncate
  $("#truncate").click( function() {
      truncate();
  });

 /*** END BUTTONS ***/

  //    Set a to true if you only want to update the lines but not send to server.
function updateAmounts(a) {
  $("#autocompleteAmount").html(game.getCodePerCharacter()-1);
  $("#codegeneratorAmount").html(game.getCodeGeneratorLines());
  $("#efficiencyAmount").html(game.getCodeGeneratorEfficiency()-1);
  $("#reverseAmount").html(game.getReverseEngineerLines());

  $("#autocompletePrice").html(game.getAutoCompletePrice());
  $("#codegeneratorPrice").html(game.getCodeGeneratorPrice());
  $("#efficiencyPrice").html(game.getEfficiencyPrice());
  $("#reversePrice").html(game.getReverseEngineerPrice());

  updateSpendableLines(a);
}
  
function saveGames()  {
    console.log("Saving..." + saveGameIntervalID);
    JavaGame.saveGame("java");
    Cgame.saveGame("c");
}
  


function popup(a)    {
    $('#popup').html(a);
    $('#popup').show();
    setTimeout(function() {
        $('#popup').fadeOut(500);
    }, 1000);
}



function syncCodeGen(){
    
    //  Code generator
    if(game.getCodeGeneratorLines() == 0){
        clearInterval(codeGenIntervalID);
    } else if(!codeGenIntervalID){
        codeGenIntervalID = setInterval(botCode, 1000);
        //  console.log("Interval set");
    } else {
        //  console.log("clearing interval and setting a new one");
        clearInterval(codeGenIntervalID);
        codeGenIntervalID = setInterval(botCode, 1000/game.getCodeGeneratorLines());
        //  console.log("interval set at: " + 1000/game.getCodeGeneratorLines());
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
    clearInterval(spendableLinesIntervalID);
    if(language === "c"){
        game = Cgame;
    } else if(language === "java"){
        game = JavaGame;
    }
    lastLines = game.getLines();
    addBotCode = game.botCode;
    playerCode = game.playerCode;
    addReverseCode = game.reverseCode;
    syncCodeGen();
    spendableLinesIntervalID = setInterval(updateSpendableLines, 1000);
}

//  Update line counter div
function updateCounter(a,b,c,d) {
    $("#total_java").html("<span class=\"bold\">JAVA: </span>" + a);
    $("#total_JPS").html("<span class=\"bold\">JPS: </span>" + b + "/s");
    $("#total_c").html("<span class=\"bold\">C: </span>" + c);
    $("#total_CPS").html("<span class=\"bold\">CPS: </span>" + d + "/s");
}

function updatePlayerCount(a)   {
    $("#players").html("<span class=\"bold\">CODERS: </span>" + a);
}

function updateSpendableLines(a) {
    if(a)   {
        $("#spendableLines").html("<span class=\"bold\">SL: </span>" + game.getSpendableLines());
        $("#totalLines").html("<span class=\"bold\">TL: </span>" + game.getLoadedLines());
    }
    else    {
        $("#spendableLines").html("<span class=\"bold\">SL: </span>" + game.getSpendableLines());
        $("#totalLines").html("<span class=\"bold\">TL: </span>" + (game.getLines() + game.getLoadedLines()));
    }
}

//    Keep code DIV scrolled to bottom.
function updateScroll() {
    codediv.scrollTop = codediv.scrollHeight;
}

function truncate() {
    var lines = $('li', code);
    var trunc = lines.slice(Math.min(lines.length - 50, 50));             //  This also cuts out whitespace ie. empty lines
    $("#code").html(trunc);
}

$( document ).keydown( function (event) {
    //  If spacebar is pressed, don't scroll to bottom.
    var key = event.charCode || event.keyCode || 0;
    if (key == 32) {
        // console.log("Pressed space");
        event.preventDefault();
    }
    
    if(canPress) {
        canPress = false;
        var text = playerCode();
        
        //  If incoming line is a ready line
        if(text.slice(0,4) == "<li>") {
            truncate();
        }
        
        $('#code').append(text);
        updateSpendableLines();
        updateScroll();
    }
});

$('#code').on("tap", function()   {
    var text = playerCode();
    
    //  If incoming line is a ready line
    if(text.slice(0,4) == "<li>") {
        truncate();
    }
    
    $('#code').append(text);
    updateSpendableLines();
    updateScroll();
});

$(document).keyup(function() {
    canPress = true;
});



$(document).ready( function() {
    $('#popup').hide();
    
    requestCodeFile();
    updateAmounts();
    spendableLinesIntervalID = setInterval(updateSpendableLines, 1000);
});

$("#autocomplete").hover(
    function()  {
        $("#autocomplete .upgradeText").html("<span class=\"smallText\">Intelligent autocomplete for more efficient typing.</span>");
    },
    function()  {
        $("#autocomplete .upgradeText").html("Auto<span class=\"darkgreen\">complete");
});

$("#codegenerator").hover(
    function()  {
        $("#codegenerator .upgradeText").html("<span class=\"smallText\">Compile a generative algorithm that produces code autonomously.</span>");
    },
    function()  {
        $("#codegenerator .upgradeText").html("Code <span class=\"darkgreen\">Generator</span>");
});

$("#efficiency").hover(
    function()  {
        $("#efficiency .upgradeText").html("<span class=\"smallText\">Increase the efficiency of Code Generators.</span>");
    },
    function()  {
        $("#efficiency .upgradeText").html("Generator <span class=\"bold\">Efficiency</span>");
});

$("#reverse").hover(
    function()  {
        $("#reverse .upgradeText").html("<span class=\"smallText\">Reverse engineer 1% of the competing language's code per second into useable lines.</span>");
    },
    function()  {
        $("#reverse .upgradeText").html("<span class=\"darkGreen\">Reverse</span> Engineering");
});