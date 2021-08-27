const ipcRenderer = require("electron").ipcRenderer;
const fs = require("fs");

//open about popup
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to open about window
    ipcRenderer.send("openWindow", arg);
});

//document interaction for choosing file
document.getElementById("manufExcelBtn").addEventListener("click", function(){
    chooseAFile(document.getElementById("manufExcelPath"));
});
document.getElementById("manufExcelPath").addEventListener("click", function(){
    chooseAFile(document.getElementById("manufExcelPath"));
});
//choosing file function for opening dialog for file explorer via IPC communication with main
let csvFile = "";
function chooseAFile(pathDisplay){
    ipcRenderer.send("chooseFile", ""); //send message to main.js to open file explorer to choose file
    ipcRenderer.on("fileChosen", (event, arg) =>{ //wait for user to choose file
        if(arg.filePaths[0] != undefined){ //check if file actually chosen
            csvFile = arg.filePaths[0];
            if(csvFile.slice(-4) != ".csv"){//check if already ends in .csv
                csvFile = csvFile + ".csv";
            }
            fs.closeSync(fs.openSync(csvFile,'w')); //create empty csv file at path specified
            pathDisplay.value = csvFile; 
        }
    });
}
