utils = require('./utils')

let valves = utils.readLinesAsStringArray('testinput').map(valve => {
    let code = valve.substring(6, 8)
    let rate = +valve.split('=')[1].split(';')[0]
    let paths = valve.split(';')[1].split(/valves?/)[1].split(',').map(p => p.trim())
    return {
        name: code,
        rate,
        travelTime: paths.reduce((tot, path) => {
            tot[path] = {
                dist: 1
            }
            return tot
        }, {})
    }
})

//bygg en map/dict över vad varje är värd från varje pos eller nåt

const buildTravelTime = (origValveTT, curValve, dist, path) => {
    const knownTT = Object.entries(curValve.travelTime)
    knownTT.forEach(tt => {
        let nextValve = valves.find(valve => valve.name === tt[0])
        if (!origValveTT[tt[0]] || origValveTT[tt[0]].dist >= tt[1].dist + dist) {
            origValveTT[tt[0]] = {
                dist: tt[1].dist + dist,
                rate: nextValve.rate,
                valueFunc: (timeLeft) => nextValve.rate * (timeLeft - tt[1].dist - dist - 1),
                path
            }
            origValveTT = { ...origValveTT, ...buildTravelTime(origValveTT, nextValve, dist + 1, [...path, nextValve.name]) }
        }
    })
    return origValveTT;
}
let newTT = []
for (let i = 0; i < valves.length; i++) {
    const tt = valves[i].travelTime
    newTT.push(buildTravelTime({ ...tt }, valves[i], 0, []))
}
//Spent way to long trying to debug issues with traveltime until i realised that modifying the looping data in the loop is bad
newTT.forEach((tt, i) => valves[i].travelTime = tt)
console.log(Array.isArray(newTT))
console.log(newTT[0].HH.valueFunc(30))
return
const minMaxCalculator = (curValve, timeLeft, opened) => {
    let best = 0;
    Object.entries(curValve.travelTime).forEach(tt => {
        let localBest = 0
        const { rate, dist } = tt[1]
        if (timeLeft - dist - 1 > 0 && !opened.includes(tt[0]) && rate !== 0) {
            localBest += rate * (timeLeft - dist - 1)

            const nextValve = valves.find(valve => valve.name === tt[0])
            localBest += minMaxCalculator(nextValve, timeLeft - dist - 1, [...opened, tt[0]])
        }

        best = localBest > best ? localBest : best
    })

    return best
}


let curValve = valves.find(valve => valve.name === 'AA')
//p1
console.log(minMaxCalculator(curValve, 30, ['AA']))

const findBestTarget = (origin, timeLeft, visited) => {

}

const minMaxCalculatorWithHelp = (p1, p2, p1Time, p2Time, tryValves) => {
    let best = 0;
    const visited = []
    let time = 0
    console.log(tryValves)
    return best
    //console.log(second)
    return best;
}

const tryValves = valves.filter(valve => valve.rate !== 0)
console.log(minMaxCalculatorWithHelp(curValve, curValve, 26, 26, tryValves))

/**
 * const findBestTarget = (origin, timeLeft, visited) => {
    let possibleTargets = Object.entries(origin.travelTime).filter(([name, { rate }]) => !visited.includes(name) && rate !== 0)
    let best = 0;
    let picked = []
    let timeSpent = 0;
    console.log(possibleTargets)
    possibleTargets.forEach(([name, { rate, dist, path }]) => {
        let usedPath = path.filter(p => {
            let { rate: lRate, dist: lDist } = origin.travelTime[p]
            if (lRate * (dist - lDist) >= rate || visited.includes(p)) {
                return true
            }
            return false
        })
        let localTime = timeLeft;
        let value = usedPath.reduce((p, n) => {
            let { rate: lRate, dist: lDist } = origin.travelTime[n]
            if (rate === 0) {
                localTime--
            }
            return p + lRate * (localTime - lDist)
        }, 0)
        console.log(name, value, localTime, dist, rate)

        value += rate * (localTime - dist - 1)
        localTime -= dist - 1
        console.log(name, value)
        picked = value > best ? [name, ...usedPath] : picked
        timeSpent = value > best ? timeLeft - localTime : timeSpent
        best = value > best ? value : best
    })
    console.log(picked)
    return { best, picked, timeSpent }
}

const minMaxCalculatorWithHelp = (p1, p2, p1Time, p2Time, tryValves) => {
    let best = 0;
    const visited = []
    let time = 0
    while (visited.length !== tryValves.length) {
        let first = findBestTarget(p1, p1Time, visited)
        console.log("====")
        p1 = tryValves.find(valve => valve.name === first.picked[0])
        best += first.best
        p1Time -= first.timeSpent
        console.log(first)
        visited.push(...first.picked)
        console.log(visited)
        let second = findBestTarget(p2, p2Time, visited)
        p2 = tryValves.find(valve => valve.name === second.picked[0])
        best += second.best
        p2Time -= second.timeSpent
        visited.push(...second.picked)
        console.log(second)
        console.log(visited)
        break

    }
    return best
    //console.log(second)
    return best;
}
 */