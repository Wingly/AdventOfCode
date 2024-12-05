utils = require('./utils')

const input = utils.readLinesAsStringArray('input')

const breakpoint = input.findIndex(i => i === '')

const firstSection = input.slice(0, breakpoint)
const secondSection = input.slice(breakpoint + 1)

const requiredBeforeMap = firstSection.reduce((prev, curr) => {
    const parts = curr.split('|')
    if (prev[parts[1]]) prev[parts[1]].push(parts[0])
    else prev[parts[1]] = [parts[0]]
    return prev
}, {})


const mappedSection = secondSection.map(update => {
    const parts = update.split(',')
    const prev = []
    for (let i = 0; i < parts.length; i++) {
        const works = (requiredBeforeMap[parts[i]] ?? []).every(subpart => prev.includes(subpart) || !parts.includes(subpart))
        if (works) {
            prev.push(parts[i])
        } else break
    }

    return [parts, prev]

})
const part1 = mappedSection.filter(row => row[0].length === row[1].length).map(row => row[0][Math.floor(row[0].length / 2)]).map(Number).reduce((prev, curr) => prev + curr)

console.log(part1)

const incorrect = mappedSection.filter(row => row[0].length !== row[1].length)
const fixedIncorrect = incorrect.map(row => {
    const toFix = [...row[0]]

    for (let i = 0; i < toFix.length; i++) {
        const neededBefore = (requiredBeforeMap[toFix[i]] ?? []).filter(subpart => toFix.includes(subpart) && !toFix.slice(0, i).includes(subpart))

        if (neededBefore.length) {
            neededBefore.forEach(bef => {
                const index = toFix.findIndex(z => z === bef)
                toFix.splice(index, 1)
                toFix.unshift(bef)
                i = -1
            })

        }

    }
    return toFix
})
const part2 = fixedIncorrect.map(fixed => fixed[Math.floor(fixed.length / 2)]).map(Number).reduce((p, c) => p + c)
console.log(part2)