const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let path = "";
let arduinoPort = "";
let parserFlag = false;
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1040,
        height: 594,
        icon:'guitar.png',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation : false
        }
    });
    win.removeMenu();
    win.setResizable(false);
    win.loadFile('html/manufacturing.html');
    win.webContents.openDevTools(); //uncomment for debugging
    win.on('will-move', (e) => { //account for wierd windows resizing bug
        win.setSize(1040, 594);
    });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});


//open new child window
let childWin;
ipcMain.on("openWindow", function(event, arg){
    childWin = new BrowserWindow({
        width : 900,
        height : 400,
        parent : win,
        modal : true,
        show :  false,
        frame : false,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation : false
        }
    })
    childWin.loadFile("html/about.html");
    childWin.removeMenu();
    childWin.setResizable(false);
    childWin.once("ready-to-show", () => {
        childWin.show();
    })
})

//close child window
ipcMain.on("closeWindow", async(event, arg) =>{
    childWin.close();
})

//open file explorer
ipcMain.on("chooseFile", async (event, arg)=>{
    let filtersExt = [{name:'Excel File', extensions: ["csv"]}];
    let optionsF = {properties:["createDirectory", "promptToCreate", "openFile"], filters:filtersExt};
    let file = await dialog.showOpenDialog(win, optionsF); //open the file explorer with specified options
    event.reply("fileChosen", file);
})



ipcMain.on("connect arduino", (event, arg) => {
    // Promise approach
    SerialPort.list().then(ports => {
        let done = false
        let count = 0
        let allports = ports.length
        ports.forEach(function(port) {
            count = count+1
            pm  = port.manufacturer
        
            if (typeof pm !== 'undefined' && pm.includes('arduino')) {
                path = port.path
                arduinoPort = new SerialPort(path, { baudRate: 9600 })
                arduinoPort.on("open", () => {
                    console.log('serial port open');
                })
                parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));
                done = true
                parserFlag = true;
                parsing();
            }
        
            if(count === allports && done === false){
                console.log(`can't find any arduino`)
            }
        })
        event.returnValue = parserFlag; //return whether the serial port is connected
    })
})


//communicate to arduino when prompted from GUI
ipcMain.on("start tests", async(event, arg)=>{
    arduinoPort.write('DC\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("noise test", async(event, arg)=>{
    arduinoPort.write('noise\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("midband test", async(event, arg)=>{
    arduinoPort.write('midband\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("guitar test", async(event, arg)=>{
    arduinoPort.write('guitar\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("flat test", async(event, arg)=>{
    arduinoPort.write('flat\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("bass test", async(event, arg)=>{
    arduinoPort.write('bass\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("treble test", async(event, arg)=>{
    arduinoPort.write('treble\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("pres test", async(event, arg)=>{
    arduinoPort.write('pres\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("aux test", async(event, arg)=>{
    arduinoPort.write('aux\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});
ipcMain.on("pow test", async(event, arg)=>{
    arduinoPort.write('pow\n', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
});

function parsing (){
    //prints whatever arduino prints
    parser.on('data', data =>{
        console.log('got word from arduino:', data);
        
        win.webContents.send(data.substr(0,data.indexOf(":")), data.substr(data.indexOf(":")+2).slice(0, -1));
    });
}

