const fs = require('fs');
const path = './node_modules/react-scripts/config/paths.js';
const folder = 'react-src';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  data = data.replace(/src/g, folder);//this is the only way to rename the src folder to something else without `ejecting`
  fs.writeFile(path, data, 'utf8',()=>{});
});