utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

let freshIds = []
const available = []


for (let i = 0; i < input.length; i++) {
    if (input[i].includes('-')) freshIds.push(input[i].split('-').map(Number))
    else if (input[i] !== "") available.push(Number(input[i]))
}
freshIds = freshIds.sort((r1, r2) => r1[0] - r2[0])

let numFresh = 0;
for (let id of available) {
    if (freshIds.some(([i, j]) => i <= id && j >= id)) numFresh++
}
//part1
console.log(numFresh)

const prevCheckedRanges = []
let totFreshIds = 0

for (let [i, j] of freshIds) {
    for (let [pi, pj] of prevCheckedRanges) {
        if (pi <= i && pj >= i) {
            i = pj + 1
        }
    }
    if (i > j) continue
    for (let [pi, pj] of prevCheckedRanges) {
        if (pi <= j && pj >= j) {
            j = pi - 1
        }
    }
    if (j < i) continue

    totFreshIds += j - i + 1
    prevCheckedRanges.push([i, j])
}
//part2
console.log(totFreshIds)