const { ipcRenderer } = require("electron");

closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to close child window
    ipcRenderer.send("closeWindow", arg);
});