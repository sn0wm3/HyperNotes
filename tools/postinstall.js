const fs = require('fs');
const path = './node_modules/react-scripts/config/paths.js';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  data = data.replace(/src/g, 'react-src');//this is the only way to rename the src folder to something else without `ejecting`
  data = data.replace(/build/g, 'build/react-build');//this is the only way to rename the src folder to something else without `ejecting`  
  fs.writeFile(path, data, 'utf8',()=>{});
});