utils = require('./utils')
const testFile = 'input'
const input = utils.readLinesAsStringArray(testFile).map(line => line.split(','))

const dist = (p1, p2) => {
    let tot = p1.reduce((tot, p, i) => tot + Math.pow(Math.abs(p - p2[i]), 2), 0);
    return Math.sqrt(tot)
}

let distMap = []

for (let i = 0; i < input.length; i++) {
    const pos = input[i]
    for (let j = i + 1; j < input.length; j++) {
        const compPos = input[j]
        distMap.push({ p1: pos.join('-'), p2: compPos.join('-'), d: dist(pos, compPos) })
    }
}
distMap = distMap.sort((a, b) => a.d - b.d)
const circuits = []
//p1
let max = testFile === 'input' ? 1000 : 10
for (let i = 0; i < max; i++) {
    const existingCircuits = circuits.filter(circuit => circuit.includes(distMap[i].p1) || circuit.includes(distMap[i].p2))
    if (existingCircuits.length > 0) {
        if (existingCircuits.length === 1) {
            const existingCircuit = existingCircuits[0]
            if (existingCircuit.includes(distMap[i].p1) && !existingCircuit.includes(distMap[i].p2)) {
                existingCircuit.push(distMap[i].p2)
            } else if (existingCircuit.includes(distMap[i].p2) && !existingCircuit.includes(distMap[i].p1)) {
                existingCircuit.push(distMap[i].p1)
            }
        } else {
            const indexToRemove = circuits.findIndex(circuit => {
                return circuit.every(c => existingCircuits[1].includes(c))

            })
            existingCircuits[0].push(...existingCircuits[1])
            circuits.splice(indexToRemove, 1)
        }
    } else {
        circuits.push([distMap[i].p1, distMap[i].p2])
    }
}
console.log(circuits.map(c => c.length).sort((a, b) => b - a).slice(0, 3).reduce((sum, a) => sum * a))


//p2. Could probably bake this together with p1 but no time now
let i = 0
while (true) {
    const existingCircuits = circuits.filter(circuit => circuit.includes(distMap[i].p1) || circuit.includes(distMap[i].p2))
    if (existingCircuits.length > 0) {
        if (existingCircuits.length === 1) {
            const existingCircuit = existingCircuits[0]
            if (existingCircuit.includes(distMap[i].p1) && !existingCircuit.includes(distMap[i].p2)) {
                existingCircuit.push(distMap[i].p2)
            } else if (existingCircuit.includes(distMap[i].p2) && !existingCircuit.includes(distMap[i].p1)) {
                existingCircuit.push(distMap[i].p1)
            }
        } else {
            const indexToRemove = circuits.findIndex(circuit => {
                return circuit.every(c => existingCircuits[1].includes(c))

            })
            existingCircuits[0].push(...existingCircuits[1])
            circuits.splice(indexToRemove, 1)
        }
    } else {
        circuits.push([distMap[i].p1, distMap[i].p2])
    }
    if (circuits[0].length === max) {
        break
    }
    i++
}

const last = distMap[i]
console.log(Number(last.p1.split('-')[0]) * Number(last.p2.split('-')[0]))