var codeString = generateCode();
var startIndex = 0;
var endIndex = 7;

console.log("AAAAAAAAAAAAAGH");
$( document ).keydown( function (event) { 
		console.log(codeString.substring(startIndex, endIndex));
		startIndex += 7;
		endIndex += 7;
	}
);

function generateCode(){
	var array = ["public ", "static ", "int ", "{ \n", "\n}\n", "return ", "int"];	
	var string = "";
	for(var i = 0; i < 1000; i++){
		string += array[Math.floor((Math.random()*array.length))];
	}
	return string;
}
