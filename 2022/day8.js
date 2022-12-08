utils = require('./utils')


let trees = utils.readLinesAsStringArray('finput')
trees = trees.map(row => row.split(''))

const part1 = (trees) => trees.map((row, rowIndex) => row.filter((tree, index) => {
    if ([0, trees.length - 1].includes(rowIndex) || [0, trees.length - 1].includes(index)) {
        return true;
    }
    const left = row.slice(0, index)
    const right = row.slice(index + 1, trees.length)
    const up = trees.slice(0, rowIndex).map((t) => t[index])
    const down = trees.slice(rowIndex + 1, trees.length).map((t) => t[index])

    //check row
    if (left.filter(t => +t >= +tree).length === 0) return true;
    if (right.filter(t => +t >= +tree).length === 0) return true;

    //check column
    if (up.filter(t => +t >= +tree).length === 0) return true;
    if (down.filter(t => +t >= +tree).length === 0) return true;

    return false;
})).reduce((p, n) => p + n.length, 0)


const visibleTrees = (trees, height, dir) => {
    let visible = 0;
    if (dir === 1) {
        for (let i = 0; i < trees.length; i++) {
            visible += 1;
            if (+trees[i] >= height) {
                break;
            }
        }
    } else if (dir === -1) {
        for (let i = trees.length - 1; i >= 0; i--) {
            visible += 1;
            if (+trees[i] >= height) {
                break;
            }
        }
    }
    return visible;
}

const part2 = trees => trees.reduce((highest, row, rowIndex) => {
    const high = row.reduce((rowHigh, tree, index) => {
        const scores = [0, 0, 0, 0]

        const left = row.slice(0, index)
        const right = row.slice(index + 1, trees.length)
        const up = trees.slice(0, rowIndex).map((t) => t[index])
        const down = trees.slice(rowIndex + 1, trees.length).map((t) => t[index])

        scores[0] = visibleTrees(up, +tree, -1)
        scores[1] = visibleTrees(left, +tree, -1)
        scores[2] = visibleTrees(down, +tree, 1)
        scores[3] = visibleTrees(right, +tree, 1)

        const score = scores.reduce((p, n) => p * n)
        if (score > rowHigh) {
            winScore1 = [...scores]
            best2 = index;
        }
        return score > rowHigh ? score : rowHigh

    }, 0)
    if (high > highest) {
        best1 = rowIndex;
        winScore2 = [...winScore1];
    }
    return high > highest ? high : highest
}, 0)

//p1
console.log(part1(trees))

//p2
console.log(part2(trees))
