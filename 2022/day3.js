utils = require('./utils')

const rucksacks = utils.readLinesAsStringArray('input')

const prioMapper = data => data.reduce((p, n) => {
    let val = n.charCodeAt();
    return (val > 90 ? val - 96 : val - 38) + p

}, 0)

const part1 = rucksacks => prioMapper(rucksacks.map(sack => {
    const half = sack.length / 2;
    return sack.split('').slice(0, half).filter(item => sack.slice(half).includes(item)).filter((item, index, arr) => arr.indexOf(item) === index);
}).flat())

const part2 = rucksacks => {
    let badges = []
    for (var i = 0; i < rucksacks.length; i += 3) {
        badges.push(
            rucksacks[i].split('')
                .filter(item => rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)).filter((item, index, arr) => arr.indexOf(item) === index))
    }
    return prioMapper(badges.flat());
}

//p1
console.log(part1(rucksacks))

//p2
console.log(part2(rucksacks))