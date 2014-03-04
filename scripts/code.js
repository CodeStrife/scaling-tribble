var codeString = generateCode();
var codePerCharacter = 1;
var startIndex = 0;
var endIndex = codePerCharacter;
var lines = 0;
var codeGeneratorLines = 1;
var codeGeneratorIntervalID;

console.log("AAAAAAAAGH");
$( document ).keydown( function (event) { 
		addCode(codePerCharacter);
	}
);

function addCode(howMuch){
    var substring = codeString.substring(startIndex, endIndex);
	var stringWithLinebreaks = "";
	for(var i = 0; i < substring.length; i++){
	    if(substring[i] == '¤'){
	    	stringWithLinebreaks += "<br/>";
        	lines++;
        } else {
	        stringWithLinebreaks += substring[i];
	    }
	}
	$('#code').append(stringWithLinebreaks);
	startIndex = endIndex;
	endIndex += howMuch;
	updateScroll();
}

function generateCode(){
	var array = ["public ", "static ", "int ", "{ ¤", "¤}¤", "return ", "double " , "String ", "void "];
	var string = "";
	for(var i = 0; i < 10000; i++){
		string += array[Math.floor((Math.random()*array.length))];
	}
	return string;
}

function boughtAutoComplete(){
    codePerCharacter++;
}

function botCode(){
    addCode(1);
}

function boughtCodeGenerator(){
    if(codeGeneratorIntervalID == null){
        codeGeneratorIntervalID = setInterval(botCode, 1000);
        console.log("Interval set");
    } else {
        codeGeneratorLines++;
        clearInterval(codeGeneratorIntervalID);
        codeGeneratorIntervalID = setInterval(botCode, 1000/codeGeneratorLines);
    }
}
