utils = require('./utils')

const scoreMap = {
    Y: 2,
    X: 1,
    Z: 3,
    AX: 3,
    AY: 6,
    AZ: 0,
    BY: 3,
    BX: 0,
    BZ: 6,
    CZ: 3,
    CX: 6,
    CY: 0,
}

const counters = {
    AY: 'X',
    AX: 'Z',
    AZ: 'Y',
    BY: 'Y',
    BX: 'X',
    BZ: 'Z',
    CY: 'Z',
    CX: 'Y',
    CZ: 'X',
}

const part1 = (sheet) =>
    sheet.map(round => {
        if (round === '') return 0;
        const choices = round.split(' ')
        return scoreMap[choices[1]] + scoreMap[choices.join('')]
    }).reduce((p, n) => p + n)

const part2 = sheet =>
    sheet.map(round => {
        if (round === '') return 0;
        const row = round.split(' ')
        const choice = counters[row.join('')]
        return scoreMap[choice] + scoreMap[row[0] + choice]
    }).reduce((p, n) => p + n)

const sheet = utils.readLinesAsStringArray('input')

//p1
let output = part1(sheet)
console.log(output)
//p2
output = part2(sheet)
console.log(output)
