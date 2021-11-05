ipcRenderer.on("potSetting", (event, arg) =>{
    potSetting(arg['dropName'], arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});
ipcRenderer.on("presSetting", (event, arg) =>{
    presSetting(arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});
ipcRenderer.on("sigOn", (event, arg) =>{
    sigOn(arg['input'], arg['mvrms'], arg['freq']).then(ipcRenderer.send("sigOn command done", updateSigOnArg(arg)));
    
});

function updateSigOnArg(arg){
    newArg = arg;
    newArg["mvrms"] = JSON.parse(comm)["Result"]["ampCast"];
    newArg["freq"] = JSON.parse(comm)["Result"]["freqCast"];
    return newArg;
}
