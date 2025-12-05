
utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(''))

const safeBoundCheck = (arr, i, j) => {
    if (i < 0 || i >= arr.length) return '.'
    const jArr = arr[i]
    if (j < 0 || j >= jArr.length) return '.'
    return jArr[j]
}

const getSurroundingPapers = (position, map) => {
    let papers = 0

    for (let y = -1; y < 2; y += 1) {
        for (let x = -1; x < 2; x += 1) {
            if (y === 0 && x === 0) continue
            if (safeBoundCheck(map, position[0] + y, position[1] + x) === '@') {
                papers++

            }
        }
    }

    return papers < 4 ? position : []
}


let canMove = input.reduce((free, row, i) => [...free, ...row.map((_, j) => input[i][j] === "@" ? getSurroundingPapers([i, j], input) : [])], []).filter(l => l.length)

/*for (let i = 0; i < input.length; i++) {
     console.log(input[i].map((l, j) => canMove.find(e => e[0] === i && e[1] === j) ? 'x' : l).join(''))
}*/

//part1
console.log(canMove.length)

let totalMoved = canMove.length

let afterRun = input.map((line) => line.map((char => char)))

while (canMove.length) {
    afterRun = afterRun.map((line, i) => line.map((char, j) => canMove.find(e => e[0] === i && e[1] === j) ? '.' : char))
    canMove = afterRun.reduce((free, row, i) => [...free, ...row.map((_, j) => afterRun[i][j] === "@" ? getSurroundingPapers([i, j], afterRun) : [])], []).filter(l => l.length)
    totalMoved += canMove.length
    /*for (let i = 0; i < afterRun.length; i++) {
         console.log(afterRun[i].map((l, j) => canMove.find(e => e[0] === i && e[1] === j) ? 'x' : l).join(''))
    }*/
}
//part2
console.log(totalMoved)

