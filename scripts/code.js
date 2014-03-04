var codeString = generateCode();
var startIndex = 0;
var endIndex = 7;
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
		startIndex += 7;
		endIndex += 7;
	}
);

function generateCode(){
	var array = ["public ", "static ", "int ", "{ ¤", "¤}¤", "return ", "double " , "String ", "void "];
	var string = "";
	for(var i = 0; i < 1000; i++){
		string += array[Math.floor((Math.random()*array.length))];
	}
	return string;
}
