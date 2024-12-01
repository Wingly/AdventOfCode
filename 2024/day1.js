utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

const arrs = input.reduce((acc, curr) => {
    const splitted = curr.split('   ')
    acc[0].push(splitted[0])
    acc[1].push(splitted[1])
    return acc
}, [[], []]).map(group => group.sort())

let part1 = 0
for (let i = 0; i < arrs[0].length; i++) {
    part1 += Math.abs(arrs[0][i] - arrs[1][i])
}
console.log(part1)

let part2 = 0
for (let i = 0; i < arrs[0].length; i++) {
    part2 += arrs[0][i] * arrs[1].filter(val => val === arrs[0][i]).length
}
console.log(part2)
