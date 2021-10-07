function DCTest (){
    potSetting("drive", "cw");
    potSetting("tone", "mid");
    potSetting("vol", "cw");
    presSetting("off");
    sigOff("guitar");
    sigOff("aux"); 
    testCommand("DC");
}
function noiseTest (){
    potSetting("drive", "cw");
    potSetting("tone", "cw");
    potSetting("vol", "cw");
    presSetting("off");
    sigOff("guitar");
    sigOff("aux");
    testCommand("noise");
}
function gainTest (){
    potSetting("drive", "cw");
    potSetting("tone", "mid");
    potSetting("vol", "cw");
    presSetting("off");
    sigOff("aux");
    sigOn("guitar", .001, 1000); 
    testCommand("AC");
}
function flatTest (){
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    sigOff("aux");
    sigOn("guitar", .02, 60); 
    testCommand("AC");
    sigOn("guitar", .02, 1000); 
    testCommand("AC");
    sigOn("guitar", .02, 7000); 
    testCommand("AC");
}
function bassTest (){
    potSetting("drive", "mid");
    potSetting("tone", "ccw");
    potSetting("vol", "mid");
    presSetting("off");
    sigOff("aux");
    sigOn("guitar", .02, 60);
    testCommand("AC");
    sigOn("guitar", .02, 1000);
    testCommand("AC");
    sigOn("guitar", .02, 7000);
    testCommand("AC");
}
function trebleTest (){
    potSetting("drive", "mid");
    potSetting("tone", "cw");
    potSetting("vol", "mid");
    presSetting("off");
    sigOff("aux");
    sigOn("guitar", .02, 60);
    testCommand("AC");
    sigOn("guitar", .02, 1000);
    testCommand("AC");
    sigOn("guitar", .02, 7000);
    testCommand("AC");
}
function presTest (){
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    sigOff("aux");
    sigOn("guitar", .02, 800);
    testCommand("AC");
    presSetting("on");
    sigOn("guitar", .02, 800)
    testCommand("AC");
}
function auxTest (){
    potSetting("drive", "ccw");
    potSetting("tone", "ccw");
    potSetting("vol", "ccw");
    presSetting("off");
    sigOff("guitar");
    sigOn("aux", .02, 25);
    testCommand("AC");
    sigOn("aux", .02, 3000);
    testCommand("AC");
    sigOn("aux", .02, 8000);
}
function powTest (){ 
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    //arduino will handle different signal levels/freqs
    testCommand("distortion", 2);
    testCommand("distortion", 5);
    testCommand("distortion", 9);
    testCommand("distortion", 10);
}

function potSetting(pot, setting){
    let potJSON = { "Command" : "PotCtrl", "Params": {"Channel": pot, "Control": setting}};
    potJSONString = JSON.stringify(potJSON)
    ipcRenderer.send("arduino command", potJSONString);
}
function presSetting(pres){
    let presJSON = {"Command": "PresCtrl", "Params": {"Control": pres}};
    presJSONString = JSON.stringify(presJSON)
    ipcRenderer.send("arduino command", presJSONString);
}
function inputSetting(input, mvrms, freq){
    let inputJSON = {"Command": "SigOn", "Params": {"Channel": input, "Level": mvrms, "Frequency": freq}};
    inputJSONString = JSON.stringify(inputJSON)
    ipcRenderer.send("arduino command", inputJSONString);
}
function sigOff (offInput){
    let inputJSON = {"Command": "SigOff", "Params": {"Channel": offInput}};
    inputJSONString = JSON.stringify(inputJSON)
    ipcRenderer.send("arduino command", inputJSONString);
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
    ipcRenderer.send("arduino command", testJSONString);
}
function waitForResponse(){
    ipcRenderer.on("Command Done", (event, arg) => {
        if (arg == "failure"){
            return 0;
        }
        else{
            return 1;
        }
    }
}

