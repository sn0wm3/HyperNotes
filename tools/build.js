const fs = require('fs-extra');
const prompt = require('prompt-sync')()
const runAll = require('npm-run-all')
let { stdout, stdin, stderr } = process;
let options = { stdout, stdin, stderr };

let message1 = `
Hello!
It looks like you want to release your app!
This program creates a \`build\` folder which contains a production-ready version of your app's code.
After you run this, you can test out the code or generate binaries

Press enter to continue, or ctrl+c to abort.`

let message2 = `
Done! you can verify your build is valid by running \`npm run preview\`,
or generate binaries for Windows,MacOS,and Linux by running \`npm run dist\``


console.log(message1)
let HasBeenBuilt = false;



process.stdin.on('data',() => {
  if(!HasBeenBuilt){
    build();
    HasBeenBuilt = true;
  }
});


function build (text) {//on enter
  runAll(['build:react'],options)
    .catch(e => {console.log(e)})
    .then(async function(){
      //Copying files
      console.log('copying files...')
      
      if (await fs.exists("./build")) {
        await fs.remove("./build")
      }
  
      await Promise.all([
        fs.copy("./electron-src", "./build/electron-src"), //we don't make a new dir so this line doesn't complain abt overwriting
        fs.move("./react-build", "./build/react-build"),
      ])
  
  
  
      let nodemods = await fs.readJSONSync('./package.json');
      delete nodemods.devDependencies;
      delete nodemods.scripts.postinstall
      fs.writeJSON("./build/package.json", nodemods);
      console.log('done') 
    })
    .then(() => runAll(['build:npminstall'],options))
    .then(() => {
      console.log(message2)
    });
}