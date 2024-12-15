utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

let map = []
let movement = ''
let isMap = true
let startRobotPos = []

for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
        isMap = false
        continue
    }
    if (isMap) {
        let line = input[i].split('')
        let robotX = line.findIndex(c => c === '@')
        if (robotX !== -1) {
            startRobotPos = [i, robotX]
            line.splice(robotX, 1, '.')
        }
        map.push(line)
    } else {
        movement += input[i].trim()
    }
}
/*
dir:
    ^1
 <4    2>
    v3
*/
const dirToPosChange = (y, x, dir) => {
    if (dir === 1) {
        return [y - 1, x]
    } else if (dir === 2) {
        return [y, x + 1]
    } else if (dir === 3) {
        return [y + 1, x]
    } else {
        return [y, x - 1]
    }
}

const bigBoxMovechecker = (world, y, x, dir) => {
    const char = world[y][x]
    let toMove = []

    if ([2, 4].includes(dir)) {
        if (dir === 2) {
            if (char === '[') {
                toMove = bigBoxMovechecker(world, y, x + 2, dir)
                if (toMove) {
                    return [...toMove, [y, x], [y, x + 1]].sort((a, b) => b[1] - a[1])
                }
            } else if (char === '#') {
                return false;
            } else {
                return []
            }
        } else if (dir === 4) {
            if (char === ']') {
                const toMove = bigBoxMovechecker(world, y, x - 2, dir)
                if (toMove) {
                    return [...toMove, [y, x], [y, x - 1]].sort((a, b) => a[1] - b[1])
                }
            } else if (char === '#') {
                return false;
            } else {
                return []
            }

        }
    }

    if (char === ']') {
        const [newYR, newXR] = dirToPosChange(y, x, dir)
        const [newYL, newXL] = dirToPosChange(y, x - 1, dir)
        const rightBoxes = bigBoxMovechecker(world, newYR, newXR, dir)
        const leftBoxes = bigBoxMovechecker(world, newYL, newXL, dir)
        if (rightBoxes && leftBoxes) {
            let toReturn = [[y, x], [y, x - 1]]
            if (Array.isArray(rightBoxes)) toReturn.push(...rightBoxes)
            if (Array.isArray(leftBoxes)) toReturn.push(...leftBoxes)
            return toReturn.filter((b1, i) => i === toReturn.findIndex(b2 => b1[0] === b2[0] && b1[1] === b2[1])).sort((a, b) => dir === 1 ? a[0] - b[0] : b[0] - a[0])
        } else {
            return false
        }
    } else if (char === '[') {
        const [newYL, newXL] = dirToPosChange(y, x, dir)
        const [newYR, newXR] = dirToPosChange(y, x + 1, dir)
        const rightBoxes = bigBoxMovechecker(world, newYR, newXR, dir)
        const leftBoxes = bigBoxMovechecker(world, newYL, newXL, dir)
        if (rightBoxes && leftBoxes) {
            let toReturn = [[y, x], [y, x + 1]]
            if (Array.isArray(rightBoxes)) toReturn.push(...rightBoxes)
            if (Array.isArray(leftBoxes)) toReturn.push(...leftBoxes)
            return toReturn.filter((b1, i) => i === toReturn.findIndex(b2 => b1[0] === b2[0] && b1[1] === b2[1])).sort((a, b) => dir === 1 ? a[0] - b[0] : b[0] - a[0])
        } else {
            return false
        }
    } else if (char === '#') {
        return false
    }
    return true

}

const moveBot = (world, y, x, dir, isBox) => {
    const [newY, newX] = dirToPosChange(y, x, dir)
    const nextChar = world[newY][newX]
    if (nextChar === '#') return false
    if (nextChar === 'O') {
        if (moveBot(world, newY, newX, dir, true)) {
            return true
        } else {
            return false
        }
    }
    if (['[', ']'].includes(nextChar)) {
        const boxesToMove = bigBoxMovechecker(world, newY, newX, dir)
        if (boxesToMove) {
            boxesToMove.forEach(([bY, bX]) => {
                const [nY, nX] = dirToPosChange(bY, bX, dir)
                world[nY][nX] = world[bY][bX]
                world[bY][bX] = '.'
            });
        } else {
            return false
        }
    }
    if (isBox) {
        world[newY][newX] = world[y][x]
    }
    return true
}

const handleMovement = (world, movement, start) => {
    for (let i = 0; i < movement.length; i++) {
        let move = movement[i]
        const [y, x] = start

        if (move === '^') {
            if (moveBot(world, y, x, 1)) {
                world[y][x] = '.'
                start[0] = y - 1
            }
        } else if (move === '>') {
            if (moveBot(world, y, x, 2)) {
                world[y][x] = '.'
                start[1] = x + 1
            }
        } else if (move === 'v') {
            if (moveBot(world, y, x, 3)) {
                world[y][x] = '.'
                start[0] = y + 1
            }
        } else {
            if (moveBot(world, y, x, 4)) {
                world[y][x] = '.'
                start[1] = x - 1
            }
        }
        //console.log(world.map((m, y) => m.map((l, x) => start[0] === y && start[1] === x ? '@' : l).join('')).join('\n'))
    }
}
let robotPos = [...startRobotPos]
const part1Map = map.map(m => [...m])

handleMovement(part1Map, movement, robotPos)
//part 1
let tot = 0
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (part1Map[y][x] === 'O' && !(robotPos[0] === y && robotPos[1] === x)) {
            tot += 100 * y + x
        }
    }
}
console.log(tot)

const part2map = map.map((m, y) => m.flatMap((l, x) => (l === 'O' ? '[]' : l + l).split('')))
//console.log(part2map.map((m, y) => m.map((l, x) => l).join('')).join('\n'))
robotPos = [startRobotPos[0], startRobotPos[1] * 2]

handleMovement(part2map, movement, robotPos)
tot = 0

for (let y = 0; y < part2map.length; y++) {
    for (let x = 0; x < part2map[0].length; x++) {

        if (part2map[y][x] === '[' && !(robotPos[0] === y && robotPos[1] === x)) {
            tot += 100 * y + x
        }
    }
}

//console.log(part2map.map((m, y) => m.map((l, x) => l).join('')).join('\n'))

console.log(tot)