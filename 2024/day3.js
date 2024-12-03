utils = require('./utils')

const input = utils.readLinesAsString('input')

const mulCalculator = (formula) => {
    const mult = formula.match(/mul\(\d*,\d*\)/gm)
    return mult.reduce((tot, mul) => {
        const nums = mul.match(/(\d*),(\d*)/);
        return tot + nums[1] * nums[2]
    }, 0)
}

// part 1
console.log(mulCalculator(input))

// part2
const noDont = input.replace(/(don't\(\)|do\(\))/g, "\n$1").split('\n').filter(s => !s.startsWith("don't"))
console.log(mulCalculator(noDont.join()))
