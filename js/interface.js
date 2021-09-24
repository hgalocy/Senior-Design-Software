function DCTest (){
    potSetting("drive", "cw");
    potSetting("tone", "mid");
    potSetting("vol", "cw");
    presSetting("off");
    inputSetting("none", 0);
    testCommand("DC");
}
function noiseTest (){
    potSetting("drive", "cw");
    potSetting("tone", "cw");
    potSetting("vol", "cw");
    presSetting("off");
    inputSetting("none", 0);
    testCommand("noise");
}
function gainTest (){
    potSetting("drive", "cw");
    potSetting("tone", "mid");
    potSetting("vol", "cw");
    presSetting("off");
    inputSetting("guitar", .001);
    testCommand("AC", 1000);
}
function flatTest (){
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    inputSetting("guitar", .02);
    testCommand("AC", 60);
    testCommand("AC", 1000);
    testCommand("AC", 7000);
}
function bassTest (){
    potSetting("drive", "mid");
    potSetting("tone", "ccw");
    potSetting("vol", "mid");
    presSetting("off");
    inputSetting("guitar", .02);
    testCommand("AC", 60);
    testCommand("AC", 1000);
    testCommand("AC", 7000);
}
function trebleTest (){
    potSetting("drive", "mid");
    potSetting("tone", "cw");
    potSetting("vol", "mid");
    presSetting("off");
    inputSetting("guitar", .02);
    testCommand("AC", 60);
    testCommand("AC", 1000);
    testCommand("AC", 7000);
}
function presTest (){
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    inputSetting("guitar", .02);
    testCommand("AC", 800);
    presSetting("on");
    testCommand("AC", 800);
}
function auxTest (){
    potSetting("drive", "ccw");
    potSetting("tone", "ccw");
    potSetting("vol", "ccw");
    presSetting("off");
    inputSetting("aux", .02);
    testCommand("AC", 25);
    testCommand("AC", 3000);
    testCommand("AC", 8000);
}
function powTest (){ 
    potSetting("drive", "mid");
    potSetting("tone", "mid");
    potSetting("vol", "mid");
    presSetting("off");
    inputSetting("guitar", .02);
    testCommand("distortion", 2);
    testCommand("distortion", 5);
    testCommand("distortion", 9);
    testCommand("distortion", 10);
}

function potSetting(pot, setting){
    let potJSON = {Command: pot, Params: {Setting: setting}};
    potJSONString = JSON.stringify(potJSON)
    ipcRenderer.send("arduino command", potJSONString);
}
function presSetting(pres){
    let presJSON = {Command: "pres", Params: {Control: pres}};
    presJSONString = JSON.stringify(presJSON)
    ipcRenderer.send("arduino command", presJSONString);
}
function inputSetting(input, mvrms){
    let inputJSON = {Command: "input", Params: {Channel: input, Frequency: mvrms}};
    inputJSONString = JSON.stringify(inputJSON)
    ipcRenderer.send("arduino command", inputJSONString);
}
function testCommand(test, value){
    if (test == "distortion"){ //watts
        let testJSON = {Command: test, Params: {Watts: value}};
    }
    else{ //frequency
        let testJSON = {Command: test, Params: {Frequency: value}};
    }
    testJSONString = JSON.stringify(testJSON)
    ipcRenderer.send("arduino command", testJSONString);
}
