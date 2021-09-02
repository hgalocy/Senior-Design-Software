const ipcRenderer = require("electron").ipcRenderer;
const fs = require("fs");

//canvas dimensions for confetti
var canvas = document.getElementById("manuf-content");
let confettiSettings = { target: "manuf-content" };
let confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

//make arduino connection
const connectionBtn = document.getElementById("connectionBtn");
connectionBtn.addEventListener("click", function(){
    if(ipcRenderer.sendSync("connect arduino", "") == true){
            connectionBtn.innerHTML = "Connection:<br>\Connected :)"
    }
});

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

//led elements
let DCled = document.getElementById("DCled");
let noiseled = document.getElementById("noiseled");
let gainMidbandled = document.getElementById("gainMidbandled");
let gainGuitarled = document.getElementById("gainGuitarled");
let freqFlatled = document.getElementById("freqFlatled");
let freqBassled = document.getElementById("freqBassled");
let freqTrebleled = document.getElementById("freqTrebleled");
let freqPresled = document.getElementById("freqPresled");
let auxled = document.getElementById("auxled");
let powled = document.getElementById("powled");
let grayledColor = DCled.getAttribute("background-color");



//start button
document.getElementById("manufStartTestsBtn").addEventListener("click", function(){
    canvas.style.visibility = "hidden";
    DCled.style.background = grayledColor;
    noiseled.style.background = grayledColor;
    gainMidbandled.style.background = grayledColor;
    gainGuitarled.style.background = grayledColor;
    freqFlatled.style.background = grayledColor;
    freqBassled.style.background = grayledColor;
    freqTrebleled.style.background = grayledColor;
    freqPresled.style.background = grayledColor;
    auxled.style.background = grayledColor;
    powled.style.background = grayledColor;
    ipcRenderer.send("start tests", ""); //send message to main.js to start tests
    DCled.style.background = "yellow";
})


//received 
ipcRenderer.on("DC test", (event, arg) =>{
    console.log(arg.length)
    if (arg== "success"){
        DCled.style.background = "green";
        ipcRenderer.send("noise test", "");
        noiseled.style.background = "yellow";
    }
    else{
        DCled.style.background = "red";
    }
});
ipcRenderer.on("noise test", (event, arg) =>{
    if (arg == "success"){
        noiseled.style.background = "green";
        ipcRenderer.send("midband test", "");
        gainMidbandled.style.background = "yellow";
    }
    else{
        noiseled.style.background = "red";
    }
});
ipcRenderer.on("midband test", (event, arg) =>{
    if (arg == "success"){
        gainMidbandled.style.background = "green";
        ipcRenderer.send("guitar test", "");
        gainGuitarled.style.background = "yellow";
    }
    else{
        gainMidbandled.style.background = "red";
    }
});
ipcRenderer.on("guitar test", (event, arg) =>{
    if (arg == "success"){
        gainGuitarled.style.background = "green";
        ipcRenderer.send("flat test", "");
        freqFlatled.style.background = "yellow";
    }
    else{
        gainGuitarled.style.background = "red";
    }
});
ipcRenderer.on("flat test", (event, arg) =>{
    if (arg == "success"){
        freqFlatled.style.background = "green";
        ipcRenderer.send("bass test", "");
        freqBassled.style.background = "yellow";
    }
    else{
        freqFlatled.style.background = "red";
    }
});
ipcRenderer.on("bass test", (event, arg) =>{
    if (arg == "success"){
        freqBassled.style.background = "green";
        ipcRenderer.send("treble test", "");
        freqTrebleled.style.background = "yellow";
    }
    else{
        freqBassled.style.background = "red";
    }
});
ipcRenderer.on("treble test", (event, arg) =>{
    if (arg == "success"){
        freqTrebleled.style.background = "green";
        ipcRenderer.send("pres test", "");
        freqPresled.style.background = "yellow";
    }
    else{
        freqTrebleled.style.background = "red";
    }
});
ipcRenderer.on("pres test", (event, arg) =>{
    if (arg == "success"){
        freqPresled.style.background = "green";
        ipcRenderer.send("aux test", "");
        auxled.style.background = "yellow";
    }
    else{
        freqPresled.style.background = "red";
    }
});
ipcRenderer.on("aux test", (event, arg) =>{
    if (arg == "success"){
        auxled.style.background = "green";
        ipcRenderer.send("pow test", "");
        powled.style.background = "yellow";
    }
    else{
        auxled.style.background = "red";
    }
});
ipcRenderer.on("pow test", (event, arg) =>{
    if (arg == "success"){
        powled.style.background = "green";
        canvas.style.visibility='visible';
    }
    else{
        powled.style.background = "red";
    }
});