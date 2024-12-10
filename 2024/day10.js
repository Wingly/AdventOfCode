utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split('').map(Number))

const trailheads = input.reduce((prev, curr, y) => {
    for (let x = 0; x < curr.length; x++) {
        if (curr[x] === 0) {
            prev.push([y, x])
        }
    }
    return prev
}, [])

let knownNodes = {}

const height = input.length - 1
const width = input[0].length - 1

const addToPath = (path, elem, uniqueOnly) => {
    path.forEach(p => {
        if (knownNodes[`${p[0]}-${p[1]}`]) {
            if (!uniqueOnly || !knownNodes[`${p[0]}-${p[1]}`].find(d => d[0] === elem[0] && d[1] === elem[1])) {
                knownNodes[`${p[0]}-${p[1]}`].push(elem)
            }
        } else {
            knownNodes[`${p[0]}-${p[1]}`] = [elem]
        }
    })
}

const traverser = (path, current, uniqueOnly) => {
    let y = current[0]
    let x = current[1]
    let num = input[y][x]
    let totFound = []

    let up = y - 1 >= 0 ? input[y - 1][x] : -1
    let right = x + 1 <= width ? input[y][x + 1] : -1
    let down = y + 1 <= height ? input[y + 1][x] : -1
    let left = x - 1 >= 0 ? input[y][x - 1] : -1
    if (up === num + 1) {
        if (up === 9) {
            totFound.push([y - 1, x])
        } else {
            let found = traverser([...path, current], [y - 1, x], uniqueOnly)
            if (found && found.length) {
                found.forEach(f =>
                    addToPath([...path, current], f, uniqueOnly))
            }
        }
    }
    if (right === num + 1) {
        if (right === 9) {
            totFound.push([y, x + 1])
        } else {
            let found = traverser([...path, current], [y, x + 1], uniqueOnly)
            if (found && found.length) {
                found.forEach(f =>
                    addToPath([...path, current], f, uniqueOnly))
            }
        }
    }
    if (down === num + 1) {
        if (down === 9) {
            totFound.push([y + 1, x])
        } else {
            let found = traverser([...path, current], [y + 1, x], uniqueOnly)
            if (found && found.length) {
                found.forEach(f =>
                    addToPath([...path, current], f, uniqueOnly))
            }
        }
    }
    if (left === num + 1) {
        if (left === 9) {
            totFound.push([y, x - 1])
        } else {
            let found = traverser([...path, current], [y, x - 1], uniqueOnly)
            if (found && found.length) {
                found.forEach(f =>
                    addToPath([...path, current], f, uniqueOnly))
            }
        }
    }
    return totFound
}

let totPart1 = 0;

trailheads.forEach(head => {
    traverser([], head, true)
    let totForHead = knownNodes[`${head[0]}-${head[1]}`]?.length
    totPart1 += totForHead ? totForHead : 0
});
console.log(totPart1)
knownNodes = {}
let totPart2 = 0
trailheads.forEach(head => {
    traverser([], head, false)
    let totForHead = knownNodes[`${head[0]}-${head[1]}`]?.length
    totPart2 += totForHead ? totForHead : 0
});
console.log(totPart2)
