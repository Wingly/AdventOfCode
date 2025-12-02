utils = require('./utils')

const input = utils.readLinesAsString('input').split(',')


const part1 = input.reduce((invalid, current) => {
    const range = current.split('-')
    if (range[0].length % 2 === 1 && range[1].length % 2 === 1) return invalid
    let num = Number(range[0])
    const end = Number(range[1])
    while (num <= end) {
        const str = String(num)
        if (str.length % 2 === 0) {
            if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) {
                invalid += num
            }
        }
        num++
    }
    return invalid

}, 0)

console.log(part1)

const part2 = input.reduce((invalid, current) => {
    const range = current.split('-')
    let num = Number(range[0])
    const end = Number(range[1])
    while (num <= end) {
        const str = String(num)
        for (let i = 1; i <= str.length / 2; i++) {

            if (str.length % i !== 0) continue
            const pattern = str.slice(0, i)
            let found = true
            for (let j = i; j < str.length; j += i) {
                if (str.slice(j, j + i) !== pattern) {
                    found = false
                    break
                }
            }
            if (found) {
                invalid += num
                break
            }

        }
        num++
    }
    return invalid
}, 0)

console.log(part2)