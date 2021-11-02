ipcRenderer.on("potSetting", (event, arg) =>{
    potSetting(arg['dropName'], arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});
ipcRenderer.on("presSetting", (event, arg) =>{
    presSetting(arg['dropSetting']).then(ipcRenderer.send("dropdown command done",arg));
});

