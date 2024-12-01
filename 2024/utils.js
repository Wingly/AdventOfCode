fs = require('fs')

exports.readLinesAsStringArray = (file) => {
    return fs.readFileSync(file).toString().split("\n");
}