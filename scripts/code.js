function Game(language) {
    
    var codePerCharacter = 1;
    var startIndex = 0;
    var endIndex = codePerCharacter;
    var lines = 0;
    var spendableLines = 0;
    var loadedLines = 0;
    var codeGeneratorLines = 0;
    var codeGeneratorEfficiency = 1;
    var reverseEngineerLines = 0;
    
    var autoCompletePrice = 10;
    var codeGeneratorPrice = 50;
    var efficiencyPrice = 100;
    var reverseEngineerPrice = 150;
    
    var row = 0;
    var currentLine = "";
    var substring;


    function addCode(howMuch) {
        if(language === "java") {
            var file = javaFile;
        }
        else if(language === "c") {
            var file = cFile;
        }
        else {
            //  console.log("Can't find file yo");
        }
        
        //  If reached end of file
        if(endIndex > file.length) {
            //  console.log("Reached end of file");
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
                
                //  console.log("code.js returning: \n ret = " + ret + "\n currentLine (not returned) = " + currentLine);
                return ret;
            }
        }
        
        currentLine = currentLine + substring;
        //  console.log("code.js returning: \n substring = " + substring);
        return substring;
    }

    function price(a) {
        if(a === "autocomplete") {
            return Math.floor(autoCompletePrice * Math.pow(1.1, codePerCharacter-1));
        }
        if(a === "codegenerator") {
            return Math.floor(codeGeneratorPrice * Math.pow(1.1, codeGeneratorLines));
        }
        if(a === "efficiency") {
            return Math.floor(efficiencyPrice * Math.pow(1.1,codeGeneratorEfficiency-1));
        }
        if(a === "reverse") {
            return Math.floor(reverseEngineerPrice * Math.pow(1.1,reverseEngineerLines))
        }
        else
            console.log("ERROR: Called for price of something that doesn't exist");
    }

    function boughtAutoComplete() {
        if(spendableLines >= price("autocomplete")){
            spendableLines -= price("autocomplete");
            codePerCharacter++;
        }
    }

    function boughtCodeGenerator() {
        if(spendableLines >= price("codegenerator")){
            spendableLines -= price("codegenerator");
            codeGeneratorLines++;
        }
    }
    
    function boughtCodeGeneratorEfficiency() {
        if(spendableLines >= price("efficiency")){
            spendableLines -= price("efficiency");
            codeGeneratorEfficiency++;
        }
    }
    
    function boughtReverseEngineer() {
        if(spendableLines >= price("reverse")) {
            spendableLines -= price("reverse");
            reverseEngineerLines++;
        }
    }

    function addPlayerCode() {
        return addCode(codePerCharacter);
    }
    
    function addBotCode(){
        return addCode(codeGeneratorEfficiency);
    }
    
    function addReverseCode() {
        if(this.language === "java") {
            spendableLines += Math.ceil(0.01 * reverseEngineerLines * globalCPS.max());
        }
        else if(this.language === "c") {
            spendableLines += Math.ceil(0.01 * reverseEngineerLines * globalJPS.max());
        }
    }
    
    
    //  Palauttaa aksessorit
    return {
        buyCodeGenerator: boughtCodeGenerator,
        buyAutoComplete: boughtAutoComplete,
        buyEfficiency: boughtCodeGeneratorEfficiency,
        buyReverse: boughtReverseEngineer,
        playerCode: addPlayerCode,
        botCode: addBotCode,
        reverseCode: addReverseCode,
        toJSON: toJSON,
        fromJSON: fromJSON,

        getLines: function () {
            return lines
        },
        getSpendableLines: function () {
            return spendableLines
        },
        getLoadedLines: function () {
            return loadedLines
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
        getReverseEngineerLines: function() {
            return reverseEngineerLines;
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
        getReverseEngineerPrice: function() {
            return price("reverse");
        },
        
        saveGame: function(a) {
            localStorage[a] = JSON.stringify(this.toJSON());
        },
        
        loadGame: function(a) {
            this.fromJSON(localStorage[a]);
        }
    };
    
    function restoreFromJSON(slines, lns,completes, generators, effs, reverses) {
        //  console.log("Called restoreFromJSON(" + slines +", " + lns +  ", " + completes + ", " + generators + ", " + effs + ", " + reverses + ")");
        spendableLines = slines;
        loadedLines = lns;
        codePerCharacter = completes+1;
        codeGeneratorLines = generators;
        codeGeneratorEfficiency = effs+1;
        reverseEngineerLines = reverses;
    }
    
    function toJSON() {
        return {
            spendableLines : spendableLines,
            totalLines : lines+loadedLines,
            autoCompletes : codePerCharacter-1,
            codeGenerators: codeGeneratorLines,
            efficiencies : codeGeneratorEfficiency-1,
            reverses : reverseEngineerLines
        }
    }
    
    function fromJSON(json) {
        // console.log("Restoring save..");
        var data = JSON.parse(json);
        restoreFromJSON(data.spendableLines, data.totalLines, data.autoCompletes, data.codeGenerators, data.efficiencies, data.reverses);
    }

}











