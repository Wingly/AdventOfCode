utils = require('./utils')

const input = utils.readLinesAsStringArray('input')


const part1 = input.reduce((tot, line) => {
    let first = 0
    let firstIndex = 0
    let second = 0
    const lineSplit = line.split('').map(Number)
    lineSplit.forEach((num, i) => {
        if (num > first && i !== line.length - 1) {
            first = num
            firstIndex = i
        }
    })
    lineSplit.slice(firstIndex + 1).forEach((num, i) => {
        if (num > second && i !== line.length - 1) {
            second = num
        }
    })
    return tot + +(String(first) + String(second))
}, 0)

console.log(part1)

const part2 = input.reduce((tot, line) => {
    const lineSplit = line.split('').map(Number)
    let numAndIndices = [[0, 0]]
    for (let i = 0; i < line.length - 11; i++) {
        if (numAndIndices[0][0] < lineSplit[i]) {
            numAndIndices[0][0] = lineSplit[i]
            numAndIndices[0][1] = i
        }
    }
    for (let i = 1; i < 12; i++) {
        const prevIndex = numAndIndices[i - 1][1]
        numAndIndices[i] = [0, 0]
        for (let j = prevIndex + 1; j < line.length - (12 - numAndIndices.length); j++) {
            if (numAndIndices[i][0] < lineSplit[j]) {
                numAndIndices[i][0] = lineSplit[j]
                numAndIndices[i][1] = j
            }
        }
    }
    return tot + +numAndIndices.reduce((comb, a) => comb + a[0], "")
}, 0)

console.log(part2)