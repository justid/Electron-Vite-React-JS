const { app, BrowserWindow } = require('electron')
const { join } = require('path')

process.env.DIST = join(__dirname, '../..')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

// Install `react-devtools`
if (app.isPackaged === false) {
    app.whenReady().then(() => {
        const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then(() => { })
            .catch(err => {
                console.error('Unable to install `react-devtools`: \n', err)
            })
    })
}

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 618,
        width: 1000,
        maximizable: false,
        fullscreen: false,
        title: '',
        icon: join(process.env.PUBLIC, '/icons/icon.ico'),
        webPreferences: {
            preload,
            webviewTag: true,
            nodeIntegration: true,
        }
    })

    if (app.isPackaged) {
        mainWindow.loadFile(indexHtml)
    } else {
        mainWindow.loadURL(url)
        // add shortcut for open devtools (F12 or Ctrl+Shift+I)
        mainWindow.webContents.on('before-input-event', (event, input) => {
            if ((input.key.toLowerCase() === 'f12') || (input.control && input.shift && input.key.toLowerCase() === 'i')) {
                mainWindow.webContents.openDevTools()
                event.preventDefault()
            }
        })
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.whenReady().then(createWindow)

app.on('browser-window-created', function (e, window) {
    window.setMenu(null);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
