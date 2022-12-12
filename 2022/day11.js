utils = require('./utils')


const monkeyList = utils.readLinesAsStringArray('finput')

const buildMonkeys = monkeyList => monkeyList.reduce((arr, line) => {
    if (line !== '') {
        const obj = arr[arr.length - 1]
        line = line.trim();
        switch (line[0]) {
            case 'M':
                obj.monkey = line.split(' ')[1]
                obj.inspected = 0;
                break;
            case 'S':
                obj.items = line.split(': ')[1].split(', ')
                break;
            case 'O':
                obj.operation = line.split('= ')[1]
                break;
            case 'T':
                obj.div = +line.split(' ')[3];
                break;
            case 'I':
                if (line.includes('true')) {
                    obj.true = +line.split(' ')[5]
                } else {
                    obj.false = +line.split(' ')[5]
                }
                break;

        }
        return arr
    } else {
        return [...arr, {}]
    }
}, [{}])

const processMonkeys = (inMonkeys, numIter, worryDiv) => {
    //This took a while to figure out
    let maxItemValue = inMonkeys.reduce((num, monkey) => num *= monkey.div, 1)
    console.log(maxItemValue)
    for (let i = 0; i < numIter; i++) {
        inMonkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                monkey.inspected++
                item = Math.floor(eval(monkey.operation.replace(/old/ig, item)) / worryDiv)
                if (item > maxItemValue) {
                    item = item % maxItemValue
                }
                if (item % monkey.div === 0) {
                    inMonkeys[monkey.true].items.push(item)
                } else {
                    inMonkeys[monkey.false].items.push(item)
                }
            })
            monkey.items = []
        })
    }
    const mostInspected = [0, 0]
    inMonkeys.forEach(({ inspected }) => {
        if (inspected > mostInspected[0]) {
            let oldMost = mostInspected[0]
            mostInspected[0] = inspected
            mostInspected[1] = oldMost

        } else if (inspected > mostInspected[1]) {
            mostInspected[1] = inspected
        }
        mostInspected.sort((a, b) => b - a)
    })
    return mostInspected
}
//p1
let monkeys = buildMonkeys(monkeyList)
let mostInspected = processMonkeys(monkeys, 20, 3)

console.log(mostInspected.reduce((p, n) => p * n))

//p2
monkeys = buildMonkeys(monkeyList)
mostInspected = processMonkeys(monkeys, 10000, 1)
console.log(mostInspected)
console.log(mostInspected.reduce((p, n) => p * n))