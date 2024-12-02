utils = require('./utils')

const input = utils.readLinesAsStringArray('input')


const checkPair = (first, second, increasing) => {
    if (first === second) return false;
    if (Math.abs(first - second) > 3) return false;
    if (increasing && first < second) return false;
    if (!increasing && first > second) return false;
    return true
}

const part1 = input.reduce((tot, level) => {
    const split = level.split(' ').map(Number);

    let increasing = split[1] - split[0] > 0 ? true : false;

    for (let i = 0; i < split.length; i++) {
        if (!checkPair(split[i], split[i - 1], increasing)) return [...tot, false];
    }
    return [...tot, true]
}, [])

console.log(part1.filter(Boolean).length)

const testReport = (report) => {
    for (let i = 0; i < report.length; i++) {
        let increasing = report[1] - report[0] > 0 ? true : false;
        if (!checkPair(report[i], report[i - 1], increasing)) return [i, i - 1, false];
    }
    return [-1, -1, true]
}
const part2 = input.reduce((tot, level) => {
    const split = level.split(' ').map(Number);

    const res = testReport(split)
    if (res[2] === true) return [...tot, true]
    let withRemove = [...split];
    withRemove.splice(res[0], 1)
    const removeLeft = testReport(withRemove)
    if (removeLeft[2]) return [...tot, true]
    withRemove = [...split];
    withRemove.splice(res[1], 1)
    const removeRight = testReport(withRemove)
    if (removeRight[2]) return [...tot, true]

    withRemove = [...split];
    withRemove.splice(0, 1)
    const tryWithoutFirst = testReport(withRemove)
    if (tryWithoutFirst[2]) return [...tot, true]


    return [...tot, false]
}, [])

console.log(part2.filter(Boolean).length)
