let comm;
let resultTitles = ["PreAmpOut","GainStageOut","EmitBypOut","EmitFlloOut","SrcFlloOut","12VOut","8VOut","6VOut","NegDrvOut","PosDrvOut","SPRKPos","SPRKNeg"];
//test passing parameters
let passingDC = {
    "PreAmpOutH" : 5.6,
    "PreAmpOutL" : 5.2,
    "GainStageOutH" : 6.3,
    "GainStageOutL" : 5.7,
    "EmitBypOutH" : 3,
    "EmitBypOutL" : 2.7,
    "EmitFlloOutH" : 3.5,
    "EmitFlloOutL" : 2.9,
    "SrcFlloOutH" : 4,
    "SrcFlloOutL" : 3.6,
    "12VOutH" : 12.5,
    "12VOutL" : 11.5,
    "8VOutH": 8.1,
    "8VOutL" : 7.9,
    "6VOutH" : 6.15,
    "6VOutL" : 5.85,
    "NegDrvOutH" : 6,
    "NegDrvOutL" : 5.8,
    "PosDrvOutH" : 6.15,
    "PosDrvOutL" : 5.85,
    "SPRKPosH" : 9000000,
    "SPRKPosL" : -9000000,
    "SPRKNegH" : 9000000,
    "SPRKNegL" : -9000000
}
let passingAC = {
    "PreAmpOutH" : .0052,
    "PreAmpOutL" : .0048,
    "GainStageOutH" : .095,
    "GainStageOutL" : .085,
    "EmitBypOutH" : 9000000,
    "EmitBypOutL" : -9000000,
    "EmitFlloOutH" : .094,
    "EmitFlloOutL" : .084,
    "SrcFlloOutH" : .072,
    "SrcFlloOutL" : .066,
    "12VOutH" : 9000000,
    "12VOutL" : -9000000,
    "8VOutH": 9000000,
    "8VOutL" : -9000000,
    "6VOutH" : 9000000,
    "6VOutL" : -9000000,
    "NegDrvOutH" : 1.6,
    "NegDrvOutL" : 1.3,
    "PosDrvOutH" : 1.6,
    "PosDrvOutL" : 1.3,
    "SPRKPosH" : 3.1,
    "SPRKPosL" : 2.5,
    "SPRKNegH" : 3.1,
    "SPRKNegL" : 2.5
}
let commandFailFlag = 0; //1 if a command fails
//0 if unexecuted, 1 if pass, 2 if fail
let DCTestPassFlag = 0;
let noiseTestPassFlag = 0;
let gainTestPassFlag = 0;
let flatTestPassFlag = 0;
let bassTestPassFlag = 0;
let trebleTestPassFlag = 0;
let presTestPassFlag = 0;
let auxTestPassFlag = 0;
let powTestPassFlag = 0;
let resultPassFlag = 0;

function DCTest (){
    resultPassFlag = 0; //reset result pass flag in case incremented from last run through
    potSetting("Drive", "CW").then(sendAppendConsole(comm))
    potSetting("Tone", "MID").then(sendAppendConsole(comm))
    potSetting("Volume", "CW").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    testCommand("MeasDC").then(sendAppendConsoleCsv("DC Test", comm, "DC").then(resultPassFlag += testingPass(comm, "DC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        DCTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        DCTestPassFlag = 2; //indicate failure
    }
    console.log("DC Test finished with result: " + DCTestPassFlag);
}
function noiseTest (){
    potSetting("Drive", "CW").then(sendAppendConsole(comm))
    potSetting("Tone", "CW").then(sendAppendConsole(comm))
    potSetting("Volume", "CW").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Noise Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        noiseTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        noiseTestPassFlag = 2; //indicate failure
    }
    console.log("Noise Test finished with result: " + noiseTestPassFlag);
}
function gainTest (){
    potSetting("Drive", "CW").then(sendAppendConsole(comm))
    potSetting("Tone", "MID").then(sendAppendConsole(comm))
    potSetting("Volume", "CW").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Guitar", .001, 1000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Gain Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        gainTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        gainTestPassFlag = 2; //indicate failure
    }
    console.log("Gain Test finished with result: " + gainTestPassFlag);
}
function flatTest (){
    potSetting("Drive", "MID").then(sendAppendConsole(comm))
    potSetting("Tone", "MID").then(sendAppendConsole(comm))
    potSetting("Volume", "MID").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Guitar", .02, 60).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Flat Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 1000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Flat Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 7000).then(sendAppendConsole(comm)) 
    testCommand("MeasAC").then(sendAppendConsoleCsv("Flat Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        flatTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        flatTestPassFlag = 2; //indicate failure
    }
    console.log("Flat Test finished with result: " + flatTestPassFlag);
}
function bassTest (){
    potSetting("Drive", "MID").then(sendAppendConsole(comm))
    potSetting("Tone", "CCW").then(sendAppendConsole(comm))
    potSetting("Volume", "MID").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Guitar", .02, 60).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Bass Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 1000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Bass Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 7000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Bass Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        bassTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        bassTestPassFlag = 2; //indicate failure
    }
    console.log("Bass Test finished with result: " + bassTestPassFlag);
}
function trebleTest (){
    potSetting("Drive", "MID").then(sendAppendConsole(comm))
    potSetting("Tone", "CW").then(sendAppendConsole(comm))
    potSetting("Volume", "MID").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Guitar", .02, 60).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Treble Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 1000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Treble Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Guitar", .02, 7000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Treble Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        trebleTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        trebleTestPassFlag = 2; //indicate failure
    }
    console.log("Treble Test finished with result: " + trebleTestPassFlag);
}
function presTest (){
    potSetting("Drive", "MID").then(sendAppendConsole(comm))
    potSetting("Tone", "MID").then(sendAppendConsole(comm))
    potSetting("Volume", "MID").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Guitar", .02, 800).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Pres Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    presSetting("On").then(sendAppendConsole(comm))
    sigOn("Guitar", .02, 800).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Pres Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        presTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        presTestPassFlag = 2; //indicate failure
    }
    console.log("Pres Test finished with result: " + presTestPassFlag);
}
function auxTest (){
    potSetting("Drive", "CCW").then(sendAppendConsole(comm))
    potSetting("Tone", "CCW").then(sendAppendConsole(comm))
    potSetting("Volume", "CCW").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    sigOn("Aux", .02, 25).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Aux Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Aux", .02, 3000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Aux Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    sigOn("Aux", .02, 8000).then(sendAppendConsole(comm))
    testCommand("MeasAC").then(sendAppendConsoleCsv("Aux Test", comm, "AC").then(resultPassFlag += testingPass(comm, "AC")))
    if (resultPassFlag == 0){ //if results failed, resultPassFlag would have been incremented
        auxTestPassFlag = 1; //indicate pass
    }
    else{ //results are in range
        auxTestPassFlag = 2; //indicate failure
    }
    console.log("Aux Test finished with result: " + auxTestPassFlag);
}
function powTest (){ 
    potSetting("Drive", "MID").then(sendAppendConsole(comm))
    potSetting("Tone", "MID").then(sendAppendConsole(comm))
    potSetting("Volume", "MID").then(sendAppendConsole(comm))
    presSetting("Off").then(sendAppendConsole(comm))
    sigOff().then(sendAppendConsole(comm))
    //arduino will handle different signal levels/freqs
    testCommand("MeasDist", 2).then(sendAppendConsoleCsv("Pow Test", comm, "DIST"))
    testCommand("MeasDist", 5).then(sendAppendConsoleCsv("Pow Test", comm, "DIST"))
    testCommand("MeasDist", 9).then(sendAppendConsoleCsv("Pow Test", comm, "DIST"))
    testCommand("MeasDist", 10).then(sendAppendConsoleCsv("Pow Test", comm, "DIST"))
    powTestPassFlag = 1; //always passes becus checks not implemented
    console.log("Pow Test finished with result: " + powTestPassFlag);
}

//comands to arduino
function potSetting(pot, setting){
    let potJSON = { "Command" : "PotCtrl", "Params": {"Channel": pot, "Control": setting}};
    potJSONString = JSON.stringify(potJSON)
    comm = ipcRenderer.sendSync("arduino command", potJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 1; //indicate a command failure
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
        commandFailFlag == 1; //indicate a command failure
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

    console.log("SENDING STRING: "+ sigOnJSONString)

    comm = ipcRenderer.sendSync("arduino command", sigOnJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 1; //indicate a command failure
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
        commandFailFlag == 1; //indicate a command failure
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
        commandFailFlag == 1; //indicate a command failure
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(comm);
        }, 1);
    }); 
}


//defining helper functions for hardcoded json
//create arg to send back to renderer process
function setResultArg(test, myComm, whatC){
    let arg = {
        test : "",
        action : "", //tmp
        success : "",
        resultString : ""
    };
    arg["test"] = test;
    arg["action"] = JSON.parse(myComm)["Action"];
    arg["success"] = JSON.parse(myComm)["Result"]["Success"];
    if (whatC == "DC"){
        arg["resultString"] = outputResultStringDC(myComm);
    }
    else if (whatC == "AC"){
        arg["resultString"] = outputResultStringAC(myComm);
    }
    return arg;
}
//create string to output results
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
//tell renderer process to output to console/csv
function sendAppendConsole(myComm){
    ipcRenderer.send("append console", JSON.parse(myComm)["Action"] + " " + JSON.parse(myComm)["Result"]["Success"])
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(comm);
        }, 1);
    }); 
}
function sendAppendConsoleCsv(test, myComm, command){
    ipcRenderer.send("append console and csv commands", setResultArg(test, myComm, command))    
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(comm);
        }, 1);
    }); 
}

//evaluate results of test to see if it failed
function testingPass(myComm, dcOrac){
    if(dcOrac == "AC"){ //grab appropriate expected results to compare
        passing = passingAC;
    }
    else{
        passing = passingDC;
    }
    for (let result in passing) {
        let currResult = JSON.parse(myComm)["Result"][result.substring(0, result.length - 1)]["Level"]; //store arduino resturned result in variable
        let HorL = result.substr(result.length - 1); //check if we are comparing for high or low
        if (HorL == "H"){ //check high range
            if (currResult > passing[result]){
                console.log(result.substring(0, result.length - 1) + " of " + currResult + " failed")
                ipcRenderer.send("append console", result.substring(0, result.length - 1) + " of " + currResult + " failed")
                return 2; //indicate test failure
            }
        }
        else{ //check low range
            if (currResult < passing[result]){
                console.log(result.substring(0, result.length - 1) + " of " + currResult + " failed")
                ipcRenderer.send("append console", result.substring(0, result.length - 1) + " of " + currResult + " failed")
                return 2; //indicate test failure
            }
        }
    }
    return 0; //all results are in range, pass
}





