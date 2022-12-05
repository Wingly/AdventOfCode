utils = require('./utils')

const move1 = (from, num, to, array) => {
    for (var i = 0; i < num; i++) {
        let moving = array[from].pop()
        array[to].push(moving)
    }
}

const move2 = (from, num, to, array) => {
    if (Number.isNaN(from)) return;
    let removed = array[from].splice(array[from].length - num, num)
    array[to].push(...removed)
}

const genCrates = data => data.slice(0, endOfCrates - 1).map(
    stack => stack.replace(/(\[|\])/g, '').split('    ')
        .map(element => element.split(' ')).flat())
    .reverse()
    .reduce((all, row) => {
        row.forEach((val, i) => {
            if (val !== '') {
                all[i].push(val)
            }
        })
        return all;
    }, data[endOfCrates - 1].split('   ').map(_ => []))

const data = utils.readLinesAsStringArray('input')

const endOfCrates = data.findIndex(v => v === '')

const commands = data.slice(endOfCrates + 1).map(row => row.split(' ').filter(v => !Number.isNaN(Number(v))))
//p1
const part1 = genCrates(data)
commands.forEach(command => move1(command[1] - 1, command[0], command[2] - 1, part1))
console.log(part1.map(stack => stack[stack.length - 1]).join(''))

//p2
let part2 = genCrates(data)
commands.forEach(command => move2(command[1] - 1, command[0], command[2] - 1, part2))
console.log(part2.map(stack => stack[stack.length - 1]).join(''))