const ipcRenderer = require("electron").ipcRenderer;

//open about popup
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to open about window
    ipcRenderer.send("openWindow", arg);
});

const manufStartTestsBtn = document.getElementById('manufStartTestsBtn')
manufStartTestsBtn.addEventListener('click', function(){
    console.log(window.innerHeight)
    console.log(window.outerHeight)
    console.log(window.innerWidth)
    console.log(window.outerWidth)
});
