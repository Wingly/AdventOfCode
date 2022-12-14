utils = require('./utils')

const stoneList = utils.readLinesAsStringArray('finput')

const world = {}
let maxX = 0;
let minX = Infinity
let maxY = 0;
const buildWorld = (rocks) => {
    rocks.forEach(rockGroup => {
        let rockCoords = rockGroup.split(' -> ')
        for (let i = 0; i < rockCoords.length - 1; i++) {
            let [x0, y0] = rockCoords[i].split(',').map(c => +c)
            let [x1, y1] = rockCoords[i + 1].split(',').map(c => +c)
            minX = minX > x0 ? x0 : minX
            minX = minX > x1 ? x1 : minX
            maxX = maxX < x0 ? x0 : maxX
            maxX = maxX < x1 ? x1 : maxX
            maxY = maxY < y0 ? y0 : maxY
            maxY = maxY < y1 ? y1 : maxY

            let sX = x0 < x1 ? x0 : x1
            let eX = x0 > x1 ? x0 : x1
            for (let j = 0; j <= eX - sX; j++) {
                world[`${sX + j}|${y0}`] = '#'
            }
            let sY = y0 < y1 ? y0 : y1
            let eY = y0 > y1 ? y0 : y1
            for (let j = 0; j <= eY - sY; j++) {
                world[`${x0}|${sY + j}`] = '#'
            }
        }
    })
    world['500|0'] = '+'
    maxY += 2
}

const makeSandFall = (part1) => {
    while (true) {
        let y = 0
        let x = 500

        //tasty double while
        while (true) {
            if (y > maxY) {
                break;
            }
            if (!world[`${x}|${y + 1}`] && (part1 || y + 1 < maxY)) {
                y++
                continue
            } else if (!world[`${x - 1}|${y + 1}`] && (part1 || y + 1 < maxY)) {
                y++
                x--
                continue
            } else if (!world[`${x + 1}|${y + 1}`] && (part1 || y + 1 < maxY)) {
                y++
                x++
                continue
            } else if (y < maxY) {
                world[`${x}|${y}`] = 'o'
                break
            } else {
                break;
            }


        }
        minX = x < minX ? x : minX
        maxX = x > maxX ? x : maxX

        if (y >= maxY || (x === 500 && y === 0)) {
            break;
        }
    }
}

buildWorld(stoneList)


makeSandFall(true)
//p1
console.log(Object.values(world).filter(val => val === 'o').length)



//p2
makeSandFall(false)
console.log(Object.values(world).filter(val => val === 'o').length)

//Renderer. Works best for example input, real input is to large
for (let i = 0; i <= maxY; i++) {
    let row = ''
    for (let j = 0; j <= maxX - minX; j++) {
        let slot = world[`${minX + j}|${i}`]
        row += slot ? slot : '.'
    }
    console.log(row)
}