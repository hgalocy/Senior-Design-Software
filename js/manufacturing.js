const ipcRenderer = require("electron").ipcRenderer;

//open about popup
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to open about window
    ipcRenderer.send("openWindow", arg);
});

