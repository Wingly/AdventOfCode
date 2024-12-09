utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(''))

const findNextObstacleIndir = (pos, obstacles, dir) => {
    let curDist = Number.MAX_SAFE_INTEGER
    let firstObstacle;
    const [y, x] = pos
    if (dir === 1) {
        obstacles.filter(obs => obs[1] === x && obs[0] < y).forEach(obs => {
            let localDist = y - obs[0]
            if (localDist < curDist) {
                firstObstacle = obs
                curDist = localDist
            }
        });
    } else if (dir === 2) {
        obstacles.filter(obs => obs[0] === y && obs[1] > x).forEach(obs => {
            localDist = obs[1] - x
            if (localDist < curDist) {
                firstObstacle = obs
                curDist = localDist
            }
        });
    } else if (dir === 3) {
        obstacles.filter(obs => obs[1] === x && obs[0] > y).forEach(obs => {
            localDist = obs[0] - y
            if (localDist < curDist) {
                firstObstacle = obs
                curDist = localDist
            }
        });
    } else if (dir === 4) {
        obstacles.filter(obs => obs[0] === y && obs[1] < x).forEach(obs => {
            localDist = x - obs[1]
            if (localDist < curDist) {
                firstObstacle = obs
                curDist = localDist
            }
        });
    }
    return firstObstacle
}

let guardPos = [-1, -1]
//  1
//4   2
//  3
let dir = -1
let obstacles = [];
for (let i = 0; i < input.length; i++) {
    const line = input[i]
    for (let j = 0; j < line.length; j++) {
        if (line[j] === '#') {
            obstacles.push([i, j])
        }
        if (['<', '>', '^', ' v'].includes(line[j])) {
            guardPos = [i, j]
            if (line[j] === '^') dir = 1
            if (line[j] === '>') dir = 2
            if (line[j] === 'v') dir = 3
            if (line[j] === '<') dir = 4
        }
    }
}

const visited = []
while (true) {
    let newPos = [...guardPos];
    let curDist = Number.MAX_SAFE_INTEGER
    let path = []
    const y = guardPos[0]
    const x = guardPos[1]
    if (dir === 1) {
        let localDist = -1
        obstacles.filter(obs => obs[1] === x && obs[0] < y).forEach(obs => {
            localDist = y - obs[0]
            if (localDist < curDist) {
                newPos[0] = obs[0] + 1
                curDist = localDist
            }
        });

        if (curDist === Number.MAX_SAFE_INTEGER) localDist = guardPos[0] + 1
        const distToUse = curDist === Number.MAX_SAFE_INTEGER ? localDist : curDist
        for (let i = 0; i < distToUse; i++) {
            path.push([y - i, x])
        }
    } else if (dir === 2) {
        let localDist = -1
        obstacles.filter(obs => obs[0] === y && obs[1] > x).forEach(obs => {
            localDist = obs[1] - x
            if (localDist < curDist) {
                newPos[1] = obs[1] - 1
                curDist = localDist
            }
        });
        if (curDist === Number.MAX_SAFE_INTEGER) localDist = input[0].length - guardPos[1]
        const distToUse = curDist === Number.MAX_SAFE_INTEGER ? localDist : curDist
        for (let i = 0; i < distToUse; i++) {
            path.push([y, x + i])
        }
    } else if (dir === 3) {
        let localDist = -1
        obstacles.filter(obs => obs[1] === x && obs[0] > y).forEach(obs => {
            localDist = obs[0] - y
            if (localDist < curDist) {
                newPos[0] = obs[0] - 1
                curDist = localDist
            }
        });
        if (curDist === Number.MAX_SAFE_INTEGER) localDist = input.length - guardPos[0]
        const distToUse = curDist === Number.MAX_SAFE_INTEGER ? localDist : curDist

        for (let i = 0; i < distToUse; i++) {
            path.push([y + i, x])
        }
    } else if (dir === 4) {
        let localDist = -1
        obstacles.filter(obs => obs[0] === y && obs[1] < x).forEach(obs => {
            localDist = x - obs[1]
            if (localDist < curDist) {
                newPos[1] = obs[1] + 1
                curDist = localDist
            }
        });

        if (curDist === Number.MAX_SAFE_INTEGER) localDist = guardPos[1] + 1
        const distToUse = curDist === Number.MAX_SAFE_INTEGER ? localDist : curDist

        for (let i = 0; i < distToUse; i++) {
            path.push([y, x - i])
        }
    }
    visited.push(...path.map(p => [...p, dir]))
    if (curDist === Number.MAX_SAFE_INTEGER) break
    guardPos = newPos;
    dir++;
    if (dir > 4) dir = 1
}
//part 1
console.log(visited.filter((p, i) => i === visited.findIndex(v => v[0] === p[0] && v[1] === p[1])).length)

const paradoxBoxes = []

for (let i = 0; i < visited.length - 1; i++) {
    const newObs = visited[i + 1]
    if (visited.slice(0, i).find(vis => vis[0] === newObs[0] && vis[1] === newObs[1])) continue
    let dir = visited[i][2]
    dir++;
    if (dir > 4) dir = 1;
    let pos = visited[i]
    const loopPath = []
    const obsToTest = [...obstacles, newObs]

    while (true) {
        const next = findNextObstacleIndir(pos, obsToTest, dir)
        if (!next) {
            break;
        }

        if (loopPath.find(loop => loop[0] === next[0] && loop[1] === next[1] && loop[2] === dir)) {
            paradoxBoxes.push(newObs)
            break;
        }
        loopPath.push([...next, dir])

        if (dir === 1) {
            pos = [next[0] + 1, next[1]]
        } else if (dir === 2) {
            pos = [next[0], next[1] - 1]
        } else if (dir === 3) {
            pos = [next[0] - 1, next[1]]
        } else if (dir === 4) {
            pos = [next[0], next[1] + 1]
        }
        dir++;
        if (dir > 4) dir = 1;
    }

}
console.log(paradoxBoxes.length)

let skipPrint = true
if (skipPrint) return
for (let i = 0; i < input.length; i++) {
    const line = input[i]
    let l = ""

    for (let j = 0; j < line.length; j++) {
        if (obstacles.find(o => o[0] === i && o[1] === j)) {
            l += '#'
        } else if (paradoxBoxes.find(o => o[0] === i && o[1] === j)) l += '0'
        else if (visited.find(o => o[0] === i && o[1] === j)) l += 'X'
        else l += '.'
    }
    console.log(l)
}