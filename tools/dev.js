const net = require('net');
const reactWebserverPort = 3000;
const exec = require('child_process').exec;
const client = new net.Socket();
const treeKill = require('tree-kill');

let electronProcess    = null;
let reactServerProcess = null;
let exiting = false;

StartReact();
waitForReact()
.then(StartElectron);

//below this line is just function declarations
function StartElectron() {
  if(electronProcess) return;
  log('dev','starting electron');

  electronProcess = exec('npm run dev:electron');
  bindStdOut(electronProcess,"Electron")
}

function StartReact() {
  if(reactServerProcess) return;
  log('dev','starting react');

  reactServerProcess = exec("npm run dev:reactserver")
  bindStdOut(reactServerProcess,"React")
}

async function waitForReact(){
  for (var i = 0; i < 10; i++){
    let connection = new Promise(connectToReact)
      .then(() => "success")
      .catch(() => "failure")

    let status = await connection;

    if(status == "failure"){
      log("dev","Didn't connect to React Dev Server  --- Trying again in 1s")
      await wait(1000);
    } else {
      log("dev","Connected to React Dev Server");
      return;
    }
  };
}

function connectToReact(onSuccess,onFail){
  client.connect({port: reactWebserverPort}, () => {//ty to connect to webserver
    client.end(); //end connection when successfull
    onSuccess();
  });
  client.on('error',onFail)
}

function wait(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
}

function bindStdOut(proc,procName){
  proc.stdout.on('data', function (data) {
    log(procName,data)
  });

  proc.on('exit', function (code) {
    proc.killed=true;
    let exitcode;

    if(code && code !== null){
      exitcode = code.toString();
    } else {
      exitcode = "unknown"
    }

    log('dev',procName+' exited with code '+exitcode);
    stop();
  });
}

function log(process,message){
  let procName = process + " "
  while (procName.length < 20) {
    procName += " "
  }

  let lines = message.toString().split('\n')

  console.log(procName.padEnd(20) + "|"+lines.join("\n"+"".padStart(20)+"|"))
}

function stop() {
  if (exiting) return;
  exiting = true;

  log("dev","Killing other processes")

  reactServerProcess.killed || treeKill(reactServerProcess.pid); //abort is more forcefull
  electronProcess.killed    || treeKill(electronProcess.pid);

  log("dev","All proccesses terminated, closing dev-preview")
  setTimeout(() => {
    process.exit(0)
  }, 3000);
}