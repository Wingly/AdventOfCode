utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(''))

const startPos = [0, input[0].findIndex(s => s === "S")]

const splitterPositions = input.reduce((all, line, i) => {
    all.push(line.reduce((linePos, c, j) => c === '^' ? [...linePos, [i, j]] : linePos, []))
    return all
}, [])

const activeColumns = [startPos[1]]

const canBeHit = []

for (let i = 0; i < splitterPositions.length; i++) {
    const splittersInCurRow = splitterPositions[i]
    if (splittersInCurRow.length === 0) continue

    for (let j = 0; j < splittersInCurRow.length; j++) {
        const splitterXPos = splittersInCurRow[j][1]
        const columnIndex = activeColumns.findIndex(s => s === splitterXPos)
        if (columnIndex !== -1) {
            activeColumns.splice(columnIndex, 1)
            canBeHit.push([i, splittersInCurRow[j][1]])
            if (!activeColumns.includes(splitterXPos - 1)) {
                activeColumns.push(splitterXPos - 1)
            }
            if (!activeColumns.includes(splitterXPos + 1)) {
                activeColumns.push(splitterXPos + 1)
            }
        }
    }
}
//part1
console.log(canBeHit.length)

const simpleSplitters = splitterPositions.flat()

const knownTimelinesAfterSplitter = {}

const timelinerFinder = (beamPos) => {
    const nextSplit = simpleSplitters.filter(pos => pos[0] > beamPos[0]).find(pos => pos[1] === beamPos[1])
    if (nextSplit === undefined) {
        return 1
    } else if (knownTimelinesAfterSplitter[nextSplit.join('-')]) {
        return knownTimelinesAfterSplitter[nextSplit.join('-')]
    }

    let resultLine1 = timelinerFinder([nextSplit[0], nextSplit[1] - 1])
    let resultLine2 = timelinerFinder([nextSplit[0], nextSplit[1] + 1])
    knownTimelinesAfterSplitter[nextSplit.join('-')] = resultLine1 + resultLine2

    return resultLine1 + resultLine2
}
console.log(timelinerFinder(startPos, 1))

