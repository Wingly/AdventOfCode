utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(''))

const antennas = input.reduce((prev, curr, i) => {
    for (let j = 0; j < curr.length; j++) {
        const char = curr[j]
        if (char !== '.') {
            if (prev[char]) {
                prev[char].push([i, j])
            } else {
                prev[char] = [[i, j]]
            }
        }
    }
    return prev

}, {})


const maxY = input.length;
const maxX = input[0].length

const keys = Object.keys(antennas)
const antiNodesPart1 = keys.map(key => {
    let ants = antennas[key]
    const nodes = []
    ants.forEach((antenna, index) => {
        for (let i = 0; i < ants.length; i++) {
            if (i === index) continue
            const checkAnt = ants[i]

            let distX = antenna[1] - checkAnt[1]
            let distY = antenna[0] - checkAnt[0]
            let nodeX = antenna[1] + distX
            let nodeY = antenna[0] + distY
            if (nodeY >= 0 && nodeY < maxY && nodeX >= 0 && nodeX < maxX)
                nodes.push([nodeY, nodeX])

        }
    });
    return nodes
}).flat().filter((n1, i, all) => i === all.findIndex(n2 => n1[0] === n2[0] && n1[1] === n2[1])).sort((n1, n2) => n1[0] - n2[0])

const antiNodesPart2 = keys.map(key => {
    let ants = antennas[key]
    const nodes = []
    ants.forEach((antenna, index) => {
        for (let i = 0; i < ants.length; i++) {
            if (i === index) continue
            const checkAnt = ants[i]

            let distX = antenna[1] - checkAnt[1]
            let distY = antenna[0] - checkAnt[0]
            let mult = 1
            while (true) {
                let nodeX = antenna[1] + distX * mult
                let nodeY = antenna[0] + distY * mult
                if (nodeY >= 0 && nodeY < maxY && nodeX >= 0 && nodeX < maxX) {
                    nodes.push([nodeY, nodeX])
                } else {
                    break
                }
                mult++
            }

        }
    });
    nodes.push(...ants)
    return nodes
}).flat().filter((n1, i, all) => i === all.findIndex(n2 => n1[0] === n2[0] && n1[1] === n2[1])).sort((n1, n2) => n1[0] - n2[0])

console.log(antennas)
console.log(antiNodesPart1.length)
console.log(antiNodesPart2.length)