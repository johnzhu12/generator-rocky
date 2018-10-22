// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const pkg = require('./package.json') // 引用package.json
const fileAction = require('./node-util/fileAction')
const ende = require('./node-util/ende')
const ecdh = require('./node-util/ecdh')
const encrypt = require('./node-util/encrypt')
// const { requireTaskPool } = require('electron-remote')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    taskWindow = new BrowserWindow({ width: 800, height: 600, show: false }) //任务窗口,不显示

    // and load the index.html of the app.
    //判断是否是开发模式
    if (pkg.DEV) {
        mainWindow.loadURL("http://localhost:3000/")
        taskWindow.loadURL("http://localhost:3000/task.html")
    } else {
        // console.log(path.join(__dirname, '/build/index.html'))
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '/build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
    // mainWindow.loadURL("http://www.baidu.com")

    //uncomment这段代码，默认在浏览器里打开，否则在新窗口打开连接
    // mainWindow.webContents.on('new-window', function (e, url) {
    //     e.preventDefault();
    //     console.log('haahh', url)
    //     require('electron').shell.openExternal(url);
    // });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//node方法全局暴露
global.fileAction = fileAction
global.ende = ende
global.ecdh = ecdh
global.encrypt = encrypt


//主进程和渲染进程通信 
//In main process.
// const { ipcMain } = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.sender.send('asynchronous-reply', '异步接收')
// })

// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.returnValue = '同步接收'
// })
