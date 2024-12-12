utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(d => d.split(''))

let regions = [];

const safeBoundCheck = (arr, i, j) => {
    if (i < 0 || i >= arr.length) return '.'
    const jArr = arr[i]
    if (j < 0 || j >= jArr.length) return '.'
    return jArr[j]
}

const checkNeighbours = (origin, plant, arr, notPlant) => {
    const matchingNeighbours = []
    let [i, j] = origin
    for (let y = -1; y < 2; y += 2) {
        const foundPlant = safeBoundCheck(arr, i + y, origin[1])
        if ((!notPlant && foundPlant === plant) || (notPlant && foundPlant !== plant)) {
            matchingNeighbours.push([i + y, j])
        }
    }
    for (let x = -1; x < 2; x += 2) {
        const foundPlant = safeBoundCheck(arr, origin[0], j + x)
        if ((!notPlant && foundPlant === plant) || (notPlant && foundPlant !== plant)) {
            matchingNeighbours.push([i, j + x])
        }
    }
    return matchingNeighbours
}

for (let i = 0; i < input.length; i++) {
    const row = input[i]
    for (let j = 0; j < row.length; j++) {
        const plant = row[j]
        let plantNeighbours = checkNeighbours([i, j], plant, input, false)
        if (plantNeighbours && plantNeighbours.length) {
            for (plantNeighbour of plantNeighbours) {
                let [y, x] = plantNeighbour
                const neighbourRegionIndex = regions.findIndex(r => r.plant === plant && r.plots.some(p => p[0] === y && p[1] === x))
                const neighbourRegion = regions[neighbourRegionIndex]
                const selfRegionIndex = regions.findIndex(r => r.plant === plant && r.plots.some(p => p[0] === i && p[1] === j))
                const selfRegion = regions[selfRegionIndex]
                if (neighbourRegion && !selfRegion) {
                    const alreadyInRegion = neighbourRegion.plots.find(p => p[0] === i && p[1] === j)
                    if (!alreadyInRegion)
                        neighbourRegion.plots.push([i, j])
                } else if (selfRegion && !neighbourRegion) {
                    const alreadyInRegion = selfRegion.plots.find(p => p[0] === y && p[1] === x)
                    if (!alreadyInRegion)
                        selfRegion.plots.push([y, x])
                } else if (selfRegion && neighbourRegion) {
                    if (selfRegionIndex === neighbourRegionIndex) continue
                    selfRegion.plots.forEach(plot => {
                        const alreadyInRegion = neighbourRegion.plots.find(p => p[0] === plot[0] && p[1] === plot[1])
                        if (!alreadyInRegion)
                            neighbourRegion.plots.push([plot[0], plot[1]])
                    })
                    regions.splice(selfRegionIndex, 1)
                } else {
                    regions.push({ plant, plots: [[i, j], [y, x]] })
                }
            }
        } else {
            regions.push({ plant, plots: [[i, j]] })
        }

    }
}

let totPart1 = regions.reduce((tot, region) => {
    let areaMult = region.plots.length
    let perimeter = region.plots.reduce((per, plot) => per + checkNeighbours(plot, region.plant, input, true).length, 0)
    tot += areaMult * perimeter;
    return tot
}, 0)
console.log(totPart1)

let totPart2 = regions.reduce((tot, region) => {
    let areaMult = region.plots.length

    const plant = region.plant
    const rightFacing = region.plots.filter(p => safeBoundCheck(input, p[0], p[1] + 1) !== plant).reduce((edges, edge) => {
        const [y, x] = edge
        if (!edges.all.some(uE => uE[1] === x && (uE[0] === y - 1 || uE[0] === y + 1))) {
            edges.unique.push(edge)
        }
        edges.all.push(edge)
        return edges
    }, { unique: [], all: [] })
    const leftFacing = region.plots.filter(p => safeBoundCheck(input, p[0], p[1] - 1) !== plant).reduce((edges, edge) => {
        const [y, x] = edge
        if (!edges.all.some(uE => uE[1] === x && (uE[0] === y - 1 || uE[0] === y + 1))) {
            edges.unique.push(edge)
        }
        edges.all.push(edge)
        return edges
    }, { unique: [], all: [] })
    const upFacing = region.plots.filter(p => safeBoundCheck(input, p[0] - 1, p[1]) !== plant).reduce((edges, edge) => {
        const [y, x] = edge
        if (!edges.all.some(uE => uE[0] === y && (uE[1] === x - 1 || uE[1] === x + 1))) {
            edges.unique.push(edge)
        }
        edges.all.push(edge)
        return edges
    }, { unique: [], all: [] })
    // due to my row based parsing some elements in bottom row might be out of order
    const uglyFix = region.plots.filter(p => safeBoundCheck(input, p[0] + 1, p[1]) !== plant).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
    const downFacing = uglyFix.reduce((edges, edge,) => {
        const [y, x] = edge
        if (!edges.all.some(uE => uE[0] === y && (uE[1] === x - 1 || uE[1] === x + 1))) {
            edges.unique.push(edge)
        }
        edges.all.push(edge)
        return edges
    }, { unique: [], all: [] })
    tot += areaMult * (upFacing.unique.length + rightFacing.unique.length + downFacing.unique.length + leftFacing.unique.length);
    return tot
}, 0)
console.log(totPart2)