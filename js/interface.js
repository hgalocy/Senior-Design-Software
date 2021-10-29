
let comm;
let resultTitles = ["PreAmpOut","GainStageOut","EmitBypOut","EmitFlloOut","SrcFlloOut","12VOut","8VOut","6VOut","NegDrvOut","PosDrvOut","SPRKPos","SPRKNeg"];

async function DCTest (){
    potSetting("Drive", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasDC").then(writeConsoleAndCSVCommands("DC Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringDC(comm)))
    DCTestPassFlag = 1;
    console.log("DC Test finished with result: " + DCTestPassFlag);

}
function noiseTest (){
    potSetting("Drive", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Noise Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    noiseTestPassFlag = 1;
    console.log("Noise Test finished with result: " + noiseTestPassFlag);
}
function gainTest (){
    potSetting("Drive", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .001, 1000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Gain Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    gainTestPassFlag = 1;
    console.log("Gain Test finished with result: " + gainTestPassFlag);
}
function flatTest (){
    potSetting("Drive", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Flat Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 1000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Flat Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 7000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"])) 
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Flat Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    flatTestPassFlag = 1;
    console.log("Flat Test finished with result: " + flatTestPassFlag);
}
function bassTest (){
    potSetting("Drive", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CCW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Bass Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 1000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Bass Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 7000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Bass Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    bassTestPassFlag = 1;
    console.log("Bass Test finished with result: " + bassTestPassFlag);
}
function trebleTest (){
    potSetting("Drive", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Treble Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 1000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Treble Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Guitar", .02, 7000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Treble Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    trebleTestPassFlag = 1;
    console.log("Treble Test finished with result: " + trebleTestPassFlag);
}
function presTest (){
    potSetting("Drive", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("tone", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("vol", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 800).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Pres Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    presSetting("On").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 800).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Pres Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    presTestPassFlag = 1;
    console.log("Pres Test finished with result: " + presTestPassFlag);
}
function auxTest (){
    potSetting("Drive", "CCW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CCW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CCW").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Aux", .02, 25).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Aux Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Aux", .02, 3000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Aux Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    sigOn("Aux", .02, 8000).then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(writeConsoleAndCSVCommands("Aux Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], outputResultStringAC(comm)))
    auxTestPassFlag = 1;
    console.log("Aux Test finished with result: " + auxTestPassFlag);
}
function powTest (){ 
    potSetting("Drive", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(appendConsole(JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    //arduino will handle different signal levels/freqs
    testCommand("MeasDist", 2).then(writeConsoleAndCSVCommands("Pow Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], ""))
    testCommand("MeasDist", 5).then(writeConsoleAndCSVCommands("Pow Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], ""))
    testCommand("MeasDist", 9).then(writeConsoleAndCSVCommands("Pow Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], ""))
    testCommand("MeasDist", 10).then(writeConsoleAndCSVCommands("Pow Test", JSON.parse(comm)["Action"], JSON.parse(comm)["Result"]["Success"], ""))
    powTestPassFlag = 1;
    console.log("Pow Test finished with result: " + powTestPassFlag);
}

function potSetting(pot, setting){
    let potJSON = { "Command" : "PotCtrl", "Params": {"Channel": pot, "Control": setting}};
    potJSONString = JSON.stringify(potJSON)
    comm = ipcRenderer.sendSync("arduino command", potJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(comm);
        }, 1);
    });
}
function presSetting(pres){
    let presJSON = {"Command": "PresCtrl", "Params": {"Control": pres}};
    presJSONString = JSON.stringify(presJSON)
    comm = ipcRenderer.sendSync("arduino command", presJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(comm);
        }, 1);
    });
}
function sigOn(input, mvrms, freq){
    let sigOnJSON = {"Command": "SigOn", "Params": {"Channel": input, "Level": mvrms, "Frequency": freq}};
    sigOnJSONString = JSON.stringify(sigOnJSON)
    comm = ipcRenderer.sendSync("arduino command", sigOnJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(comm);
        }, 1);
    });
}
function sigOff(){
    let inputJSON = {"Command": "SigOff"};
    inputJSONString = JSON.stringify(inputJSON)
    comm = ipcRenderer.sendSync("arduino command", inputJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(comm);
        }, 1);
    });
}
function testCommand(test, value){
    let testJSON;
    if (test == "distortion"){ //watts
        testJSON = {Command: test, Params: {Watts: value}};
    }
    else{ //frequency
        testJSON = {Command: test};
    }
    testJSONString = JSON.stringify(testJSON)
    comm = ipcRenderer.sendSync("arduino command", testJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(comm);
        }, 1);
    });
}


//defining helper functions for hardcoded json

function outputResultStringDC(myComm){
    let resultString = ""
    resultTitles.forEach(function(result, index){
        resultString += result+": "+JSON.parse(myComm)["Result"][result]["Level"]+"V; ";
    });
    return resultString;
}
function outputResultStringAC(myComm){
    let resultString = ""
    resultTitles.forEach(function(result, index){
        resultString += result+": "+JSON.parse(myComm)["Result"][result]["Level"]+"V "+JSON.parse(myComm)["Result"][result]["Freq"]+"Hz; ";
    });
    return resultString;
}






