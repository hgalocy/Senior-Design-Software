//DISCLAIMER: In comments, I say refer to the workerWindow as the worker process and the win window as the renderer process
const { app, BrowserWindow, ipcMain, dialog, webContents } = require('electron')
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let path = "";
let arduinoPort = "";
let parserFlag = false;
let win;
let workerWindow;
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

    // create hidden worker window
    workerWindow = new BrowserWindow({
        //show: false,
        webPreferences: { nodeIntegration: true,contextIsolation : false }
    });
    workerWindow.loadFile('html/worker.html');
    workerWindow.webContents.openDevTools(); //uncomment for debugging

    //event fires when navigating pages
    win.webContents.on('will-navigate', (event, url) => {
        if(connected){//if arduino connected, sigOff
            let arg = "switching pages";
            workerWindow.webContents.send("sigOff", arg)
        }
  })
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on('window-all-closed', function () {
    app.quit();
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
    childWin.webContents.openDevTools(); //uncomment for debugging

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

let connected = false;
//check if arduino already connected on page load
ipcMain.on("already connected", (event, arg) => {
    event.returnValue = connected;
});

//button clicked to connect arduino->message sent here from manufacturing page via ipc
ipcMain.on("connect arduino", (event, arg) => {
    if (!connected){
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
                    //parsing();
                }
            
                if(count === allports && done === false){
                    console.log("can't find any arduino")
                }
            })
            connected = parserFlag;
            event.returnValue = connected; //return whether the serial port is connected
        })
        
    }
    else{
        event.returnValue = connected; //return whether the serial port is connected
    }
})

//communicate to arduino when prompted from GUI
ipcMain.on("arduino command", async(event, arg)=>{
    //send to arduino
    arduinoPort.write(arg, (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
    });
    //send received data back to renderer process once received from arduino
    parser.on('data', data =>{
        //console.log('got word from arduino:', data);
        let receivedJSON = JSON.parse(data);
        //console.log ("received action: " + receivedJSON["Action"]);
        win.webContents.send('received data', data); //send to renderer process to print to console/csv
        event.returnValue = (data); //send response to original command (interface.js for manufacturing page)
    });
});

//start the individual tests for manufacturing page
ipcMain.on("start DC", (event, arg)=>{ //have worker process begin dc test
    workerWindow.webContents.send("DC test", arg)
});
ipcMain.on("start noise", async(event, arg)=>{
    workerWindow.webContents.send("noise test", arg)
});
ipcMain.on("start gain", async(event, arg)=>{
    workerWindow.webContents.send("gain test", arg)
});
ipcMain.on("start flat", async(event, arg)=>{
    workerWindow.webContents.send("flat test", arg)
});
ipcMain.on("start bass", async(event, arg)=>{
    workerWindow.webContents.send("bass test", arg)
});
ipcMain.on("start treble", async(event, arg)=>{
    workerWindow.webContents.send("treble test", arg)
});
ipcMain.on("start pres", async(event, arg)=>{
    workerWindow.webContents.send("pres test", arg)
});
ipcMain.on("start aux", async(event, arg)=>{
    workerWindow.webContents.send("aux test", arg)
});
ipcMain.on("start pow", async(event, arg)=>{
    workerWindow.webContents.send("pow test", arg)
});
ipcMain.on("append console", (event, arg)=>{ //forward to win process to append arg to console
    win.webContents.send("append console", arg)
});
ipcMain.on("append console and csv commands", (event, arg)=>{ //forward to win process to append arg to console and csv becasue test command completed
    win.webContents.send("append console and csv commands", arg)
});
ipcMain.on("DC test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("DC test finished", arg)
});
ipcMain.on("noise test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("noise test finished", arg)
});
ipcMain.on("gain test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("gain test finished", arg)
});
ipcMain.on("flat test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("flat test finished", arg)
});
ipcMain.on("bass test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("bass test finished", arg)
});
ipcMain.on("treble test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("treble test finished", arg)
});
ipcMain.on("pres test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("pres test finished", arg)
});
ipcMain.on("aux test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("aux test finished", arg)
});
ipcMain.on("pow test finished", (event, arg)=>{ //forward to win process to show test completion
    win.webContents.send("pow test finished", arg)
});

//receiveing from renderer process and sending to worker process for diagnostic and freq page drop down menus
ipcMain.on("potSetting", async(event, arg)=>{
    workerWindow.webContents.send("potSetting", arg)
});
ipcMain.on("presSetting", async(event, arg)=>{
    workerWindow.webContents.send("potSetting", arg)
});
ipcMain.on("sigOn", async(event, arg)=>{
    workerWindow.webContents.send("sigOn", arg)
});
ipcMain.on("sigOff", async(event, arg)=>{
    workerWindow.webContents.send("sigOff", arg)
});

//receiving from worker process and sending to renderer process for diagnostic and freq page drop down menus
ipcMain.on("dropdown command done", async(event, arg)=>{
    win.webContents.send("dropdown command done", arg)
});
ipcMain.on("sigOn command done", async(event, arg)=>{
    win.webContents.send("sigOn command done", arg)
});
ipcMain.on("sigOff command done", async(event, arg)=>{
    win.webContents.send("sigOff command done",arg)
})


/*function parsing () {
    //prints whatever arduino prints
    parser.on('data', data =>{
        console.log('got word from arduino:', data);
        let receivedJSON = JSON.parse(data);
        console.log ("received action: " + receivedJSON["Action"]);
        return data;
        //console.log(data.substr(2,data.indexOf(":")-3))
        //win.webContents.send(data)
    });
}*/

