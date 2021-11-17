//for manufacturing page
ipcRenderer.on("DC test", async (event, arg) =>{
    DCTest();
    if (!commandFailFlag && DCTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("DC test finished", "passed")
    }
    else{
        ipcRenderer.send("DC test finished", "failed")
    }
})
ipcRenderer.on("noise test", async (event, arg) =>{
    noiseTest();
    if (!commandFailFlag && noiseTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("noise test finished", "passed")
    }
    else{
        ipcRenderer.send("noise test finished", "failed")
    }
})
ipcRenderer.on("gain test", async (event, arg) =>{
    gainTest();
    if (!commandFailFlag && gainTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("gain test finished", "passed")
    }
    else{
        ipcRenderer.send("gain test finished", "failed")
    }
})
ipcRenderer.on("flat test", async (event, arg) =>{
    flatTest();
    if (!commandFailFlag && flatTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("flat test finished", "passed")
    }
    else{
        ipcRenderer.send("flat test finished", "failed")
    }
})
ipcRenderer.on("bass test", async (event, arg) =>{
    bassTest();
    if (!commandFailFlag && bassTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("bass test finished", "passed")
    }
    else{
        ipcRenderer.send("bass test finished", "failed")
    }
})
ipcRenderer.on("treble test", async (event, arg) =>{
    trebleTest();
    if (!commandFailFlag && trebleTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("treble test finished", "passed")
    }
    else{
        ipcRenderer.send("treble test finished", "failed")
    }
})
ipcRenderer.on("pres test", async (event, arg) =>{
    presTest();
    if (!commandFailFlag && presTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("pres test finished", "passed")
    }
    else{
        ipcRenderer.send("pres test finished", "failed")
    }
})
ipcRenderer.on("aux test", async (event, arg) =>{
    auxTest();
    if (!commandFailFlag && auxTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("aux test finished", "passed")
    }
    else{
        ipcRenderer.send("aux test finished", "failed")
    }
})
ipcRenderer.on("pow test", async (event, arg) =>{
    powTest();
    if (!commandFailFlag && powTestPassFlag == 1){//only execute the next test if the prior one passed
        ipcRenderer.send("pow test finished", "passed")
    }
    else{
        ipcRenderer.send("pow test finished", "failed")
    }
})

//for diganostic and freq pages
ipcRenderer.on("potSetting", (event, arg) =>{
    potSetting(arg['dropName'], arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});
ipcRenderer.on("presSetting", (event, arg) =>{
    presSetting(arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});
ipcRenderer.on("sigOn", (event, arg) =>{
    sigOn(arg['input'], arg['mvrms'], arg['freq']).then(ipcRenderer.send("sigOn command done", updateSigOnArg(arg)));
});
ipcRenderer.on("sigOff", (event, arg) =>{
    sigOff().then(ipcRenderer.send("sigOff command done", arg));
});

function updateSigOnArg(arg){
    newArg = arg;
    newArg["mvrms"] = JSON.parse(comm)["Result"]["ampCast"];
    newArg["freq"] = JSON.parse(comm)["Result"]["freqCast"];
    return newArg;
}
