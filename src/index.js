const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let window;

app.on('ready', () => {
    app.setName('Nebula');

    window = new BrowserWindow({ width: 800, height: 600 });
    window.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'ui', 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
