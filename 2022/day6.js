utils = require('./utils')

const signals = utils.readLinesAsStringArray('input')

const findMarker = (signals, numDistinct) =>
    signals.map(signal => signal.split('').findIndex((_, i, array) => {
        const slice = array.slice(i, i + numDistinct);
        if (slice.every((char, i) => slice.indexOf(char) === i)) {
            return true
        }
        return false
    }) + numDistinct)

//p1
console.log(findMarker(signals, 4))

//p2
console.log(findMarker(signals, 14))
