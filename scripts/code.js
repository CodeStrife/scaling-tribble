function Game(language) {
    
    var codePerCharacter = 1;
    var startIndex = 0;
    var endIndex = codePerCharacter;
    var lines = 500;
    var codeGeneratorLines = 0;
    var codeGeneratorEfficiency = 1;
    
    var codeString = generateCode(language);


    function addCode(howMuch) {
        console.log("adding code");
        var substring = codeString.substring(startIndex, endIndex);
        var stringWithLinebreaks = "";
        for (var i = 0; i < substring.length; i++) {
            if (substring[i] == '¤') {
                stringWithLinebreaks += "<br/>";
                lines++;
            } else {
                stringWithLinebreaks += substring[i];
            }
        }
        startIndex = endIndex;
        endIndex += howMuch;
        return stringWithLinebreaks;
    }

    function generateCode(language) {
        var array;
        if(language == "Java"){
            array = ["public ", "static ", "int ", "{ ¤", "¤}¤", "return ", "double ", "String ", "void "];
        } else {
            array = [" int", "¤{¤", "¤}¤", " return", " double", " char*", " void", "*","()", " const", " struct", " int*"];
        }
        var string = "";
        for (var i = 0; i < 10000; i++) {
            string += array[Math.floor((Math.random() * array.length))];
        }
        return string;
    }

    function boughtAutoComplete() {
        codePerCharacter++;
    }

    function boughtCodeGenerator() {
        codeGeneratorLines++;
    }
    
    function boughtCodeGeneratorEfficiency() {
        codeGeneratorEfficiency++;
    }

    function addPlayerCode() {
        return addCode(codePerCharacter);
    }
    
    function addBotCode(){
        return addCode(codeGeneratorEfficiency);
    }

    //  Palauttaa aksessorit

    return {
        buyCodeGenerator: boughtCodeGenerator,
        buyAutoComplete: boughtAutoComplete,
        playerCode: addPlayerCode,
        botCode: addBotCode,

        getLines: function () {
            return lines
        },
        getCodePerCharacter: function () {
            return codePerCharacter
        },
        getCodeGeneratorLines: function () {
            return codeGeneratorLines
        }
    };

}