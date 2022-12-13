utils = require('./utils')

const packages = utils.readLinesAsStringArray('finput').reduce((arr, line) => {
    if (line !== '') {
        const slot = arr[arr.length - 1]
        slot.push(line)
        return arr
    } else {
        return [...arr, []]
    }
}, [[]])

const parsePackage = package => {
    let parsed = []
    let subLength = 0;
    let number = "";
    for (let i = 0; i < package.length; i++) {
        if (package[i] === '[') {
            const subParsed = parsePackage(package.slice(i + 1))
            i += subParsed.len
            parsed.push(subParsed.parsed)
        } else if (package[i] === ']') {
            if (number !== '') {
                parsed.push(+number)
                number = ''
            }
            subLength = i + 1
            break
        } else if (package[i] === ',') {
            if (number !== '') {
                parsed.push(+number)
                number = ''
            }
            continue;
        } else {
            number = number + package[i]
        }
    }
    if (number !== '') {
        parsed.push(+number)
    }
    return { parsed, len: subLength }
}
const compare = (left, right) => {
    for (let i = 0; i < left.length; i++) {
        if (i === right.length) return -1
        if (left.length === 0 && right.length !== 0) return 1
        let l = left[i]
        let r = right[i]
        if (typeof l === 'number' && typeof r === 'number') {
            if (l > r) {
                return -1;
            } else if (r > l) {
                return 1;
            }
        } else if (Array.isArray(l) && Array.isArray(r)) {
            if (l.length === 0 && r.length !== 0) return 1
            let res = compare(l, r)
            if (res !== 0) return res
        } else if (Array.isArray(l) && typeof r === 'number') {
            if (l.length === 0) return 1
            r = [r]
            let res = compare(l, r)
            if (res !== 0) return res
        } else {
            l = [l]
            let res = compare(l, r)
            if (res !== 0) return res
        }
    }
    return left.length === right.length ? 0 : 1
}

const parsedPackages = packages.map(package => {
    let left = package[0].substring(1, package[0].length - 1)
    let right = package[1].substring(1, package[1].length - 1)
    left = parsePackage(left.split('')).parsed
    right = parsePackage(right.split('')).parsed
    return [left, right]
})

//p1
const correct = parsedPackages.reduce((result, package, i) => {
    if (compare(package[0], package[1]) !== -1) {
        result.push(i + 1)
    }
    return result;
}, [])
console.log(correct?.reduce((p, n) => p + n, 0))

//p2
const flatPackages = parsedPackages.flat()
flatPackages.push([[2]])
flatPackages.push([[6]])
flatPackages.sort((a, b) => compare(b, a))

//truly a work of art
const index1 = flatPackages.findIndex(package => package.length === 1 && package[0].length === 1 && package[0][0] === 2) + 1
const index2 = flatPackages.findIndex(package => package.length === 1 && package[0].length === 1 && package[0][0] === 6) + 1

console.log(index1 * index2)