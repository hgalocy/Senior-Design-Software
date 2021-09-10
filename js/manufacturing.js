const ipcRenderer = require("electron").ipcRenderer;
const fs = require("fs");
const newLine = '\r\n';

let fields = ['Test', 'Outcome', 'Date'];
let toCsv = [];

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

//check if file exists
let fileExistsSync = (file) => {
    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
      } catch (err) {
        return false;
      }
}
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
            if (!fileExistsSync(csvFile)){
                //new file
                fs.closeSync(fs.openSync(csvFile,'w')); //create empty csv file at path specified
                //write the headers and newline
                console.log('New file, just writing headers');
                fields = fields + newLine;
            
                fs.writeFile(csvFile, fields, function (err) {
                    if (err) throw err;
                    console.log('file saved');
                });
            }
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
    clearConsole()
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
    appendConsole("DC test" + ": " + arg)
    let date = new Date();
    toCsv = ["DC test", arg, date];
    writeCSV();
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
    appendConsole("noise test" + ": " + arg)
    let date = new Date();
    toCsv = ["noise test", arg, date];
    writeCSV();
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
    appendConsole("midband test" + ": " + arg)
    let date = new Date();
    toCsv = ["midband test", arg, date];
    writeCSV();
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
    appendConsole("guitar test" + ": " + arg)
    let date = new Date();
    toCsv = ["guitar test", arg, date];
    writeCSV();
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
    appendConsole("flat test" + ": " + arg)
    let date = new Date();
    toCsv = ["flat test", arg, date];
    writeCSV();
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
    appendConsole("bass test" + ": " + arg)
    let date = new Date();
    toCsv = ["bass test", arg, date];
    writeCSV();
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
    appendConsole("treble test" + ": " + arg)
    let date = new Date();
    toCsv = ["treble test", arg, date];
    writeCSV();
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
    appendConsole("pres test" + ": " + arg)
    let date = new Date();
    toCsv = ["pres test", arg, date];
    writeCSV();
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
    appendConsole("aux test" + ": " + arg)
    let date = new Date();
    toCsv = ["aux test", arg, date];
    writeCSV();
});
ipcRenderer.on("pow test", (event, arg) =>{
    if (arg == "success"){
        powled.style.background = "green";
        canvas.style.visibility='visible';
    }
    else{
        powled.style.background = "red";
    }
    appendConsole("pow test" + ": " + arg)
    let date = new Date();
    toCsv = ["pow test", arg, date];
    writeCSV();
});

//result console
//clear console on start tests click
const manufConsole = document.getElementById("manufConsole");
function clearConsole(){
    manufConsole.innerHTML = '';
    var node = document.createElement('li');
    node.appendChild(document.createTextNode("Console - Test Results:"));
    manufConsole.appendChild(node);
    console.log("console cleared");
}
//append to console when received from main.js
function appendConsole(data){
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(data));
    manufConsole.appendChild(node);
    console.log("added to console: " + data);
}

//write to CSV
if(document.getElementById("manufExcelPath").value != ""){ //a csv is actually specified
    const ws = fs.createWriteStream(pathDisplay.value);
    fastcsv.write(data, { headers: true }).pipe(ws);
}


function writeCSV(){
    if(document.getElementById("manufExcelPath").value != ""){ //a csv is actually specified
        fs.stat(document.getElementById("manufExcelPath").value, function (err, stat) {
            if (err == null) {
                console.log('File exists');
            
                //write the actual data and end with newline
                toCsv = toCsv + newLine;
                fs.appendFile(document.getElementById("manufExcelPath").value, toCsv, function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
            } 
            else {
                console.log("something went wrong writing to file");
            }
        });
    }
}
