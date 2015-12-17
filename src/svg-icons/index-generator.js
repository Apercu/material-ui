const fs = require('fs');
const rrs = require('recursive-readdir-sync');

const outArray = [];

rrs('./').forEach(function (file) {
  if (file !== 'index-generator.js' && file !== 'index.js') {

    var fileLines = fs.readFileSync(file, 'utf8').split('\n');
    var lineIndex = fileLines.length - 1;

    while (lineIndex > 0) {
      var line = fileLines[lineIndex];
      var i = line.indexOf('export default')

      if (i !== -1) {
        moduleName = line.substr(i + 15).trim().slice(0, -1);
        outArray.push('export ');
        outArray.push(moduleName);
        outArray.push(' from \'./');
        outArray.push(file.substring(0, file.length - 4));
        outArray.push('\';\n');
        break;
      }

      --lineIndex;
    }
  }
});

fs.writeFileSync('index.js', outArray.join(''));
