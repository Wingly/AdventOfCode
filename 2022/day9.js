utils = require('./utils')



const moveList = utils.readLinesAsStringArray('finput')

let head = [0, 0]
let tail = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
const visited = [new Set(), new Set()]

const moveTail = (newHead, prevTail) => {
    let yDist = newHead[0] - prevTail[0]
    let xDist = newHead[1] - prevTail[1]
    if (yDist === 0 && Math.abs(xDist) === 2) {
        return [prevTail[0], prevTail[1] + xDist / 2]
    } else if (xDist === 0 && Math.abs(yDist) === 2) {
        return [prevTail[0] + yDist / 2, prevTail[1]]
    } else if (Math.abs(yDist) === 1 && Math.abs(xDist) === 2) {
        return [newHead[0], prevTail[1] + xDist / 2]
    } else if (Math.abs(xDist) === 1 && Math.abs(yDist) === 2) {
        return [prevTail[0] + yDist / 2, newHead[1]]
    } else if (Math.abs(xDist) === 2 && Math.abs(yDist) === 2) {
        return [prevTail[0] + yDist / 2, prevTail[1] + xDist / 2]

    }
    return prevTail
}

moveList.forEach(move => {
    move = move.split(' ')
    for (var i = 0; i < +move[1]; i++) {
        switch (move[0]) {
            case 'R':
                head[1] = head[1] + 1
                break;
            case 'L':
                head[1] = head[1] - 1
                break;
            case 'U':
                head[0] = head[0] + 1
                break;
            case 'D':
                head[0] = head[0] - 1
                break;
        }
        tail[0] = moveTail(head, tail[0])
        for (var j = 1; j < tail.length; j++) {
            tail[j] = moveTail(tail[j - 1], tail[j])
        }
        visited[0].add(tail[0].join('|'))
        visited[1].add(tail[8].join('|'))
    }
})
//p1
console.log(visited[0].size)
//p2
console.log(visited[1].size)
