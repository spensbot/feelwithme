const fs = require('fs')

//Create json file 
googleKeyPath='googleKey.json'
fs.writeFile(googleKeyPath, process.env.GOOGLE_JSON_KEY, function (err) {
  if (err) throw err;
  console.log('Google Key File Created!');
});