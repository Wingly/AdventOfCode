utils = require('./utils')

const inputFile = 'input'
const input = utils.readLinesAsStringArray('input')

const height = inputFile === 'input' ? 103 : 7
const width = inputFile === 'input' ? 101 : 11

const guards = input.map(line => {
    const split = line.split(/.=/)
    const startPos = split[1].split(',').map(Number)
    const velocity = split[2].split(',').map(Number)
    return {
        p: startPos,
        v: velocity
    }
})

const posAfter100sec = guards.map(guard => {
    let [x, y] = [...guard.p]
    x += guard.v[0] * 100
    y += guard.v[1] * 100

    x = x % width

    y = y % height
    if (x < 0) x = width + x
    if (y < 0) y = height + y
    return [x, y]
})

const midWidth = Math.floor(width / 2)
const midHeight = Math.floor(height / 2)
const guardsInQuads = posAfter100sec.reduce((prev, [x, y]) => {
    if (x < midWidth && y < midHeight) {
        prev.tL.push([x, y])
    } else if (x > midWidth && y < midHeight) {
        prev.tR.push([x, y])
    } else if (x < midWidth && y > midHeight) {
        prev.bL.push([x, y])
    } else if (x > midWidth && y > midHeight) {
        prev.bR.push([x, y])
    }
    return prev
}, { tL: [], tR: [], bL: [], bR: [] })
//part 1
console.log(Object.keys(guardsInQuads).reduce((prev, curr) => prev * guardsInQuads[curr].length, 1))

const findTriangle = (all, [x, y]) => {
    for (let i = 1; i < 4; i++) {
        if (all.find(g => g.p[0] === x + i && g.p[1] === y + i) && all.find(g => g.p[0] === x - i && g.p[1] === y + i)) {

        } else {
            return false
        }
    }
    return true
}


let seconds = 0
let found = false
//there is probably a smarter way to do this, but it works so :shrug:
while (!found) {
    seconds++
    guards.forEach(guard => {
        guard.p[0] += guard.v[0]
        guard.p[1] += guard.v[1]

        if (guard.p[0] > width) {
            guard.p[0] = guard.p[0] - width
        }
        else if (guard.p[0] < 0) {
            guard.p[0] = width + guard.p[0]
        }
        if (guard.p[1] > height) {
            guard.p[1] = guard.p[1] - height
        }
        else if (guard.p[1] < 0) {
            guard.p[1] = height + guard.p[1]
        }

    });

    for (let i = 0; i < guards.length; i++) {
        found = findTriangle(guards.filter(g => g.p[1] > guards[i].p[1]), guards[i].p)
    }
}
if (found) {
    for (let i = 0; i < height; i++) {
        let row = ''
        for (let j = 0; j < width; j++) {
            if (guards.find(g => g.p[0] === j && g.p[1] === i)) {
                row += 'x'
            } else {
                row += '.'
            }
        }
        console.log(row)
    }
}
//part 2
console.log(seconds)