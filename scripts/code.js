var codeString = generateCode();
var codePerCharacter = 1;
var startIndex = 0;
var endIndex = codePerCharacter;
var lines = 0;

console.log("AAAAAAAAGH");
$( document ).keydown( function (event) { 
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
		endIndex += codePerCharacter;
	}
);

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
