var codeString = generateCode();
var startIndex = 0;
var endIndex = 7;

console.log("AAAAAAAAAAAAAGH");
$( document ).keydown( function (event) { 
		var substring = codeString.substring(startIndex, endIndex);
		var stringWithLinebreaks = "";
		for(var i = 0; i < substring.length; i++){
			if(substring[i] == '¤'){
				stringWithLinebreaks += "<br/>";
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
