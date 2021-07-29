const { app, BrowserWindow, ipcMain } = require('electron')

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1050,
        height: 605,
        icon:'guitar.png',
        webPreferences: {
            nodeIntegration : true,
            contextIsolation : false
        }
    });
    win.removeMenu();
    win.loadFile('html/manufacturing.html');
    //win.webContents.openDevTools(); //uncomment for debugging
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


//open new window
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