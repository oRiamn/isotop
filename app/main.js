const { app, BrowserWindow } = require('electron')
const path = require('path')
 
require('electron-reload')(`${__dirname}/dist/`, {
  electron: path.join(`${__dirname}/dist/`, '../node_modules', '.bin', 'electron')
});

  let win
  
  function createWindow () {
    win = new BrowserWindow({ width: 800, height: 600 })

    win.loadURL(`file://${__dirname}/dist/html/index.html`);
  
    win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
  }

  app.on('ready', createWindow)
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })