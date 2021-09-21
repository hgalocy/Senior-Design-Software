//document interaction for choosing file
document.getElementById("freqExcelBtn").addEventListener("click", function(){
    chooseAFile(document.getElementById("freqExcelPath"));
});
document.getElementById("freqExcelPath").addEventListener("click", function(){
    chooseAFile(document.getElementById("freqExcelPath"));
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
