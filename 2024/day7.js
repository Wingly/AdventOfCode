utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

const doCalculation = (cur, values, target, part2 = false) => {
    if (values.length === 0) return cur
    let localValues = [...values]
    let localCur = cur + localValues.shift()

    if (localCur <= target) {
        let attempt = doCalculation(localCur, localValues, target, part2)
        if (attempt === target) {
            return attempt
        }
    }
    localValues = [...values]
    localCur = (cur > 0 ? cur : 1) * localValues.shift()

    if (localCur <= target) {
        attempt = doCalculation(localCur, localValues, target, part2)
        if (attempt === target) {
            return attempt
        }
    }
    if (part2) {
        localValues = [...values]
        localCur = Number(cur.toString() + localValues.shift().toString())
        if (localCur <= target) {
            attempt = doCalculation(localCur, localValues, target, part2)
            if (attempt === target) {
                return attempt
            }
        }
    }

    return -1
}

let tot = 0
let totPart2 = 0
input.forEach(line => {
    const split = line.split(':')
    const target = Number(split[0])

    const values = split[1].trim().split(' ').map(Number)
    const resultPart1 = doCalculation(0, values, target)
    const resultPart2 = doCalculation(0, values, target, true)

    if (resultPart1 > 0) tot += resultPart1
    if (resultPart2 > 0) totPart2 += resultPart2

});
console.log(tot, totPart2)