utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

const rowsToColumns = arr => {
    const ret = [];
    for (let x = 0; x < arr[0].length; x++) {
        const line = []
        for (let y = 0; y < arr.length; y++) {
            line.push(arr[y][x])
        }
        ret.push(line)
    }
    return ret
}
const rotated = rowsToColumns(input.map(line => line.split(' ').filter(Boolean)))
const part1 = rotated.reduce((tot, line) => tot + line.slice(0, line.length - 1).map(Number)
    .reduce((lineVal, num) => line[line.length - 1] === '+' ? lineVal + num : lineVal * num), 0)

console.log(part1)

let indice = 0
let part2 = 0
while (indice < input[0].length) {
    const columnVals = []
    for (let line of input) {
        let val = ""
        for (let i = indice; i < line.length; i++) {
            if (line[i] === " " && /.*(\d|\+|\*).*/.test(val)) {
                break
            }
            val += line[i]
        }
        columnVals.push(val)
    }

    const cephalopodNumbers = []
    for (let i = 0; i < columnVals.length - 1; i++) {
        const numbers = columnVals[i].split('')
        for (let j = 0; j < numbers.length; j++) {
            if (!cephalopodNumbers[j]) cephalopodNumbers[j] = []
            cephalopodNumbers[j].push(numbers[j])
        }
    }

    part2 += cephalopodNumbers.map(num => Number(num.join('').trim())).reduce((lineTot, num) => columnVals[columnVals.length - 1].includes('+') ? lineTot + num : lineTot * num)
    const longestInThisColumn = columnVals.slice(0, columnVals.length - 1).reduce((t1, num) => Math.max(t1, num.length), 0)

    indice += longestInThisColumn + 1

}
console.log(part2)
