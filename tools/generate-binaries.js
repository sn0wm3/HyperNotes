const ElectronPackager = require('electron-packager');
const electronInstaller = require('electron-winstaller');
const fs = require("fs-extra");

(async function(){
  //remove old binaries
  if (await fs.exists("./dist")) {
    await fs.remove("./dist")
  }  
  
  let options = {
    dir: "./build",
    out: "./dist",
    platform:"all",
    icon: "./electron-src/app.ico",
  }

  ElectronPackager(options)

})()
