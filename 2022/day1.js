utils = require('./utils')

const part1 = (calList) =>
    calList.reduce((p, n) => {
        if (n !== '') {
            p.a[p.i] = (p.a[p.i] ?? 0) + parseInt(n)
            return p
        }
        else return { ...p, i: p.i + 1 }
    }, { i: 0, a: [] }).a.sort((a, b) => b - a)

const calList = utils.readLinesAsStringArray('input')

let output = part1(calList)

//p1
console.log(output[0])
//p2
console.log(output.slice(0, 3).reduce((p, n) => p + n))
