const fs = require('fs');
const path = require('path');

module.exports = function (source = '') {
  let newsource = source;

  if (source?.includes('.ttf')) {
    newsource = source.replace('../fonts/Comismsh.ttf', './Comismsh.ttf');
    const filePath = path.join(__dirname, '../src/fonts/Comismsh.ttf');
    const targetDir = path.join(__dirname, '../dist');
    const targetFile = path.join(targetDir, 'Comismsh.ttf');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    if (fs.existsSync(filePath)) {
      fs.cpSync(filePath, targetFile);
    }
  }
  return newsource;
};
