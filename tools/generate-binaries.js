const ElectronPackager = require('electron-packager');
const electronInstaller = require('electron-winstaller');
const fs = require("fs-extra")

console.log("Deleting Old installers");

if (await fs.exists("./build")) {
  await fs.remove("./build")
}

console.log("Bundling with ElectronPackager...");
let options = {
  dir: "./build",
  out: "./dist",
  platform:"all",
  icon: "./electron-src/app.ico",
}
ElectronPackager(options)