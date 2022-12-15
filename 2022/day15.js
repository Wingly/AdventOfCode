utils = require('./utils')
const inputFile = 'finput'
const data = utils.readLinesAsStringArray(inputFile)

const sensorAndClosestBeacon = data.map(row => row.split(':').map(part => part.split('at ')[1].split(', ').map(subpart => +subpart.split('=')[1])))
const manhattan = (pos1, pos2) => Math.abs(Math.abs(pos1[0]) - pos2[0]) + Math.abs(pos1[1] - pos2[1])
const sensorFields = sensorAndClosestBeacon.map(([sensor, beacon]) => ({
    origin: sensor,
    range: manhattan(sensor, beacon)
}))

let yCheck = inputFile === 'testinput' ? 10 : 2000000;

const getCoveredSlots = (rowIndex, fields) => {
    const coveredSlots = new Set()
    fields.forEach(({ origin: [x, y], range }) => {
        const distance = Math.abs(rowIndex - y)
        for (let i = x - (range - distance); i <= x + (range - distance); i++) {
            coveredSlots.add(i)
        }
    })
    // Yes, bacon
    const bacons = new Set(sensorAndClosestBeacon.map(([_, beacon]) => beacon[1]).filter(b => b === rowIndex))

    return { signal: coveredSlots, bacons }
}
//p1. Using something similiar to p2 would probably be a lot faster, but this is what i first tried so
const covered = getCoveredSlots(yCheck, sensorFields.filter(field => (field.origin[1] + field.range) >= yCheck && (field.origin[1] - field.range) <= yCheck))
console.log(covered.signal.size - covered.bacons.size)

//p2
let max = inputFile === 'testinput' ? 20 : 4000000
let answer
for (let y = 0; y <= max; y++) {
    let ranges = sensorFields.filter(({ origin, range }) => {
        const distance = Math.abs(origin[1] - y)
        return range - distance >= 0
    }).map(({ origin, range }) => {
        const distance = Math.abs(origin[1] - y)
        return [origin[0] - (range - distance), origin[0] + (range - distance)]
    }).sort((a, b) => a[0] - b[0])

    for (let x = 0; x <= max;) {
        let inARange = false;
        for (let i = 0; i < ranges.length; i++) {
            if (x >= ranges[i][0] && x <= ranges[i][1]) {
                x = ranges[i][1] + 1
                inARange = true
                break;
            }
        }
        if (!inARange) {
            answer = x * 4000000 + y
            break
        }
    }

    if (answer) {
        break
    }
}
console.log(answer)