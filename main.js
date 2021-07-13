const { app, BrowserWindow } = require('electron')
function createWindow() {
    const win = new BrowserWindow({
        width: 1050,
        height: 605,
        icon:'guitar.png'
    });
    win.removeMenu();
    win.loadFile('html/manufacturing.html');
    win.webContents.openDevTools(); //uncomment for debugging
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