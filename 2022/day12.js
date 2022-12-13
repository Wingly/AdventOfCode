utils = require('./utils')

const map = utils.readLinesAsStringArray('finput').map(row => row.split(''))

let goal, start;
let aNodes = []

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        let element = map[i][j]
        if (element === 'S') {
            start = [i, j]
        } else if (element === 'E') {
            goal = [i, j]
        } else if (element === 'a') {
            aNodes.push([i, j])
        }
    }
}
const isValidDestination = (currHeight, targetHeight) => (targetHeight >= currHeight || targetHeight === currHeight - 1) ? true : false


const distMap = map.map(row => row.map(ele => Infinity))
const traverser = ([y, x], curPath) => {
    if (distMap[y][x] <= curPath.length) {
        return;
    }
    const newPath = [...curPath, [y, x]]
    distMap[y][x] = curPath.length

    let currentHeight = map[y][x] === 'E' ? 'z' : map[y][x]
    let heightValue = currentHeight.charCodeAt(0)

    if (x !== 0) {
        let target = map[y][x - 1] === 'S' ? 'a' : map[y][x - 1]
        if (isValidDestination(heightValue, target.charCodeAt(0))) {
            traverser([y, x - 1], newPath)
        }
    }
    if (x !== map[0].length - 1) {
        let target = map[y][x + 1] === 'S' ? 'a' : map[y][x + 1]
        if (isValidDestination(heightValue, target.charCodeAt(0))) {
            traverser([y, x + 1], newPath)
        }
    }
    if (y !== 0) {
        let target = map[y - 1][x] === 'S' ? 'a' : map[y - 1][x]
        if (isValidDestination(heightValue, target.charCodeAt(0))) {
            traverser([y - 1, x], newPath)
        }
    }
    if (y !== map.length - 1) {
        let target = map[y + 1][x] === 'S' ? 'a' : map[y + 1][x]
        if (isValidDestination(heightValue, target.charCodeAt(0))) {
            traverser([y + 1, x], newPath)
        }
    }
}
traverser(goal, [])
let shortestDist = distMap[start[0]][start[1]]
//p1
console.log(shortestDist)
aNodes.forEach(([y, x]) => {
    if (distMap[y][x] < shortestDist) {
        shortestDist = distMap[y][x]
    }
})
//p2
console.log(shortestDist)

//Renderer
/*for (var i = 0; i < map.length; i++) {
    let row = ''
    for (let j = 0; j < map[0].length; j++) {
        if (path.find(p => p[0] === i && p[1] === j)) {
            row += map[i][j]
        } else {
            row += "."
        }
    }
    console.log(row)
}*/
