#Beau's React+Electron Template App
###Quickstart:
Open your favorite console in the root folder and type
```
npm run dev
```
then open up react-frontend/index.js

###How does it work?
When you run npm run dev, the script tools/launchDev.js is run.
That script opens a webpack/react webserver on port 3000 and launches electron.
When electron is called from the command line, it looks for a 'main' javascript file, which is defined as "electron-backend/main.js" in package.json
electron-backend/main.js then opens up a browser window that connects to localhost:3000, and your app is loaded.