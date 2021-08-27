const { app, BrowserWindow, ipcMain, dialog } = require('electron')

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
    //win.webContents.openDevTools(); //uncomment for debugging
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