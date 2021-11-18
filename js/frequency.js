//plotting
var trace1 = {
    x: [],
    y: [],
    type: 'scatter'
  };
  var data = [trace1];
  var layout = {
    showlegend: false, 
    margin: {
        l: 50,
        r: 20,
        b: 50,
        t: 50,
        pad: 4
    },
    xaxis: {
        title: {
          text: 'Frequency (Hz)',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Magnitude (dB)',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
    }};
  Plotly.newPlot('graph', data, layout);
//document interaction for choosing file
document.getElementById("freqExcelBtn").addEventListener("click", function(){
    chooseAFile(document.getElementById("freqExcelPath"));
});
document.getElementById("freqExcelPath").addEventListener("click", function(){
    chooseAFile(document.getElementById("freqExcelPath"));
});
//choosing file function for opening dialog for file explorer via IPC communication with main
let csvFile = "";
const newLine = '\r\n';
let fields = ['Date', 'Test', 'Command', 'Executed', 'Result'];
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
function writeCSV(writingData){
    if(document.getElementById("freqExcelPath").value != ""){ //a csv is actually specified
        fs.stat(document.getElementById("freqExcelPath").value, function (err, stat) {
            if (err == null) {
                console.log('File exists');
            
                //write the actual data and end with newline
                writingData = writingData + newLine;
                fs.appendFile(document.getElementById("freqExcelPath").value, writingData, function (err) {
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
//function to check if file exists
let fileExistsSync = (file) => {
    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
      } catch (err) {
        return false;
      }
}



//start button
document.getElementById("freqStartTestsBtn").addEventListener("click", async function(){
    if (connectionBtn.innerHTML == "Connection:<br>\Connected :)"){ //check if arduino connected before starting tests
        trace1["x"] = [];
        trace1["y"] = [];
        Plotly.newPlot('graph', data, layout);
        disableNav();
        document.getElementById("freqStartTestsBtn").style.backgroundColor = "gray"; //disable start tests button until done
        document.getElementById("freqStartTestsBtn").style.pointerEvents = "none";
        let arg = {
            numTimes: Number(document.getElementById("pointsNumInput").value),
            startFreq: Number(document.getElementById("startFreqInput").value),
            endFreq: Number(document.getElementById("stopFreqInput").value),
            levelIn: Number(document.getElementById("levelInput").value)
        }
        ipcRenderer.send("freq measure", arg); //send message to main to worker process to commmand arduino
        
    }
    else{
        document.getElementById("errorMessage1").style.visibility = "visible";
    }
})

//receive point
ipcRenderer.on("freq point", (event, arg) =>{ //display on label what signal is generated
    trace1["x"].push(arg["x"])
    trace1["y"].push(arg["y"])
    Plotly.newPlot('graph', data, layout);
    console.log("NEW POINT: x="+ arg["x"] + " y=" + arg["y"])
    console.log(arg["last"])
    if(arg["last"] == 1){ //is it the last point?
        enableNav();
        document.getElementById("freqStartTestsBtn").style.backgroundColor = "var(--green)"; //disable start tests button until done
        document.getElementById("freqStartTestsBtn").style.pointerEvents = "auto";
    } 
});