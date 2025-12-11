utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(' '))

let part1 = 0
const buttonToNumber = (button, indicatorLength) => {
    let bitString = []
    for (let i = 0; i < indicatorLength; i++) {
        if (button.includes(i)) {
            bitString.push('1')
        } else {
            bitString.push('0')
        }
    }
    return parseInt(bitString.reverse().join(''), 2)
}

const findButtonsToUse = (target, curMin, buttonsRemaining, pushedButtons) => {
    if (!buttonsRemaining) return null
    if (curMin < pushedButtons.length) return null
    let localMin = curMin
    //  console.log("===", buttonsRemaining, pushedButtons)
    let bestButtons = null
    let btsToUse = buttonsRemaining.filter(button => !pushedButtons.includes(button) || (pushedButtons.reduce((tot, b) => tot ^ b) ^ button) === 0)
    for (let i = 0; i < btsToUse.length; i++) {
        const button = btsToUse[i]

        if ((pushedButtons.length && (pushedButtons.reduce((tot, b) => tot ^ b) ^ button) === target) || button === target) {
            //   console.log("buttton", button, ...pushedButtons, target)
            //  console.log("result", pushedButtons.reduce((tot, b) => tot ^ b), button, target, (pushedButtons.length && pushedButtons.reduce((tot, b) => tot ^ b) ^ button === target))
            return [...pushedButtons, button]
        }
        if (pushedButtons.length) {
            const mathed = pushedButtons.reduce((tot, b) => tot ^ b) ^ button
            if (mathed === 0) {
                continue
            }
        }
        const minButtons = findButtonsToUse(target, localMin, btsToUse, [...pushedButtons, button])
        // console.log('min', minButtons)
        if (minButtons && minButtons.length < localMin) {
            localMin = minButtons.length
            bestButtons = minButtons
        }
    }
    return bestButtons
}

let lineCount = 0
for (let line of input) {
    const target = line[0].split('').filter(c => !['[', ']'].includes(c)).map(c => c === '#' ? 1 : 0)
    const buttons = line.slice(1, line.length - 1).map(c => c.replace(/\(|\)/g, '').split(',').map(Number))

    const buttonNumbers = buttons.map(button => buttonToNumber(button, target.length))
    const targetNum = parseInt(line[0].split('').filter(c => !['[', ']'].includes(c)).reverse().map(c => c === '#' ? '1' : '0').join(''), 2)
    for (let i = 2; i < input.length; i++) {
        const buttonsToUse = findButtonsToUse(targetNum, i, buttonNumbers, [])
        if (buttonsToUse === null) continue
        console.log("done with line", lineCount, "of", input.length)
        lineCount++
        part1 += buttonsToUse.length
        break
    }

}
console.log(part1)