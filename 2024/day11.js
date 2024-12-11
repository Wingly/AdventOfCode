utils = require('./utils')

const input = utils.readLinesAsString('input').split(' ').map(Number)




const stoneCalculator = (known, stone, depth, maxDepth) => {
    if (known[stone] && known[stone][depth]) {
        return known[stone][depth]
    }
    let updatedStone;
    let newStone;
    if (depth === maxDepth) return 1
    if (stone === 0) {
        updatedStone = 1
    } else if (String(stone).length % 2 === 0) {

        let stringstone = String(stone)
        let s1 = stringstone.substring(0, stringstone.length / 2)
        let s2 = stringstone.substring(stringstone.length / 2)
        updatedStone = Number(s1)
        newStone = Number(s2)
    } else {
        updatedStone = stone * 2024
    }
    let tot = stoneCalculator(known, updatedStone, depth + 1, maxDepth)
    if (newStone !== undefined) {
        tot += stoneCalculator(known, newStone, depth + 1, maxDepth)
    }
    if (known[stone]) {
        known[stone][depth] = tot
    } else {
        known[stone] = { [depth]: tot }
    }
    return tot
}

let totPart1 = 0;
let totPart2 = 0;
const knownPart1 = {}
const knownPart2 = {}
input.forEach(stone => {
    totPart1 += stoneCalculator(knownPart1, stone, 0, 25)
    totPart2 += stoneCalculator(knownPart2, stone, 0, 75)
})
console.log(totPart1)
console.log(totPart2)

