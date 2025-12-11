utils = require('./utils')

const input = utils.readLinesAsStringArray('testinput').map(line => line.split(',')).map(d => d.map(Number))

let largests = { dist: 0, p1: null, p2: null }
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const p1 = input[i]
        const p2 = input[j]
        const manhattan = Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])
        if (manhattan > largests.dist) {
            largests.dist = manhattan
            largests.p1 = p1
            largests.p2 = p2
        }
    }
}

//p1
console.log((Math.abs(largests.p1[0] - largests.p2[0]) + 1) * (Math.abs(largests.p1[1] - largests.p2[1]) + 1))

const buildGreenBoxes = (steps => {
    let xRanges = []
    let yRanges = []
    for (let i = 1; i < steps.length; i++) {
        const p1 = steps[i - 1]
        const p2 = steps[i]
        if (p1[0] === p2[0]) {
            yRanges.push({ x: p1[0], y: [p1[1], p2[1]].sort((a, b) => a - b) })
        } else {
            xRanges.push({ y: p1[1], x: [p1[0], p2[0]].sort((a, b) => a - b) })
        }
    }
    xRanges = xRanges.sort((r1, r2) => r1.y - r2.y)
    yRanges = yRanges.sort((r1, r2) => r1.x - r2.x)
    const boxes = []
    let i = 0;
    while (true) {
        if (i === 1) break
        let xRange = xRanges[i].x
        console.log(xRanges[i])
        for (let j = i + 1; j < xRanges.length; j++) {
            let [x1, x2] = xRanges[j].x
            console.log("-", xRanges[j])

            if (xRange[0] >= x1 && xRange[0] <= x2) {
                if (xRange[1] >= x1 && xRange[1] <= x2) {
                    boxes.push([[xRange[0], xRanges[i].y], [xRange[1], xRanges[j].y]])
                    break
                }
                console.log("making box1", [[xRange[0], xRanges[i].y], [x2, xRanges[j].y]])
                boxes.push([[xRange[0], xRanges[i].y], [x2, xRanges[j].y]])
                xRange = [x2, xRange[1]]
            } else if (xRange[1] === x1) { } else if (xRange[1] >= x1 && xRange[1] <= x2) {
                boxes.push([[xRange[1], xRanges[i].y], [x2, xRanges[j].y]])
                console.log("making box2", [[xRange[1], xRanges[i].y], [x2, xRanges[j].y]])

                xRange = [x2, xRange[0]]
            } else if (x1 >= xRange[0] && x2 <= xRange[1]) {
                console.log("making box3", [[x1, xRanges[i].y], [x2, xRanges[j].y]])

                boxes.push([[x1, xRanges[i].y], [x2, xRanges[j].y]])
                xRanges.splice(i + 1, 0, ({ x: [x2, xRange[1]], y: xRanges[i].y }))
                xRanges.splice(i + 2, 0, { x: [xRange[0], x1], y: xRanges[i].y })
            }
        }
        i++
        console.log("===")
    }
    // console.log(boxes.length)
    // console.log(boxes)
    return boxes
})
console.log(input)
let allBoxes = buildGreenBoxes(input)

const isPosInBox = (boxes, [x, y]) => boxes.some(([c1, c2]) => y >= c1[1] && y <= c2[1] && x >= c1[0] && x <= c2[0])

for (let i = 0; i < 14; i++) {
    const line = []
    for (let j = 0; j < 14; j++) {
        if (input.find(pos => pos[0] === j && pos[1] === i)) { line.push('#') } else if (isPosInBox(allBoxes, [j, i])) {
            line.push('X')
        } else { line.push('.') }
    }
    console.log(line.join(''))
}


largests = { dist: 0, p1: null, p2: null }
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const p1 = input[i]
        const p2 = input[j]
        const area = (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1)

        if (area > largests.dist) {
            const p3 = [p1[0], p2[1]]
            const p4 = [p2[0], p1[1]]
            if (!isPosInBox(allBoxes, p1) || !isPosInBox(allBoxes, p2) || !isPosInBox(allBoxes, p3) || !isPosInBox(allBoxes, p4)) continue
            largests.dist = area
            largests.p1 = p1
            largests.p2 = p2
        }
    }
}
console.log(largests)
//p2
console.log((Math.abs(largests.p1[0] - largests.p2[0]) + 1) * (Math.abs(largests.p1[1] - largests.p2[1]) + 1))
//167584794 - to low
//4011908989 - to large