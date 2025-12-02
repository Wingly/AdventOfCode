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
            const parts = []
            for (let j = 0; j < str.length; j += i) {
                parts.push(str.slice(j, i + j))
            }
            if (parts.every(part => part === parts[0])) {
                invalid += num
                break
            }
        }
        num++
    }
    return invalid
}, 0)

console.log(part2)