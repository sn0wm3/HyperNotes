var DEVELOPMENT = false; //when debugging, this variable is false. in the final product, it is true
for (var i = 0; i < process.argv.length; i++) {
  if(process.argv[i] == "--dev") {
    DEVELOPMENT = true;
  }
}

const electron = require('electron')
var app = electron.app;
var gwin;
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

const windows = {}

function OpenNewWindow () {
  var win = new BrowserWindow({width: 800, height: 600}) 
  gwin = win;
  var startUrl;
  
  if(DEVELOPMENT){
    startUrl = "http://localhost:3000";
  } else {
    startUrl = `file://${__dirname}/../react-build/index.html`;
  }
  
  console.log(startUrl);
  win.loadURL(startUrl);
  console.log("Doop");
    
  win.__id = Symbol("BrowserWindow");
  windows[win.__id] = win //this keeps the window autodeleted.
  
  win.on('closed', function () {
    windows[win.__id] = null //remove the global reference so node can delete the window obj
  })

  // BrowserWindow.addDevToolsExtension( //REACT DEVTOOLS
  //   '/path/to/Google/Chrome/User Data/Default/Extensions/the id of reactdevtools/reactdevtoolsversion'
  // );
  console.log("HI")
}

app.on('ready', OpenNewWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { //osx apps are supposed to act like this
    app.quit()
  }
})

app.on('activate', function () {
  if (Object.getOwnPropertySymbols(windows).length === 0) {
    OpenNewWindow()
  }
})
