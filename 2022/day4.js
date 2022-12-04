utils = require('./utils')

//This isn't pretty

const list = utils.readLinesAsStringArray('input')

let contained1 = list.filter(row => {
    if (!row) return false
    const ranges = row.split(',').map(item => item.split('-'));
    if (+ranges[0][0] >= +ranges[1][0] && +ranges[0][1] <= +ranges[1][1]) {
        return true;
    } else if (+ranges[1][0] >= +ranges[0][0] && +ranges[1][1] <= +ranges[0][1]) {
        return true;
    }
    return false
})

let contained2 = list.filter(row => {
    if (!row) return false
    const ranges = row.split(',').map(item => item.split('-'));
    if ((+ranges[0][0] >= +ranges[1][0] && +ranges[0][0] <= +ranges[1][1]) ||
        (+ranges[0][1] >= +ranges[1][0] && +ranges[0][1] <= +ranges[1][1])) {
        return true;
    } else if ((+ranges[1][0] >= +ranges[0][0] && +ranges[1][0] <= +ranges[0][1]) ||
        (+ranges[1][1] >= +ranges[0][0] && +ranges[1][1] <= +ranges[0][1])) {
        return true;
    }
    return false
})

//p1
console.log(contained1.length)
//p2
console.log(contained2.length)

