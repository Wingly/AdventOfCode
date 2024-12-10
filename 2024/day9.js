utils = require('./utils')

const input = utils.readLinesAsString('input').split('').map(Number)

let disc = ""
let char = 0
for (let i = 0; i < input.length; i += 2) {
    for (let j = 0; j < input[i]; j++) {
        disc += String.fromCharCode(char)
    }
    for (let j = 0; j < input[i + 1]; j++)
        disc += '.'
    char++
    if (char === 46) char++
}

const part1 = (disc) => {
    let arrDisc = disc.split('')
    let compactDisc = ""
    const nonDots = arrDisc.filter(a => a !== '.')
    for (let i = 0; i < arrDisc.length; i++) {
        if (compactDisc.length === nonDots.length) break
        if (arrDisc[i] === undefined) break
        if (arrDisc[i] === '.') {
            let pop = arrDisc.pop()
            while (pop === '.') pop = arrDisc.pop()
            compactDisc += pop
        } else {
            compactDisc += arrDisc[i]
        }
    }
    let checksum = 0
    let splitCompact = compactDisc.split('')
    for (let i = 0; i < splitCompact.length; i++) {
        let id = splitCompact[i].charCodeAt(0)
        if (id > 46) id--
        checksum += i * id
    }
    return checksum
}

const part2 = (disc) => {
    let arrDisc = disc.split('')
    let blocks = []
    for (let i = 0; i < arrDisc.length;) {
        let j = i
        let firstChar = arrDisc[j]
        let block = []
        while (arrDisc[j] === firstChar) {
            block.push(arrDisc[j])
            j++
        }
        blocks.push(block)
        i = j
    }
    let dotBlocks = blocks.map((block, i) => [i, [...block]]).filter(block => block[1][0] === '.')

    for (let i = blocks.length - 1; i > 0; i--) {
        if (blocks[i][0] !== '.') {
            let blocklength = blocks[i].length
            const blockWithSpace = dotBlocks.find(db => db[1].length >= blocklength)

            if (!blockWithSpace || blockWithSpace[0] > i) continue
            const blockToFill = blocks[blockWithSpace[0]]
            const blockToRemove = blocks.splice(i, 1, new Array(blocklength).fill('.'))[0]
            blockToRemove.forEach((char, index) => blockToFill[index] = char)

            const remainingSpace = blockToFill.findIndex(char => char === '.')
            if (remainingSpace !== -1) {
                const space = blockToFill.splice(remainingSpace)
                blocks.splice(blockWithSpace[0] + 1, 0, space)
                let modIndex = dotBlocks.findIndex(db =>
                    db[1].length >= blocklength
                )
                dotBlocks.splice(modIndex, 1, [blockWithSpace[0] + 1, space])

                dotBlocks.forEach((db, j) => {
                    if (db[0] > blockWithSpace[0] && j > modIndex)
                        db[0]++
                })
                i++
            } else {
                let modIndex = dotBlocks.findIndex(db =>
                    db[1].length >= blocklength
                )
                dotBlocks.splice(modIndex, 1)
            }

        }
    }
    let checksum = 0
    let splitCompact = blocks.flat()

    for (let i = 0; i < splitCompact.length; i++) {
        if (splitCompact[i] === '.') continue
        let id = splitCompact[i].charCodeAt(0)
        if (id > 46) id--
        checksum += i * id
    }
    return checksum
}

console.log(part1(disc))
console.log(part2(disc))

