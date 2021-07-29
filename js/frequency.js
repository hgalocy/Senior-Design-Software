const ipcRenderer = require("electron").ipcRenderer;

//open about popup
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to open about window
    ipcRenderer.send("openWindow", arg);
});

const levelDropBtn = document.getElementById("levelDropBtn");
levelDropBtn.addEventListener("click", function() {
    document.getElementById("levelDropDown").classList.toggle("show");
});
const levelDropOption = document.getElementsByClassName("level-drop-option");
for (var i = 0 ; i < levelDropOption.length; i++) {
    let tmp = levelDropOption[i];
    levelDropOption[i].addEventListener('click' , function(){
        levelDropBtn.innerHTML = tmp.innerHTML;
    } ) ; 
}