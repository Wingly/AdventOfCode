utils = require('./utils')

const input = utils.readLinesAsStringArray('input').map(line => line.split(''))

const safeBoundCheck = (arr, i, j) => {
    if (i < 0 || i >= arr.length) return '.'
    const jArr = arr[i]
    if (j < 0 || j >= jArr.length) return '.'
    return jArr[j]
}

/* dirs
  1 2 3
  4 x 5
  6 7 8
*/
const checkInDir = (arr, i, j, dir) => {
    switch (dir) {
        case 1:
            return [safeBoundCheck(arr, i - 1, j - 1), i - 1, j - 1]
        case 2:
            return [safeBoundCheck(arr, i - 1, j), i - 1, j]
        case 3:
            return [safeBoundCheck(arr, i - 1, j + 1), i - 1, j + 1]
        case 4:
            return [safeBoundCheck(arr, i, j - 1), i, j - 1]
        case 5:
            return [safeBoundCheck(arr, i, j + 1), i, j + 1]
        case 6:
            return [safeBoundCheck(arr, i + 1, j - 1), i + 1, j - 1]
        case 7:
            return [safeBoundCheck(arr, i + 1, j), i + 1, j]
        case 8:
            return [safeBoundCheck(arr, i + 1, j + 1), i + 1, j + 1]
    }
}



const findRemainderInDir = (arr, i, j, dir, remainder) => {
    const currRemainder = [...remainder]
    let sourceI = i;
    let sourceJ = j;
    while (true) {
        const [l, newI, newJ] = checkInDir(arr, sourceI, sourceJ, dir)
        sourceI = newI
        sourceJ = newJ
        if (l === currRemainder[0]) {
            currRemainder.shift();
        } else break
        if (currRemainder.length === 0) break
    }
    return currRemainder.length === 0
}

const findRemainder = (arr, i, j, remainder) => {
    let totFound = 0
    for (let dir = 1; dir < 9; dir++) {
        let result = findRemainderInDir(arr, i, j, dir, remainder)
        if (result) {
            totFound++;
        }
    }
    return totFound
}

const findCrossMas = (arr, i, j) => {
    let totMas = 0;
    let topLeft, topRight, botLeft, botRight
    topLeft = checkInDir(arr, i, j, 1)[0]
    topRight = checkInDir(arr, i, j, 3)[0]
    botLeft = checkInDir(arr, i, j, 6)[0]
    botRight = checkInDir(arr, i, j, 8)[0]
    if (topLeft === 'M' && botRight === 'S') totMas++
    if (topLeft === 'S' && botRight === 'M') totMas++
    if (botLeft === 'M' && topRight === 'S') totMas++
    if (botLeft === 'S' && topRight === 'M') totMas++
    return totMas === 2 ? 1 : 0
}

let tot = 0
let totpart2 = 0

for (let i = 0; i < input.length; i++) {
    let line = input[i]
    for (let j = 0; j < line.length; j++) {
        const startLetter = line[j]
        if (startLetter === 'X') {
            tot += findRemainder(input, i, j, ['M', 'A', 'S'])
        } else if (startLetter === 'S') {
            tot += findRemainder(input, i, j, ['A', 'M', 'X'])
        } else if (startLetter === 'A') {
            totpart2 += findCrossMas(input, i, j)
        }
    }
}
// should words not count both backwards and forwards or why do i get 2x the answer?
console.log(tot / 2)

console.log(totpart2)