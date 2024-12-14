utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

const arcadeGroups = []

for (let i = 0; i < input.length; i += 4) {
    let a = input[i]
    let b = input[i + 1]
    let c = input[i + 2]
    arcadeGroups.push({
        a: a.split(':')[1].split(', ').map(xy => Number(xy.split('+')[1])),
        b: b.split(':')[1].split(', ').map(xy => Number(xy.split('+')[1])),
        prize: c.split(':')[1].split(', ').map(xy => Number(xy.split('=')[1])),
        part2Prize: c.split(':')[1].split(', ').map(xy => Number(xy.split('=')[1]) + 10000000000000)
    })
}

const part1 = (data) => {
    let tot = 0
    for (let i = 0; i < data.length; i++) {
        let { a, b, prize } = data[i]

        if (100 * a[0] + 100 * b[0] < prize[0] || 100 * a[1] + 100 * b[1] < prize[1]) continue

        let mods = []
        for (let j = 0; j < 100; j++) {
            let testNumA = prize[0] - j * a[0]
            let testNumB = prize[1] - j * a[1]
            if (testNumA < 0 || testNumB < 0) break
            if (testNumA / b[0] === testNumB / b[1]) {
                mods.push([j, testNumA / b[0]])
            }
        }
        for (let j = 0; j < 100; j++) {
            let testNumA = prize[0] - j * b[0]
            let testNumB = prize[1] - j * b[1]
            if (testNumA < 0 || testNumB < 0) break
            if (testNumA / a[0] === testNumB / a[1]) {
                mods.push([testNumA / a[0], j])
            }
        }

        if (mods.length)
            tot += mods.reduce((p, c) => {
                let num = c[0] * 3 + c[1]
                if (num < p) {
                    p = num
                }
                return p
            }, Number.MAX_SAFE_INTEGER)
    }
    return tot
}

// https://www.mathsisfun.com/algebra/matrix-inverse.html saved me
const part2 = (data) => {
    let tot = 0
    for (let i = 0; i < data.length; i++) {
        let { a, b, part2Prize: prize } = data[i]

        let matrix = [[b[1], a[1]], [b[0], a[0]]]
        let inv = 1 / (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0])
        matrix[0][1] = -matrix[0][1]
        matrix[1][0] = -matrix[1][0]
        matrix = matrix.map(row => row.map(e => e * inv))
        let reqA = Math.round(matrix[0][0] * prize[0] + matrix[1][0] * prize[1])
        let reqB = Math.round(matrix[0][1] * prize[0] + matrix[1][1] * prize[1])

        if (reqA * a[0] + reqB * b[0] !== prize[0] || reqA * a[1] + reqB * b[1] !== prize[1]) continue
        tot += Math.round(reqA) * 3 + Math.round(reqB) * 1
    }
    return tot
}

console.log(part1(arcadeGroups))
console.log(part2(arcadeGroups))

// note to self about part2, i was to lazy to rebuild a/b to be [aX, bX] etc, 
// so they are now [aX, aY] which is why i use the weird indexing

// just to have a reminder on how to do this
const p2WithSubstitution = (data) => {
    let tot = 0
    for (let i = 0; i < data.length; i++) {
        let { a, b, part2Prize: prize } = data[i]

        let yRep = { m: prize[1] / b[1], x: a[1] / b[1] }
        const x = Math.round((prize[0] - b[0] * yRep.m) / (a[0] - b[0] * yRep.x))
        const y = Math.round(((prize[1] - x * a[1]) / b[1]))

        if (x * a[0] + y * b[0] !== prize[0] || x * a[1] + y * b[1] !== prize[1]) continue
        tot += x * 3 + y
    }
    return tot
}
console.log(p2WithSubstitution(arcadeGroups))