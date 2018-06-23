const exec = require('child_process').exec
const ElectronPackager = require('electron-packager');
const electronInstaller = require('electron-winstaller');
const fs = require('fs');
const prompt = require('prompt-sync')()
const npm = require('npm');

const copydir = require("copy-dir")
const deldir = require('delete-directory-recursive');
const {existsSync,mkdirSync} = fs

prompt(`
Hello!
It looks like you want to release your app! This program automates everything for you!
Before you start, make sure that you have checked package.json and replaced the placeholder values with real ones.


This program does three things:

1: React Build:     Have React/Webpack compile your HTML, CSS, JS, and other frontend files into one folder
2: Copy files:      Copy all necessary files (the compiled react files as well as your main.js) to electron-build to prepare for packaging.
3: Make Installers: Use electron-installer to create an 
`)

part2();

async function part1(params) {
  
}

async function part2(){
  if(existsSync("./electron-build")){
    console.log("Deleting Old Files...")
    await deldir({root:"./electron-build",fileHandler:console.log})
  }
  

  console.log("Copying files");

  let outputDir = "./electron-build";

  copydir.sync("./electron-src",outputDir)//we don't make a new dir so this line doesn't complain abt overwriting
  copydir.sync("./react-build",outputDir+"/react")

  console.log("Creating 2nd package.json")

  let nodeModules = JSON.parse(
    fs.readFileSync('./package.json')
  );

  delete nodeModules.devDependences;
  delete nodeModules.scripts;
  nodeModules.main = "./main.js"

  fs.writeFileSync(
    outputDir+"/package.json",
    JSON.stringify(nodeModules)
  );

  console.log("Installing npm packages...");
  let proc = exec("npm install --production",{cwd:"./electron-build"},part3)
  proc.stdout.on('data', function (data) {
    console.log(data)
  });
}

async function part3(){
  console.log("Bundling with ElectronPackager...");
  let options = {
    dir:"electron-build",
    all:true,
    icon:"app.ico",
  }
  let appPaths = await ElectronPackager(options)
}

// resultPromise = electronInstaller.createWindowsInstaller({
//   appDirectory: './',
//   outputDirectory: '/tmp/build/installer64',
//   authors: 'My App Inc.',
//   exe: 'myapp.exe'
// });




// resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));