utils = require('./utils')


const commands = utils.readLinesAsStringArray('finput')

let cycle = 1;
let val = 0;
let x = 1;
const checkCycles = [20, 60, 100, 140, 180, 220]
let CRT = ""
commands.forEach(command => {
    switch (command.substring(0, 4)) {
        case 'noop':
            CRT += [x - 1, x, x + 1].includes((cycle - 1) % 40) ? '#' : '.'
            cycle++
            if (checkCycles.includes(cycle)) {
                val += cycle * x;
            }
            break
        case 'addx':
            let inc = +command.split(' ')[1]
            CRT += [x - 1, x, x + 1].includes((cycle - 1) % 40) ? '#' : '.'
            cycle++;
            if (checkCycles.includes(cycle)) {
                val += cycle * x;
            }

            CRT += [x - 1, x, x + 1].includes((cycle - 1) % 40) ? '#' : '.'
            x += inc
            cycle++
            if (checkCycles.includes(cycle)) {
                val += cycle * x;
            }
            break
    }
})
//p1
console.log(val)
//p2
for (let i = 0; i < 6; i++) {
    console.log(CRT.slice(i * 40, (i + 1) * 40))
}
