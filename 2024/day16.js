utils = require('./utils')
const testFile = 'input'
const input = utils.readLinesAsStringArray(testFile)
const map = []
let start = []
let goal = []
for (let i = 0; i < input.length; i++) {
    const line = input[i].split('')
    for (let j = 0; j < line.length; j++) {
        if (line[j] === 'S') {
            start = [i, j]
        } else if (line[j] === 'E') {
            goal = [i, j]
        }
    }
    map.push(line)
}
console.log(start, goal)
/*
    1
 4     2
    3    
*/
const findTurnsInDir = (world, y, x, dir) => {
    const turns = []
    if (dir === 1) {
        for (let lY = y - 1; lY >= 0; lY--) {
            if (world[lY][x] === '#') break
            if (world[lY][x] === 'E') return [[lY, x]]
            if (world[lY][x - 1] !== '#' || world[lY][x + 1] !== '#') {
                turns.push([lY, x])
            }
        }
    } else if (dir === 2) {
        for (let lX = x + 1; lX < world[0].length; lX++) {
            if (y === 2) console.log("4", x, lX, world.length, world[y][lX])
            if (world[y][lX] === '#') break
            if (world[y][lX] === 'E') return [[y, lX]]
            if (world[y - 1][lX] !== '#' || world[y + 1][lX] !== '#') {
                if (y === 2) console.log("pushing", [y, lX])
                turns.push([y, lX])
            }
        }
    } else if (dir === 3) {
        for (let lY = y + 1; lY < world.length; lY++) {
            if (world[lY][x] === '#') break
            if (world[lY][x] === 'E') return [[lY, x]]

            if (world[lY][x - 1] !== '#' || world[lY][x + 1] !== '#') {
                turns.push([lY, x])
            }
        }
    } else {
        for (let lX = x - 1; lX >= 0; lX--) {
            if (world[y][lX] === '#') break
            if (world[y][lX] === 'E') return [[lY, x]]

            if (world[y - 1][lX] !== '#' || world[y + 1][lX] !== '#') {
                turns.push([y, lX])
            }
        }
    }
    return turns;
}

const pushIfNotSame = (arr, curr, prev, toPush) => {
    if (curr[0] !== prev[0] || curr[1] !== prev[1]) {
        arr.push(toPush)
    }
}

const toVisit = [[start, 0, start, 2]]
let checked = { [`${start[0]}-${start[1]}`]: { p: 0, c: [start], all: [] } }

while (toVisit.length) {
    const [[y, x], p, [fY, fX], dir] = toVisit.shift()

    if ((p !== 0 && checked[`${y}-${x}`]?.p <= p) || map[y][x] === '#' || map[y][x] === undefined) {
        if (checked[`${y}-${x}`]?.p === p && map[y][x] !== '#') {
            checked[`${y}-${x}`].all.push([...checked[`${fY}-${fX}`].c, [fY, fX],])
            checked[`${fY}-${fX}`].next = [y, x, p]
        }
        continue
    }

    if (checked[`${y}-${x}`]) {
        checked[`${y}-${x}`].p = p
        checked[`${y}-${x}`].c = [...checked[`${fY}-${fX}`].c, [fY, fX]]
        checked[`${y}-${x}`].all = [checked[`${y}-${x}`].c]
    } else {
        checked[`${y}-${x}`] = {
            p: p,
            c: [...checked[`${fY}-${fX}`].c, [fY, fX]],
            all: [[...checked[`${fY}-${fX}`].c, [fY, fX]]]
        }
    }
    let ups = findTurnsInDir(map, y, x, 1)
    let rights = findTurnsInDir(map, y, x, 2)
    let downs = findTurnsInDir(map, y, x, 3)
    let lefts = findTurnsInDir(map, y, x, 4)
    if (dir === 1) {
        ups.forEach(up => pushIfNotSame(toVisit, up, [y, x], [up, p + y - up[0], [y, x], 1]))
        rights.forEach(right => pushIfNotSame(toVisit, right, [y, x], [right, p + 1000 + right[1] - x, [y, x], 2]))
        lefts.forEach(left => pushIfNotSame(toVisit, left, [y, x], [left, p + 1000 + x - left[1], [y, x], 4]))
    } else if (dir === 2) {
        rights.forEach(right => pushIfNotSame(toVisit, right, [y, x], [right, p + right[1] - x, [y, x], 2]))
        ups.forEach(up => pushIfNotSame(toVisit, up, [y, x], [up, p + 1000 + y - up[0], [y, x], 1]))
        downs.forEach(down => pushIfNotSame(toVisit, down, [y, x], [down, p + 1000 + down[0] - y, [y, x], 3]))
    } else if (dir === 3) {
        downs.forEach(down => pushIfNotSame(toVisit, down, [y, x], [down, p + down[0] - y, [y, x], 3]))
        rights.forEach(right => pushIfNotSame(toVisit, right, [y, x], [right, p + 1000 + right[1] - x, [y, x], 2]))
        lefts.forEach(left => pushIfNotSame(toVisit, left, [y, x], [left, p + 1000 + x - left[1], [y, x], 4]))
    } else {
        lefts.forEach(left => pushIfNotSame(toVisit, left, [y, x], [left, p + x - left[1], [y, x], 4]))
        ups.forEach(up => pushIfNotSame(toVisit, up, [y, x], [up, p + 1000 + y - up[0], [y, x], 1]))
        downs.forEach(down => pushIfNotSame(toVisit, down, [y, x], [down, p + 1000 + down[0] - y, [y, x], 3]))
    }

}

testFile === 'testinput' && console.log(map.map((l, i) => l.map((c, j) => Object.keys(checked).find(z => z === `${i}-${j}`) ? 'x' : c).join('')).join('\n'))
const goalChecked = checked[`${goal[0]}-${goal[1]}`]
// part 1
console.log(goalChecked.p)

const iterateShorterstPaths = (all, paths, points, first) => {
    let unique = []

    for (let path of paths) {
        findUniqueVisitedTiles(path, unique)
    }
    unique = Array.from(new Set(unique))
    for (let key of unique) {
        if (all[key] && all[key].tested !== true && all[key].p <= points) {
            let testpaths = all[key].all

            unique.push(...iterateShorterstPaths(all, testpaths, points, false))
            all[key].tested = true
        }
    }
    return Array.from(new Set(unique))
}
const findUniqueVisitedTiles = (nodeVisited, unique) => {

    for (let i = 0; i < nodeVisited.length - 1; i++) {

        let first = nodeVisited[i]
        let second = nodeVisited[i + 1]

        if (first[0] !== second[0]) {
            let min = Math.min(first[0], second[0])
            let max = Math.max(first[0], second[0])

            for (let j = min; j < max + 1; j++) {
                unique.push(`${j}-${first[1]}`)
            }
        } else if (first[1] !== second[1]) {
            let min = Math.min(first[1], second[1])
            let max = Math.max(first[1], second[1])

            for (let j = min; j < max + 1; j++) {
                unique.push(`${first[0]}-${j}`)
            }
        }
    }
    return unique;
}

testFile === 'testinput' && console.log(map.map((l, i) => l.map((c, j) => Object.keys(checked).find(z => z === `${i}-${j}`) ? 'x' : c).join('')).join('\n'))


const unique = iterateShorterstPaths(checked, goalChecked.all.map(a => [...a, goal]), goalChecked.p, true)

//console.log(tested)
//part 2 - 2 tiles are missing, i can see them with my eyes when printing the board though so could manually submit...
console.log(unique.length)
testFile === 'testinput' && console.log(map.map((l, i) => l.map((c, j) => unique.find(z => z === `${i}-${j}`) ? '0' : c).join('')).join('\n'))