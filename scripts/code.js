function Game(language) {
    
    var codePerCharacter = 1;
    var startIndex = 0;
    var endIndex = codePerCharacter;
    var lines = 0;
    var spendableLines = 0;
    var codeGeneratorLines = 0;
    var codeGeneratorEfficiency = 1;
    var autoCompletePrice = 10;
    
    var codeString = generateCode(language);


    function addCode(howMuch) {
        var substring = codeString.substring(startIndex, endIndex);
        var stringWithLinebreaks = "";
        for (var i = 0; i < substring.length; i++) {
            if (substring[i] == '¤') {
                stringWithLinebreaks += "<br/>";
                lines++;
                spendableLines++;
            } else {
                stringWithLinebreaks += substring[i];
            }
        }
        startIndex = endIndex;
        endIndex += howMuch;
        if(startIndex > 30000){
            startIndex = 0;
            endIndex = codePerCharacter;
            console.log("restarting");
        }
        
        return stringWithLinebreaks;
    }

    function generateCode(language) {
        var array;
        if(language == "java"){
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
        if(spendableLines >= autoCompletePrice){
            spendableLines -= autoCompletePrice;
            codePerCharacter++;
            autoCompletePrice = Math.floor(1.2 * autoCompletePrice);
            console.log('Bought autocomplete');
        }
        console.log("price: " + autoCompletePrice + "spendableLine" + spendableLines);
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
        buyEfficiency: boughtCodeGeneratorEfficiency,
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
        },
        getCodeGeneratorEfficiency: function () {
            return codeGeneratorEfficiency
        }
    };

}