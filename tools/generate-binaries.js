const ElectronPackager = require('electron-packager');
const electronInstaller = require('electron-winstaller');

console.log("Bundling with ElectronPackager...");
let options = {
  dir: "./dist",
  out: "./ReleaseBinaries",
  platform:"all",
  icon: "./electron-src/app.ico",
}
ElectronPackager(options)