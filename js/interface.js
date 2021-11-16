let comm;
let resultTitles = ["PreAmpOut","GainStageOut","EmitBypOut","EmitFlloOut","SrcFlloOut","12VOut","8VOut","6VOut","NegDrvOut","PosDrvOut","SPRKPos","SPRKNeg"];
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

async function DCTest (){
    potSetting("Drive", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console",JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasDC").then(ipcRenderer.send("append console and csv commands",setResultArg("DC Test", comm, "DC")))
    DCTestPassFlag = 1;
    console.log("DC Test finished with result: " + DCTestPassFlag);
}
function noiseTest (){
    potSetting("Drive", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands",setResultArg("Noise Test", comm, "AC")))
    noiseTestPassFlag = 1;
    console.log("Noise Test finished with result: " + noiseTestPassFlag);
}
function gainTest (){
    potSetting("Drive", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .001, 1000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands",setResultArg("Gain Test", comm, "AC")))
    gainTestPassFlag = 1;
    console.log("Gain Test finished with result: " + gainTestPassFlag);
}
function flatTest (){
    potSetting("Drive", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Flat Test", comm, "AC")))
    sigOn("Guitar", .02, 1000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Flat Test", comm, "AC")))
    sigOn("Guitar", .02, 7000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"])) 
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Flat Test", comm, "AC")))
    flatTestPassFlag = 1;
    console.log("Flat Test finished with result: " + flatTestPassFlag);
}
function bassTest (){
    potSetting("Drive", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CCW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Bass Test", comm, "AC")))
    sigOn("Guitar", .02, 1000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Bass Test", comm, "AC")))
    sigOn("Guitar", .02, 7000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Bass Test", comm, "AC")))
    bassTestPassFlag = 1;
    console.log("Bass Test finished with result: " + bassTestPassFlag);
}
function trebleTest (){
    potSetting("Drive", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 60).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Treble Test", comm, "AC")))
    sigOn("Guitar", .02, 1000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Treble Test", comm, "AC")))
    sigOn("Guitar", .02, 7000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Treble Test", comm, "AC")))
    trebleTestPassFlag = 1;
    console.log("Treble Test finished with result: " + trebleTestPassFlag);
}
function presTest (){
    potSetting("Drive", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 800).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Pres Test", comm, "AC")))
    presSetting("On").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Guitar", .02, 800).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Pres Test", comm, "AC")))
    presTestPassFlag = 1;
    console.log("Pres Test finished with result: " + presTestPassFlag);
}
function auxTest (){
    potSetting("Drive", "CCW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "CCW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "CCW").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOn("Aux", .02, 25).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Aux Test", comm, "AC")))
    sigOn("Aux", .02, 3000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Aux Test", comm, "AC")))
    sigOn("Aux", .02, 8000).then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    testCommand("MeasAC").then(ipcRenderer.send("append console and csv commands", setResultArg("Aux Test", comm, "AC")))
    auxTestPassFlag = 1;
    console.log("Aux Test finished with result: " + auxTestPassFlag);
}
function powTest (){ 
    potSetting("Drive", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Tone", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    potSetting("Volume", "MID").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    presSetting("Off").then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    sigOff().then(ipcRenderer.send("append console", JSON.parse(comm)["Action"] + " " + JSON.parse(comm)["Result"]["Success"]))
    //arduino will handle different signal levels/freqs
    testCommand("MeasDist", 2).then(ipcRenderer.send("append console and csv commands", setResultArg("Pow Test", comm, "DIST")))
    testCommand("MeasDist", 5).then(ipcRenderer.send("append console and csv commands", setResultArg("Pow Test", comm, "DIST")))
    testCommand("MeasDist", 9).then(ipcRenderer.send("append console and csv commands", setResultArg("Pow Test", comm, "DIST")))
    testCommand("MeasDist", 10).then(ipcRenderer.send("append console and csv commands", setResultArg("Pow Test", comm, "DIST")))
    powTestPassFlag = 1;
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





