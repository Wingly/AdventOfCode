utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

let curPos = 50
let part1 = 0
let part2 = 0
for (line of input) {
    const dir = line[0]
    const num = Number(line.slice(1))

    const rots = Math.floor(num / 100)
    part2 += rots


    if (dir === 'L') {
        if (curPos - (num % 100) <= 0 && curPos !== 0) part2++
        curPos = curPos - num
    }
    if (dir === 'R') {
        if (curPos + (num % 100) >= 100 && curPos !== 0) part2++
        curPos = curPos + num
    }
    if (curPos > 99) {
        curPos = curPos % 100
    }
    while (curPos < 0) {
        curPos = curPos + 100
    }
    if (curPos === 0) part1++

}


console.log(part1, part2)