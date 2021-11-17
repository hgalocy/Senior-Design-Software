const newLine = '\r\n';

let fields = ['Date', 'Test', 'Command', 'Executed', 'Result'];
//let toCsv = [];

//canvas dimensions for confetti
var canvas = document.getElementById("manuf-content");
let confettiSettings = { target: "manuf-content" };
let confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

//document interaction for choosing file
document.getElementById("manufExcelBtn").addEventListener("click", function(){
    chooseAFile(document.getElementById("manufExcelPath"));
});


//function to check if file exists
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
            fields = fields + newLine;
            if (!fileExistsSync(csvFile)){
                //new file
                fs.closeSync(fs.openSync(csvFile,'w')); //create empty csv file at path specified
                //write the headers and newline
                console.log('New file, just writing headers');
                
            /*
                fs.writeFile(csvFile, fields, function (err) {
                    if (err) throw err;
                    console.log('file saved');
                });*/
            }
            
                //existing file , write append headers
                fs.appendFile(csvFile, fields, function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
            
            pathDisplay.value = csvFile; 
        }
    });
}

//led elements
let DCled = document.getElementById("DCled");
let noiseled = document.getElementById("noiseled");
let gainMidbandled = document.getElementById("gainled");
let freqFlatled = document.getElementById("freqFlatled");
let freqBassled = document.getElementById("freqBassled");
let freqTrebleled = document.getElementById("freqTrebleled");
let freqPresled = document.getElementById("freqPresled");
let auxled = document.getElementById("auxled");
let powled = document.getElementById("powled");
let grayledColor = DCled.getAttribute("background-color");

//start button
document.getElementById("manufStartTestsBtn").addEventListener("click", async function(){
    if (connectionBtn.innerHTML == "Connection:<br>\Connected :)"){ //check if arduino connected before starting tests
        //reset UI
        clearConsole()
        canvas.style.visibility = "hidden";
        noiseled.style.background = grayledColor;
        gainled.style.background = grayledColor;
        freqFlatled.style.background = grayledColor;
        freqBassled.style.background = grayledColor;
        freqTrebleled.style.background = grayledColor;
        freqPresled.style.background = grayledColor;
        auxled.style.background = grayledColor;
        powled.style.background = grayledColor;
        DCled.style.background = "yellow";
        console.log("reset")
        ipcRenderer.send("start DC", ""); //start first test
        disableNav();
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "gray"; //disable start tests button until done
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "none";
    }
    else{
        document.getElementById("errorMessage1").style.visibility = "visible";
    }
})

//communicate between worker, main, and renderer process
let date;
ipcRenderer.on("DC test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("DC test", "passed") //update csv and console
        DCled.style.background = "green";
        noiseled.style.background = "yellow";
        ipcRenderer.send("start noise", "");
    }
    else{
        writeConsoleAndCSV("DC test", "failed") //update csv and console
        DCled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("noise test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Noise test", "passed") //update csv and console
        noiseled.style.background = "green";
        gainled.style.background = "yellow";
        ipcRenderer.send("start gain","");
    }
    else{
        writeConsoleAndCSV("Noise test", "failed")
        noiseled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("gain test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Gain test", "passed") //update csv and console
        gainled.style.background = "green";
        freqFlatled.style.background = "yellow";
        ipcRenderer.send("start flat", "");
    }
    else{
        writeConsoleAndCSV("Gain test", "failed")
        gainled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("flat test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Flat test", "passed") //update csv and console
        freqFlatled.style.background = "green";
        freqBassled.style.background = "yellow";
        ipcRenderer.send("start bass", "");
    }
    else{
        writeConsoleAndCSV("Flat test", "failed")
        freqFlatled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("bass test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Bass test", "passed") //update csv and console
        freqBassled.style.background = "green";
        freqTrebleled.style.background = "yellow";
        ipcRenderer.send("start treble", "");
    }
    else{
        writeConsoleAndCSV("Bass test", "failed")
        freqBassled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("treble test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Treble test", "passed") //update csv and console
        freqTrebleled.style.background = "green";
        freqPresled.style.background = "yellow";
        ipcRenderer.send("start pres", "");
    }
    else{
        writeConsoleAndCSV("Treble test", "failed")
        freqTrebleled.style.background = "green";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("pres test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Pres test", "passed") //update csv and console
        freqPresled.style.background = "green";
        auxled.style.background = "yellow";
        ipcRenderer.send("start aux", "");
    }
    else{
        writeConsoleAndCSV("Pres test", "failed")
        freqPresled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("aux test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Aux test", "passed") //update csv and console
        auxled.style.background = "green";
        powled.style.background = "yellow";
        ipcRenderer.send("start pow", "");
    }
    else{
        writeConsoleAndCSV("Aux test", "failed")
        auxled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})
ipcRenderer.on("pow test finished", async (event, arg) =>{
    if (arg == "passed"){//only execute the next test if the prior one passed
        writeConsoleAndCSV("Pow test", "passed") //update csv and console
        powled.style.background = "green";
        canvas.style.visibility='visible';
        enableNav(); 
    }
    else{
        writeConsoleAndCSV("Pow test", "failed")
        powled.style.background = "red";
        enableNav(); 
        document.getElementById("manufStartTestsBtn").style.backgroundColor = "var(--green)"; //enable start tests
        document.getElementById("manufStartTestsBtn").style.pointerEvents = "auto";
    }
})

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
    liItems = document.getElementById("manufConsole").getElementsByTagName("li")
    lastItem = liItems[liItems.length-1];
    lastItem.scrollIntoView();
}

//write to CSV
if(document.getElementById("manufExcelPath").value != ""){ //a csv is actually specified
    const ws = fs.createWriteStream(pathDisplay.value);
    fastcsv.write(data, { headers: true }).pipe(ws);
}
function writeCSV(writingData){
    if(document.getElementById("manufExcelPath").value != ""){ //a csv is actually specified
        fs.stat(document.getElementById("manufExcelPath").value, function (err, stat) {
            if (err == null) {
                console.log('File exists');
            
                //write the actual data and end with newline
                writingData = writingData + newLine;
                fs.appendFile(document.getElementById("manufExcelPath").value, writingData, function (err) {
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

function writeConsoleAndCSV(test, passed){
    appendConsole(test + ": " + passed)
    date = new Date();
    //toCsv = [date, test, "", passed, ""];
    writeCSV([date, test, "", "", passed]);
}
function writeConsoleAndCSVCommands(test, command, passed, results){
    appendConsole("test: " + test + ", Command: " + command + ", Executed: " + passed + ", Results: " + results)
    date = new Date();
    //toCsv = [date, test, command, passed, results];
    writeCSV([date, test, command, passed, results]);
}
//received command from worker.js->main.js
ipcRenderer.on("append console", async (event, arg) =>{
    appendConsole(arg)
})
ipcRenderer.on("append console and csv commands", async (event, arg) =>{
    writeConsoleAndCSVCommands(arg["test"], arg["action"], arg["success"], arg["resultString"])
})