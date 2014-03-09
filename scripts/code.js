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
    
    function price(a) {
        if(a === "autocomplete") {
            return Math.floor(autoCompletePrice * Math.pow(1.1, codePerCharacter-1));
        }
        if(a === "codegenerator") {
            return Math.floor(codeGeneratorPrice * Math.pow(1.1, codeGeneratorLines));
        }
        if(a === "efficiency") {
            return Math.floor(efficiencyPrice * Math.pow(1,1,codeGeneratorEfficiency-1));
        }
        else
            console.log("Called for price of something that doesn't exist");
    }

    function boughtAutoComplete() {
        if(spendableLines >= price("autocomplete")){
            spendableLines -= price("autocomplete");
            codePerCharacter++;
            // autoCompletePrice = Math.floor(10 * Math.pow((codePerCharacter-1),1.1));
        }
    }

    function boughtCodeGenerator() {
        if(spendableLines >= price("codegenerator")){
            spendableLines -= price("codegenerator");
            codeGeneratorLines++;
            // codeGeneratorPrice = Math.floor(50 * Math.pow(codeGeneratorLines,1.1));
        }
    }
    
    function boughtCodeGeneratorEfficiency() {
        if(spendableLines >= price("efficiency")){
            spendableLines -= price("efficiency");
            codeGeneratorEfficiency++;
            // efficiencyPrice = Math.floor(100 * Math.pow((codeGeneratorEfficiency-1),1.1));
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
        toJSON: toJSON,
        fromJSON: fromJSON,

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
            return price("autocomplete");
        },
        getCodeGeneratorPrice: function () {
            return price("codegenerator");
        },
        getEfficiencyPrice: function () {
            return price("efficiency");
        },
        
        saveGame: function(a) {
            localStorage[a] = JSON.stringify(this.toJSON());
        },
        
        loadGame: function(a) {
            this.fromJSON(localStorage[a]);
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
    }
    
    
        
    //  Saving, these don't need to be public I think...
    function toJSON() {
        return {
            //  This should be stringifyable.
            spendableLines : spendableLines,
            autoCompletes : codePerCharacter-1,
            codeGenerators: codeGeneratorLines,
            efficiencies : codeGeneratorEfficiency-1,
        }
    }
    
    function fromJSON(json) {
        console.log("Restoring save..");
        var data = JSON.parse(json);
        restoreFromJSON(data.spendableLines, data.autoCompletes, data.codeGenerators, data.efficiencies);
    }

}











