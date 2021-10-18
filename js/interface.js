const { ipcRenderer } = require('electron')

function DCTest (){
    potSetting("Drive", "CW");
    potSetting("Tone", "MID");
    potSetting("Volume", "CW");
    presSetting("Off");
    sigOff();
    testCommand("MeasDC");
    DCTestPassFlag = 1;
    console.log("DC Test finished with result: " + DCTestPassFlag);

}
function noiseTest (){
    potSetting("Drive", "CW");
    potSetting("Tone", "CW");
    potSetting("Volume", "CW");
    presSetting("Off");
    sigOff();
    testCommand("MeasAC");
    noiseTestPassFlag = 1;
    console.log("Noise Test finished with result: " + noiseTestPassFlag);
}
function gainTest (){
    potSetting("Drive", "CW");
    potSetting("Tone", "MID");
    potSetting("Volume", "CW");
    presSetting("Off");
    sigOff();
    sigOn("Guitar", .001, 1000); 
    testCommand("MeasAC");
    gainTestPassFlag = 1;
    console.log("Gain Test finished with result: " + gainTestPassFlag);
}
function flatTest (){
    potSetting("Drive", "MID");
    potSetting("Tone", "MID");
    potSetting("Volume", "MID");
    presSetting("Off");
    sigOff();
    sigOn("Guitar", .02, 60); 
    testCommand("MeasAC");
    sigOn("Guitar", .02, 1000); 
    testCommand("MeasAC");
    sigOn("Guitar", .02, 7000); 
    testCommand("MeasAC");
    flatTestPassFlag = 1;
    console.log("Flat Test finished with result: " + flatTestPassFlag);
}
function bassTest (){
    potSetting("Drive", "MID");
    potSetting("Tone", "CCW");
    potSetting("Volume", "MID");
    presSetting("Off");
    sigOff();
    sigOn("Guitar", .02, 60);
    testCommand("MeasAC");
    sigOn("Guitar", .02, 1000);
    testCommand("MeasAC");
    sigOn("Guitar", .02, 7000);
    testCommand("MeasAC");
    bassTestPassFlag = 1;
    console.log("Bass Test finished with result: " + bassTestPassFlag);
}
function trebleTest (){
    potSetting("Drive", "MID");
    potSetting("Tone", "CW");
    potSetting("Volume", "MID");
    presSetting("Off");
    sigOff();
    sigOn("Guitar", .02, 60);
    testCommand("MeasAC");
    sigOn("Guitar", .02, 1000);
    testCommand("MeasAC");
    sigOn("Guitar", .02, 7000);
    testCommand("MeasAC");
    trebleTestPassFlag = 1;
    console.log("Treble Test finished with result: " + trebleTestPassFlag);
}
function presTest (){
    potSetting("Drive", "MID");
    potSetting("tone", "MID");
    potSetting("vol", "MID");
    presSetting("Off");
    sigOff();
    sigOn("Guitar", .02, 800);
    testCommand("MeasAC");
    presSetting("On");
    sigOn("Guitar", .02, 800)
    testCommand("MeasAC");
    presTestPassFlag = 1;
    console.log("Pres Test finished with result: " + presTestPassFlag);
}
function auxTest (){
    potSetting("Drive", "CCW");
    potSetting("Tone", "CCW");
    potSetting("Volume", "CCW");
    presSetting("Off");
    sigOff();
    sigOn("Aux", .02, 25);
    testCommand("MeasAC");
    sigOn("Aux", .02, 3000);
    testCommand("MeasAC");
    sigOn("Aux", .02, 8000);
    testCommand("MeasAC");
    auxTestPassFlag = 1;
    console.log("Aux Test finished with result: " + auxTestPassFlag);
}
function powTest (){ 
    potSetting("Drive", "MID");
    potSetting("Tone", "MID");
    potSetting("Volume", "MID");
    presSetting("Off");
    sigOff();
    //arduino will handle different signal levels/freqs
    testCommand("MeasDist", 2);
    testCommand("MeasDist", 5);
    testCommand("MeasDist", 9);
    testCommand("MeasDist", 10);
    powTestPassFlag = 1;
    console.log("Pow Test finished with result: " + powTestPassFlag);
}

function potSetting(pot, setting){
    let potJSON = { "Command" : "PotCtrl", "Params": {"Channel": pot, "Control": setting}};
    potJSONString = JSON.stringify(potJSON)
    let comm = ipcRenderer.sendSync("arduino command", potJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
}
function presSetting(pres){
    let presJSON = {"Command": "PresCtrl", "Params": {"Control": pres}};
    presJSONString = JSON.stringify(presJSON)
    let comm = ipcRenderer.sendSync("arduino command", presJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
}
function sigOn(input, mvrms, freq){
    let sigOnJSON = {"Command": "SigOn", "Params": {"Channel": input, "Level": mvrms, "Frequency": freq}};
    sigOnJSONString = JSON.stringify(sigOnJSON)
    let comm = ipcRenderer.sendSync("arduino command", sigOnJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
}
function sigOff(){
    let inputJSON = {"Command": "SigOff"};
    inputJSONString = JSON.stringify(inputJSON)
    let comm = ipcRenderer.sendSync("arduino command", inputJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
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
    let comm = ipcRenderer.sendSync("arduino command", testJSONString);
    console.log(comm);
    if (JSON.parse(comm)["Result"]["Success"] == "False"){
        commandFailFlag == 0; //indicate a command failure
    }
}



