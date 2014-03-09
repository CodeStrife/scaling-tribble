function Game(language) {
    
    var codePerCharacter = 1;
    var startIndex = 0;
    var endIndex = codePerCharacter;
    var lines = 0;
    var spendableLines = 0;
    var codeGeneratorLines = 0;
    var codeGeneratorEfficiency = 1;
    var autoCompletePrice = 10;
    var codeGeneratorPrice = 50;
    var efficiencyPrice = 100;
    
    var codeString = generateCode(language);                //  Big ass block of code
    var row = 0;
    var currentLine = "";
    var substring;


    function addCode(howMuch) {
        var file = codeFile;
        
        //  If reached end of file
        if(endIndex > file.length) {
            console.log("Reached end of file");
            startIndex = 0;
            endIndex = codePerCharacter;
        }
        
        substring =  file.substring(startIndex, endIndex);
        startIndex = endIndex;
        endIndex += howMuch;
        
        //  Check for line breaks.
        for(var i = 0; i < substring.length; i++) {
            if(substring.charAt(i) == '\n') {
                lines++;
                spendableLines++;
                
                //  Return whole line in <li> tags.
                var ret = "<li>" + currentLine + substring.slice(0,i); // + "</li>";
                
                //  Add remainder of line to currentLine.
                currentLine = substring.slice(i+1,substring.length);
                
                console.log("code.js returning: \n ret = " + ret + "\n currentLine (not returned) = " + currentLine);
                return ret;
            }
        }
        
        currentLine = currentLine + substring;
        console.log("code.js returning: \n substring = " + substring);
        return substring;
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
            autoCompletePrice = Math.floor(1.1 * autoCompletePrice);
        }
    }

    function boughtCodeGenerator() {
        if(spendableLines >= codeGeneratorPrice){
            spendableLines -= codeGeneratorPrice;
            codeGeneratorLines++;
            codeGeneratorPrice = Math.floor(1.1 * codeGeneratorPrice);
        }
    }
    
    function boughtCodeGeneratorEfficiency() {
        if(spendableLines >= efficiencyPrice){
            spendableLines -= efficiencyPrice;
            codeGeneratorEfficiency++;
            efficiencyPrice = Math.floor(1.1 * efficiencyPrice);
        }
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
        getSpendableLines: function () {
            return spendableLines
        },
        getCodePerCharacter: function () {
            return codePerCharacter
        },
        getCodeGeneratorLines: function () {
            return codeGeneratorLines
        },
        getCodeGeneratorEfficiency: function () {
            return codeGeneratorEfficiency
        },
        
        //  Prices
        getAutoCompletePrice: function () {
            return autoCompletePrice;
        },
        getCodeGeneratorPrice: function () {
            return codeGeneratorPrice;
        },
        getEfficiencyPrice: function () {
            return efficiencyPrice;
        },
        
        
        //  Saving, these don't need to be public I think...
        toJSON: function () {
            return {
                //  This should be stringifyable.
                spendableLines : spendableLines,
                autoCompletes : codePerCharacter-1,
                codeGenerators: codeGeneratorLines,
                efficiencies : codeGeneratorEfficiency-1,
            }
        },
        
        fromJSON: function (json) {
            console.log("Restoring save..");
            var data = JSON.parse(json);
            restoreFromJSON(data.spendableLines, data.autoCompletes, data.codeGenerators, data.efficiencies);
        },
        
        saveGame: function() {
            localStorage["codeStrifeSave"] = JSON.stringify(this.toJSON());
        },
        
        loadGame: function() {
            this.fromJSON(localStorage["codeStrifeSave"]);
        }
    };
    
    
    //experimental functions
    
    /*  To save:
     *  localStorage["save"] = JSON.stringify(game.toJSON());
     *  
     *  To load:
     *  game.fromJSON(localStorage["save"]);
     *
     */
    
    function restoreFromJSON(lines, completes, generators, effs) {
        console.log("Called restoreFromJSON(" + lines +", " + completes + ", " + generators + ", " + effs + ")");
        spendableLines = lines;
        codePerCharacter = completes+1;
        codeGeneratorLines = generators;
        codeGeneratorEfficiency = effs+1;
        syncCodeGen();
    }

}











